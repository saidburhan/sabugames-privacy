/**
 * features/DynamicPoint/index.js  —  Dinamik Nokta Yöneticisi
 *
 * Sorumluluklar:
 *   ✓ dinamik(xExpr, yExpr) ile tanımlanmış slider'a bağlı noktaları overlay canvas üzerine çizer.
 *   ✓ Basit mod: dinamik(a,b)          → iki bağımsız slider, serbest sürükleme.
 *   ✓ Bivariate: dinamik(a-1,b+2)      → iki bağımsız slider, eksene göre Newton sürükleme.
 *   ✓ Param.  : dinamik(sin(a),cos(a)) → tek slider, eğri üzerinde sürükleme.
 *   ✓ Fonks.  : dinamik(m,f(m))        → tek slider, graf üzerinde sürükleme.
 *   ✓ Mouse ve touch sürükleme desteği (mobil dahil).
 *   ✓ Koordinat bilgisi sidebar'da hesaplama sonucu olarak gösterilir.
 *
 * Dinlediği olaylar : STATE_CHANGED · RENDER_COMPLETE · SLIDER_VALUE_CHANGED
 * Bağımlılıklar     : CanvasRenderer, SliderManager, EventBus, SliderScope
 */

import { eventBus }    from '../../core/EventBus.js';
import { sliderScope } from '../../core/SliderScope.js';

/* ── Stil Sabitleri ──────────────────────────────────────────── */

const INNER_RADIUS         = 8;     // İç daire yarıçapı (CSS px)
const OUTER_RADIUS         = 13;    // Dış halka yarıçapı (CSS px)
const OUTER_STROKE_WIDTH   = 2.5;   // Dış halka çizgi kalınlığı
const OUTER_ALPHA          = 0.35;  // Dış halka opaklığı

const HOVER_INNER_RADIUS   = 10;
const HOVER_OUTER_RADIUS   = 16;
const HOVER_OUTER_ALPHA    = 0.50;

const DRAG_INNER_RADIUS    = 10;
const DRAG_OUTER_RADIUS    = 16;
const DRAG_OUTER_ALPHA     = 0.60;
const DRAG_SHADOW_BLUR     = 12;
const DRAG_SHADOW_ALPHA    = 0.5;

const HIT_RADIUS_PX        = 18;   // Mouse hit detection yarıçapı
const HIT_RADIUS_TOUCH_PX  = 24;   // Touch hit detection yarıçapı (parmak büyük)

// ═══════════════════════════════════════════════════════════════
//  ANA SINIF
// ═══════════════════════════════════════════════════════════════

export class DynamicPointManager {

    /**
     * @param {import('../../core/CanvasRenderer.js').CanvasRenderer} renderer
     * @param {import('../Slider/index.js').SliderManager} sliderManager
     */
    constructor(renderer, sliderManager) {
        this._renderer      = renderer;
        this._sliderManager = sliderManager;
        this._container     = renderer.container;

        /**
         * STATE_CHANGED'den gelen dynamicPoint curve'ları.
         * @type {Array<object>}
         */
        this._points = [];

        /** Şu an hover edilen dinamik nokta (veya null). */
        this._hovered = null;

        /** Şu an sürüklenen dinamik nokta (veya null). */
        this._dragging = null;

        /** Document-düzeyinde bağlanmış sair mouse listener'lar (temizlik için). */
        this._docMouseMove = null;
        this._docMouseUp   = null;

        /** Parametrik sürüklemede son parametre değeri (sıçrama önleme). */
        this._dragLastParam = null;

        // ── Overlay canvas ─────────────────────────────────────
        this._overlayCanvas = this._createOverlay();
        this._overlayCtx    = this._overlayCanvas.getContext('2d');
        this._syncOverlaySize();


        // ── EventBus abonelikleri ──────────────────────────────
        this._unsubs = [];
        this._unsubs.push(
            eventBus.on('STATE_CHANGED',        (curves) => this._onCurvesChanged(curves)),
            eventBus.on('RENDER_COMPLETE',       ()       => this._onRenderComplete()),
            eventBus.on('SLIDER_VALUE_CHANGED',  ()       => this._onSliderChanged()),
        );

        // ── ResizeObserver ─────────────────────────────────────
        this._resizeObserver = new ResizeObserver(() => this._syncOverlaySize());
        this._resizeObserver.observe(this._container);

        // ── Mouse / Touch olayları ─────────────────────────────
        this._bindInteraction();
    }

