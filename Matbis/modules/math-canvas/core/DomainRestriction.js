/**
 * core/DomainRestriction.js  —  Domain (Tanım Aralığı) Kısıtlama Modülü
 *
 * Fonksiyonların çizimini ve hesaplanmasını belirli koşullarla sınırlar.
 *
 * Sözdizimi:  ifade[koşul1,koşul2][koşul3]
 *   - Aynı köşeli parantez içindeki koşullar : VEYA (or)
 *   - Ayrı köşeli parantezler                : VE  (and)
 *
 * Örnek:
 *   x^2[-5<x<=-3, 3<x<5][-4<=x<=4]
 *   → x^2 sadece -4<=x<=-3 ve 3<x<=4 aralıklarında çizilir.
 *
 * Desteklenen denklem türleri:
 *   explicit   : evaluateFn(x)     → koşul {x, y} üzerinden test edilir
 *   implicit   : evaluateFn(x, y)  → koşul {x, y} üzerinden test edilir
 *   polar      : evaluateFn(th)    → koşul {th} üzerinden test edilir
 *   parametric : evaluateFn(t)     → koşul {t}  üzerinden test edilir
 *   Diğer türler (polygon, dynamicPoint, computation) değiştirilmeden geçirilir.
 *
 * İsimli fonksiyon desteği:
 *   f(x) = x^2[-4<x<4] tanımlanırsa, f(10) çağrısı null döner.
 *   Bu özellik NameRegistry._resolveFunctionCalls() ile entegre çalışır.
 */

import { sliderScope } from './SliderScope.js';

// ═══════════════════════════════════════════════════════════════
//  BRACKET PARSER
// ═══════════════════════════════════════════════════════════════

/**
 * Metnin sonundaki domain kısıtlama bloklarını ayrıştırır.
 *
 * @param {string} text  Ham denklem metni (trimEnd uygulanmış)
 * @returns {{ cleanText: string, domainGroups: string[][] }}
 *   cleanText   : Bracket blokları kaldırılmış temiz metin
 *   domainGroups: Her iç dizi bir OR-grubu; dış dizi AND ile birleştirilir.
 *                 Örnek: [['-5<x<=-3','3<x<5'], ['-4<=x<=4']]
 */
function parseBrackets(text) {
    const domainGroups = [];
    let remaining = text.trimEnd();

    while (remaining.endsWith(']')) {
        // Eşleşen '[' i sağdan tarayarak bul
        let depth = 0;
        let start = -1;
        for (let i = remaining.length - 1; i >= 0; i--) {
            const ch = remaining[i];
            if (ch === ']') depth++;
            else if (ch === '[') {
                depth--;
                if (depth === 0) { start = i; break; }
            }
        }

        if (start === -1) break; // Eşleşen açık parantez bulunamadı

        const inner = remaining.slice(start + 1, remaining.length - 1).trim();

        // < veya > içermeyen bloklar domain değil (indeks erişimi vs. çakışmasını önler)
        if (!/<|>/.test(inner)) break;

        // Üst-düzey virgülle ayır → OR koşulları
        const conditions = _splitTopLevelComma(inner)
            .map(c => c.trim())
            .filter(Boolean);

        if (conditions.length === 0) break;

        domainGroups.unshift(conditions); // Sağdan sola tarıyoruz; önce ekle
        remaining = remaining.slice(0, start).trimEnd();
    }

    return { cleanText: remaining, domainGroups };
}

/**
 * Üst-düzey virgülden ayırır (parantez/köşeli parantez derinliği sıfırken).
 * @private
 */
function _splitTopLevelComma(text) {
    const parts = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '(' || ch === '[' || ch === '{') depth++;
        else if (ch === ')' || ch === ']' || ch === '}') depth--;
        else if (ch === ',' && depth === 0) {
            parts.push(text.slice(start, i));
            start = i + 1;
        }
    }
    const last = text.slice(start);
    if (last) parts.push(last);
    return parts;
}

