/**
 * features/graphs/ExplicitDrawer.js  —  Açık Fonksiyon Çizici
 *
 * y = f(x) formatındaki denklemleri adaptif örnekleme ile çizer.
 * CanvasRenderer'dan devralınan tam kutup/asimptot tespiti ve
 * ikili arama mantığını içerir.
 *
 * Kullanım:
 *   ExplicitDrawer.draw(renderer, { evaluateFn, color })
 */

import { drawSegments } from './adaptiveSampler.js';
import { DomainRestriction } from '../../core/DomainRestriction.js';

// ═══════════════════════════════════════════════════════════════
//  ÖZEL: ADAPTIF SEGMENT TOPLAMA (kutup/asimptot tespitli)
// ═══════════════════════════════════════════════════════════════

/**
 * evaluateFn(x) → y biçimindeki açık fonksiyonu adaptif örnekler.
 * Kutup tespiti, ikili arama ve adaptif alt-bölme dahildir.
 *
 * @param {object} renderer   CanvasRenderer instance (mathToScreen, screenToMath, scale, cssWidth, cssHeight)
 * @param {(x: number) => number|null} evaluateFn
 * @param {number} xMin       Görünür matematik X alt sınırı
 * @param {number} xMax       Görünür matematik X üst sınırı
 * @param {number} baseStep   Temel adım (1/scale)
 * @returns {{ segments: Array<Array<{sx,sy}>> }}
 */