    // ═══════════════════════════════════════════════════════════════
    //  OVERLAY CANVAS
    // ═══════════════════════════════════════════════════════════════

    _createOverlay() {
        const canvas = document.createElement('canvas');
        canvas.style.position       = 'absolute';
        canvas.style.inset          = '0';
        canvas.style.width          = '100%';
        canvas.style.height         = '100%';
        canvas.style.pointerEvents  = 'none';
        canvas.setAttribute('aria-hidden', 'true');
        this._container.appendChild(canvas);
        return canvas;
    }

    _syncOverlaySize() {
        const dpr = window.devicePixelRatio || 1;
        const w   = this._renderer.cssWidth;
        const h   = this._renderer.cssHeight;
        this._overlayCanvas.width  = Math.round(w * dpr);
        this._overlayCanvas.height = Math.round(h * dpr);
        const ctx = this._overlayCanvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ═══════════════════════════════════════════════════════════════
    //  VERİ GÜNCELLEMELERİ
    // ═══════════════════════════════════════════════════════════════

    /** STATE_CHANGED geldiğinde: dynamicPoint türündeki curve'ları filtrele. */
    _onCurvesChanged(curves) {
        // Mevcut sürükleme/hover anahtarını sakla.
        // STATE_CHANGED her slider değişiminde yeni nesneler üretir;
        // referans eşitliği yerine kimlik karşılaştırması gerekir.
        const dragKey    = this._dragging ? this._pointKey(this._dragging) : null;
        const hoverKey   = this._hovered  ? this._pointKey(this._hovered)  : null;

        this._points = curves.filter(c => c.type === 'dynamicPoint');

        // Referansları yeni nesnelere aktar
        this._dragging = dragKey  ? (this._points.find(p => this._pointKey(p) === dragKey)  ?? null) : null;
        this._hovered  = hoverKey ? (this._points.find(p => this._pointKey(p) === hoverKey) ?? null) : null;

        // Nokta silindiyse sürüklemeyi temizle
        if (dragKey && !this._dragging) {
            this._cleanupDocListeners();
            this._renderer.isPanLocked = false;
        }
    }

    /** Benzersiz nokta kimliği (referans karşılaştırması yerine). */
    _pointKey(pt) {
        return `${pt.xExpr}:${pt.yExpr}`;
    }

    /** RENDER_COMPLETE geldiğinde: overlay'i yeniden çiz. */
    _onRenderComplete() {
        this._redraw();
    }

    /** SLIDER_VALUE_CHANGED geldiğinde: pozisyonları güncellemek için yeniden çiz. */
    _onSliderChanged() {
        this._redraw();
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÇİZİM
    // ═══════════════════════════════════════════════════════════════

    _redraw() {
        const ctx = this._overlayCtx;
        const r   = this._renderer;

        ctx.clearRect(0, 0, r.cssWidth, r.cssHeight);

        for (const pt of this._points) {
            if (!this._isConfigured(pt)) continue;

            const pos = pt.evaluateFn();
            if (!pos) continue;

            const { sx, sy } = r.mathToScreen(pos.x, pos.y);

            const isDragging = (pt === this._dragging);
            const isHovered  = (pt === this._hovered) && !isDragging;

            this._drawPoint(ctx, sx, sy, pt.color, isHovered, isDragging);
        }
    }

    /**
     * Tek bir dinamik noktayı ayırt edici stilde çizer.
     * İç dolgulu daire + dış yarı-saydam halka.
     */
    _drawPoint(ctx, sx, sy, color, isHovered, isDragging) {
        ctx.save();

        let innerR, outerR, outerAlpha;

        if (isDragging) {
            innerR     = DRAG_INNER_RADIUS;
            outerR     = DRAG_OUTER_RADIUS;
            outerAlpha = DRAG_OUTER_ALPHA;
            // Glow efekti
            ctx.shadowColor   = color;
            ctx.shadowBlur    = DRAG_SHADOW_BLUR;
            ctx.globalAlpha   = DRAG_SHADOW_ALPHA;
        } else if (isHovered) {
            innerR     = HOVER_INNER_RADIUS;
            outerR     = HOVER_OUTER_RADIUS;
            outerAlpha = HOVER_OUTER_ALPHA;
        } else {
            innerR     = INNER_RADIUS;
            outerR     = OUTER_RADIUS;
            outerAlpha = OUTER_ALPHA;
        }

        // Dış halka (ring)
        ctx.globalAlpha = outerAlpha;
        ctx.strokeStyle = color;
        ctx.lineWidth   = OUTER_STROKE_WIDTH;
        ctx.beginPath();
        ctx.arc(sx, sy, outerR, 0, Math.PI * 2);
        ctx.stroke();

        // Shadow'u sadece iç daire için sıfırla (dış halkada glow zaten var)
        if (isDragging) {
            ctx.shadowBlur = 0;
        }

        // İç dolgulu daire
        ctx.globalAlpha = 1;
        ctx.fillStyle   = color;
        ctx.beginPath();
        ctx.arc(sx, sy, innerR, 0, Math.PI * 2);
        ctx.fill();

        // İç dairenin beyaz border'ı (ayırt edicilik)
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, innerR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    // ═══════════════════════════════════════════════════════════════
    //  MOUSE / TOUCH ETKİLEŞİM
    // ═══════════════════════════════════════════════════════════════

    _bindInteraction() {
        const canvas = this._renderer.canvas;

        // ── MOUSE ──────────────────────────────────────────────

        canvas.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;

            const rect = canvas.getBoundingClientRect();
            const sx   = e.clientX - rect.left;
            const sy   = e.clientY - rect.top;

            const hit = this._findNearest(sx, sy, HIT_RADIUS_PX);
            if (!hit || !this._isDraggable(hit)) return;

            e.stopPropagation();
            this._startDrag(hit);
        }, true);   // capture phase — CanvasRenderer'ın mousedown'ından önce

        canvas.addEventListener('mousemove', (e) => {
            // Sürükleme document-düzeyi listener'dan yönetiliyor.
            // Burada yalnızca hover algılaması yapılır.
            if (this._dragging) return;

            // Sürükleme yoksa → hover algılama
            if (this._renderer._isPanning) {
                if (this._hovered) {
                    this._hovered = null;
                    this._redraw();
                }
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const sx   = e.clientX - rect.left;
            const sy   = e.clientY - rect.top;

            const hit = this._findNearest(sx, sy, HIT_RADIUS_PX);

            if (hit !== this._hovered) {
                this._hovered = hit;

                if (hit) {
                    canvas.style.cursor = this._isDraggable(hit) ? 'grab' : 'default';
                } else {
                    if (!this._renderer._isPanning) {
                        canvas.style.cursor = 'default';
                    }
                }

                this._redraw();
            }
        }, true);   // capture phase

        canvas.addEventListener('mouseleave', () => {
            // Sürükleme devam ederken mouseleave'de iptal etme —
            // document listener'ları canvas dışında da takip eder.
            if (!this._dragging && this._hovered) {
                this._hovered = null;
                this._redraw();
            }
        });

        // ── TOUCH ──────────────────────────────────────────────

        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;

            const touch = e.touches[0];
            const rect  = canvas.getBoundingClientRect();
            const sx    = touch.clientX - rect.left;
            const sy    = touch.clientY - rect.top;

            const hit = this._findNearest(sx, sy, HIT_RADIUS_TOUCH_PX);
            if (!hit || !this._isDraggable(hit)) return;

            e.preventDefault();
            e.stopPropagation();
            this._startDrag(hit);
        }, { capture: true, passive: false });

        canvas.addEventListener('touchmove', (e) => {
            if (!this._dragging) return;
            if (e.touches.length !== 1) return;

            e.preventDefault();
            e.stopPropagation();

            const touch = e.touches[0];
            const rect  = canvas.getBoundingClientRect();
            const sx    = touch.clientX - rect.left;
            const sy    = touch.clientY - rect.top;

            this._onDragMove(sx, sy);
        }, { capture: true, passive: false });

        canvas.addEventListener('touchend', (e) => {
            if (this._dragging) {
                e.preventDefault();
                this._endDrag();
            }
        }, { capture: true, passive: false });

        canvas.addEventListener('touchcancel', () => {
            if (this._dragging) {
                this._endDrag();
            }
        }, { capture: true });
    }