// ═══════════════════════════════════════════════════════════════
//  ZİNCİRLİ EŞİTSİZLİK ÇÖZÜCÜ
// ═══════════════════════════════════════════════════════════════

/**
 * Zincirlenmiş eşitsizliği math.js boolean ifadesine dönüştürür.
 *
 * Örnekler:
 *   -5<x<=-3         → ((-5) < (x) and (x) <= (-3))
 *   3<x<5            → ((3) < (x) and (x) < (5))
 *   y>0              → y>0  (tek operatör, olduğu gibi)
 *   a<x              → a<x  (tek operatör, olduğu gibi)
 *
 * @param {string} condStr  Tek koşul ifadesi
 * @returns {string}  math.js uyumlu boolean ifadesi
 */
function parseChainedInequality(condStr) {
    const s = condStr.trim();
    const ops = _findComparisonOps(s);

    if (ops.length < 2) {
        // Tek veya sıfır karşılaştırma operatörü — olduğu gibi döndür
        return s;
    }

    // 2 operatör → zincir: part1 op1 part2 op2 part3
    const { op: op1, start: s1, end: e1 } = ops[0];
    const { op: op2, start: s2, end: e2 } = ops[1];

    const part1 = s.slice(0, s1).trim();
    const part2 = s.slice(e1, s2).trim();
    const part3 = s.slice(e2).trim();

    return `((${part1}) ${op1} (${part2}) and (${part2}) ${op2} (${part3}))`;
}

/**
 * Karşılaştırma operatörlerini (<, <=, >, >=) sırasıyla bulur.
 * Çift karakterli operatörler (<=, >=) tek karakterlilerden önce eşleştirilir.
 * @private
 * @returns {Array<{op: string, start: number, end: number}>}
 */
function _findComparisonOps(s) {
    const ops = [];
    let i = 0;
    while (i < s.length) {
        const ch = s[i];
        if (ch === '<' || ch === '>') {
            if (s[i + 1] === '=') {
                ops.push({ op: ch + '=', start: i, end: i + 2 });
                i += 2;
            } else {
                ops.push({ op: ch, start: i, end: i + 1 });
                i++;
            }
        } else {
            i++;
        }
    }
    return ops;
}

// ═══════════════════════════════════════════════════════════════
//  DOMAIN MATH İFADESİ OLUŞTURUCU
// ═══════════════════════════════════════════════════════════════

/**
 * domainGroups dizisinden tek bir math.js boolean ifadesi üretir.
 *
 * @param {string[][]} domainGroups  Örnek: [['-5<x<=-3','3<x<5'], ['-4<=x<=4']]
 * @returns {string}  math.js boolean ifadesi; grup yoksa boş string
 */
function buildDomainMathExpr(domainGroups) {
    if (!domainGroups || domainGroups.length === 0) return '';

    const andParts = domainGroups.map(orGroup => {
        const orParts = orGroup.map(cond => parseChainedInequality(cond));
        if (orParts.length === 1) return orParts[0];
        return '(' + orParts.join(' or ') + ')';
    });

    if (andParts.length === 1) return andParts[0];
    return andParts.join(' and ');
}

// ═══════════════════════════════════════════════════════════════
//  PREDICATE DERLEYICI
// ═══════════════════════════════════════════════════════════════

/**
 * Domain math ifadesini değerlendiren bir predicate closure döndürür.
 *
 * Predicate, değerlendirme anında sliderScope'u da kapsama alır; bu sayede
 * slider değişkenleri olan domain ifadeleri dinamik olarak güncellenir.
 *
 * @param {string} domainMathExpr  math.js uyumlu boolean ifade
 * @returns {(vars: object) => boolean}
 *   vars: { x?, y?, t?, th?, theta?, ... } — denklem türüne bağlı değişkenler
 */
function compileDomainPredicate(domainMathExpr) {
    if (!domainMathExpr || !domainMathExpr.trim()) {
        return () => true;
    }

    let compiled;
    try {
        /* global math */
        compiled = math.compile(domainMathExpr);
    } catch {
        // Derlenemeyen ifade → her noktayı reddet (çizim yapılmaz)
        return () => false;
    }

    return (vars) => {
        try {
            const result = compiled.evaluate({ ...vars, ...sliderScope });
            // math.js boolean ifadeleri true/false veya 1/0 döner
            return result === true || result === 1;
        } catch {
            return false;
        }
    };
}

