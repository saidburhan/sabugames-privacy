/**
 * features/SpecialPoints/finders.js  —  Özel Nokta Hesaplama Motoru
 *
 * Saf matematik modülü — DOM / Canvas bağımsız.
 * Bisection yöntemiyle yüksek hassasiyetli kök, ekstrema ve kesişim bulma.
 *
 * Tüm fonksiyonlar yalnızca type === 'explicit' eğriler (y = f(x)) içindir.
 */

// ── Yardımcılar ────────────────────────────────────────────────

const BISECT_ITER  = 24;       // ~1e-7 hassasiyet
const DERIV_H      = 1e-7;     // sayısal türev adımı
const DEDUP_RATIO  = 0.4;      // step'in bu oranından yakın noktalar birleşir

function isOk(v) { return v !== null && isFinite(v); }

/**
 * [lo, hi] aralığında f(x)=0 kökünü bisection ile bulur.
 * f(lo) ve f(hi) zıt işaretli olmalıdır.
 */
function bisect(f, lo, hi, maxIter = BISECT_ITER) {
    let fLo = f(lo);
    for (let i = 0; i < maxIter; i++) {
        const mid  = (lo + hi) * 0.5;
        const fMid = f(mid);
        if (!isOk(fMid)) return (lo + hi) * 0.5;
        if ((fLo > 0) === (fMid > 0)) { lo = mid; fLo = fMid; }
        else                           { hi = mid; }
    }
    return (lo + hi) * 0.5;
}

/** Duplikat noktaları eler (x mesafesi < threshold). */
function dedup(points, threshold) {
    if (points.length <= 1) return points;
    points.sort((a, b) => a.x - b.x);
    const out = [points[0]];
    for (let i = 1; i < points.length; i++) {
        if (Math.abs(points[i].x - out[out.length - 1].x) > threshold) {
            out.push(points[i]);
        }
    }
    return out;
}

// ── X-Ekseni Kesişimleri (Kökler) ──────────────────────────────

/**
 * evaluateFn(x) === 0 köklerini [xMin, xMax] aralığında bulur.
 * Tarama + bisection.
 *
 * @param {(x:number)=>number|null} fn
 * @param {number} xMin
 * @param {number} xMax
 * @param {number} step
 * @returns {Array<{x:number, y:number}>}
 */
export function findXIntercepts(fn, xMin, xMax, step) {
    const roots = [];

    let prevX = xMin;
    let prevY = fn(xMin);

    for (let x = xMin + step; x <= xMax + step * 0.5; x += step) {
        const y = fn(x);

        if (!isOk(prevY)) { prevX = x; prevY = y; continue; }
        if (!isOk(y))     { prevX = x; prevY = y; continue; }

        // Tam kök (grid noktasında)
        if (Math.abs(prevY) < 1e-12) {
            roots.push({ x: prevX, y: 0 });
        }

        // İşaret değişimi → bisection
        if ((prevY > 0 && y < 0) || (prevY < 0 && y > 0)) {
            const rx = bisect(fn, prevX, x);
            roots.push({ x: rx, y: 0 });
        }

        prevX = x;
        prevY = y;
    }

    return dedup(roots, step * DEDUP_RATIO);
}

// ── Y-Ekseni Kesişimi ──────────────────────────────────────────

/**
 * f(0) değerini döndürür (y-eksenini kestiği nokta).
 *
 * @param {(x:number)=>number|null} fn
 * @returns {{x:number, y:number}|null}
 */
export function findYIntercept(fn) {
    const y = fn(0);
    if (!isOk(y)) return null;
    return { x: 0, y };
}

// ── Lokal Ekstrema (Max / Min) ─────────────────────────────────

/**
 * Sayısal birinci türevin işaret değişimini tarayarak lokal
 * max/min noktalarını bulur. Bisection ile kesin konum, ikinci
 * türevle sınıflandırma.
 *
 * @param {(x:number)=>number|null} fn
 * @param {number} xMin
 * @param {number} xMax
 * @param {number} step
 * @returns {Array<{x:number, y:number, extremaType:'max'|'min'}>}
 */
