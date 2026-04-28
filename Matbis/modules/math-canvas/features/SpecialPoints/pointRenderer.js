/**
 * features/SpecialPoints/pointRenderer.js  —  Overlay Canvas & Nokta Çizimi
 *
 * Ana CanvasRenderer'dan tamamen bağımsız bir overlay canvas katmanı oluşturur.
 * Özel noktaları (kök, ekstrema, kesişim) soluk gri, yarı-transparan daireler
 * olarak çizer; hover/pin durumlarında vurgular.
 */

// ── Stil sabitleri ─────────────────────────────────────────────

const POINT_COLOR     = '#9ca3af';   // soluk gri
const NORMAL_ALPHA    = 0.30;
const HOVERED_ALPHA   = 0.85;
const PINNED_ALPHA    = 0.70;

const NORMAL_RADIUS   = 3.5;
const HOVERED_RADIUS  = 5.0;
const PINNED_RADIUS   = 4.5;

const HOVERED_BORDER  = 'rgba(255,255,255,0.9)';
const PINNED_BORDER   = 'rgba(255,255,255,0.5)';

// ── Overlay Canvas Yaratma ─────────────────────────────────────

/**
 * container içine ayrı bir overlay <canvas> ekler.
 * Ana canvas'ın tam üzerine oturur, mouse olaylarını geçirir.
 *
 * @param {HTMLElement} container  #canvas-container
 * @returns {HTMLCanvasElement}
 */
export function createOverlayCanvas(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position       = 'absolute';
    canvas.style.inset          = '0';
    canvas.style.width          = '100%';
    canvas.style.height         = '100%';
    canvas.style.pointerEvents  = 'none';   // mouse olayları alta geçer
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);
    return canvas;
}

/**
 * Overlay canvas'ı container boyutlarına ve DPR'ye göre yeniden boyutlar.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} cssWidth
 * @param {number} cssHeight
 */
export function resizeOverlay(canvas, cssWidth, cssHeight) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = Math.round(cssWidth  * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// ── Nokta Çizimi ───────────────────────────────────────────────

/**
 * Tek bir daireyi verilen stille çizer.
 */
function drawDot(ctx, sx, sy, radius, alpha, borderColor) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle   = POINT_COLOR;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();

    if (borderColor) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
    }
    ctx.restore();
}

/**
 * Tüm özel noktaları overlay canvas üzerine çizer.
 *
 * @param {CanvasRenderingContext2D} ctx  Overlay canvas context
 * @param {object} renderer              CanvasRenderer (mathToScreen)
 * @param {Array<object>} points         Tüm özel noktalar [{x, y, …}]
 * @param {object|null} hoveredPoint     Şu an hover edilen nokta
 * @param {Set<object>} pinnedPoints     Tıklanarak sabitlenmiş noktalar
 */
export function drawPoints(ctx, renderer, points, hoveredPoint, pinnedPoints) {
    for (const pt of points) {
        const { sx, sy } = renderer.mathToScreen(pt.x, pt.y);

        const isHovered = (pt === hoveredPoint);
        const isPinned  = pinnedPoints.has(pt);

        if (isHovered) {
            drawDot(ctx, sx, sy, HOVERED_RADIUS, HOVERED_ALPHA, HOVERED_BORDER);
        } else if (isPinned) {
            drawDot(ctx, sx, sy, PINNED_RADIUS, PINNED_ALPHA, PINNED_BORDER);
        } else {
            drawDot(ctx, sx, sy, NORMAL_RADIUS, NORMAL_ALPHA, null);
        }
    }
}
