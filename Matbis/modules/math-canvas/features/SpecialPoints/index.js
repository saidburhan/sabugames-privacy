/**
 * features/SpecialPoints/index.js  —  SpecialPointsManager
 *
 * Bağımsız orkestratör: explicit fonksiyonlar için eksen kesişimleri,
 * lokal ekstrema ve fonksiyonlar arası kesişim noktalarını hesaplar,
 * ayrı overlay canvas üzerine çizer, hover/click ile KaTeX LaTeX
 * tooltip gösterir.
 *
 * Mevcut modüllere minimal bağımlılık:
 *   - CanvasRenderer instance (constructor parametresi)
 *   - EventBus: STATE_CHANGED, RENDER_COMPLETE
 */

import { eventBus } from '../../core/EventBus.js';
import {
    findXIntercepts,
    findYIntercept,
    findExtrema,
    findCurveIntersections,
} from './finders.js';
import { coordToLatex } from './piFormat.js';
import {
    createOverlayCanvas,
    resizeOverlay,
    drawPoints,
} from './pointRenderer.js';
import { Tooltip } from './tooltip.js';

/* ── Sabitler ───────────────────────────────────────────────── */

const MAX_CURVES_FOR_INTERSECTIONS = 10;
const HIT_RADIUS_PX = 12;          // piksel eşiği: hover/click algılama

export class SpecialPointsManager {

    /**
     * @param {import('../../core/CanvasRenderer.js').CanvasRenderer} renderer
     */
    constructor(renderer) {
        this._renderer  = renderer;
        this._container = renderer.container;

        /** @type {Array<object>} Hesaplanmış özel noktalar */
        this._points = [];

        /** @type {object|null} Şu an hover edilen nokta */
        this._hovered = null;

        /** @type {Set<object>} Tıklanarak sabitlenmiş noktalar */
        this._pinned = new Set();

        /** Mevcut explicit eğriler (STATE_CHANGED'den gelen). */
        this._explicitCurves = [];

        /** Son hesaplama yapılan viewport sınırları (gereksiz tekrarı önler). */
        this._lastXMin = null;
        this._lastXMax = null;

        // ── Overlay canvas ─────────────────────────────────────
        this._overlayCanvas = createOverlayCanvas(this._container);
        this._overlayCtx    = this._overlayCanvas.getContext('2d');
        this._syncOverlaySize();

        // ── Tooltip ────────────────────────────────────────────
        this._tooltip = new Tooltip(this._container);

        // ── Event abonelikleri ─────────────────────────────────
        this._unsubs = [];
        this._unsubs.push(
            eventBus.on('STATE_CHANGED',    (curves) => this._onCurvesChanged(curves)),
            eventBus.on('RENDER_COMPLETE',  ()       => this._onRenderComplete()),
        );

        // ── ResizeObserver — overlay boyut senkronizasyonu ─────
        this._resizeObserver = new ResizeObserver(() => this._syncOverlaySize());
        this._resizeObserver.observe(this._container);

        // ── Mouse / Touch olayları ─────────────────────────────
        this._bindInteraction();
    }

    // ═══════════════════════════════════════════════════════════════
    //  VERİ HESAPLAMA
    // ═══════════════════════════════════════════════════════════════

    /**
     * STATE_CHANGED geldiğinde: explicit eğrileri filtrele,
     * tüm özel noktaları yeniden hesapla.
     */
    _onCurvesChanged(curves) {
        this._explicitCurves = curves.filter(c => c.type === 'explicit' && c.evaluateFn);
        this._lastXMin = null;   // viewport cache'i geçersiz kıl → yeniden hesapla
        this._lastXMax = null;
        this._recalculate();
    }

