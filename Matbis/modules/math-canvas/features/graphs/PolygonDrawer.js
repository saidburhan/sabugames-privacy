/**
 * features/graphs/PolygonDrawer.js  —  Nokta / Doğru Parçası / Çokgen Çizici
 *
 * Kullanıcının girdiği nokta ve çokgen ifadelerini canvas üzerine çizer.
 *
 * Desteklenen giriş biçimleri:
 *   (a, b)                             → Tek nokta (dolgulu daire)
 *   çokgen((a,b), (c,d))               → Doğru parçası (2 köşe, uçlarda nokta)
 *   çokgen((a,b), (c,d), (e,f), ...)   → Kapalı çokgen (N≥3 köşe, dolgulu alan + kenarlar)
 *
 * evaluateFn() çağrıldığında nokta dizisi döndürür:
 *   [ { x: number, y: number }, ... ]
 *
 * Stil:
 *   - lineWidth = 2, lineJoin = 'round', lineCap = 'round'   (diğer drawer'larla tutarlı)
 *   - Nokta yarıçapı: tek nokta 5 px, çokgen köşeleri 4 px
 *   - Çokgen dolgusu: %15 opaklıkla curve.color
 *
 * Kullanım:
 *   PolygonDrawer.draw(renderer, curve)
 */

// ═══════════════════════════════════════════════════════════════
//  SABİTLER
// ═══════════════════════════════════════════════════════════════

const POINT_RADIUS_SINGLE  = 5;   // Tek nokta yarıçapı (CSS px)
const POINT_RADIUS_VERTEX  = 4;   // Çokgen köşe noktası yarıçapı (CSS px)
const LINE_WIDTH           = 2;
const FILL_ALPHA           = 0.15; // Çokgen dolgu opaklığı

// ═══════════════════════════════════════════════════════════════
//  YARDIMCI ÇİZİM FONKSİYONLARI
// ═══════════════════════════════════════════════════════════════

/**
 * Verilen ekran koordinatına dolgulu daire çizer.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} sx  Ekran X
 * @param {number} sy  Ekran Y
 * @param {number} r   Yarıçap (CSS px)
 * @param {string} color
 */
function _drawDot(ctx, sx, sy, r, color) {
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

/**
 * Ekran koordinatlarına çevrilmiş nokta dizisinin köşelerine
 * dolgulu daireler çizer.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<{sx:number, sy:number}>} screenPts
 * @param {number} r
 * @param {string} color
 */
function _drawVertices(ctx, screenPts, r, color) {
    for (const pt of screenPts) {
        _drawDot(ctx, pt.sx, pt.sy, r, color);
    }
}

// ═══════════════════════════════════════════════════════════════
//  ANA DRAWER
// ═══════════════════════════════════════════════════════════════

export const PolygonDrawer = {

    /**
     * Nokta / doğru parçası / çokgeni canvas'a çizer.
     *
     * @param {object} renderer   CanvasRenderer instance (mathToScreen, ctx)
     * @param {{ evaluateFn: () => Array<{x:number,y:number}>, color: string }} curve
     */
    draw(renderer, curve) {
        const { evaluateFn, color } = curve;
        const ctx = renderer.ctx;

        // evaluateFn() → [ {x, y}, ... ]
        const points = evaluateFn();
        if (!points || points.length === 0) return;

        // Matematik → ekran koordinatları
        const screenPts = points.map(p => renderer.mathToScreen(p.x, p.y));

        ctx.save();
        ctx.lineWidth  = LINE_WIDTH;
        ctx.lineJoin   = 'round';
        ctx.lineCap    = 'round';
        ctx.setLineDash([]);

        // ── 1 Nokta: Tek dolgulu daire ─────────────────────────
        if (screenPts.length === 1) {
            _drawDot(ctx, screenPts[0].sx, screenPts[0].sy, POINT_RADIUS_SINGLE, color);
            ctx.restore();
            return;
        }

        // ── 2 Nokta: Doğru parçası + uç noktalar ──────────────
        if (screenPts.length === 2) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(screenPts[0].sx, screenPts[0].sy);
            ctx.lineTo(screenPts[1].sx, screenPts[1].sy);
            ctx.stroke();

            _drawVertices(ctx, screenPts, POINT_RADIUS_VERTEX, color);
            ctx.restore();
            return;
        }

        // ── 3+ Nokta: Kapalı çokgen ───────────────────────────
        // Dolgu (yarı-saydam)
        ctx.beginPath();
        ctx.moveTo(screenPts[0].sx, screenPts[0].sy);
        for (let i = 1; i < screenPts.length; i++) {
            ctx.lineTo(screenPts[i].sx, screenPts[i].sy);
        }
        ctx.closePath();

        ctx.globalAlpha = FILL_ALPHA;
        ctx.fillStyle   = color;
        ctx.fill();

        // Kenarlar (tam opaklık)
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = color;
        ctx.stroke();

        // Köşe noktaları
        _drawVertices(ctx, screenPts, POINT_RADIUS_VERTEX, color);

        ctx.restore();
    }
};