// ═══════════════════════════════════════════════════════════════
//  EVALUATEFN SARMALAYICI
// ═══════════════════════════════════════════════════════════════

/**
 * evaluateFn'i domain predicate'i ile sarar.
 *
 * Denklem türüne göre uygun değişken kümesi predicate'e geçirilir:
 *   explicit   : {x, y}  — y koşullarda kullanılabilir (örn. [y>0])
 *   implicit   : {x, y}
 *   polar      : {th, theta}  — her iki isim de geçirilir
 *   parametric : {t}
 *
 * @param {Function} fn        Orijinal evaluateFn
 * @param {Function} predicate compileDomainPredicate() çıktısı
 * @param {string}   type      Denklem türü
 * @returns {Function}  Sarmalanmış evaluateFn
 */
function wrapEvaluateFn(fn, predicate, type) {
    switch (type) {
        case 'explicit':
            return (x) => {
                const y = fn(x);
                if (y === null) return null;
                if (!predicate({ x, y })) return null;
                return y;
            };

        case 'implicit':
            return (x, y) => {
                if (!predicate({ x, y })) return null;
                return fn(x, y);
            };

        case 'polar':
            return (th) => {
                if (!predicate({ th, theta: th })) return null;
                return fn(th);
            };

        case 'parametric':
            return (t) => {
                if (!predicate({ t })) return null;
                return fn(t);
            };

        default:
            // polygon, dynamicPoint, computation — domain uygulanmaz
            return fn;
    }
}

// ═══════════════════════════════════════════════════════════════
//  SINIR NOKTASI ÇIKARICI — endpoint getters
// ═══════════════════════════════════════════════════════════════

/**
 * Tek bir koşul ifadesinden sınır değerlerini çıkarır.
 *
 * Desteklenen biçimler:
 *   -5 < x        → { valueExpr: '-5', varName: 'x', isInclusive: false }
 *   x <= 3        → { valueExpr: '3',  varName: 'x', isInclusive: true  }
 *   -4 <= x <= 4  → iki sınır (left + right)
 *
 * @private
 * @param {string} cond  Tek koşul metni
 * @returns {Array<{valueExpr:string, varName:string, isInclusive:boolean}>}
 */
