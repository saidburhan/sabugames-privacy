/**
 * core/equationHelpers.js  —  Paylaşılan Sabitler ve Yardımcı Araçlar
 *
 * EquationManager ve EquationCompiler tarafından kullanılan
 * bağımsız küçük araçlar burada toplanmıştır.
 */

/* ── Varsayılan renk paleti (sırayla atanır, döngüsel) ──────────── */
export const DEFAULT_COLORS = [
    '#58a6ff',   // mavi
    '#ff6b6b',   // kırmızı
    '#51cf66',   // yeşil
    '#ffd43b',   // sarı
    '#cc5de8',   // mor
    '#ff922b',   // turuncu
    '#20c997',   // camgöbeği
    '#f06595',   // pembe
    '#74c0fc',   // açık mavi
    '#a9e34b',   // açık yeşil
];

/**
 * Dinamik nokta koordinatını sidebar için biçimlendirir.
 * @param {number|null} v
 * @returns {string}
 */
export function fmtDynCoord(v) {
    if (v == null || typeof v !== 'number' || !isFinite(v)) return '?';
    if (Number.isInteger(v)) return String(v);
    return v.toFixed(2).replace(/\.?0+$/, '');
}

/**
 * Yeni bir boş denklem nesnesi oluşturur.
 * @param {number} counter   Benzersiz sayaç (id üretmek için)
 * @param {number} colorIdx  Renk paletindeki indeks (döngüsel)
 * @returns {object}
 */
export function makeEquationTemplate(counter, colorIdx) {
    return {
        id                : `eq-${counter}`,
        text              : '',
        color             : DEFAULT_COLORS[colorIdx % DEFAULT_COLORS.length],
        visible           : true,
        type              : null,
        operator          : '=',
        evaluateFn        : null,
        error             : false,
        tMin              : null,
        tMax              : null,
        tMinExpr          : null,
        tMaxExpr          : null,
        freeVars          : [],
        computationResult : null,
        subCurves         : null,
    };
}
