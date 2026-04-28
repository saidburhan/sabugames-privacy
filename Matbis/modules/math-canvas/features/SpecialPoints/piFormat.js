/**
 * features/SpecialPoints/piFormat.js  —  π Kapalı Biçim & LaTeX Formatlama
 *
 * Sayısal değerleri mümkünse π-rasyonel LaTeX biçimine,
 * değilse ondalıklı (uluslararası nokta) LaTeX'e dönüştürür.
 *
 * Ayrıca √2, √3 gibi sık trigonometrik sonuçları tanır.
 */

const PI = Math.PI;
const TOL = 1e-9;

// ── Bilinen özel sabitler (value → LaTeX) ──────────────────────

const KNOWN_CONSTANTS = [
    { value: Math.sqrt(2),     latex: '\\sqrt{2}' },
    { value: Math.sqrt(3),     latex: '\\sqrt{3}' },
    { value: Math.sqrt(2) / 2, latex: '\\frac{\\sqrt{2}}{2}' },
    { value: Math.sqrt(3) / 2, latex: '\\frac{\\sqrt{3}}{2}' },
    { value: Math.sqrt(3) / 3, latex: '\\frac{\\sqrt{3}}{3}' },
];

/**
 * Bilinen sabit tablosunda value'yu arar. Bulamazsa null döner.
 * İşaret ayrı ele alınır.
 */
function matchKnownConstant(value) {
    const abs = Math.abs(value);
    for (const entry of KNOWN_CONSTANTS) {
        if (Math.abs(abs - entry.value) < TOL) {
            return value < 0 ? `-${entry.latex}` : entry.latex;
        }
    }
    return null;
}

// ── π-Rasyonel Tespit ──────────────────────────────────────────

// İzin verilen paydalar (trigonometrik açılarda sık karşılaşanlar)
const ALLOWED_DENOMS = [1, 2, 3, 4, 6, 8, 12];
const MAX_NUM = 36;

/**
 * value / π ≈ p/q biçiminde ifade edilebilir mi kontrol eder.
 * Evetse { p, q } döner, hayırsa null.
 */
function asPiRational(value) {
    if (Math.abs(value) < TOL) return null;   // 0 için π forme yok

    const ratio = value / PI;

    for (const q of ALLOWED_DENOMS) {
        const p = Math.round(ratio * q);
        if (Math.abs(p) > MAX_NUM) continue;
        if (p === 0) continue;
        if (Math.abs(p / q - ratio) < TOL) {
            return { p, q };
        }
    }
    return null;
}

/**
 * p/q oranı ile π'yi LaTeX string'e çevirir.
 *
 * Örnekler:
 *   {1,1}  → \pi          {-1,1} → -\pi
 *   {1,2}  → \frac{\pi}{2}      {3,4}  → \frac{3\pi}{4}
 *   {2,1}  → 2\pi         {-3,2} → -\frac{3\pi}{2}
 */
function piRationalToLatex(p, q) {
    const sign = p < 0 ? '-' : '';
    const ap   = Math.abs(p);

    if (q === 1) {
        if (ap === 1) return `${sign}\\pi`;
        return `${sign}${ap}\\pi`;
    }

    // Frac biçimi
    const num = ap === 1 ? '\\pi' : `${ap}\\pi`;
    return `${sign}\\frac{${num}}{${q}}`;
}

// ── Public API ─────────────────────────────────────────────────

/**
 * Tek bir sayısal değeri LaTeX string'ine çevirir.
 *
 * Öncelik sırası:
 *   1. 0 → "0"
 *   2. π-rasyonel → \frac{p\pi}{q}
 *   3. Bilinen sabit (√2, √3…)
 *   4. Ondalıklı (uluslararası nokta)
 *
 * @param {number} value
 * @returns {string} LaTeX string
 */
export function toLatex(value) {
    // Tam sıfır
    if (Math.abs(value) < TOL) return '0';

    // Tam tamsayı
    if (Math.abs(value - Math.round(value)) < TOL) {
        return String(Math.round(value));
    }

    // π-rasyonel
    const piR = asPiRational(value);
    if (piR) return piRationalToLatex(piR.p, piR.q);

    // Bilinen sabitler
    const known = matchKnownConstant(value);
    if (known) return known;

    // Fallback: ondalıklı
    const abs = Math.abs(value);
    let decimals;
    if      (abs >= 100) decimals = 1;
    else if (abs >= 1)   decimals = 2;
    else                 decimals = 3;

    // Gereksiz sıfırları kaldır
    let s = value.toFixed(decimals);
    if (s.includes('.')) {
        s = s.replace(/0+$/, '').replace(/\.$/, '');
    }
    return s;
}

/**
 * (x, y) koordinat çiftini LaTeX biçimine çevirir.
 *
 * Çıktı: \left( x ,\; y \right)
 *
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
export function coordToLatex(x, y) {
    return `\\left(${toLatex(x)},\\; ${toLatex(y)}\\right)`;
}
