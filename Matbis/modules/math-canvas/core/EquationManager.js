/**
 * core/EquationManager.js  —  Reaktif Durum Yöneticisi
 *
 * Sorumluluklar:
 *   ✓ Denklem listesini (equations[]) tek elden yönetir.
 *   ✓ EventBus üzerinden gelen UI olaylarını dinler.
 *   ✓ Derlemeyi EquationCompiler'a devreder.
 *   ✓ Geçerli eğrileri STATE_CHANGED olayıyla yayınlar.
 *
 * Denklem nesnesi yapısı:
 *   {
 *     id          : 'eq-1'            — benzersiz tanımlayıcı
 *     text        : 'sin(x)'          — kullanıcının yazdığı ham metin
 *     color       : '#58a6ff'         — eğri rengi
 *     visible     : true              — grafike dahil mi?
 *     type        : 'explicit'        — denklem türü (explicit|polar|parametric|implicit)
 *     evaluateFn  : (x) => y|null     — derlenmiş hesaplama fonksiyonu
 *     error       : false             — son derleme hatası var mı?
 *     tMin        : number|null       — parametre alt sınırı (polar / parametrik için)
 *     tMax        : number|null       — parametre üst sınırı (polar / parametrik için)
 *   }
 *
 * Dinlenen olaylar   : UI_ADD_EQUATION · UI_UPDATE_EQUATION · UI_REMOVE_EQUATION · UI_UPDATE_RANGE
 * Yayınlanan olaylar : STATE_CHANGED · STATE_EQUATIONS_UPDATED · STATE_EQUATION_ERROR
 */

import { eventBus }         from './EventBus.js';
import { MathEngine }       from './MathEngine.js';
import { evalWithSliders }  from './SliderScope.js';
import { makeEquationTemplate } from './equationHelpers.js';
import { EquationCompiler } from './EquationCompiler.js';

export class EquationManager {

    constructor() {
        /**
         * Tam denklem listesi (id, text, color, visible, evaluateFn, error).
         * @type {Array<object>}
         */
        this._equations = [];

        /** Benzersiz id üretmek için sayaç. */
        this._counter = 0;

        /**
         * İsimli nokta kayıt defteri.
         * Her denklem derlendiğinde, eğer bir isimli nokta tanımlıyorsa
         * (A=(2,5) veya P=dinamik(a,b)) buraya kaydedilir.
         * çokgen(A,B,C) gibi isimli referanslar çalışma zamanında bu kaydı okur.
         * @type {Map<string, () => {x:number,y:number}|null>}
         */
        this._pointRegistry = new Map();

        /** Derleme mantığını yürüten yardımcı (paylaşımlı _pointRegistry üzerinden bağlı). */
        this._compiler = new EquationCompiler(this._pointRegistry);

        /* ── EventBus abonelikleri ─────────────────────────── */
        eventBus.on('UI_ADD_EQUATION',          ()                       => this._onAdd());
        eventBus.on('UI_INSERT_EQUATION_AFTER', (afterId)                => this._onInsertAfter(afterId));
        eventBus.on('UI_UPDATE_EQUATION',       ({ id, text })           => this._onUpdate(id, text));
        eventBus.on('UI_REMOVE_EQUATION',       (id)                     => this._onRemove(id));
        eventBus.on('UI_UPDATE_RANGE',          ({ id, tMin, tMax })     => this._onUpdateRange(id, tMin, tMax));
        eventBus.on('UI_REORDER_EQUATION',      ({ id, newIndex })       => this._onReorder(id, newIndex));
        eventBus.on('SLIDER_VALUE_CHANGED',     ()                       => this._onSliderChanged());
    }

    // ═══════════════════════════════════════════════════════════════
    //  OLAY İŞLEYİCİLERİ
    // ═══════════════════════════════════════════════════════════════

    /** Listeye yeni, boş bir denklem ekler. */
    _onAdd() {
        this._counter++;
        const eq = makeEquationTemplate(this._counter, this._equations.length);
        this._equations.push(eq);
        eventBus.emit('STATE_EQUATIONS_UPDATED', this._snapshot());
        this._emitCurves();
    }

    /**
     * Belirli bir konumdan sonra yeni, boş bir denklem ekler.
     * @param {string} afterId  Yeni satırın ekleneceği önceki denklem id'si
     */
    _onInsertAfter(afterId) {
        const idx = this._equations.findIndex(e => e.id === afterId);
        this._counter++;
        const eq = makeEquationTemplate(this._counter, this._equations.length);

        if (idx === -1) {
            this._equations.push(eq);
        } else {
            this._equations.splice(idx + 1, 0, eq);
        }

        eventBus.emit('STATE_EQUATIONS_UPDATED', this._snapshot());
        this._emitCurves();
    }