function collectSegments(renderer, evaluateFn, xMin, xMax, baseStep) {

    const segments = [];
    let currentSeg = [];

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

    // ── Görünür Y aralığı (kutup eşiği için) ──────────────────
    const visibleYRange = renderer.cssHeight / renderer.scale;

    // ── Kutup (pole / asimptot) tespiti ────────────────────────
    const isPole = (x1, y1, x2, y2) => {
        const oppSign = (y1 < 0 && y2 > 0) || (y1 > 0 && y2 < 0);

        if (!oppSign) {
            const maxAbs = Math.max(Math.abs(y1), Math.abs(y2));
            if (maxAbs > visibleYRange * 0.5) {
                const n = 5;
                for (let i = 1; i < n; i++) {
                    const t = i / n;
                    const xm = x1 + (x2 - x1) * t;
                    const ym = evaluateFn(xm);
                    if (ym === null || !isFinite(ym)) return true;
                    if ((y1 > 0 && ym < 0) || (y1 < 0 && ym > 0)) return true;
                    if (Math.abs(ym) > maxAbs * 3) return true;
                }
            }
            return false;
        }

        const maxAbs = Math.max(Math.abs(y1), Math.abs(y2));
        if (maxAbs < visibleYRange * 0.01) return false;

        const threshold = Math.max(maxAbs * 3, visibleYRange * 0.5);
        let lo = x1, loY = y1;
        let hi = x2, hiY = y2;

        for (let i = 0; i < 16; i++) {
            const mid = (lo + hi) * 0.5;
            const midY = evaluateFn(mid);

            if (midY === null || !isFinite(midY)) return true;
            if (Math.abs(midY) > threshold) return true;

            if ((loY > 0) === (midY > 0)) {
                lo = mid; loY = midY;
            } else {
                hi = mid; hiY = midY;
            }
        }

        return false;
    };

    // ── Kutba en yakın sonlu noktayı bul (ikili arama) ─────────
    const findPoleEdge = (xSafe, ySafe, xOther) => {
        const signPositive = ySafe > 0;
        let bestX = xSafe, bestY = ySafe;
        let target = xOther;
        const yLimit = visibleYRange * 10;

        for (let i = 0; i < 20; i++) {
            const mid = (bestX + target) * 0.5;
            const mVal = evaluateFn(mid);

            if (mVal === null || !isFinite(mVal)) {
                target = mid;
            } else if (signPositive ? (mVal < 0) : (mVal > 0)) {
                target = mid;
            } else {
                bestX = mid;
                bestY = mVal;
                if (Math.abs(bestY) > yLimit) break;
            }
        }
        return { x: bestX, y: bestY };
    };

    // ── Adaptif alt-bölme ──────────────────────────────────────
    const refine = (x1, y1, x2, y2, depth) => {
        if (depth >= 5) return;

        const xm = (x1 + x2) * 0.5;
        const ym = evaluateFn(xm);

        if (ym === null || !isFinite(ym)) {
            breakPath();
            return;
        }

        if (isPole(x1, y1, xm, ym) || isPole(xm, ym, x2, y2)) {
            breakPath();
            return;
        }

        const { sx: sx1, sy: sy1 } = renderer.mathToScreen(x1, y1);
        const { sx: sxm, sy: sym } = renderer.mathToScreen(xm, ym);
        const { sx: sx2, sy: sy2 } = renderer.mathToScreen(x2, y2);

        const dx  = sx2 - sx1;
        const dy  = sy2 - sy1;
        const len = Math.hypot(dx, dy);

        if (len < 0.5) return;

        const dist = Math.abs((sxm - sx1) * dy - (sym - sy1) * dx) / len;
        if (dist < 0.5) return;

        refine(x1, y1, xm, ym, depth + 1);
        addPoint(sxm, sym);
        refine(xm, ym, x2, y2, depth + 1);
    };

    // ── Ana tarama döngüsü ─────────────────────────────────────
    let xPrev = null;
    let yPrev = null;

    for (let x = xMin; x <= xMax + baseStep * 0.5; x += baseStep) {
        const y = evaluateFn(x);

        if (y === null || !isFinite(y)) {
            if (yPrev !== null) {
                const edge = findPoleEdge(xPrev, yPrev, x);
                refine(xPrev, yPrev, edge.x, edge.y, 0);
                const { sx, sy } = renderer.mathToScreen(edge.x, edge.y);
                addPoint(sx, sy);
            }
            breakPath();
            xPrev = x;
            yPrev = null;
            continue;
        }

        if (yPrev !== null) {
            if (isPole(xPrev, yPrev, x, y)) {
                const leftEdge = findPoleEdge(xPrev, yPrev, x);
                refine(xPrev, yPrev, leftEdge.x, leftEdge.y, 0);
                const { sx: sxL, sy: syL } = renderer.mathToScreen(leftEdge.x, leftEdge.y);
                addPoint(sxL, syL);

                breakPath();

                const rightEdge = findPoleEdge(x, y, xPrev);
                const { sx: sxR, sy: syR } = renderer.mathToScreen(rightEdge.x, rightEdge.y);
                addPoint(sxR, syR);
                refine(rightEdge.x, rightEdge.y, x, y, 0);

                const { sx, sy } = renderer.mathToScreen(x, y);
                addPoint(sx, sy);

                xPrev = x;
                yPrev = y;
                continue;
            }

            refine(xPrev, yPrev, x, y, 0);

        } else if (xPrev !== null) {
            const edge = findPoleEdge(x, y, xPrev);
            const { sx, sy } = renderer.mathToScreen(edge.x, edge.y);
            addPoint(sx, sy);
            refine(edge.x, edge.y, x, y, 0);
        }

        const { sx, sy } = renderer.mathToScreen(x, y);

        if (currentSeg.length === 0) {
            addPoint(sx, sy);
        } else {
            addPoint(sx, sy);
        }

        xPrev = x;
        yPrev = y;
    }

    breakPath();
    return { segments };
}

// ═══════════════════════════════════════════════════════════════
//  EXPORT
// ═══════════════════════════════════════════════════════════════