export function findExtrema(fn, xMin, xMax, step) {
    const results = [];
    const h = Math.max(step * 1e-4, DERIV_H);

    // Extrema taraması için daha kaba bir adım kullan.
    // Çok ince step (1/scale) ile türevin tam sıfır noktasına denk gelen
    // grid noktaları işaret değişimini kaçırabilir.
    // Kaba adım: minimum 0.05 birim veya mevcut step'in 3 katı.
    const scanStep = Math.max(step * 3, 0.05);

    const deriv = (x) => {
        const fPlus  = fn(x + h);
        const fMinus = fn(x - h);
        if (!isOk(fPlus) || !isOk(fMinus)) return null;
        return (fPlus - fMinus) / (2 * h);
    };

    let prevX  = xMin;
    let prevD  = deriv(xMin);

    for (let x = xMin + scanStep; x <= xMax + scanStep * 0.5; x += scanStep) {
        const d = deriv(x);
        if (d === null) { prevX = x; prevD = d; continue; }
        if (prevD === null) { prevX = x; prevD = d; continue; }

        // Türev işaret değişimi → ekstrema adayı
        // Ayrıca türevin çok küçük olduğu durumları da yakala:
        // bir taraf belirgin işaretli, diğer taraf ~0 ise yine aday.
        const signFlip = (prevD > 0 && d < 0) || (prevD < 0 && d > 0);
        const nearZero = (Math.abs(d) < 1e-8 && Math.abs(prevD) > 1e-6)
                      || (Math.abs(prevD) < 1e-8 && Math.abs(d) > 1e-6);

        if (signFlip || nearZero) {
            // Bisection ile kesin konumu bul (türev = 0)
            const rx = bisect(deriv, prevX, x);
            const ry = fn(rx);
            if (!isOk(ry)) { prevX = x; prevD = d; continue; }

            // Gerçek ekstrema mı kontrol et: türev kök noktasında f'' ≠ 0
            const d2 = (fn(rx + h) - 2 * ry + fn(rx - h)) / (h * h);
            if (Math.abs(d2) < 1e-6) { prevX = x; prevD = d; continue; } // büküm noktası, ekstrema değil

            const extremaType = d2 < 0 ? 'max' : 'min';
            results.push({ x: rx, y: ry, extremaType });
        }

        prevX = x;
        prevD = d;
    }

    return dedup(results, scanStep * DEDUP_RATIO);
}

// ── İki Eğri Arası Kesişim ─────────────────────────────────────

/**
 * fA(x) = fB(x) kesişim noktalarını g(x) = fA(x) - fB(x) köklerini
 * bularak belirler.
 *
 * @param {(x:number)=>number|null} fnA
 * @param {(x:number)=>number|null} fnB
 * @param {number} xMin
 * @param {number} xMax
 * @param {number} step
 * @returns {Array<{x:number, y:number}>}
 */
export function findCurveIntersections(fnA, fnB, xMin, xMax, step) {
    const diff = (x) => {
        const a = fnA(x);
        const b = fnB(x);
        if (!isOk(a) || !isOk(b)) return null;
        return a - b;
    };

    const points = [];

    let prevX = xMin;
    let prevD = diff(xMin);

    for (let x = xMin + step; x <= xMax + step * 0.5; x += step) {
        const d = diff(x);

        if (!isOk(prevD)) { prevX = x; prevD = d; continue; }
        if (!isOk(d))     { prevX = x; prevD = d; continue; }

        if (Math.abs(prevD) < 1e-12) {
            const yVal = fnA(prevX);
            if (isOk(yVal)) points.push({ x: prevX, y: yVal });
        }

        if ((prevD > 0 && d < 0) || (prevD < 0 && d > 0)) {
            const rx   = bisect(diff, prevX, x);
            const yVal = fnA(rx);
            if (isOk(yVal)) points.push({ x: rx, y: yVal });
        }

        prevX = x;
        prevD = d;
    }

    return dedup(points, step * DEDUP_RATIO);
}
