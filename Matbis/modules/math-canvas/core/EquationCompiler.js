/**
 * core/EquationCompiler.js  —  Denklem Derleme Motoru
 *
 * Sorumluluklar:
 *   ✓ Ham metin → evaluateFn dönüşümünü gerçekleştirir.
 *   ✓ NameRegistry ile tanım algılama/çözümleme yapar.
 *   ✓ Liste genişletme ve özel sözdizimi (çokgen, dinamik) kalıplarını işler.
 *   ✓ İsimli nokta kayıt defterini günceller.
 *
 * Dışarıya açık API:
 *   rebuildAll(equations)  — Tüm denklemleri baştan derler (yan etki: eq nesnelerini günceller).
 *
 * Yayınlanan olaylar : STATE_FREE_VARS_UPDATED · STATE_EQUATION_ERROR
 */

import { eventBus }           from './EventBus.js';
import { MathEngine }         from './MathEngine.js';
import { sliderScope, evalWithSliders } from './SliderScope.js';
import { DomainRestriction }  from './DomainRestriction.js';
import {
    containsList,
    expandExpression,
    stripListsForParsing,
    collectFreeVarText,
} from './ListExpander.js';
import { nameRegistry }   from './NameRegistry.js';
import { fmtDynCoord }    from './equationHelpers.js';

export class EquationCompiler {

    /**
     * @param {Map<string, () => {x:number,y:number}|null>} pointRegistry
     *   EquationManager'ın isimli nokta kayıt defteri (paylaşımlı referans).
     */
    constructor(pointRegistry) {
        this._pointRegistry = pointRegistry;
    }

    // ═══════════════════════════════════════════════════════════════
    //  TAM YENİDEN-DERLEME
    // ═══════════════════════════════════════════════════════════════