    /**
     * Tüm özel noktaları yeniden hesaplar.
     * Görünür x aralığını renderer'dan alır.
     */
    _recalculate() {
        const r    = this._renderer;
        const { mx: xMin } = r.screenToMath(0, 0);
        const { mx: xMax } = r.screenToMath(r.cssWidth, 0);
        const step = 1 / r.scale;

        // Viewport cache'i güncelle
        this._lastXMin = xMin;
        this._lastXMax = xMax;
        this._lastScale = r.scale;

        const curves = this._explicitCurves;
        const points = [];

        // ── Per-curve noktalar (HER ZAMAN) ─────────────────────
        for (let i = 0; i < curves.length; i++) {
            const fn = curves[i].evaluateFn;

            // X-ekseni kesişimleri
            for (const pt of findXIntercepts(fn, xMin, xMax, step)) {
                points.push({ ...pt, type: 'x-intercept', curveIndex: i });
            }

            // Y-ekseni kesişimi
            if (xMin <= 0 && xMax >= 0) {
                const yInt = findYIntercept(fn);
                if (yInt) {
                    points.push({ ...yInt, type: 'y-intercept', curveIndex: i });
                }
            }

            // Ekstrema (max / min)
            for (const pt of findExtrema(fn, xMin, xMax, step)) {
                points.push({ ...pt, type: `extremum-${pt.extremaType}`, curveIndex: i });
            }
        }

        // ── Fonksiyonlar arası kesişimler (≤ 10 eğri) ──────────
        if (curves.length >= 2 && curves.length <= MAX_CURVES_FOR_INTERSECTIONS) {
            for (let i = 0; i < curves.length; i++) {
                for (let j = i + 1; j < curves.length; j++) {
                    const ints = findCurveIntersections(
                        curves[i].evaluateFn,
                        curves[j].evaluateFn,
                        xMin, xMax, step,
                    );
                    for (const pt of ints) {
                        points.push({
                            ...pt,
                            type: 'intersection',
                            curveIndex: [i, j],
                        });
                    }
                }
            }
        }

        // ── Duplikat eliminasyon (farklı türlerden aynı noktaya düşenler) ──
        this._points = this._dedup(points, step * 0.5);

        // ── LaTeX etiketlerini önceden hesapla ─────────────────
        for (const pt of this._points) {
            pt.latex = coordToLatex(pt.x, pt.y);
        }

        // Pinned noktaların referanslarını güncelle
        // (yeniden hesaplamada nesneler değişti, eski pinned'lar geçersiz)
        this._reconcilePinned();
    }

    /**
     * Viewport (görünür alan) değiştiyse noktaları yeniden hesaplar.
     * Pan / zoom sırasında her karede tetiklenir; yalnızca
     * sınırlar anlamlı ölçüde kaydığında gerçek hesaplama yapar.
     */
    _recalculateIfViewportChanged() {
        if (this._explicitCurves.length === 0) return;

        const r = this._renderer;
        const { mx: xMin } = r.screenToMath(0, 0);
        const { mx: xMax } = r.screenToMath(r.cssWidth, 0);

        // İlk hesaplama henüz yapılmadıysa
        if (this._lastXMin === null) {
            this._recalculate();
            return;
        }

        // Viewport yeterince değiştiyse yeniden hesapla
        const range = this._lastXMax - this._lastXMin;
        const shift = Math.max(
            Math.abs(xMin - this._lastXMin),
            Math.abs(xMax - this._lastXMax),
        );
        const scaleChanged = Math.abs(r.scale - (this._lastScale || r.scale)) > 0.5;

        if (shift > range * 0.05 || scaleChanged) {
            this._recalculate();
        }
    }

    /**
     * Çok yakın noktaları tek noktaya indirger.
     * Öncelik: x-intercept > y-intercept > extremum > intersection
     */
    _dedup(points, threshold) {
        if (points.length <= 1) return points;

        const priority = {
            'x-intercept':  0,
            'y-intercept':  1,
            'extremum-max': 2,
            'extremum-min': 2,
            'intersection': 3,
        };

        points.sort((a, b) => a.x - b.x || (priority[a.type] ?? 9) - (priority[b.type] ?? 9));

        const out = [points[0]];
        for (let i = 1; i < points.length; i++) {
            const prev = out[out.length - 1];
            const dist = Math.hypot(points[i].x - prev.x, points[i].y - prev.y);
            if (dist > threshold) {
                out.push(points[i]);
            }
            // Eğer daha yüksek öncelikli → değiştir
            else if ((priority[points[i].type] ?? 9) < (priority[prev.type] ?? 9)) {
                out[out.length - 1] = points[i];
            }
        }
        return out;
    }