    /**
     * Denklem listesindeki sırayı değiştirir.
     * @param {string} id        Taşınacak denklemin id'si
     * @param {number} newIndex  Hedef indeks (taşıma sonrası yeni konum)
     */
    _onReorder(id, newIndex) {
        const currentIndex = this._equations.findIndex(e => e.id === id);
        if (currentIndex === -1 || currentIndex === newIndex) return;

        const [eq] = this._equations.splice(currentIndex, 1);
        this._equations.splice(newIndex, 0, eq);

        eventBus.emit('STATE_EQUATIONS_UPDATED', this._snapshot());
        this._rebuildAll();
    }

    /**
     * Belirli bir denklemi yeni metinle günceller ve tüm denklemleri yeniden derler.
     * @param {string} id    Denklem tanımlayıcısı
     * @param {string} text  Yeni ham ifade
     */
    _onUpdate(id, text) {
        const eq = this._equations.find(e => e.id === id);
        if (!eq) return;

        eq.text = text;
        this._rebuildAll();
    }

    // ═══════════════════════════════════════════════════════════════
    //  YENİDEN-DERLEME  (EquationCompiler'a devredilir)
    // ═══════════════════════════════════════════════════════════════

    /**
     * Tüm denklemleri EquationCompiler aracılığıyla yeniden derler,
     * ardından aktif eğrileri yayınlar.
     */
    _rebuildAll() {
        this._compiler.rebuildAll(this._equations);
        this._emitCurves();
    }