    /**
     * Tüm denklemleri yukarıdan aşağıya yeniden tarar ve derler.
     * @param {Array<object>} equations  Denklem listesi (yan etki: güncellenir)
     */
    rebuildAll(equations) {
        // 1) Önceki sabitleri sliderScope'tan temizle, registry'yi sıfırla
        nameRegistry.clearConstantsFromScope(sliderScope);
        nameRegistry.clear();
        this._pointRegistry.clear();

        // 2) Tüm denklemleri sırayla tara
        for (const eq of equations) {
            try {
                this._compileOne(eq);
            } catch (err) {
                console.error('[EquationCompiler] derleme hatası:', err, eq.text);
                eq.type      = null;
                eq.evaluateFn = null;
                eq.error     = true;
            }
            // Derlenen denklem isimli nokta tanımlıyorsa kayıt defterine ekle
            this._updatePointRegistry(eq);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    //  TEK DENKLEM DERLEMESİ
    // ═══════════════════════════════════════════════════════════════

    /**
     * Tek bir denklem için: tanım kaydet → resolve → compile → sonuçları yaz.
     * @param {object} eq  Denklem nesnesi
     */
    _compileOne(eq) {
        const id      = eq.id;
        const rawText = eq.text;
        eq._defName   = null;

        if (!rawText || !rawText.trim()) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = false; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: false, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return;
        }

        // ── Domain bracket'larını ayır ──────────────────────
        const { cleanText, domainGroups } = DomainRestriction.parseBrackets(rawText.trim());
        const domainMathExpr = DomainRestriction.buildDomainMathExpr(domainGroups);
        const hasDomain      = domainGroups.length > 0;
        // Bundan sonra ham metin yerine cleanText kullanılır
        const text = cleanText;

        // ── Tanım algılama ──────────────────────────────────
        const { isDef, defInfo } = nameRegistry.tryRegister(id, text);

        let textToCompile;

        if (isDef) {
            eq._defName = defInfo.name;

            // Liste tanımı → grafik yok, sadece kayıt
            if (defInfo.type === 'list') {
                eq.type = null; eq.operator = '=';
                eq.evaluateFn = null; eq.subCurves = null;
                eq.computationResult = null; eq.error = false;

                const varText = collectFreeVarText(defInfo.body);
                const engine  = new MathEngine();
                eq.freeVars   = engine.extractFreeVars(varText, null);

                eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
                eventBus.emit('STATE_EQUATION_ERROR',
                    { id, error: false, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
                return;
            }

            // Fonksiyon tanımında domain varsa kayıt defterine ekle
            // (f(x)=... veya parametrik çift tanımı)
            if (hasDomain && defInfo.type === 'function') {
                nameRegistry.setFunctionDomain(defInfo.name, domainMathExpr);
                nameRegistry.setFunctionDomainRaw(defInfo.name, domainGroups);
            }
            if (hasDomain && defInfo.type === 'parametric-pair') {
                // defInfo.name = '(name1,name2)' biçiminde; her iki isme de domain ata
                const pairMatch = defInfo.name.match(/^\(([^,]+),([^)]+)\)$/);
                if (pairMatch) {
                    nameRegistry.setFunctionDomain(pairMatch[1].trim(), domainMathExpr);
                    nameRegistry.setFunctionDomain(pairMatch[2].trim(), domainMathExpr);
                    nameRegistry.setFunctionDomainRaw(pairMatch[1].trim(), domainGroups);
                    nameRegistry.setFunctionDomainRaw(pairMatch[2].trim(), domainGroups);
                }
            }

            const { resolved } = nameRegistry.resolve(defInfo.compilableText);
            textToCompile = resolved;
        } else {
            // ── çokgen(İsim, İsim, ...) → isimli nokta referanslarıyla çokgen ──
            const polyRefHandled = this._tryCompilePolygonNamedRefs(eq, text.trim());
            if (polyRefHandled) return;            const { resolved, usedDefSubTypes } = nameRegistry.resolve(text);
            textToCompile = resolved;

            // Polar auto-wrap
            if (usedDefSubTypes.has('polar')) {
                const hasTh = /\bth\b/.test(textToCompile) || /\btheta\b/.test(textToCompile);
                const hasR  = /^\s*r\s*=/.test(textToCompile);
                if (hasTh && !hasR) textToCompile = `r=${textToCompile}`;
            }
        }

        // ── çokgen({listX},{listY}) özel durumu ─────────────
        if (this._tryExpandPolygonLists(eq, textToCompile) !== null) return;

        // ── dinamik({listX},{listY}) özel durumu ─────────────
        if (this._tryExpandDynamicPointLists(eq, textToCompile) !== null) return;

        // ── Liste genişletme ─────────────────────────────────
        if (containsList(textToCompile)) {
            // Ham metin liste içeriyorsa, resolve sırasında ternary form alan
            // domain-kısıtlı fonksiyon çağrılarını bracket form'a çevir.
            // Böylece subCurve'ler rawEvaluateFn ve domainEndpoints'e sahip olur.
            //
            // isDef=true ise text tüm tanım satırını içerir (ör. "f(x)={sin(x),cos(x)}");
            // resolveForList'e bunu verirsek "f(x)" kendi gövdesiyle değiştirilir → bozuk.
            // Bu yüzden isDef ise compilableText (yalnızca gövde) kullanılır.
            const rawSource = isDef ? defInfo.compilableText : text;
            const listText = rawSource && containsList(rawSource)
                ? nameRegistry.resolveForList(rawSource).resolved
                : textToCompile;
            this._compileWithList(eq, listText);
            // Liste derlemesi sonrası domain sarmalama
            if (hasDomain && !eq.error && eq.type) {
                this._applyDomain(eq, domainMathExpr, domainGroups);
            }
            return;
        }

        // ── Standart akış (liste yok) ────────────────────────
        eq.subCurves = null;

        const engine   = new MathEngine();
        const result   = engine.compile(textToCompile);
        const prevType = eq.type;

        if (result) {
            eq.type     = result.type;
            eq.operator = result.operator ?? '=';

            // ── Dinamik Nokta özel dalı ─────────────────────────
            if (result.type === 'dynamicPoint') {
                eq.evaluateFn  = result.evaluateFn;
                eq.evaluateWith = result.evaluateWith;
                eq.dynamicMeta = {
                    xExpr:      result.xExpr,
                    yExpr:      result.yExpr,
                    isSimple:   result.isSimple,
                    simpleVarX: result.simpleVarX,
                    simpleVarY: result.simpleVarY,
                    xFreeVars:  result.xFreeVars,
                    yFreeVars:  result.yFreeVars,
                };
                eq.error    = false;
                eq.tMin     = null; eq.tMax     = null;
                eq.tMinExpr = null; eq.tMaxExpr = null;

                eq.freeVars = engine.extractFreeVars(textToCompile, result.type);

                const pos = result.evaluateFn();
                eq.computationResult = pos
                    ? `(${fmtDynCoord(pos.x)}, ${fmtDynCoord(pos.y)})`
                    : null;

                // Tüm serbest değişkenler onaylanmış (sliderScope'ta mevcut) ve
                // pozisyon tanımsızsa → denklem hata gösterir.
                // Böylece kullanıcı sürgü değerinin domain dışında olduğunu anlar.
                const dynError = pos === null && eq.freeVars.every(v => v in sliderScope);
                eq.error = dynError;

                eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
                eventBus.emit('STATE_EQUATION_ERROR',
                    { id, error: dynError, type: eq.type, tMin: null, tMax: null,
                      computationResult: eq.computationResult });
                return;
            }

            eq.evaluateFn = result.evaluateFn;
            eq.error      = false;

            // Çift-taraflı eşitsizlik için ek alanları kaydet
            if (result.operator === 'compound') {
                eq.evaluateFn2 = result.evaluateFn2;
                eq.op1         = result.op1;
                eq.op2         = result.op2;
            } else {
                eq.evaluateFn2 = null;
                eq.op1         = null;
                eq.op2         = null;
            }

            // Tür değişince varsayılan aralığı sıfırla
            if (prevType !== result.type) {
                if (result.type === 'polar') {
                    eq.tMin = 0;           eq.tMax = 4 * Math.PI;
                    eq.tMinExpr = '0';     eq.tMaxExpr = String(4 * Math.PI);
                } else if (result.type === 'parametric') {
                    eq.tMin = -10;         eq.tMax = 10;
                    eq.tMinExpr = '-10';   eq.tMaxExpr = '10';
                } else {
                    eq.tMin = null; eq.tMax = null;
                    eq.tMinExpr = null; eq.tMaxExpr = null;
                }
            }

            // Hesaplama sonucunu güncelle
            if (result.type === 'computation') {
                try { eq.computationResult = result.evaluateFn(); }
                catch { eq.computationResult = null; }

                if (isDef && defInfo.type === 'constant' && eq.computationResult != null) {
                    nameRegistry.registerConstantValue(defInfo.name, eq.computationResult, sliderScope);
                }
            } else {
                eq.computationResult = null;
            }

            eq.freeVars = engine.extractFreeVars(textToCompile, result.type);

            // Aralık ifadelerindeki serbest değişkenleri de topla
            if (eq.tMinExpr) {
                const rangeVars = engine.extractFreeVars(`${eq.tMinExpr} + ${eq.tMaxExpr}`, null);
                for (const v of rangeVars) {
                    if (!eq.freeVars.includes(v)) eq.freeVars.push(v);
                }
            }

            // Domain kısıtlaması varsa evaluateFn'i sar; serbest değişkenleri güncelle
            if (hasDomain && result.type !== 'computation' && result.type !== 'dynamicPoint') {
                eq.rawEvaluateFn = result.evaluateFn;  // sarmalanmadan önceki ham fonksiyon
                // Kullanıcı tanımlı isim/fonksiyonları domain ifadesinde de çöz
                const resolvedDomainExpr = nameRegistry.resolve(domainMathExpr).resolved;
                const predicate = DomainRestriction.compileDomainPredicate(resolvedDomainExpr);
                eq.evaluateFn   = DomainRestriction.wrapEvaluateFn(eq.evaluateFn, predicate, result.type);
                const domainVars = engine.extractFreeVars(resolvedDomainExpr, null);
                for (const v of domainVars) {
                    if (!eq.freeVars.includes(v)) eq.freeVars.push(v);
                }
                // Her koşul string'ini de çöz: g(x) gibi isimler evalCondAt için genişletilmeli
                const resolvedDomainGroups = domainGroups.map(group =>
                    group.map(cond => nameRegistry.resolve(cond).resolved)
                );
                eq.domainEndpoints = DomainRestriction.buildEndpointGetters(resolvedDomainGroups);
            } else {
                eq.rawEvaluateFn   = null;
                eq.domainEndpoints = null;
            }

            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
        } else {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.computationResult = null;
            eq.error      = text.trim().length > 0;
            eq.freeVars   = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
        }

        eventBus.emit('STATE_EQUATION_ERROR',
            { id, error: eq.error, type: eq.type, tMin: eq.tMin, tMax: eq.tMax,
              computationResult: eq.computationResult ?? null });
    }

    // ═══════════════════════════════════════════════════════════════
    //  LİSTE GENİŞLETMELİ DERLEME
    // ═══════════════════════════════════════════════════════════════

    /**
     * Liste içeren ifadeyi genişletip derler.
     * @param {object} eq             Denklem nesnesi
     * @param {string} textToCompile  Resolve edilmiş ifade (liste sözdizimi dahil)
     */
    _compileWithList(eq, textToCompile) {
        const id       = eq.id;
        const expanded = expandExpression(textToCompile, evalWithSliders);

        if (expanded.error) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = true; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: true, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return;
        }

        if (expanded.expressions.length === 0) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = [];
            eq.computationResult = null; eq.error = false;

            const varText = collectFreeVarText(textToCompile);
            const engine  = new MathEngine();
            eq.freeVars   = engine.extractFreeVars(varText, null);

            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: false, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return;
        }

        // Tür tespiti: liste soyulmuş halini derle.
        // stripListsForParsing ilk elemanı '(elem)' biçimine sokar.
        // elem domain bracket içerebilir ve nameRegistry çözümlemesi ek
        // parantez katmanı ekleyebilir (ör. "((sin((2))[(2)<2]))").
        // Tüm dış parantez katmanlarını döngüyle soyarak domain bracket'ı bul.
        const stripped = stripListsForParsing(textToCompile);
        let strippedForProbe = stripped.trim();
        {
            let s = strippedForProbe;
            // Önce doğrudan (singleton / parensiz) dene
            const direct = DomainRestriction.parseBrackets(s);
            if (direct.domainGroups.length > 0) {
                strippedForProbe = direct.cleanText;
            } else {
                // Parantez katmanlarını soy
                while (s.startsWith('(') && s.endsWith(')')) {
                    let d = 0, fullWrap = true;
                    for (let ci = 0; ci < s.length - 1; ci++) {
                        if (s[ci] === '(') d++;
                        else if (s[ci] === ')') { d--; if (d === 0) { fullWrap = false; break; } }
                    }
                    if (!fullWrap) break;
                    const inner = s.slice(1, -1);
                    const { cleanText, domainGroups } = DomainRestriction.parseBrackets(inner);
                    if (domainGroups.length > 0) {
                        strippedForProbe = `(${cleanText})`;
                        break;
                    }
                    s = inner;
                }
            }
        }
        const engine      = new MathEngine();
        const probeResult = engine.compile(strippedForProbe);
        const prevType    = eq.type;

        if (!probeResult) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null;
            eq.error    = textToCompile.trim().length > 0;
            eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: eq.error, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return;
        }