function _parseBoundaryFromCondition(cond) {
    const s = cond.trim();
    const ops = _findComparisonOps(s);
    const endpoints = [];

    // Tanınan değişken adları
    const VAR_NAMES = new Set(['x', 'y', 't', 'th', 'theta']);

    if (ops.length === 0) return endpoints;

    if (ops.length >= 2) {
        // Zincirlenmiş: part1 OP1 middle OP2 part3
        const { op: op1, start: s1, end: e1 } = ops[0];
        const { op: op2, start: s2, end: e2 } = ops[1];

        const part1  = s.slice(0, s1).trim();
        const middle = s.slice(e1, s2).trim();
        const part3  = s.slice(e2).trim();

        if (VAR_NAMES.has(middle)) {
            // Sol sınır: part1 OP1 var  →  OP1 kapsayıcı mı?
            endpoints.push({ valueExpr: part1, varName: middle, isInclusive: op1.includes('=') });
            // Sağ sınır: var OP2 part3  →  OP2 kapsayıcı mı?
            endpoints.push({ valueExpr: part3, varName: middle, isInclusive: op2.includes('=') });
        } else {
            // Karmaşık ifade ortada (örn. sin(x)) — yine de sınırları kaydet
            endpoints.push({ valueExpr: part1, varName: 'complex', condExpr: middle, isInclusive: op1.includes('=') });
            endpoints.push({ valueExpr: part3, varName: 'complex', condExpr: middle, isInclusive: op2.includes('=') });
        }
        return endpoints;
    }

    // Tek operatör
    const { op, start, end } = ops[0];
    const left  = s.slice(0, start).trim();
    const right = s.slice(end).trim();
    const isInclusive = op.includes('=');

    if (VAR_NAMES.has(left)) {
        // var OP value  →  value is the boundary
        endpoints.push({ valueExpr: right, varName: left, isInclusive });
    } else if (VAR_NAMES.has(right)) {
        // value OP var  →  value is the boundary
        endpoints.push({ valueExpr: left, varName: right, isInclusive });
    } else {
        // İki taraf da bilinen değişken değil — karmaşık koşul (örn. sin(x)<a, sin(y)<0.3)
        // "x veya y içeren taraf" → condExpr; "diğer taraf" → valueExpr (sabit veya slider)
        // Not: \b yerine negatif lookbehind/ahead kullan — Türkçe harf sorununu önler
        const X_RE = /(?<![a-zA-ZçğıöşüÇĞİÖŞÜ_])x(?![a-zA-ZçğıöşüÇĞİÖŞÜ_0-9])/;
        const Y_RE = /(?<![a-zA-ZçğıöşüÇĞİÖŞÜ_])y(?![a-zA-ZçğıöşüÇĞİÖŞÜ_0-9])/;
        const rightHasX = X_RE.test(right);
        const leftHasX  = X_RE.test(left);
        const rightHasY = Y_RE.test(right);
        const leftHasY  = Y_RE.test(left);
        // x veya y içeren taraf condExpr; içermeyen taraf valueExpr
        const leftIsExpr  = leftHasX  || leftHasY;
        const rightIsExpr = rightHasX || rightHasY;
        if (leftIsExpr && !rightIsExpr) {
            // sin(x)<a  veya  sin(y)<0.3
            endpoints.push({ valueExpr: right, varName: 'complex', condExpr: left, isInclusive });
        } else if (rightIsExpr && !leftIsExpr) {
            // a<sin(x)  veya  0.3<sin(y)
            endpoints.push({ valueExpr: left, varName: 'complex', condExpr: right, isInclusive });
        }
    }

    return endpoints;
}

/**
 * Tüm domain gruplarından sınır noktası tanımlayıcıları (getter closure'lar) üretir.
 *
 * Her getter:
 *   getValue()   → sınır değerini sayısal olarak döndürür (slider desteği dahil)
 *   varName      → değişken adı ('x', 't', 'th', 'theta', 'y')
 *   isInclusive  → dahil (kapalı) sınır mı?
 *
 * @param {string[][]} domainGroups
 * @returns {Array<{getValue: () => number|null, varName: string, isInclusive: boolean}>}
 */
function buildEndpointGetters(domainGroups) {
    if (!domainGroups || domainGroups.length === 0) return [];

    const rawEndpoints = [];
    for (const orGroup of domainGroups) {
        for (const cond of orGroup) {
            for (const ep of _parseBoundaryFromCondition(cond.trim())) {
                rawEndpoints.push(ep);
            }
        }
    }

    return rawEndpoints.map(ep => {
        let getValue;
        try {
            /* global math */
            const compiled = math.compile(ep.valueExpr);
            getValue = () => {
                try {
                    const r = compiled.evaluate({ ...sliderScope });
                    return typeof r === 'number' && isFinite(r) ? r : null;
                } catch { return null; }
            };
        } catch {
            getValue = () => null;
        }

        if (ep.varName !== 'complex' || !ep.condExpr) {
            return { getValue, varName: ep.varName, isInclusive: ep.isInclusive };
        }

        // Karmaşık koşul ifadesini (örn. sin(x), sin(y)) derle
        let evalCondAt = () => null;
        try {
            const compiledCond = math.compile(ep.condExpr);
            // (x, y) ikisini de scope'a ekle: sin(x) için x, sin(y) için y kullanılır
            evalCondAt = (x, y) => {
                try {
                    const r = compiledCond.evaluate({ x, y, ...sliderScope });
                    return typeof r === 'number' && isFinite(r) ? r : null;
                } catch { return null; }
            };
        } catch { /* evalCondAt null döner */ }

        return { getValue, varName: ep.varName, isInclusive: ep.isInclusive, evalCondAt };
    });
}

