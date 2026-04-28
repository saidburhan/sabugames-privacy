/**
 * features/graphs/adaptiveSampler.js  —  Paylaşılan Çizim Yardımcıları
 *
 * Sorumluluklar:
 *   ✓ Sürekli segment dizilerini tek bir Canvas yoluyla çizer (drawSegments)
 *   ✓ 1D parametrik eğrileri  fn(t) → {x,y}  adaptif örneklemeyle toplar
 *     (collectParametricSegments) — PolarDrawer ve ParametricDrawer tarafından
 *     ortak kullanılır.
 *
 * Bu modül canvas'a bağımsızdır; renderer nesnesini parametre olarak alır.
 */

// ═══════════════════════════════════════════════════════════════
//  SEGMENT ÇİZİMİ
// ═══════════════════════════════════════════════════════════════

/**
 * Sürekli segment dizilerini tek bir beginPath / stroke ile çizer.
 * Tüm drawer'lar bu ortak fonksiyonu kullanır.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<Array<{sx:number, sy:number}>>} segments
 * @param {string} color
 */
export function drawSegments(ctx, segments, color) {
    if (segments.length === 0) return;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.setLineDash([]);

    ctx.beginPath();

    for (const seg of segments) {
        if (seg.length < 2) continue;
        ctx.moveTo(seg[0].sx, seg[0].sy);
        for (let i = 1; i < seg.length; i++) {
            ctx.lineTo(seg[i].sx, seg[i].sy);
        }
    }

    ctx.stroke();
    ctx.restore();
}

// ═══════════════════════════════════════════════════════════════
//  PARAMETRİK ÖRNEKLEME
// ═══════════════════════════════════════════════════════════════

/**
 * fn(t) → {x, y} biçimindeki parametrik eğrileri adaptif örnekler.
 *
 * PolarDrawer (θ parametresi) ve ParametricDrawer (t parametresi)
 * bu fonksiyonu doğrudan kullanır.
 *
 * Adaptif alt-bölme: iki ardışık noktanın ortasındaki ekran sapması
 * 0.5 px eşiğini aşarsa özyineli böler (maxDepth = 5).
 *
 * Süreksizlik tespiti: Ekran mesafesi ekranın toplam boyutunu aşarsa
 * yol koparılır.
 *
 * @param {(t: number) => {x:number, y:number}|null} fn
 * @param {number} tMin   Parametre alt sınırı
 * @param {number} tMax   Parametre üst sınırı
 * @param {number} steps  Temel adım sayısı
 * @param {object} renderer  { mathToScreen, cssWidth, cssHeight }
 * @returns {{ segments: Array<Array<{sx:number, sy:number}>> }}
 */
export function collectParametricSegments(fn, tMin, tMax, steps, renderer) {
    const segments = [];
    let currentSeg = [];
    const baseStep = (tMax - tMin) / steps;

    // ── Yardımcılar ────────────────────────────────────────────

    const breakPath = () => {
        if (currentSeg.length > 1) segments.push(currentSeg);
        currentSeg = [];
    };

    const COORD_CLAMP = 1e6;
    const addPoint = (sx, sy) => {
        sx = Math.max(-COORD_CLAMP, Math.min(COORD_CLAMP, sx));
        sy = Math.max(-COORD_CLAMP, Math.min(COORD_CLAMP, sy));
        currentSeg.push({ sx, sy });
    };

    // Ekran mesafesi eşiği — bunu aşan adımlar süreksizlik sayılır
    const jumpThreshold = renderer.cssWidth + renderer.cssHeight;

    // ── Adaptif alt-bölme ──────────────────────────────────────

    const refine = (t1, p1, t2, p2, depth) => {
        if (depth >= 5) return;

        const tm = (t1 + t2) * 0.5;
        const pm = fn(tm);
        if (!pm) { breakPath(); return; }

        const { sx: sx1, sy: sy1 } = renderer.mathToScreen(p1.x, p1.y);
        const { sx: sxm, sy: sym } = renderer.mathToScreen(pm.x, pm.y);
        const { sx: sx2, sy: sy2 } = renderer.mathToScreen(p2.x, p2.y);

        const dx  = sx2 - sx1;
        const dy  = sy2 - sy1;
        const len = Math.hypot(dx, dy);

        if (len < 0.5) return;  // Yeterince küçük, alt-bölme gereksiz

        // Orta noktanın kirişe dik sapması
        const dist = Math.abs((sxm - sx1) * dy - (sym - sy1) * dx) / len;
        if (dist < 0.5) return;  // Yeterince düz

        refine(t1, p1, tm, pm, depth + 1);
        addPoint(sxm, sym);
        refine(tm, pm, t2, p2, depth + 1);
    };

    // ── Ana tarama döngüsü ─────────────────────────────────────

    let prevT = null;
    let prevP = null;

    for (let i = 0; i <= steps; i++) {
        const t = tMin + i * baseStep;
        const p = fn(t);

        if (!p) {
            breakPath();
            prevT = t;
            prevP = null;
            continue;
        }

        if (prevP) {
            // Ekrandaki mesafe çok büyükse süreksizlik
            const { sx: sx1, sy: sy1 } = renderer.mathToScreen(prevP.x, prevP.y);
            const { sx: sx2, sy: sy2 } = renderer.mathToScreen(p.x, p.y);
            const screenDist = Math.hypot(sx2 - sx1, sy2 - sy1);

            if (screenDist > jumpThreshold) {
                breakPath();
            } else {
                refine(prevT, prevP, t, p, 0);
            }
        }

        const { sx, sy } = renderer.mathToScreen(p.x, p.y);
        addPoint(sx, sy);

        prevT = t;
        prevP = p;
    }

    breakPath();
    return { segments };
}