        eq.type     = probeResult.type;
        eq.operator = probeResult.operator ?? '=';
        eq.error    = false;

        // Tür değişince varsayılan aralığı sıfırla
        if (prevType !== probeResult.type) {
            if (probeResult.type === 'polar') {
                eq.tMin = 0;           eq.tMax = 4 * Math.PI;
                eq.tMinExpr = '0';     eq.tMaxExpr = String(4 * Math.PI);
            } else if (probeResult.type === 'parametric') {
                eq.tMin = -10;         eq.tMax = 10;
                eq.tMinExpr = '-10';   eq.tMaxExpr = '10';
            } else {
                eq.tMin = null; eq.tMax = null;
                eq.tMinExpr = null; eq.tMaxExpr = null;
            }
        }

        // Her genişletilmiş ifadeyi ayrı derle → subCurves.
        // Singleton listeler: expr parantez olmadan gelir ("sin(x)[x<2]").
        // Çok elemanlı listeler: expr bir parantez katmanı içinde gelir ("(sin(x)[x<2])").
        // NameRegistry çözümlemesi ek katman ekleyebilir ("((sin((2))[(2)<2]))").
        // → Domain bracket'ı bulmak için tüm dış parantez katmanlarını döngüyle soy.
        const subCurves = [];
        let allOk = true;
        for (const expr of expanded.expressions) {
            let exprToCompile = expr;
            let exprDomainGroups = [];

            let s = expr.trim();
            let found = false;

            // Önce doğrudan dene (singleton durumu: parantez yok)
            {
                const { cleanText, domainGroups } = DomainRestriction.parseBrackets(s);
                if (domainGroups.length > 0) {
                    exprToCompile = cleanText;
                    exprDomainGroups = domainGroups;
                    found = true;
                }
            }

            // Parantez katmanlarını döngüyle soy
            if (!found) {
                while (s.startsWith('(') && s.endsWith(')')) {
                    let d = 0, fullWrap = true;
                    for (let ci = 0; ci < s.length - 1; ci++) {
                        if (s[ci] === '(') d++;
                        else if (s[ci] === ')') { d--; if (d === 0) { fullWrap = false; break; } }
                    }
                    if (!fullWrap) break;
                    const inner = s.slice(1, -1);
                    const { cleanText, domainGroups } = DomainRestriction.parseBrackets(inner);
                    if (domainGroups.length > 0) {
                        exprToCompile = `(${cleanText})`;
                        exprDomainGroups = domainGroups;
                        found = true;
                        break;
                    }
                    s = inner;
                }
            }

            const eng = new MathEngine();
            const res = eng.compile(exprToCompile);
            if (res) {
                const hasDomainExpr = exprDomainGroups.length > 0;
                if (hasDomainExpr && res.type !== 'dynamicPoint') {
                    if (res.type === 'computation') {
                        // Computation: domain predicate'i senkron değerlendir;
                        // koşul sağlanmıyorsa evaluateFn null döndürür.
                        const exprDomainMathExpr = DomainRestriction.buildDomainMathExpr(exprDomainGroups);
                        const resolvedDomainExpr = nameRegistry.resolve(exprDomainMathExpr).resolved;
                        const predicate = DomainRestriction.compileDomainPredicate(resolvedDomainExpr);
                        const origFn = res.evaluateFn;
                        res.evaluateFn = () => {
                            try { return predicate({}) ? origFn() : null; } catch { return null; }
                        };
                        res.rawEvaluateFn   = null;
                        res.domainEndpoints = null;
                    } else {
                        res.rawEvaluateFn = res.evaluateFn;
                        const exprDomainMathExpr = DomainRestriction.buildDomainMathExpr(exprDomainGroups);
                        const resolvedDomainExpr = nameRegistry.resolve(exprDomainMathExpr).resolved;
                        const predicate = DomainRestriction.compileDomainPredicate(resolvedDomainExpr);
                        res.evaluateFn = DomainRestriction.wrapEvaluateFn(res.evaluateFn, predicate, res.type);
                        const resolvedDomainGroups = exprDomainGroups.map(group =>
                            group.map(cond => nameRegistry.resolve(cond).resolved)
                        );
                        res.domainEndpoints = DomainRestriction.buildEndpointGetters(resolvedDomainGroups);
                    }
                } else {
                    res.rawEvaluateFn   = null;
                    res.domainEndpoints = null;
                }
                subCurves.push(res);
            } else {
                allOk = false;
                break;
            }
        }

