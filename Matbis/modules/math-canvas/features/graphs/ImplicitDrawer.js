/**
 * features/graphs/ImplicitDrawer.js  —  Kapalı Fonksiyon Çizici (Marching Squares)
 *
 * f(x, y) = 0 biçimindeki kapalı denklemleri "Yürüyen Kareler" (Marching Squares)
 * algoritması ile çizer.
 *
 * Algoritma özeti:
 *   1. Görünür viewport uygun boyutlu bir hücre ızgarasına bölünür.
 *   2. Her hücrenin 4 köşesinde f(x, y) hesaplanır.
 *   3. Köşe işaretleri (±) bir 4-bit durum indeksi oluşturur (16 olasılık).
 *   4. Durum tablosuna bakılarak hangi kenarlardan kontur geçtiği belirlenir.
 *   5. Lineer interpolasyon ile kenar üzerindeki sıfır-geçiş noktası bulunur.
 *   6. Kenar bazında süreksizlik/asimptot tespiti ile sahte segmentler filtrelenir.
 *   7. Çizgi segmentleri polilaylara zincirlenir ve pürüzsüz çizilir.
 *
 * Süreksizlik tespiti:
 *   Bir kenarda işaret değişimi olduğunda, kenar boyunca birkaç ara nokta
 *   örneklenir. Gerçek bir sıfır-geçişinde f değeri sıfıra yakınsarken,
 *   asimptotlarda (tan gibi) f değeri sıfıra yakınsayamaz — zıt işaretli
 *   çok büyük değerler arasında salınır. Bu fark kullanılarak sahte
 *   geçişler filtrelenir.
 *
 * Kullanım:
 *   ImplicitDrawer.draw(renderer, { evaluateFn, color })
 */

// ═══════════════════════════════════════════════════════════════
//  KONTUR TABLOSU  (Marching Squares — 16 durum)
// ═══════════════════════════════════════════════════════════════
//
// Köşe bitleri (saat yönünde, güney-batıdan başlayarak):
//   bit 0 (1)  : SW  (sol-alt)
//   bit 1 (2)  : SE  (sağ-alt)
//   bit 2 (4)  : NE  (sağ-üst)
//   bit 3 (8)  : NW  (sol-üst)
//
// Kenar numaraları:
//   0 = N (kuzey)  —  NW → NE
//   1 = E (doğu)   —  NE → SE
//   2 = S (güney)  —  SW → SE
//   3 = W (batı)   —  NW → SW
//
// Her giriş, çizilecek kenar çiftleridir: [[e1, e2], ...]
// Eyer durumları (5 ve 10) çalışma zamanında çözümlenir.

const CONTOUR_TABLE = [
    [],              //  0: 0000  — tümü dışarıda
    [[2, 3]],        //  1: 0001  — SW+          → S-W
    [[1, 2]],        //  2: 0010  — SE+          → E-S
    [[1, 3]],        //  3: 0011  — SW+ SE+      → E-W
    [[0, 1]],        //  4: 0100  — NE+          → N-E
    null,            //  5: 0101  — SW+ NE+ (eyer)
    [[0, 2]],        //  6: 0110  — SE+ NE+      → N-S
    [[0, 3]],        //  7: 0111  — SW+ SE+ NE+  → N-W
    [[0, 3]],        //  8: 1000  — NW+          → N-W
    [[0, 2]],        //  9: 1001  — SW+ NW+      → N-S
    null,            // 10: 1010  — SE+ NW+ (eyer)
    [[0, 1]],        // 11: 1011  — SW+ SE+ NW+  → N-E
    [[1, 3]],        // 12: 1100  — NE+ NW+      → E-W
    [[1, 2]],        // 13: 1101  — SW+ NE+ NW+  → E-S
    [[2, 3]],        // 14: 1110  — SE+ NE+ NW+  → S-W
    [],              // 15: 1111  — tümü içeride
];

// ═══════════════════════════════════════════════════════════════
//  SÜREKSIZLIK TESPİTİ
// ═══════════════════════════════════════════════════════════════