    // ═══════════════════════════════════════════════════════════════
    //  SÜRÜKLEME MEKANİZMASI
    // ═══════════════════════════════════════════════════════════════

    _startDrag(pt) {
        this._dragging = pt;
        this._renderer.isPanLocked = true;
        this._renderer.canvas.style.cursor = 'grabbing';
        this._redraw();

        // Parametrik sürükleme: mevcut parametre değerini kaydet
        if (!pt.isSimple && pt.freeVars.length === 1) {
            this._dragLastParam = sliderScope[pt.freeVars[0]] ?? null;
        } else {
            this._dragLastParam = null;
        }

        // Document-düzeyinde listener'lar: canvas dışında da sohbet devam eder
        const canvas = this._renderer.canvas;

        this._docMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            this._onDragMove(e.clientX - rect.left, e.clientY - rect.top);
        };
        this._docMouseUp = () => { this._endDrag(); };

        document.addEventListener('mousemove', this._docMouseMove);
        document.addEventListener('mouseup',   this._docMouseUp);
    }

    _endDrag() {
        // Sürükleme bitince mevcut değeri step'e snap'le
        if (this._dragging) {
            const pt = this._dragging;
            if (!pt.isSimple && pt.freeVars.length === 1 && this._dragLastParam !== null) {
                // Parametrik mod: tek değişken snap
                this._sliderManager.setSliderValue(pt.freeVars[0], this._dragLastParam);
            } else {
                // Genelleştirilmiş bivariate: drag değişkenlerini step'e snap'le
                const dv = this._getDragVars(pt);
                if (dv) {
                    if (dv.xDragVar) this._sliderManager.setSliderValue(dv.xDragVar, sliderScope[dv.xDragVar] ?? 0);
                    if (dv.yDragVar) this._sliderManager.setSliderValue(dv.yDragVar, sliderScope[dv.yDragVar] ?? 0);
                }
            }
        }

        this._dragging = null;
        this._dragLastParam = null;
        this._renderer.isPanLocked = false;
        this._renderer.canvas.style.cursor = this._hovered ? 'grab' : 'default';
        this._cleanupDocListeners();
        this._redraw();
    }

    _cleanupDocListeners() {
        if (this._docMouseMove) {
            document.removeEventListener('mousemove', this._docMouseMove);
            this._docMouseMove = null;
        }
        if (this._docMouseUp) {
            document.removeEventListener('mouseup', this._docMouseUp);
            this._docMouseUp = null;
        }
    }

    _onDragMove(sx, sy) {
        const pt = this._dragging;
        if (!pt) return;

        const { mx, my } = this._renderer.screenToMath(sx, sy);

        if (pt.isSimple) {
            // Basit mod: her eksen bağımsız slider'a doğrudan eşlenir
            this._sliderManager.setSliderValue(pt.simpleVarX, mx);
            this._sliderManager.setSliderValue(pt.simpleVarY, my);
        } else if (pt.freeVars.length === 1) {
            // Parametrik / fonksiyon modu: eğri üzerinde en yakın noktaya projekte et
            const bestVal = this._findClosestParam(pt, mx, my);
            if (bestVal !== null) {
                this._sliderManager.setSliderValue(pt.freeVars[0], bestVal, { smooth: true });
            }
        } else {
            // Genelleştirilmiş bivariate: her eksen için drag değişkenini Newton ile çöz
            const dv = this._getDragVars(pt);
            if (dv) {
                if (dv.xDragVar) this._solveBivariateAxis(pt, 'x', dv.xDragVar, mx);
                if (dv.yDragVar) this._solveBivariateAxis(pt, 'y', dv.yDragVar, my);
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════
    //  HIT DETECTION
    // ═══════════════════════════════════════════════════════════════

    /**
     * Ekran koordinatına en yakın dinamik noktayı bulur.
     * Yalnızca configured slider'lara sahip noktalar değerlendirilir.
     */
    _findNearest(sx, sy, radius) {
        let best     = null;
        let bestDist = radius;

        for (const pt of this._points) {
            if (!this._isConfigured(pt)) continue;

            const pos = pt.evaluateFn();
            if (!pos) continue;

            const scr  = this._renderer.mathToScreen(pos.x, pos.y);
            const dist = Math.hypot(scr.sx - sx, scr.sy - sy);

            if (dist < bestDist) {
                bestDist = dist;
                best     = pt;
            }
        }

        return best;
    }

    // ═══════════════════════════════════════════════════════════════
    //  YARDIMCI METODLAR
    // ═══════════════════════════════════════════════════════════════

    /** Tüm serbest değişkenlerin slider'ları yapılandırılmış mı? */
    _isConfigured(pt) {
        if (!pt.freeVars || pt.freeVars.length === 0) return false;
        for (const v of pt.freeVars) {
            const cfg = this._sliderManager.getSliderConfig(v);
            if (!cfg || !cfg.configured) return false;
        }
        return true;
    }

    /** Nokta sürüklenebilir mi? */
    _isDraggable(pt) {
        if (pt.isSimple) return true;
        if (pt.freeVars.length === 1) return true;
        if (this._getDragVars(pt)) return true;
        return false;
    }

    /**
     * Her eksen için sürükleme değişkenini belirler.
     *
     * Genel kural: her eksenin serbest değişkenleri arasından,
     * diğer eksende bulunmayan (exclusive) değişken tercih edilir.
     * Birden fazla aday varsa listedeki son değişken seçilir.
     *
     * Örnek: dinamik(h, k+p) → xDragVar='h', yDragVar='p'
     *        dinamik(a+b, a+c) → xDragVar='b', yDragVar='c'
     *
     * @returns {{ xDragVar: string|null, yDragVar: string|null } | null}
     */
    _getDragVars(pt) {
        if (!pt.xFreeVars || !pt.yFreeVars) return null;

        const xSet = new Set(pt.xFreeVars);
        const ySet = new Set(pt.yFreeVars);

        // Her eksen için diğer eksende bulunmayan (exclusive) değişkenler
        const xExcl = pt.xFreeVars.filter(v => !ySet.has(v));
        const yExcl = pt.yFreeVars.filter(v => !xSet.has(v));

        // X drag var: exclusive varsa son exclusive, yoksa son free var
        const xDragVar = pt.xFreeVars.length > 0
            ? (xExcl.length > 0 ? xExcl[xExcl.length - 1] : pt.xFreeVars[pt.xFreeVars.length - 1])
            : null;

        // Y drag var: xDragVar hariç, exclusive tercih edilir
        let yPool = yExcl.filter(v => v !== xDragVar);
        if (yPool.length === 0) yPool = pt.yFreeVars.filter(v => v !== xDragVar);
        const yDragVar = yPool.length > 0 ? yPool[yPool.length - 1] : null;

        if (!xDragVar && !yDragVar) return null;
        return { xDragVar, yDragVar };
    }

    /**
     * Tek bir eksen için Newton iterasyonu.
     * `axis` = 'x' veya 'y', `varName` = o ekseni kontrol eden değişken.
     * Hedef: evaluateWith({[varName]: v})[axis] = targetVal
     */
    _solveBivariateAxis(pt, axis, varName, targetVal) {
        const cfg = this._sliderManager.getSliderConfig(varName);
        if (!cfg || !cfg.configured) return;

        const { min, max, step } = cfg;
        const range = max - min;
        let v = sliderScope[varName] ?? min;

        const h = Math.max(step * 0.1, range * 1e-7);
        const maxDv = range * 0.1;

        for (let iter = 0; iter < 8; iter++) {
            const p0 = pt.evaluateWith({ [varName]: v });
            if (!p0) break;
            const diff = targetVal - p0[axis];

            const p1 = pt.evaluateWith({ [varName]: v + h });
            if (!p1) break;
            const deriv = (p1[axis] - p0[axis]) / h;
            if (Math.abs(deriv) < 1e-15) break;

            let dv = diff / deriv;
            dv = Math.max(-maxDv, Math.min(maxDv, dv));

            const vNew = Math.max(min, Math.min(max, v + dv));
            if (Math.abs(vNew - v) < step * 0.01) break;
            v = vNew;
        }

        v = Math.max(min, Math.min(max, v));
        this._sliderManager.setSliderValue(varName, v, { smooth: true });
    }

    /**
     * Tek serbest değişkenli dinamik nokta için:
     * Mouse hedefine en yakın eğri noktasının parametre değerini bulur.
     *
     * Teğet projeksiyonu (Newton-benzeri iterasyon):
     *   1. Mevcut parametre t₀'da eğri pozisyonu P(t₀) ve nümerik teğet P'(t₀) hesaplanır.
     *   2. Fare-nokta ofseti (ΔM) teğet yönüne projekte edilir: Δt = dot(ΔM,T) / dot(T,T).
     *   3. Adım boyutu sınırlanır (sıçrama önleme) ve t güncellenir.
     *   4. Birkaç iterasyonla yakınsama sağlanır.
     *
     * Bu yöntem doğal olarak yereldir — eğrinin teğet yönünü takip ettiği
     * için kesişen dallara sıçrama yapamaz ve sürekli hareket sağlar.
     *
     * @param {object} pt         Dinamik nokta curve nesnesi
     * @param {number} targetMx   Hedef matematik X
     * @param {number} targetMy   Hedef matematik Y
     * @returns {number|null}     En yakın parametre değeri (step'e snap'li)
     */
    _findClosestParam(pt, targetMx, targetMy) {
        const varName = pt.freeVars[0];
        const cfg = this._sliderManager.getSliderConfig(varName);
        if (!cfg || !cfg.configured) return null;

        const { min, max, step } = cfg;
        const range = max - min;

        let t = this._dragLastParam ?? sliderScope[varName] ?? min;

        // Sonlu fark adımı (teğet hesabı için)
        const h = Math.max(step * 0.1, range * 1e-7);
        // İterasyon başına maksimum parametre değişimi (aralığın %5'i)
        const maxStep = range * 0.05;

        for (let iter = 0; iter < 8; iter++) {
            const p0 = pt.evaluateWith({ [varName]: t });
            if (!p0) break;

            const dx = targetMx - p0.x;
            const dy = targetMy - p0.y;

            // Nümerik teğet vektörü (sonlu fark)
            // İleri fark tercih edilir; sınırda (t ≈ max) domain dışına çıkınca
            // geri farka geç: (f(t-h) - f(t)) / (-h) ≈ f'(t).
            let derivH = h;
            let p1 = pt.evaluateWith({ [varName]: t + h });
            if (!p1) {
                p1 = pt.evaluateWith({ [varName]: t - h });
                derivH = -h;
            }
            if (!p1) break;

            const tx = (p1.x - p0.x) / derivH;
            const ty = (p1.y - p0.y) / derivH;
            const tLen2 = tx * tx + ty * ty;
            if (tLen2 < 1e-20) break;   // dejenere teğet (duran nokta)

            // Fare ofsetini teğet yönüne projekte et
            let dt = (dx * tx + dy * ty) / tLen2;

            // Adım boyutunu sınırla — büyük atlamaları engeller
            dt = Math.max(-maxStep, Math.min(maxStep, dt));

            const tNew = Math.max(min, Math.min(max, t + dt));

            // Yakınsama kontrolü
            if (Math.abs(tNew - t) < step * 0.01) break;
            t = tNew;
        }

        // Step snap yok — pürüzsüz değer döndür (snap _endDrag'da yapılır)
        t = Math.max(min, Math.min(max, t));

        // Son parametre değerini güncelle (bir sonraki frame için)
        this._dragLastParam = t;

        return t;
    }

    // ═══════════════════════════════════════════════════════════════
    //  TEMİZLİK
    // ═══════════════════════════════════════════════════════════════

    destroy() {
        for (const unsub of this._unsubs) unsub();
        this._resizeObserver.disconnect();
        this._overlayCanvas.remove();
        this._cleanupDocListeners();
        if (this._dragging) {
            this._renderer.isPanLocked = false;
        }
    }
}