        if (!allOk) {
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = true; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: true, type: eq.type, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return;
        }

        eq.subCurves  = subCurves;
        eq.evaluateFn = subCurves[0].evaluateFn;

        // Computation listesi sonucu
        if (probeResult.type === 'computation') {
            const results = [];
            for (const sc of subCurves) {
                try { results.push(sc.evaluateFn()); }
                catch { results.push(null); }
            }
            eq.computationResult = results;
        } else {
            eq.computationResult = null;
        }

        // Serbest değişkenleri tespit et
        const freeVarSet = new Set();
        for (const expr of expanded.expressions) {
            const eng = new MathEngine();
            for (const v of eng.extractFreeVars(expr, probeResult.type)) {
                freeVarSet.add(v);
            }
        }
        eq.freeVars = [...freeVarSet];

        // Aralık ifadelerindeki serbest değişkenleri de topla
        if (eq.tMinExpr) {
            const rangeVars = engine.extractFreeVars(`${eq.tMinExpr} + ${eq.tMaxExpr}`, null);
            for (const v of rangeVars) {
                if (!eq.freeVars.includes(v)) eq.freeVars.push(v);
            }
        }

        eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
        eventBus.emit('STATE_EQUATION_ERROR',
            { id, error: false, type: eq.type, tMin: eq.tMin, tMax: eq.tMax,
              computationResult: eq.computationResult ?? null });
    }

    // ═══════════════════════════════════════════════════════════════
    //  DOMAIN SARMALAMA YARDIMCISI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Bir denklemin evaluateFn (ve varsa subCurves) fonksiyonlarını
     * domain predicate'i ile sarar; serbest değişken listesini günceller.
     *
     * @param {object}   eq             Denklem nesnesi (güncellenir)
     * @param {string}   domainMathExpr math.js boolean ifadesi
     * @param {string[][]} domainGroups Orijinal grup yapısı (endpoint getter için)
     */
    _applyDomain(eq, domainMathExpr, domainGroups) {
        const type = eq.type;
        if (!type || type === 'computation' || type === 'dynamicPoint') return;

        // Kullanıcı tanımlı isim/fonksiyonları domain ifadesinde de çöz
        const resolvedDomainExpr = nameRegistry.resolve(domainMathExpr).resolved;
        const predicate = DomainRestriction.compileDomainPredicate(resolvedDomainExpr);

        if (eq.subCurves && eq.subCurves.length > 0) {
            for (const sc of eq.subCurves) {
                if (sc.evaluateFn) {
                    sc.rawEvaluateFn = sc.evaluateFn;  // ham fonksiyonu sakla
                    sc.evaluateFn    = DomainRestriction.wrapEvaluateFn(sc.evaluateFn, predicate, type);
                }
            }
            eq.evaluateFn    = eq.subCurves[0].evaluateFn    ?? null;
            eq.rawEvaluateFn = eq.subCurves[0].rawEvaluateFn ?? null;
        } else if (eq.evaluateFn) {
            eq.rawEvaluateFn = eq.evaluateFn;  // ham fonksiyonu sakla
            eq.evaluateFn    = DomainRestriction.wrapEvaluateFn(eq.evaluateFn, predicate, type);
        }

        // Her koşul string'ini de çöz: g(x) gibi isimler evalCondAt için genişletilmeli
        const resolvedDomainGroups = domainGroups.map(group =>
            group.map(cond => nameRegistry.resolve(cond).resolved)
        );
        eq.domainEndpoints = DomainRestriction.buildEndpointGetters(resolvedDomainGroups);

        const domainVars = new MathEngine().extractFreeVars(resolvedDomainExpr, null);
        for (const v of domainVars) {
            if (!eq.freeVars.includes(v)) eq.freeVars.push(v);
        }
        eventBus.emit('STATE_FREE_VARS_UPDATED', { id: eq.id, vars: eq.freeVars });
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL SÖZDİZİMİ İŞLEYİCİLERİ
    // ═══════════════════════════════════════════════════════════════

    /**
     * çokgen({listX},{listY}) kalıbını tespit edip standart çokgen formatına çevirir.
     * @returns {true|null}  true → işlendi; null → bu kalıp değil
     */
    _tryExpandPolygonLists(eq, textToCompile) {
        const match = textToCompile.match(/^çokgen\s*\((.+)\)$/s);
        if (!match) return null;

        const inner     = match[1].trim();
        const listBodies = this._extractTopLevelBraces(inner);

        if (listBodies.length !== 2) return null;

        const id = eq.id;

        const xExpanded = expandExpression(listBodies[0], evalWithSliders);
        const yExpanded = expandExpression(listBodies[1], evalWithSliders);

        if (xExpanded.error || yExpanded.error) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = true; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: true, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return true;
        }

        const xElems = xExpanded.expressions;
        const yElems = yExpanded.expressions;

        if (xElems.length === 0 || yElems.length === 0) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = [];
            eq.computationResult = null; eq.error = false;

            const varText = listBodies.map(lb => collectFreeVarText(lb)).join('+');
            const engine  = new MathEngine();
            eq.freeVars   = engine.extractFreeVars(varText, null);

            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: false, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return true;
        }

        if (xElems.length !== yElems.length) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = true; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: true, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return true;
        }

        const pairs       = xElems.map((x, i) => `(${x},${yElems[i]})`);
        const polygonText = `çokgen(${pairs.join(',')})`;

        eq.subCurves = null;
        const engine  = new MathEngine();
        const result  = engine.compile(polygonText);

        if (result) {
            eq.type = result.type; eq.operator = '=';
            eq.evaluateFn = result.evaluateFn; eq.error = false;
            eq.tMin = null; eq.tMax = null; eq.tMinExpr = null; eq.tMaxExpr = null;
            eq.computationResult = null;
            eq.freeVars = engine.extractFreeVars(polygonText, result.type);
        } else {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.computationResult = null;
            eq.error = true; eq.freeVars = [];
        }

        eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
        eventBus.emit('STATE_EQUATION_ERROR',
            { id, error: eq.error, type: eq.type, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
        return true;
    }

    /**
     * dinamik({listX},{listY}) kalıbını tespit edip birden fazla dinamik noktaya çevirir.
     * @returns {true|null}  true → işlendi; null → bu kalıp değil
     */
    _tryExpandDynamicPointLists(eq, textToCompile) {
        const match = textToCompile.match(/^dinamik\s*\((.+)\)$/s);
        if (!match) return null;

        const inner      = match[1].trim();
        const listBodies = this._extractTopLevelBraces(inner);

        if (listBodies.length !== 2) return null;

        const id = eq.id;

        const xExpanded = expandExpression(listBodies[0], evalWithSliders);
        const yExpanded = expandExpression(listBodies[1], evalWithSliders);

        if (xExpanded.error || yExpanded.error) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = true; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: true, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return true;
        }

        const xElems = xExpanded.expressions;
        const yElems = yExpanded.expressions;

        if (xElems.length === 0 || yElems.length === 0) {
            eq.type = 'dynamicPoint'; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = [];
            eq.computationResult = null; eq.error = false;

            const varText = listBodies.map(lb => collectFreeVarText(lb)).join('+');
            const engine  = new MathEngine();
            eq.freeVars   = engine.extractFreeVars(varText, null);

            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: false, type: null, tMin: null, tMax: null, computationResult: null });
            return true;
        }

        if (xElems.length !== yElems.length) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = true; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: true, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return true;
        }

        const subCurves  = [];
        const freeVarSet = new Set();
        let allOk = true;

        for (let i = 0; i < xElems.length; i++) {
            const dynText = `dinamik(${xElems[i]},${yElems[i]})`;
            const eng = new MathEngine();
            const res = eng.compile(dynText);
            if (res && res.type === 'dynamicPoint') {
                subCurves.push(res);
                for (const v of (res.xFreeVars || [])) freeVarSet.add(v);
                for (const v of (res.yFreeVars || [])) freeVarSet.add(v);
            } else {
                allOk = false;
                break;
            }
        }

        if (!allOk) {
            eq.type = null; eq.operator = '=';
            eq.evaluateFn = null; eq.subCurves = null;
            eq.computationResult = null; eq.error = true; eq.freeVars = [];
            eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: [] });
            eventBus.emit('STATE_EQUATION_ERROR',
                { id, error: true, type: null, tMin: eq.tMin, tMax: eq.tMax, computationResult: null });
            return true;
        }

        eq.type         = 'dynamicPoint';
        eq.operator     = '=';
        eq.evaluateFn   = subCurves[0].evaluateFn;
        eq.evaluateWith = subCurves[0].evaluateWith;
        eq.dynamicMeta  = {
            xExpr:      subCurves[0].xExpr,
            yExpr:      subCurves[0].yExpr,
            isSimple:   subCurves[0].isSimple,
            simpleVarX: subCurves[0].simpleVarX,
            simpleVarY: subCurves[0].simpleVarY,
            xFreeVars:  subCurves[0].xFreeVars,
            yFreeVars:  subCurves[0].yFreeVars,
        };
        eq.subCurves         = subCurves;
        eq.error             = false;
        eq.tMin = null; eq.tMax = null; eq.tMinExpr = null; eq.tMaxExpr = null;
        eq.computationResult = null;
        eq.freeVars          = [...freeVarSet];

        eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: eq.freeVars });
        eventBus.emit('STATE_EQUATION_ERROR',
            { id, error: false, type: 'dynamicPoint', tMin: null, tMax: null, computationResult: null });
        return true;
    }

    /**
     * çokgen(A, B, C) gibi isimli nokta referanslarıyla yazılan çokgen
     * ifadesini çalışma zamanı kayıt defteri üzerinden derler.
     * @returns {boolean}  true → işlendi
     */
    _tryCompilePolygonNamedRefs(eq, rawText) {
        const m = rawText.match(/^çokgen\s*\((.+)\)$/s);
        if (!m) return false;

        const inner  = m[1].trim();
        const tokens = this._splitTopLevel(inner);

        if (tokens.length < 2) return false;

        const ID_RE       = /^[a-zA-ZçğıöşüÇĞİÖŞÜ_][a-zA-ZçğıöşüÇĞİÖŞÜ_0-9]*$/;
        const registry    = this._pointRegistry;
        const pointGetters = [];
        let usesNamedRef  = false;
        // Slider adayı ifadeleri topla (koordinat çiftleri + dinamik ifadeler)
        const freeVarExprs = [];
        // Çokgen içi dinamik noktaları DynamicPointManager'a bildir
        const dynamicSubCurves = [];

        for (const token of tokens) {
            if (ID_RE.test(token)) {
                usesNamedRef = true;
                pointGetters.push(() => {
                    const getFn = registry.get(token);
                    return getFn ? getFn() : null;
                });
                continue;
            }

            if (token.startsWith('(') && token.endsWith(')')) {
                const pairInner = token.slice(1, -1).trim();
                const comma = this._findTopLevelComma(pairInner);
                if (comma === -1) return false;

                const xExpr = pairInner.slice(0, comma).trim();
                const yExpr = pairInner.slice(comma + 1).trim();
                if (!xExpr || !yExpr) return false;

                freeVarExprs.push(xExpr, yExpr);
                pointGetters.push(() => {
                    const x = evalWithSliders(xExpr);
                    const y = evalWithSliders(yExpr);
                    return (isFinite(x) && isFinite(y)) ? { x, y } : null;
                });
                continue;
            }

            // Dinamik nokta ifadesi: dinamik(xExpr, yExpr)
            const dynMatch = token.match(/^dinamik\s*\((.+)\)$/s);
            if (dynMatch) {
                usesNamedRef = true;
                const dynInner = dynMatch[1].trim();
                const dynComma = this._findTopLevelComma(dynInner);
                if (dynComma === -1) return false;

                const dynXExpr = dynInner.slice(0, dynComma).trim();
                const dynYExpr = dynInner.slice(dynComma + 1).trim();
                if (!dynXExpr || !dynYExpr) return false;

                freeVarExprs.push(dynXExpr, dynYExpr);
                pointGetters.push(() => {
                    const x = evalWithSliders(dynXExpr);
                    const y = evalWithSliders(dynYExpr);
                    return (isFinite(x) && isFinite(y)) ? { x, y } : null;
                });
                // Overlay için tam dynamicPoint sub-curve oluştur
                const dynRes = new MathEngine().compile(`dinamik(${dynXExpr},${dynYExpr})`);
                if (dynRes && dynRes.type === 'dynamicPoint') dynamicSubCurves.push(dynRes);
                continue;
            }

            return false; // desteklenmeyen token
        }

        if (!usesNamedRef) return false;

        const evaluateFn = () => {
            const result = [];
            for (const getPoint of pointGetters) {
                const pt = getPoint();
                if (!pt) return null;
                result.push({ x: pt.x, y: pt.y });
            }
            return result;
        };

        // Tüm ifadelerden serbest değişkenleri topla (slider adayları)
        const engine = new MathEngine();
        const freeVarSet = new Set();
        for (const expr of freeVarExprs) {
            for (const v of engine.extractFreeVars(expr, null)) {
                freeVarSet.add(v);
            }
        }
        const freeVars = [...freeVarSet];

        const id = eq.id;
        eq.type  = 'polygon'; eq.operator = '=';
        eq.evaluateFn = evaluateFn; eq.subCurves = null;
        eq.dynamicSubCurves = dynamicSubCurves.length > 0 ? dynamicSubCurves : null;
        eq.computationResult = null; eq.error = false;
        eq.tMin = null; eq.tMax = null; eq.tMinExpr = null; eq.tMaxExpr = null;
        eq.freeVars = freeVars;

        eventBus.emit('STATE_FREE_VARS_UPDATED', { id, vars: freeVars });
        eventBus.emit('STATE_EQUATION_ERROR',
            { id, error: false, type: 'polygon', tMin: null, tMax: null, computationResult: null });
        return true;
    }

    // ═══════════════════════════════════════════════════════════════
    //  İSİMLİ NOKTA KAYIT DEFTERİ
    // ═══════════════════════════════════════════════════════════════

    /**
     * Derlenen denklem isimli nokta tanımlıyorsa kayıt defterine ekler.
     * @param {object} eq  Derlenen denklem nesnesi
     */
    _updatePointRegistry(eq) {
        const name = eq._defName;
        if (!name) return;

        if (eq.type === 'polygon' && eq.evaluateFn) {
            const fn = eq.evaluateFn;
            this._pointRegistry.set(name, () => {
                const pts = fn();
                return pts && pts.length > 0 ? pts[0] : null;
            });
        } else if (eq.type === 'dynamicPoint' && eq.evaluateFn) {
            this._pointRegistry.set(name, eq.evaluateFn);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    //  PARSE YARDIMCILARI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Bir string içindeki üst düzey '{...}' bloklarını döndürür.
     * @param {string} str
     * @returns {string[]}
     */
    _extractTopLevelBraces(str) {
        const result = [];
        let i = 0;
        while (i < str.length) {
            if (str[i] === '{') {
                const start = i;
                let depth = 1;
                i++;
                while (i < str.length && depth > 0) {
                    if (str[i] === '{') depth++;
                    else if (str[i] === '}') depth--;
                    i++;
                }
                result.push(str.slice(start, i));
            } else {
                i++;
            }
        }
        return result;
    }

    /**
     * Üst düzey virgüllerle (parantez derinliği 0) bölünmüş token listesi döndürür.
     * @param {string} str
     * @returns {string[]}
     */
    _splitTopLevel(str) {
        const tokens = [];
        let depth = 0;
        let start = 0;
        for (let i = 0; i < str.length; i++) {
            const ch = str[i];
            if (ch === '(') depth++;
            else if (ch === ')') depth--;
            else if (ch === ',' && depth === 0) {
                tokens.push(str.slice(start, i).trim());
                start = i + 1;
            }
        }
        const last = str.slice(start).trim();
        if (last) tokens.push(last);
        return tokens;
    }

    /**
     * Üst düzey ilk virgülün indeksini döndürür; yoksa -1.
     * @param {string} str
     * @returns {number}
     */
    _findTopLevelComma(str) {
        let depth = 0;
        for (let i = 0; i < str.length; i++) {
            const ch = str[i];
            if (ch === '(') depth++;
            else if (ch === ')') depth--;
            else if (ch === ',' && depth === 0) return i;
        }
        return -1;
    }
}