/**
 * Bir kenar boyunca süreksizlik olup olmadığını tespit eder.
 *
 * Yöntem: Kenarın iki ucu zıt işaretli olduğunda (marching squares
 * segment ürettiğinde), ikili arama (bisection) ile sıfır-geçiş
 * noktası aranır.
 *
 * Gerçek sıfır-geçişi: Bisection sırasında |f| monoton olarak
 * azalır ve sıfıra yakınsar.
 *
 * Süreksizlik (asimptot): Bisection sırasında |f| sıfıra
 * yakınsamaz — değerler büyük kalır veya NaN/Infinity üretir.
 *
 * @param {function} evaluateFn - f(x,y) fonksiyonu
 * @param {number} x1 - Kenar başlangıcı x
 * @param {number} y1 - Kenar başlangıcı y
 * @param {number} v1 - f(x1,y1)
 * @param {number} x2 - Kenar bitişi x
 * @param {number} y2 - Kenar bitişi y
 * @param {number} v2 - f(x2,y2)
 * @param {number} cellSize - Hücre boyutu (matematik birimi)
 * @returns {boolean} true ise süreksizlik var (segment çizilmemeli)
 */
function isDiscontinuousEdge(evaluateFn, x1, y1, v1, x2, y2, v2, cellSize) {
    // Her iki ucun da aynı işaretli olması durumunda süreksizlik
    // kontrolü gerekmez (marching squares bu kenarda segment üretmez).
    // Ama bu fonksiyon çağrıldığında uçlar zıt işaretli olmalı.
    const sameSign = (v1 > 0) === (v2 > 0);
    if (sameSign) return false;

    const maxMag = Math.max(Math.abs(v1), Math.abs(v2));

    // Küçük değerli kenarlarda süreksizlik olmaz
    // Normal eğrilerde sıfır-geçişi yakınında f küçüktür.
    // Sadece büyük değerli kenarlarda kontrol gerekir.
    if (maxMag < cellSize * 10) return false;

    // İkili arama: sıfır-geçiş noktasını daralt
    let lo = 0, hi = 1;
    let loV = v1, hiV = v2;
    let minAbsF = maxMag;

    for (let i = 0; i < 16; i++) {
        const t = (lo + hi) * 0.5;
        const xm = x1 + (x2 - x1) * t;
        const ym = y1 + (y2 - y1) * t;
        const vm = evaluateFn(xm, ym);

        if (vm === null || !isFinite(vm)) return true; // NaN/Inf → süreksiz

        const absVm = Math.abs(vm);
        if (absVm < minAbsF) minAbsF = absVm;

        // Bisection: sıfır noktası hangi tarafta?
        if ((loV > 0) === (vm > 0)) {
            lo = t; loV = vm;
        } else {
            hi = t; hiV = vm;
        }
    }

    // 16 iterasyon sonrası: gerçek sıfır-geçişinde minAbsF ≈ 0.
    // Süreksizlikte minAbsF büyük kalır.
    //
    // Oran: minAbsF / maxMag
    //   Gerçek geçiş: < 1e-4 (bisection 2^-16 ≈ 1.5e-5 hassasiyetle yakınsar)
    //   Süreksizlik:  ≈ 1 (büyük kalır)
    //
    // Eşik: 0.001 — muhafazakar, yanlış pozitif riski düşük
    return minAbsF > maxMag * 0.001;
}

// ═══════════════════════════════════════════════════════════════
//  EXPORT
// ═══════════════════════════════════════════════════════════════