    /**
     * Yeniden hesaplama sonrası: eski pinned noktaların matematik konumlarına
     * karşılık gelen yeni nokta nesnelerini bul, eşleşmeyenleri unpin et.
     */
    _reconcilePinned() {
        const newPinned = new Set();
        for (const oldPt of this._pinned) {
            // Yeni points listesinde aynı konuma en yakın noktayı bul
            let best = null;
            let bestDist = Infinity;
            for (const np of this._points) {
                const d = Math.hypot(np.x - oldPt.x, np.y - oldPt.y);
                if (d < bestDist) { bestDist = d; best = np; }
            }
            if (best && bestDist < 0.01) {
                newPinned.add(best);
                // Tooltip'i yeni referansa taşı
                if (this._tooltip.isPinned(oldPt)) {
                    const { sx, sy } = this._renderer.mathToScreen(best.x, best.y);
                    this._tooltip.unpin(oldPt);
                    this._tooltip.pin(best, sx, sy, best.latex);
                }
            } else {
                this._tooltip.unpin(oldPt);
            }
        }
        this._pinned = newPinned;
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÇİZİM
    // ═══════════════════════════════════════════════════════════════

    /** RENDER_COMPLETE geldiğinde: viewport değiştiyse yeniden hesapla, sonra çiz. */
    _onRenderComplete() {
        this._recalculateIfViewportChanged();
        this._redraw();
    }

    _redraw() {
        const ctx = this._overlayCtx;
        const r   = this._renderer;

        // Overlay'i temizle
        ctx.clearRect(0, 0, r.cssWidth, r.cssHeight);

        if (this._points.length === 0) return;

        drawPoints(ctx, r, this._points, this._hovered, this._pinned);

        // Pinned tooltip pozisyonlarını güncelle (pan/zoom sonrası)
        this._tooltip.updatePinnedPositions(r);
    }

    /** Overlay canvas boyutunu ana canvas ile senkronlar. */
    _syncOverlaySize() {
        const r = this._renderer;
        resizeOverlay(this._overlayCanvas, r.cssWidth, r.cssHeight);
    }

    // ═══════════════════════════════════════════════════════════════
    //  MOUSE / TOUCH ETKİLEŞİM
    // ═══════════════════════════════════════════════════════════════

    _bindInteraction() {
        const canvas = this._renderer.canvas;

        // ── Mousemove — hover ──────────────────────────────────
        canvas.addEventListener('mousemove', (e) => {
            if (this._renderer._isPanning) {
                if (this._hovered) {
                    this._hovered = null;
                    this._tooltip.hideHover();
                    this._redraw();
                }
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const sx   = e.clientX - rect.left;
            const sy   = e.clientY - rect.top;

            const hit = this._findNearest(sx, sy);

            if (hit !== this._hovered) {
                this._hovered = hit;

                if (hit) {
                    const { sx: psx, sy: psy } = this._renderer.mathToScreen(hit.x, hit.y);
                    this._tooltip.showHover(psx, psy, hit.latex);
                    canvas.style.cursor = 'pointer';
                } else {
                    this._tooltip.hideHover();
                    if (!this._renderer._isPanning) {
                        canvas.style.cursor = 'default';
                    }
                }

                this._redraw();
            }
        });

        // ── Mouseleave — hover temizle ─────────────────────────
        canvas.addEventListener('mouseleave', () => {
            if (this._hovered) {
                this._hovered = null;
                this._tooltip.hideHover();
                this._redraw();
            }
        });

        // ── Click — pin / unpin ────────────────────────────────
        canvas.addEventListener('click', (e) => {
            if (this._renderer._isPanning) return;

            const rect = canvas.getBoundingClientRect();
            const sx   = e.clientX - rect.left;
            const sy   = e.clientY - rect.top;

            const hit = this._findNearest(sx, sy);
            if (!hit) return;

            if (this._pinned.has(hit)) {
                // Zaten pinli → unpin
                this._pinned.delete(hit);
                this._tooltip.unpin(hit);
            } else {
                // Pin
                const { sx: psx, sy: psy } = this._renderer.mathToScreen(hit.x, hit.y);
                this._pinned.add(hit);
                this._tooltip.pin(hit, psx, psy, hit.latex);
            }

            this._redraw();
        });
    }

    /**
     * Ekran koordinatına en yakın özel noktayı bulur.
     * Piksel mesafesi HIT_RADIUS_PX içindeyse döner, değilse null.
     */
    _findNearest(sx, sy) {
        let best     = null;
        let bestDist = HIT_RADIUS_PX;

        for (const pt of this._points) {
            const scr  = this._renderer.mathToScreen(pt.x, pt.y);
            const dist = Math.hypot(scr.sx - sx, scr.sy - sy);
            if (dist < bestDist) {
                bestDist = dist;
                best     = pt;
            }
        }

        return best;
    }

    // ═══════════════════════════════════════════════════════════════
    //  TEMİZLİK
    // ═══════════════════════════════════════════════════════════════

    destroy() {
        for (const unsub of this._unsubs) unsub();
        this._resizeObserver.disconnect();
        this._tooltip.removeAll();
        this._overlayCanvas.remove();
    }
}