export const ExplicitDrawer = {
    /**
     * Açık (explicit) fonksiyonu canvas'a çizer.
     *
     * @param {object} renderer   CanvasRenderer instance
     * @param {{ evaluateFn: (x:number)=>number|null, color: string }} curve
     */
    draw(renderer, curve) {
        const { evaluateFn, color, rawEvaluateFn, domainEndpoints, siblingEvalFns } = curve;

        const { mx: xMin } = renderer.screenToMath(0, 0);
        const { mx: xMax } = renderer.screenToMath(renderer.cssWidth, 0);
        const baseStep = 1 / renderer.scale;

        const { segments } = collectSegments(renderer, evaluateFn, xMin, xMax, baseStep);
        drawSegments(renderer.ctx, segments, color);

        // ── Domain sınır noktası işaretleri ──────────────────────────────────
        if (domainEndpoints && rawEvaluateFn) {
            const ctx = renderer.ctx;

            // x-tabanlı uç noktalar: domain doğrudan x koşulu içeriyor
            for (const ep of domainEndpoints) {
                if (ep.varName !== 'x') continue;
                const xVal = ep.getValue();
                if (xVal === null) continue;
                const yVal = rawEvaluateFn(xVal);
                if (yVal === null || !isFinite(yVal)) continue;
                // isInclusive: tüm AND koşullarını birlikte değerlendir.
                // Yalnızca bu koşulun isInclusive'ine değil, evaluateFn'in
                // sınır noktasında null dönüp dönmediğine bak.
                // Örn: x^2[y<4][1<=x<=2] → x=2'de y=4, y<4 false → null → boş
                // Kardeş curve'lerden biri bu noktayı kapsıyorsa dolu çiz.
                // Örn: {2x-3[x<=3],(x-5)^2-1[3<x]} → x=3 A'da dahil, B'de hariç;
                //      B çizerken A'nın evaluateFn(3) != null → dolu nokta.
                // Kardeş curve'in de aynı (x,y) noktasını kapsaması gerekir.
                // Farklı y değerindeki kardeşler (ör. {2x-3[x<=3],(x-5)^2-2[3<x]})
                // bu noktada farklı bir konumdadır; onların kapsama durumu
                // mevcut curve'ün endpoint noktasını etkilememelidir.
                const siblingCoversThisPoint = siblingEvalFns != null
                    && siblingEvalFns.some(fn => {
                        const sibY = fn(xVal);
                        return sibY !== null && Math.abs(sibY - yVal) < 1e-6;
                    });
                const isInclusive = evaluateFn(xVal) !== null || siblingCoversThisPoint;
                DomainRestriction.tryDrawTransitionDot(
                    ctx, renderer, xVal, yVal, evaluateFn, color, isInclusive
                );
            }

            // y-tabanlı / karmaşık koşullu uç noktalar
            // (örn. x^2[2<=y<5], x^2[-0.2<=sin(x)<0.5])
            // evaluateFn'deki null geçişlerini tarayarak sınır x değerlerini bul.
            if (domainEndpoints.some(ep => ep.varName !== 'x')) {
                // y-tabanlı endpoint değerleri
                const yEps = domainEndpoints
                    .filter(ep => ep.varName === 'y')
                    .map(ep => ({ val: ep.getValue(), isInclusive: ep.isInclusive }))
                    .filter(ep => ep.val !== null && isFinite(ep.val));

                // karmaşık ifade endpoint'leri (örn. sin(x) < 0.5)
                const complexEps = domainEndpoints
                    .filter(ep => ep.varName === 'complex' && ep.evalCondAt)
                    .map(ep => ({ val: ep.getValue(), evalCondAt: ep.evalCondAt, isInclusive: ep.isInclusive }))
                    .filter(ep => ep.val !== null && isFinite(ep.val));

                // x-tabanlı endpoint değerlerini topla: bu noktalardaki geçişler
                // zaten x-tabanlı blok tarafından doğru şekilde çizildi; tekrar çizme.
                const xEpVals = domainEndpoints
                    .filter(ep => ep.varName === 'x')
                    .map(ep => ep.getValue())
                    .filter(v => v !== null && isFinite(v));

                let prevDrawn = (evaluateFn(xMin) !== null);
                let prevX    = xMin;
                for (let x = xMin + baseStep; x <= xMax + baseStep * 0.5; x += baseStep) {
                    const drawn = evaluateFn(x) !== null;
                    if (drawn !== prevDrawn) {
                        // Binary search: null↔non-null geçişinin tam x değerini bul
                        // 40 iterasyon: ~1e-12 hassasiyet
                        let lo = prevX, hi = x;
                        for (let i = 0; i < 40; i++) {
                            const mid = (lo + hi) * 0.5;
                            if ((evaluateFn(mid) !== null) === drawn) hi = mid;
                            else lo = mid;
                        }
                        const xTrans = (lo + hi) * 0.5;

                        // Bu geçiş bir x-tabanlı endpoint'e yakınsa atla (zaten çizildi)
                        const snapTol = baseStep * 2;
                        if (xEpVals.some(xv => Math.abs(xv - xTrans) < snapTol)) {
                            prevDrawn = drawn;
                            prevX     = x;
                            continue;
                        }

                        const yTrans = rawEvaluateFn(xTrans);
                        if (yTrans !== null && isFinite(yTrans)) {
                            let isInclusive;
                            if (yEps.length > 0) {
                                // y koşulu: xTrans'taki y değerini en yakın y-sınırıyla eşleştir
                                let minDiff = Infinity, bestInc = true;
                                for (const ep of yEps) {
                                    const diff = Math.abs(ep.val - yTrans);
                                    if (diff < minDiff) { minDiff = diff; bestInc = ep.isInclusive; }
                                }
                                isInclusive = bestInc;
                            } else if (complexEps.length > 0) {
                                // Karmaşık ifade (örn. sin(x)): koşul ifadesini xTrans'ta
                                // değerlendir, en yakın eşiği bul → isInclusive al.
                                // Float belirsizliğini önler çünkü eşikler genelde birbirinden
                                // uzak (sin=-0.2 ile sin=0.5 gibi), en yakını doğru eşleşir.
                                let minDiff = Infinity, bestInc = true;
                                for (const ep of complexEps) {
                                    const condVal = ep.evalCondAt(xTrans, yTrans);
                                    if (condVal === null) continue;
                                    const diff = Math.abs(condVal - ep.val);
                                    if (diff < minDiff) { minDiff = diff; bestInc = ep.isInclusive; }
                                }
                                isInclusive = bestInc;
                            } else {
                                // Son çare (3y<2 vb. karmaşık y koşulları): lo tarafında test
                                const testX = lo + (hi - lo) * 0.25;
                                isInclusive = evaluateFn(testX) !== null;
                            }
                            DomainRestriction.tryDrawTransitionDot(
                                ctx, renderer, xTrans, yTrans, evaluateFn, color, isInclusive
                            );
                        }
                    }
                    prevDrawn = drawn;
                    prevX     = x;
                }

                // ── Dışlama sınırlarına dokunma noktası tespiti ──────────────────
                // sin(x)[y<1]  → y=sin(x) sin(x)=1'de sınıra dokunup geri döner
                // f(x)[sin(x)<a] → condExpr sınır değerine dokunup geri döner
                // Bu noktalarda null↔non-null geçişi olmadığı için tarama döngüsü
                // bunları bulamaz. Yerel extremum tespiti ile yakalar.
                //
                // Yöntem: "koşul ifadesi" yerel max/min'e ulaştığında sınır değerine
                // eşit mi diye kontrol et → evet → dokunma noktası → isInclusive=false → boş

                // y-tabanlı dışlama sınırları: hem dokunma hem kesişim noktaları
                // sin(x)[y<1]         → extremum dokunması   → ternary search
                // sin(x)[y<0.5,y>0.5] → kesişim noktası (OR) → sign-change binary search
                //
                // Gerçekten hariç olan sınır değerlerini bul:
                // Aynı değer için hem inclusive hem exclusive varsa sınır dahildir
                // (örn. [y<=0.5, y>0.5] = tüm y → nokta çizme).
                const yBoundaryMap = new Map();
                for (const ep of yEps) {
                    const key = ep.val.toFixed(10);
                    if (!yBoundaryMap.has(key)) yBoundaryMap.set(key, { val: ep.val, inc: false, exc: false });
                    const e = yBoundaryMap.get(key);
                    if (ep.isInclusive) e.inc = true; else e.exc = true;
                }
                const trulyExclusiveYVals = [...yBoundaryMap.values()]
                    .filter(e => e.exc && !e.inc)
                    .map(e => e.val);

                for (const bVal of trulyExclusiveYVals) {
                    let ppX = null, ppY = null;
                    let  pX = xMin,  pY = rawEvaluateFn(xMin);

                    for (let scanX = xMin + baseStep; scanX <= xMax + baseStep * 0.5; scanX += baseStep) {
                        const yNow = rawEvaluateFn(scanX);

                        if (yNow !== null && pY !== null) {
                            // ── Kesişim tespiti: rawFn bVal'ı keser (sign change) ────
                            // sin(x)[y<0.5, y>0.5] → sin(x)=0.5'te kesişim → boş nokta
                            // Ancak tek taraflı null geçişi (geçiş taraması zaten çizer)
                            // ile çakışmamak için: her iki yanda non-null olması gerekir.
                            if ((pY - bVal) * (yNow - bVal) < 0) {
                                let lo = pX, hi = scanX;
                                for (let i = 0; i < 50; i++) {
                                    const mid = (lo + hi) * 0.5;
                                    const yMid = rawEvaluateFn(mid);
                                    if (yMid === null) break;
                                    if ((yMid - bVal) * (pY - bVal) <= 0) hi = mid;
                                    else lo = mid;
                                }
                                const xCross = (lo + hi) * 0.5;
                                // Her iki yanda non-null → geçiş taraması zaten bakmadı
                                const leftNonNull  = evaluateFn(xCross - baseStep * 0.1) !== null;
                                const rightNonNull = evaluateFn(xCross + baseStep * 0.1) !== null;
                                if (leftNonNull && rightNonNull) {
                                    const { sx, sy } = renderer.mathToScreen(xCross, bVal);
                                    if (sx >= -10 && sx <= renderer.cssWidth + 10 &&
                                        sy >= -10 && sy <= renderer.cssHeight + 10) {
                                        DomainRestriction.drawEndpointDot(ctx, sx, sy, color, false);
                                    }
                                }
                            }

                            // ── Extremum dokunma tespiti ─────────────────────────────
                            // sin(x)[y<1] → sin(x)=1 yerel max'ta sınıra dokunur → boş nokta
                            if (ppY !== null) {
                                const dPrev = pY   - ppY;
                                const dCurr = yNow - pY;

                                if ((dPrev > 0 && dCurr < 0) || (dPrev < 0 && dCurr > 0)) {
                                    const isMax = dPrev > 0;
                                    let lo = ppX, hi = scanX;
                                    for (let i = 0; i < 50; i++) {
                                        const m1 = lo + (hi - lo) / 3;
                                        const m2 = hi - (hi - lo) / 3;
                                        const ym1 = rawEvaluateFn(m1);
                                        const ym2 = rawEvaluateFn(m2);
                                        if (ym1 === null || ym2 === null) break;
                                        if (isMax ? (ym1 < ym2) : (ym1 > ym2)) lo = m1;
                                        else hi = m2;
                                    }
                                    const xExtr = (lo + hi) * 0.5;
                                    const yExtr = rawEvaluateFn(xExtr);
                                    if (yExtr !== null && isFinite(yExtr) &&
                                        Math.abs(yExtr - bVal) < 1e-6) {
                                        const { sx, sy } = renderer.mathToScreen(xExtr, yExtr);
                                        if (sx >= -10 && sx <= renderer.cssWidth + 10 &&
                                            sy >= -10 && sy <= renderer.cssHeight + 10) {
                                            DomainRestriction.drawEndpointDot(ctx, sx, sy, color, false);
                                        }
                                    }
                                }
                            }
                        }

                        ppX = pX;    ppY = pY;
                        pX  = scanX; pY  = yNow;
                    }
                }

                // complex dışlama sınırları: hem dokunma hem kesişim noktaları
                // sin(x)[sin(x)<a]           → extremum dokunması   → ternary search
                // sin(x)[sin(x)<0.5,sin(x)>0.5] → kesişim (OR)     → sign-change binary search
                //
                // Aynı bVal için hem inclusive hem exclusive varsa gerçekte dahil → atla
                const complexBoundaryMap = new Map();
                for (const ep of complexEps) {
                    const key = ep.val.toFixed(10);
                    if (!complexBoundaryMap.has(key)) complexBoundaryMap.set(key, { ep, inc: false, exc: false });
                    const e = complexBoundaryMap.get(key);
                    if (ep.isInclusive) e.inc = true; else e.exc = true;
                }
                const trulyExclusiveComplex = [...complexBoundaryMap.values()]
                    .filter(e => e.exc && !e.inc)
                    .map(e => e.ep);

                for (const ep of trulyExclusiveComplex) {
                    const bVal = ep.val;
                    let ppX = null, ppCond = null;
                    let  pX = xMin;
                    const yRaw0 = rawEvaluateFn(xMin);
                    let  pCond = (yRaw0 !== null) ? ep.evalCondAt(xMin, yRaw0) : null;

                    for (let scanX = xMin + baseStep; scanX <= xMax + baseStep * 0.5; scanX += baseStep) {
                        const yRaw    = rawEvaluateFn(scanX);
                        const condNow = (yRaw !== null) ? ep.evalCondAt(scanX, yRaw) : null;

                        if (condNow !== null && pCond !== null) {
                            // ── Kesişim tespiti: condExpr bVal'ı keser (sign change) ──
                            if ((pCond - bVal) * (condNow - bVal) < 0) {
                                let lo = pX, hi = scanX;
                                for (let i = 0; i < 50; i++) {
                                    const mid  = (lo + hi) * 0.5;
                                    const yMid = rawEvaluateFn(mid);
                                    if (yMid === null) break;
                                    const cMid = ep.evalCondAt(mid, yMid);
                                    if (cMid === null) break;
                                    if ((cMid - bVal) * (pCond - bVal) <= 0) hi = mid;
                                    else lo = mid;
                                }
                                const xCross = (lo + hi) * 0.5;
                                const yCross = rawEvaluateFn(xCross);
                                // Her iki yanda non-null → geçiş taraması bakmadı
                                const leftNonNull  = evaluateFn(xCross - baseStep * 0.1) !== null;
                                const rightNonNull = evaluateFn(xCross + baseStep * 0.1) !== null;
                                if (yCross !== null && isFinite(yCross) && leftNonNull && rightNonNull) {
                                    const { sx, sy } = renderer.mathToScreen(xCross, yCross);
                                    if (sx >= -10 && sx <= renderer.cssWidth + 10 &&
                                        sy >= -10 && sy <= renderer.cssHeight + 10) {
                                        DomainRestriction.drawEndpointDot(ctx, sx, sy, color, false);
                                    }
                                }
                            }

                            // ── Extremum dokunma tespiti ─────────────────────────────
                            if (ppCond !== null) {
                                const derivPrev = pCond   - ppCond;
                                const derivCurr = condNow - pCond;
                                const isLocalMax = derivPrev > 0 && derivCurr < 0;
                                const isLocalMin = derivPrev < 0 && derivCurr > 0;

                                if (isLocalMax || isLocalMin) {
                                    let lo = ppX, hi = scanX;
                                    for (let i = 0; i < 50; i++) {
                                        const m1 = lo + (hi - lo) / 3;
                                        const m2 = hi - (hi - lo) / 3;
                                        const ym1 = rawEvaluateFn(m1);
                                        const ym2 = rawEvaluateFn(m2);
                                        if (ym1 === null || ym2 === null) break;
                                        const c1 = ep.evalCondAt(m1, ym1);
                                        const c2 = ep.evalCondAt(m2, ym2);
                                        if (c1 === null || c2 === null) break;
                                        if (isLocalMax ? (c1 < c2) : (c1 > c2)) lo = m1;
                                        else hi = m2;
                                    }
                                    const xExtr = (lo + hi) * 0.5;
                                    const yExtr = rawEvaluateFn(xExtr);
                                    if (yExtr !== null && isFinite(yExtr)) {
                                        const condExtr = ep.evalCondAt(xExtr, yExtr);
                                        if (condExtr !== null && Math.abs(condExtr - bVal) < 1e-6) {
                                            const { sx, sy } = renderer.mathToScreen(xExtr, yExtr);
                                            if (sx >= -10 && sx <= renderer.cssWidth + 10 &&
                                                sy >= -10 && sy <= renderer.cssHeight + 10) {
                                                DomainRestriction.drawEndpointDot(ctx, sx, sy, color, false);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        ppX = pX;    ppCond = pCond;
                        pX  = scanX; pCond  = condNow;
                    }
                }
            }
        }
    }
};