// ═══════════════════════════════════════════════════════════════
//  NOKTA ÇİZİCİ
// ═══════════════════════════════════════════════════════════════

// Canvas container arkaplan rengi (index.html #canvas-container background)
const CANVAS_BG      = '#0d1117';
const ENDPOINT_RADIUS = 4;

/**
 * Sınır noktasını canvas'a çizer.
 *
 * Kapalı (inclusive) sınır : içi dolu daire — eğri rengiyle
 * Açık (exclusive) sınır   : içi boş daire  — arka plan renkli iç, eğri renkli kenar
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} sx       Ekran x koordinatı (CSS px)
 * @param {number} sy       Ekran y koordinatı (CSS px)
 * @param {string} color    Eğri rengi
 * @param {boolean} isInclusive  true → dolu nokta; false → boş nokta
 */
function drawEndpointDot(ctx, sx, sy, color, isInclusive) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(sx, sy, ENDPOINT_RADIUS, 0, Math.PI * 2);
    if (isInclusive) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        // İçi boş: arka plan rengini doldur, sonra kenar çiz
        ctx.fillStyle = CANVAS_BG;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth   = 2;
        ctx.stroke();
    }
    ctx.restore();
}

/**
 * Verilen sınır noktasının gerçek bir geçiş noktası olup olmadığını
 * epsilon testi ile kontrol eder ve gerekiyorsa noktayı çizer.
 *
 * Epsilon testi, OR/AND kombinasyonlarında sahte sınırları filtreler.
 * Örnek: [x>-5, x<5] — bu OR tüm x'leri kapsar; x=-5'te gerçek geçiş yok.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} renderer         CanvasRenderer
 * @param {number} paramVal         Sınır değeri (x, t veya th)
 * @param {number|{x,y}} pointOrY  explicit için y sayısı; parametrik/polar için {x,y}
 * @param {Function} wrappedFn     Domain-sarmalı evaluateFn (geçiş tespiti için)
 * @param {string} color
 * @param {boolean} isInclusive
 */
function _tryDrawTransitionDot(ctx, renderer, paramVal, pointOrY, wrappedFn, color, isInclusive) {
    const EPS = 1e-9;

    // wrappedFn ile sol/sağ epsilon noktalarını test et
    const leftDrawn  = wrappedFn(paramVal - EPS) !== null;
    const rightDrawn = wrappedFn(paramVal + EPS) !== null;
    const atDrawn    = wrappedFn(paramVal)        !== null;

    // Gerçek geçiş: sol ve sağ farklı → kesinlikle sınır
    // Tek-taraflı son nokta: nokta dahil, bir taraf dışarıda
    const isTransition  = leftDrawn !== rightDrawn;
    const isOneSidedEnd = atDrawn && (!leftDrawn || !rightDrawn);

    if (!isTransition && !isOneSidedEnd) return;

    // Ekran koordinatları
    let sx, sy;
    if (typeof pointOrY === 'number') {
        ({ sx, sy } = renderer.mathToScreen(paramVal, pointOrY));
    } else {
        ({ sx, sy } = renderer.mathToScreen(pointOrY.x, pointOrY.y));
    }

    // Viewport dışıysa çizme
    if (sx < -10 || sx > renderer.cssWidth + 10 ||
        sy < -10 || sy > renderer.cssHeight + 10) return;

    drawEndpointDot(ctx, sx, sy, color, isInclusive);
}

export { _tryDrawTransitionDot };

// ═══════════════════════════════════════════════════════════════
//  EXPORT
// ═══════════════════════════════════════════════════════════════

export const DomainRestriction = {
    parseBrackets,
    buildDomainMathExpr,
    compileDomainPredicate,
    wrapEvaluateFn,
    buildEndpointGetters,
    drawEndpointDot,
    tryDrawTransitionDot: _tryDrawTransitionDot,
};