export const ImplicitDrawer = {
    /**
     * Kapalı (implicit) denklemi Marching Squares algoritması ile çizer.
     *
     * @param {object} renderer   CanvasRenderer instance
     * @param {{ evaluateFn: (x:number, y:number) => number|null, color: string }} curve
     */
    draw(renderer, curve) {
        const { evaluateFn, evaluateFn2, color, operator = '=', op1, op2 } = curve;
        const ctx = renderer.ctx;
        const W   = renderer.cssWidth;
        const H   = renderer.cssHeight;

        if (!evaluateFn || W === 0 || H === 0) return;

        // ── Hücre boyutu ───────────────────────────────────────
        const CELL_PX = 4;                           // ekran pikseli
        const cellSize = CELL_PX / renderer.scale;   // matematik birimi

        // ── Görünür matematik aralığı ──────────────────────────
        const { mx: xMin, my: yMax } = renderer.screenToMath(0, 0);
        const { mx: xMax, my: yMin } = renderer.screenToMath(W, H);

        // Marj ekleyerek kenar hücrelerindeki interpolasyonu koru
        const margin = cellSize * 2;
        const x0 = xMin - margin;
        const x1 = xMax + margin;
        const y0 = yMin - margin;
        const y1 = yMax + margin;

        const cols = Math.ceil((x1 - x0) / cellSize);
        const rows = Math.ceil((y1 - y0) / cellSize);

        // Güvenlik: çok büyük ızgarada donmayı önle
        if (cols * rows > 1_000_000) return;

        // ── Izgara boyutları ───────────────────────────────────
        const W2 = cols + 1;
        const H2 = rows + 1;
        const VALUE_CLAMP = 1e8;

        // ── Yardımcılar (fn bağımsız) ─────────────────────────
        const lerp = (v1, v2) => {
            const d = v2 - v1;
            if (Math.abs(d) < 1e-15) return 0.5;
            return -v1 / d;
        };

        // Kenar köşe koordinatları tablosu (parametrik hücre boyutu):
        //   N(0): (cx, cy+cs) → (cx+cs, cy+cs)  vNW→vNE
        //   E(1): (cx+cs, cy+cs) → (cx+cs, cy)  vNE→vSE
        //   S(2): (cx, cy) → (cx+cs, cy)         vSW→vSE
        //   W(3): (cx, cy+cs) → (cx, cy)         vNW→vSW
        const edgeEndpoints = (ei, cx, cy, cs, vSW, vSE, vNE, vNW) => {
            switch (ei) {
                case 0: return { x1: cx, y1: cy + cs, v1: vNW, x2: cx + cs, y2: cy + cs, v2: vNE };
                case 1: return { x1: cx + cs, y1: cy + cs, v1: vNE, x2: cx + cs, y2: cy, v2: vSE };
                case 2: return { x1: cx, y1: cy, v1: vSW, x2: cx + cs, y2: cy, v2: vSE };
                case 3: return { x1: cx, y1: cy + cs, v1: vNW, x2: cx, y2: cy, v2: vSW };
            }
        };

        // ── Segmentleri polilaylara zincirle (smooth çizim için) ─────────
        const chainSegmentsToPolylines = (segs) => {
            const n = segs.length;
            if (n === 0) return [];

            const key = (x, y) => `${Math.round(x * 10)},${Math.round(y * 10)}`;
            const adj = new Map();

            for (let s = 0; s < n; s++) {
                const [ax, ay, bx, by] = segs[s];
                const k0 = key(ax, ay);
                const k1 = key(bx, by);
                if (!adj.has(k0)) adj.set(k0, []);
                adj.get(k0).push({ seg: s, end: 0 });
                if (!adj.has(k1)) adj.set(k1, []);
                adj.get(k1).push({ seg: s, end: 1 });
            }

            const used = new Uint8Array(n);
            const chains = [];

            for (let s = 0; s < n; s++) {
                if (used[s]) continue;
                used[s] = 1;

                const [ax, ay, bx, by] = segs[s];
                const forward  = [{ x: bx, y: by }];
                const backward = [{ x: ax, y: ay }];

                // İleri yönde zincirle
                let curKey = key(bx, by);
                for (;;) {
                    const nb = adj.get(curKey);
                    if (!nb) break;
                    let found = false;
                    for (const { seg, end } of nb) {
                        if (used[seg]) continue;
                        used[seg] = 1;
                        const sg = segs[seg];
                        if (end === 0) {
                            forward.push({ x: sg[2], y: sg[3] });
                            curKey = key(sg[2], sg[3]);
                        } else {
                            forward.push({ x: sg[0], y: sg[1] });
                            curKey = key(sg[0], sg[1]);
                        }
                        found = true;
                        break;
                    }
                    if (!found) break;
                }

                // Geri yönde zincirle
                curKey = key(ax, ay);
                for (;;) {
                    const nb = adj.get(curKey);
                    if (!nb) break;
                    let found = false;
                    for (const { seg, end } of nb) {
                        if (used[seg]) continue;
                        used[seg] = 1;
                        const sg = segs[seg];
                        if (end === 0) {
                            backward.push({ x: sg[2], y: sg[3] });
                            curKey = key(sg[2], sg[3]);
                        } else {
                            backward.push({ x: sg[0], y: sg[1] });
                            curKey = key(sg[0], sg[1]);
                        }
                        found = true;
                        break;
                    }
                    if (!found) break;
                }

                backward.reverse();
                chains.push(backward.concat(forward));
            }
            return chains;
        };

        // ── Pürüzsüz polilayın çizimi (quadratic Bézier) ────────────────
        const drawSmoothChain = (pts) => {
            const n = pts.length;
            if (n < 2) return;
            if (n === 2) {
                ctx.moveTo(pts[0].x, pts[0].y);
                ctx.lineTo(pts[1].x, pts[1].y);
                return;
            }
            ctx.moveTo(pts[0].x, pts[0].y);
            let mx = (pts[0].x + pts[1].x) * 0.5;
            let my = (pts[0].y + pts[1].y) * 0.5;
            ctx.lineTo(mx, my);
            for (let i = 1; i < n - 1; i++) {
                const nmx = (pts[i].x + pts[i + 1].x) * 0.5;
                const nmy = (pts[i].y + pts[i + 1].y) * 0.5;
                ctx.quadraticCurveTo(pts[i].x, pts[i].y, nmx, nmy);
            }
            ctx.lineTo(pts[n - 1].x, pts[n - 1].y);
        };

        // ── Dolgu (eşitsizlik bölgesi) ────────────────────────────────
        if (operator !== '=') {
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.fillStyle   = color;

            if (operator === 'compound') {
                // Çift-taraflı: HER İKİ koşulu da sağlayan hücreler
                const sat1 = (v) => op1 === '>=' ? v >= 0 : v > 0;
                const sat2 = (v) => op2 === '>=' ? v >= 0 : v > 0;

                for (let j = 0; j < rows; j++) {
                    const cy = y0 + j * cellSize;
                    for (let i = 0; i < cols; i++) {
                        const cx = x0 + i * cellSize;
                        const cx_m = cx + cellSize * 0.5;
                        const cy_m = cy + cellSize * 0.5;
                        const cv1 = evaluateFn(cx_m, cy_m);
                        if (cv1 === null || cv1 === undefined || isNaN(cv1) || !isFinite(cv1)) continue;
                        if (!sat1(cv1)) continue;
                        const cv2 = evaluateFn2(cx_m, cy_m);
                        if (cv2 === null || cv2 === undefined || isNaN(cv2) || !isFinite(cv2)) continue;
                        if (!sat2(cv2)) continue;
                        const { sx, sy } = renderer.mathToScreen(cx, cy);
                        ctx.fillRect(sx, sy - CELL_PX, CELL_PX, CELL_PX);
                    }
                }
            } else {
                // Tek-taraflı
                const satisfies = (cv) => {
                    if (operator === '<')  return cv < 0;
                    if (operator === '>')  return cv > 0;
                    if (operator === '<=') return cv <= 0;
                    if (operator === '>=') return cv >= 0;
                    return false;
                };

                for (let j = 0; j < rows; j++) {
                    const cy = y0 + j * cellSize;
                    for (let i = 0; i < cols; i++) {
                        const cx = x0 + i * cellSize;
                        const cv = evaluateFn(cx + cellSize * 0.5, cy + cellSize * 0.5);
                        if (cv === null || cv === undefined || isNaN(cv) || !isFinite(cv)) continue;
                        if (!satisfies(cv)) continue;
                        const { sx, sy } = renderer.mathToScreen(cx, cy);
                        ctx.fillRect(sx, sy - CELL_PX, CELL_PX, CELL_PX);
                    }
                }
            }

            ctx.restore();
        }

        // ── Kontur çizimi (Marching Squares) ─────────────────────────────
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth   = 2;
        ctx.lineJoin    = 'round';
        ctx.lineCap     = 'round';

        /**
         * Verilen fn fonksiyonu için Marching Squares kontur segmentlerini toplar
         * ve pürüzsüz eğri olarak çizer.
         * @param {function} fn  - evaluateFn(x,y) → number|null
         * @param {boolean} isDashedLine  - kesikli çizgi mi?
         */
        const drawContourForFn = (fn, isDashedLine) => {
            // Köşe değerlerini ön-hesapla
            const vals = new Float64Array(W2 * H2);
            for (let j = 0; j < H2; j++) {
                const my = y0 + j * cellSize;
                for (let i = 0; i < W2; i++) {
                    const mx = x0 + i * cellSize;
                    const v = fn(mx, my);
                    if (v === null || v === undefined || isNaN(v)) {
                        vals[j * W2 + i] = NaN;
                    } else if (v === Infinity) {
                        vals[j * W2 + i] = VALUE_CLAMP;
                    } else if (v === -Infinity) {
                        vals[j * W2 + i] = -VALUE_CLAMP;
                    } else {
                        vals[j * W2 + i] = v;
                    }
                }
            }

            // Güvenli değerlendirme (Infinity → clamp)
            const safeEval = (x, y) => {
                const v = fn(x, y);
                if (v === null || v === undefined || isNaN(v)) return NaN;
                if (v ===  Infinity) return  VALUE_CLAMP;
                if (v === -Infinity) return -VALUE_CLAMP;
                return v;
            };

            // Kontur segmentleri
            const segments = [];

            // Hücre segment üretici
            const cellSegments = (cx, cy, cs, vSW, vSE, vNE, vNW) => {
                let c = 0;
                if (vSW > 0) c |= 1;
                if (vSE > 0) c |= 2;
                if (vNE > 0) c |= 4;
                if (vNW > 0) c |= 8;

                if (c === 0 || c === 15) return;

                const half = cs * 0.5;

                const nt  = lerp(vNW, vNE);
                const nMx = cx + nt * cs;
                const nMy = cy + cs;

                const et  = lerp(vNE, vSE);
                const eMx = cx + cs;
                const eMy = cy + cs - et * cs;

                const st  = lerp(vSW, vSE);
                const sMx = cx + st * cs;
                const sMy = cy;

                const wt  = lerp(vNW, vSW);
                const wMx = cx;
                const wMy = cy + cs - wt * cs;

                const pts = [
                    renderer.mathToScreen(nMx, nMy),   // 0: N
                    renderer.mathToScreen(eMx, eMy),   // 1: E
                    renderer.mathToScreen(sMx, sMy),   // 2: S
                    renderer.mathToScreen(wMx, wMy),   // 3: W
                ];

                let edges;
                if (c === 5 || c === 10) {
                    const cv = fn(cx + half, cy + half);
                    const cp = cv !== null && cv > 0;
                    if (c === 5)  edges = cp ? [[0, 3], [1, 2]] : [[0, 1], [2, 3]];
                    else          edges = cp ? [[0, 1], [2, 3]] : [[0, 3], [1, 2]];
                } else {
                    edges = CONTOUR_TABLE[c];
                }

                let hasDisc = false;
                if (edges) {
                    for (const [e1, e2] of edges) {
                        const ep1 = edgeEndpoints(e1, cx, cy, cs, vSW, vSE, vNE, vNW);
                        if (isDiscontinuousEdge(fn, ep1.x1, ep1.y1, ep1.v1, ep1.x2, ep1.y2, ep1.v2, cs)) { hasDisc = true; continue; }
                        const ep2 = edgeEndpoints(e2, cx, cy, cs, vSW, vSE, vNE, vNW);
                        if (isDiscontinuousEdge(fn, ep2.x1, ep2.y1, ep2.v1, ep2.x2, ep2.y2, ep2.v2, cs)) { hasDisc = true; continue; }
                        segments.push([pts[e1].sx, pts[e1].sy, pts[e2].sx, pts[e2].sy]);
                    }
                }
                return hasDisc;
            };

            // Özyinelemeli hücre işleme
            const MAX_SUBDIV = 4;

            const processCell = (cx, cy, cs, vSW, vSE, vNE, vNW, depth) => {
                if (isNaN(vSW) || isNaN(vSE) || isNaN(vNE) || isNaN(vNW)) return;

                const hasSignChange = !((vSW >= 0 && vSE >= 0 && vNE >= 0 && vNW >= 0) ||
                                        (vSW <= 0 && vSE <= 0 && vNE <= 0 && vNW <= 0));

                if (hasSignChange) {
                    const segCountBefore = segments.length;
                    const hasDisc = cellSegments(cx, cy, cs, vSW, vSE, vNE, vNW);

                    if (hasDisc && depth < MAX_SUBDIV) {
                        segments.length = segCountBefore;
                        const hw = cs * 0.5;
                        const vS = safeEval(cx + hw, cy);
                        const vE = safeEval(cx + cs, cy + hw);
                        const vN = safeEval(cx + hw, cy + cs);
                        const vW = safeEval(cx, cy + hw);
                        const vC = safeEval(cx + hw, cy + hw);
                        processCell(cx,      cy,      hw, vSW, vS,  vC,  vW,  depth + 1);
                        processCell(cx + hw, cy,      hw, vS,  vSE, vE,  vC,  depth + 1);
                        processCell(cx + hw, cy + hw, hw, vC,  vE,  vNE, vN,  depth + 1);
                        processCell(cx,      cy + hw, hw, vW,  vC,  vN,  vNW, depth + 1);
                    }
                    return;
                }

                // İşaret değişimi yok — alt-bölme gerekli mi?
                const abs0 = Math.abs(vSW), abs1 = Math.abs(vSE);
                const abs2 = Math.abs(vNE), abs3 = Math.abs(vNW);
                const maxAbs = Math.max(abs0, abs1, abs2, abs3);
                const minAbs = Math.min(abs0, abs1, abs2, abs3);

                if (maxAbs < 1e-15) return;
                if (minAbs > maxAbs * 0.5) return;

                if (depth < MAX_SUBDIV && maxAbs > cs * 20) {
                    const hw = cs * 0.5;
                    const vS = safeEval(cx + hw, cy);
                    const vE = safeEval(cx + cs, cy + hw);
                    const vN = safeEval(cx + hw, cy + cs);
                    const vW = safeEval(cx, cy + hw);
                    const vC = safeEval(cx + hw, cy + hw);
                    processCell(cx,      cy,      hw, vSW, vS,  vC,  vW,  depth + 1);
                    processCell(cx + hw, cy,      hw, vS,  vSE, vE,  vC,  depth + 1);
                    processCell(cx + hw, cy + hw, hw, vC,  vE,  vNE, vN,  depth + 1);
                    processCell(cx,      cy + hw, hw, vW,  vC,  vN,  vNW, depth + 1);
                    return;
                }

                // Sıfıra-temas algılama
                const half = cs * 0.5;
                const allPos = vSW >= 0;

                const mW = fn(cx,        cy + half);
                const mE = fn(cx + cs,   cy + half);
                const mS = fn(cx + half, cy);
                const mN = fn(cx + half, cy + cs);

                const isValid    = (v) => v !== null && v !== undefined && !isNaN(v) && isFinite(v);
                const isOpposite = (v) => isValid(v) && (allPos ? v <= 0 : v >= 0);

                const crossings = [];
                if (isOpposite(mW)) crossings.push(renderer.mathToScreen(cx,        cy + half));
                if (isOpposite(mE)) crossings.push(renderer.mathToScreen(cx + cs,   cy + half));
                if (isOpposite(mS)) crossings.push(renderer.mathToScreen(cx + half, cy));
                if (isOpposite(mN)) crossings.push(renderer.mathToScreen(cx + half, cy + cs));

                if (crossings.length >= 2) {
                    for (let p = 0; p + 1 < crossings.length; p += 2) {
                        segments.push([
                            crossings[p].sx,     crossings[p].sy,
                            crossings[p + 1].sx, crossings[p + 1].sy,
                        ]);
                    }
                }
            };

            // Tüm hücreler
            for (let j = 0; j < rows; j++) {
                const cy = y0 + j * cellSize;
                for (let i = 0; i < cols; i++) {
                    const cx = x0 + i * cellSize;
                    const sw = vals[ j      * W2 + i    ];
                    const se = vals[ j      * W2 + i + 1];
                    const ne = vals[(j + 1) * W2 + i + 1];
                    const nw = vals[(j + 1) * W2 + i    ];
                    processCell(cx, cy, cellSize, sw, se, ne, nw, 0);
                }
            }

            // Zincirle ve çiz
            ctx.setLineDash(isDashedLine ? [6, 4] : []);
            const chains = chainSegmentsToPolylines(segments);
            ctx.beginPath();
            for (const chain of chains) drawSmoothChain(chain);
            ctx.stroke();
        };

        // ── Dokunma sınırı tespiti ve çizimi (touching-zero) ────────────────
        // f(x,y) = 0 çizgisi işaret değiştirmeden sıfıra "dokunup" geri dönüyorsa
        // (örn. sin(x)+1, a=1 durumunda) Marching Squares kontur üretmez.
        // Bu yardımcı fonksiyon: yerel max/min bul → f≈0 ise dikey kesikli çizgi çiz.
        const scanAndDrawTouchingZero = (fn) => {
            const scanStep = cellSize;
            const touchTol = 1e-4;

            const scanYs = [];
            const scanYCount = 5;
            for (let k = 0; k <= scanYCount; k++) {
                scanYs.push(yMin + (yMax - yMin) * k / scanYCount);
            }

            const touchXSet = new Set();

            for (const scanY of scanYs) {
                let ppX = null, ppF = null;
                let  pX = x0,   pF = (() => { const v = fn(x0, scanY); return v !== null && isFinite(v) ? v : null; })();

                for (let scanX = x0 + scanStep; scanX <= x1 + scanStep * 0.5; scanX += scanStep) {
                    const fNow = (() => { const v = fn(scanX, scanY); return v !== null && isFinite(v) ? v : null; })();

                    if (fNow !== null && pF !== null && ppF !== null) {
                        const dPrev = pF  - ppF;
                        const dCurr = fNow - pF;
                        const isLocalMax = dPrev > 0 && dCurr < 0;
                        const isLocalMin = dPrev < 0 && dCurr > 0;

                        if (isLocalMax || isLocalMin) {
                            let lo = ppX, hi = scanX;
                            for (let i = 0; i < 50; i++) {
                                const m1 = lo + (hi - lo) / 3;
                                const m2 = hi - (hi - lo) / 3;
                                const f1 = (() => { const v = fn(m1, scanY); return v !== null && isFinite(v) ? v : null; })();
                                const f2 = (() => { const v = fn(m2, scanY); return v !== null && isFinite(v) ? v : null; })();
                                if (f1 === null || f2 === null) break;
                                if (isLocalMax ? (f1 < f2) : (f1 > f2)) lo = m1;
                                else hi = m2;
                            }
                            const xExtr = (lo + hi) * 0.5;
                            const fExtr = (() => { const v = fn(xExtr, scanY); return v !== null && isFinite(v) ? v : null; })();

                            if (fExtr !== null && Math.abs(fExtr) < touchTol) {
                                const { sx: sxExtr } = renderer.mathToScreen(xExtr, 0);
                                touchXSet.add(Math.round(sxExtr));
                            }
                        }
                    }

                    ppX = pX;  ppF = pF;
                    pX = scanX; pF = fNow;
                }
            }

            if (touchXSet.size > 0) {
                ctx.save();
                ctx.strokeStyle = color;
                ctx.lineWidth   = 2;
                ctx.setLineDash([6, 4]);
                ctx.lineCap     = 'round';

                const { sy: syTop }    = renderer.mathToScreen(0, yMax);
                const { sy: syBottom } = renderer.mathToScreen(0, yMin);

                for (const sxKey of touchXSet) {
                    ctx.beginPath();
                    ctx.moveTo(sxKey, syTop);
                    ctx.lineTo(sxKey, syBottom);
                    ctx.stroke();
                }

                ctx.restore();
            }
        };

        // ── Konturları çiz ────────────────────────────────────────────────
        if (operator === 'compound') {
            // İki sınır çizgisi: op1 (f1=0) ve op2 (f2=0)
            drawContourForFn(evaluateFn,  op1 === '>');   // sol/alt sınır
            drawContourForFn(evaluateFn2, op2 === '>');   // sağ/üst sınır
            // Katı (kesikli) sınırlarda dokunma noktası taraması
            if (op1 === '>') scanAndDrawTouchingZero(evaluateFn);
            if (op2 === '>') scanAndDrawTouchingZero(evaluateFn2);
        } else {
            const isDashed = (operator === '<' || operator === '>');
            drawContourForFn(evaluateFn, isDashed);
            if (isDashed) scanAndDrawTouchingZero(evaluateFn);
        }

        ctx.restore();
    }
};