    /**
     * Kullanıcının değiştirdiği parametre aralığını günceller ve eğrilerı yeniden yayınlar.
     * @param {string} id
     * @param {number} tMin
     * @param {number} tMax
     */
    _onUpdateRange(id, tMin, tMax) {
        const eq = this._equations.find(e => e.id === id);
        if (!eq) return;

        // String olarak sakla (değişken/ifade olabilir)
        eq.tMinExpr = String(tMin);
        eq.tMaxExpr = String(tMax);

        // Sayısal değerleri hemen hesapla
        const numMin = evalWithSliders(eq.tMinExpr);
        const numMax = evalWithSliders(eq.tMaxExpr);
        eq.tMin = isNaN(numMin) ? eq.tMin : numMin;
        eq.tMax = isNaN(numMax) ? eq.tMax : numMax;

        // Aralık ifadelerindeki serbest değişkenleri yeniden tara
        const engine = new MathEngine();
        const exprVars = engine.extractFreeVars(
            `${eq.tMinExpr} + ${eq.tMaxExpr}`, null
        );
        // Mevcut denklem freeVars’ına ekle (tekrar yoksa)
        const textVars = engine.extractFreeVars(eq.text, eq.type);
        eq.freeVars = [...textVars];
        for (const v of exprVars) {
            if (!eq.freeVars.includes(v)) eq.freeVars.push(v);
        }
        eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });

        this._emitCurves();
    }

    /**
     * Slider değeri değiştiğinde çağrılır.
     * Aralık ifadelerini yeniden hesaplar, sabitleri güncelleyip eğrileri yeniden yayınlar.
     */
    _onSliderChanged() {
        // Aralık ifadelerini güncelle
        for (const eq of this._equations) {
            if (eq.tMinExpr != null && eq.tMaxExpr != null) {
                const numMin = evalWithSliders(eq.tMinExpr);
                const numMax = evalWithSliders(eq.tMaxExpr);
                if (!isNaN(numMin)) eq.tMin = numMin;
                if (!isNaN(numMax)) eq.tMax = numMax;
            }
        }

        // Tüm denklemleri yeniden derle (İsimlendirme modülü entegrasyonu)
        // Bu, sabit değerlerin güncellenmesini, resolve'ların yeniden çalıştırılmasını
        // ve computation sonuçlarının güncellenmesini sağlar.
        this._rebuildAll();
    }

    /**
     * Denklemi listeden kalıcı olarak kaldırır.
     * Silinen satır bir tanım içeriyorsa bağımlılar yeniden derlenir.
     * @param {string} id
     */
    _onRemove(id) {
        this._equations = this._equations.filter(e => e.id !== id);
        eventBus.emit('STATE_EQUATIONS_UPDATED', this._snapshot());
        this._rebuildAll();
    }

    // ═══════════════════════════════════════════════════════════════
    //  YARDIMCI METODLAR
    // ═══════════════════════════════════════════════════════════════

    /**
     * evaluateFn içermeyen, serileştirilebilir denklem anlık görüntüsü.
     * UI modülleri bu veriyle satır oluşturur / günceller.
     */
    _snapshot() {
        return this._equations.map(({ id, text, color, visible, error, type, operator, freeVars }) =>
            ({ id, text, color, visible, error, type, operator, freeVars })
        );
    }

    /**
     * Görünür ve derlenmis eğrileri döndürür.
     * @returns {Array<{ evaluateFn: Function, color: string }>}
     */
    getActiveCurves() {
        const curves = [];
        for (const eq of this._equations) {
            if (!eq.visible || eq.type === 'computation') continue;

            // Dinamik nokta → evaluateFn + metadata ile curve emit et
            if (eq.type === 'dynamicPoint') {
                // Liste genişletmesi varsa → her sub-curve ayrı dinamik nokta
                if (eq.subCurves && eq.subCurves.length > 0) {
                    for (const sc of eq.subCurves) {
                        if (sc.evaluateFn) {
                            curves.push({
                                type: 'dynamicPoint',
                                evaluateFn:   sc.evaluateFn,
                                evaluateWith: sc.evaluateWith,
                                freeVars:     eq.freeVars,
                                xFreeVars:    sc.xFreeVars,
                                yFreeVars:    sc.yFreeVars,
                                xExpr:        sc.xExpr,
                                yExpr:        sc.yExpr,
                                isSimple:     sc.isSimple,
                                simpleVarX:   sc.simpleVarX,
                                simpleVarY:   sc.simpleVarY,
                                color: eq.color,
                            });
                        }
                    }
                    continue;
                }
                // Tekil dinamik nokta
                if (eq.evaluateFn) {
                    curves.push({
                        type: 'dynamicPoint',
                        evaluateFn:   eq.evaluateFn,
                        evaluateWith: eq.evaluateWith,
                        freeVars:     eq.freeVars,
                        xFreeVars:    eq.dynamicMeta.xFreeVars,
                        yFreeVars:    eq.dynamicMeta.yFreeVars,
                        ...eq.dynamicMeta,
                        color: eq.color,
                    });
                }
                continue;
            }

            // Liste genişletmesi varsa → her sub-curve ayrı eğri.
            // Aynı listeden gelen karakter curve'ler için siblingEvalFns
            // eklenir: bir kardeş o noktayı kapsıyorsa (non-null döndürürse),
            // endpoint noktası dolu çizilmeli.
            if (eq.subCurves && eq.subCurves.length > 0) {
                // Tüm kardeşlerin evaluateFn listesi
                const allSiblingFns = eq.subCurves
                    .filter(sc => sc.evaluateFn)
                    .map(sc => sc.evaluateFn);

                for (const sc of eq.subCurves) {
                    if (sc.evaluateFn) {
                        const otherSiblingFns = allSiblingFns.filter(fn => fn !== sc.evaluateFn);
                        curves.push({
                            evaluateFn:    sc.evaluateFn,
                            color:         eq.color,
                            type:          sc.type,
                            tMin:          eq.tMin,
                            tMax:          eq.tMax,
                            operator:      sc.operator ?? eq.operator,
                            evaluateFn2:   sc.evaluateFn2   ?? null,
                            op1:           sc.op1           ?? null,
                            op2:           sc.op2           ?? null,
                            rawEvaluateFn: sc.rawEvaluateFn ?? null,
                            domainEndpoints: sc.domainEndpoints ?? eq.domainEndpoints ?? null,
                            siblingEvalFns: otherSiblingFns.length > 0 ? otherSiblingFns : null,
                        });
                    }
                }
                continue;
            }

            // Standart tek eğri
            if (eq.evaluateFn !== null) {
                curves.push({
                    evaluateFn:    eq.evaluateFn,
                    color:         eq.color,
                    type:          eq.type,
                    tMin:          eq.tMin,
                    tMax:          eq.tMax,
                    operator:      eq.operator,
                    evaluateFn2:   eq.evaluateFn2   ?? null,
                    op1:           eq.op1           ?? null,
                    op2:           eq.op2           ?? null,
                    rawEvaluateFn: eq.rawEvaluateFn ?? null,
                    domainEndpoints: eq.domainEndpoints ?? null,
                });
            }
            // Çokgen içi dinamik noktaları overlay için ekle
            if (eq.dynamicSubCurves && eq.dynamicSubCurves.length > 0) {
                for (const sc of eq.dynamicSubCurves) {
                    curves.push({
                        type:         'dynamicPoint',
                        evaluateFn:   sc.evaluateFn,
                        evaluateWith: sc.evaluateWith,
                        freeVars:     [...new Set([...(sc.xFreeVars || []), ...(sc.yFreeVars || [])])],
                        xFreeVars:    sc.xFreeVars,
                        yFreeVars:    sc.yFreeVars,
                        xExpr:        sc.xExpr,
                        yExpr:        sc.yExpr,
                        isSimple:     sc.isSimple,
                        simpleVarX:   sc.simpleVarX,
                        simpleVarY:   sc.simpleVarY,
                        color:        eq.color,
                    });
                }
            }
        }
        return curves;
    }

    /** Aktif eğri listesini STATE_CHANGED olayıyla yayınlar. */
    _emitCurves() {
        eventBus.emit('STATE_CHANGED', this.getActiveCurves());
    }
}
