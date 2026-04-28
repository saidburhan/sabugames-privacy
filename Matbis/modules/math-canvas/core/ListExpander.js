/**
 * core/ListExpander.js — Liste Genişletme Motoru
 *
 * Sorumluluklar:
 *   ✓ {a,b,c} sözdizimindeki listeleri tespit etme
 *   ✓ Liste içeren ifadeleri birden fazla skalere ifadeye genişletme
 *   ✓ Çoklu liste eleman-bazlı eşleştirme (element-wise matching)
 *   ✓ Boyut uyumsuzluğu ve boş liste hata tespiti
 *
 * Genişletme mantığı:
 *   sin(x)+{1,2,3}  →  ["sin(x)+1", "sin(x)+2", "sin(x)+3"]
 *   {1,2}+{3,4}     →  ["1+3", "2+4"]         (element-wise)
 *   {1,2}+{3,4,5}   →  { error: true, ... }    (boyut uyumsuzluğu)
 *   {sin(x),cos(x)}  →  ["sin(x)", "cos(x)"]   (tam ifade listesi)
 *   5*{3,5,6}        →  ["5*3", "5*5", "5*6"]
 *
 * Bağımlılık: Yok (saf metin işleme)
 */

// ═══════════════════════════════════════════════════════════════
//  GENEL API
// ═══════════════════════════════════════════════════════════════

/**
 * İfade metninde en az bir {…} listesi olup olmadığını hızlıca kontrol eder.
 * @param {string} text
 * @returns {boolean}
 */
export function containsList(text) {
    if (!text) return false;
    // En az bir { ve } çifti olmalı; ancak çokgen() / fonksiyon çağrısı
    // içindeki süslü parantezlerle karışmasın diye temel kontrol yeterli.
    return text.includes('{') && text.includes('}');
}

/**
 * Liste içeren ifadeyi birden fazla skalere ifadeye genişletir.
 *
 * @param {string} text  Kullanıcının yazdığı ham ifade
 * @param {((expr:string)=>number)|undefined} evalFn
 *   Opsiyonel değerlendirme fonksiyonu. Aralık kalıplarındaki ({a,...,b})
 *   değişken ifadelerini sayıya çevirmek için kullanılır (ör. evalWithSliders).
 * @returns {{ expressions: string[] }|{ error: true, reason: string }}
 *   - Başarılı: { expressions: ["sin(x)+1", "sin(x)+2", ...] }
 *   - Liste yoksa: { expressions: [text] }
 *   - Hata: { error: true, reason: 'empty_list'|'length_mismatch' }
 */
export function expandExpression(text, evalFn) {
    if (!text || !containsList(text)) {
        return { expressions: [text] };
    }

    // Tüm üst-düzey {…} bloklarını bul
    const lists = _findListLiterals(text, evalFn);

    // Liste bulunamadıysa (süslü parantez başka amaçla kullanılmış olabilir)
    if (lists.length === 0) {
        return { expressions: [text] };
    }

    // Boş liste — 0 ifade üretir (grafik çizilmez, hata yok)
    for (const list of lists) {
        if (list.elements.length === 0) {
            return { expressions: [] };
        }
    }

    // Tüm listeler tek elemanlıysa → skaler gibi davran
    const allSingleton = lists.every(l => l.elements.length === 1);
    if (allSingleton) {
        let result = text;
        // Sondan başa doğru değiştir (indeks kayması olmasın)
        for (let i = lists.length - 1; i >= 0; i--) {
            const l = lists[i];
            result = result.slice(0, l.start) + l.elements[0] + result.slice(l.end);
        }
        return { expressions: [result] };
    }

    // Çoklu liste boyut kontrolü (tek elemanlılar hariç)
    const multiLists = lists.filter(l => l.elements.length > 1);
    const targetLength = multiLists[0].elements.length;
    for (let i = 1; i < multiLists.length; i++) {
        if (multiLists[i].elements.length !== targetLength) {
            return { error: true, reason: 'length_mismatch' };
        }
    }

    // Genişletme: N ifade üret
    const N = targetLength;
    const expressions = [];

    for (let idx = 0; idx < N; idx++) {
        let expr = text;
        // Sondan başa doğru değiştir (indeks kayması olmasın)
        for (let i = lists.length - 1; i >= 0; i--) {
            const l = lists[i];
            // Tek elemanlı listeler her zaman aynı elemanı kullanır
            const elemIdx = l.elements.length === 1 ? 0 : idx;
            expr = expr.slice(0, l.start) + '(' + l.elements[elemIdx] + ')' + expr.slice(l.end);
        }
        expressions.push(expr);
    }

    return { expressions };
}

/**
 * Liste sözdizimini math.js'in anlayabileceği forma dönüştürür.
 * İlk elemanı yerleştirerek türü ve serbest değişkenleri tespit
 * edebilmek için kullanılır.
 *
 * {a,b,c} → (a)  (ilk eleman, parantez içinde)
 *
 * @param {string} text
 * @returns {string}
 */
export function stripListsForParsing(text) {
    if (!text || !containsList(text)) return text;

    const lists = _findListLiterals(text);
    if (lists.length === 0) return text;

    let result = text;
    // Sondan başa doğru değiştir
    for (let i = lists.length - 1; i >= 0; i--) {
        const l = lists[i];
        const replacement = l.elements.length > 0 ? '(' + l.elements[0] + ')' : '(0)';
        result = result.slice(0, l.start) + replacement + result.slice(l.end);
    }
    return result;
}

/**
 * İfadedeki liste eleman sayısını döndürür.
 * Liste yoksa 1, birden fazla farklı boyutta liste varsa -1 döner.
 *
 * @param {string} text
 * @returns {number}
 */
/**
 * Liste içeren ifadeyi, serbest değişken tespitine uygun hale getirir.
 * Her {…} bloğundaki tüm elemanlar ("..." hariç) '+' ile birleştirilip
 * parantez içine alınır. Böylece math.js'in extractFreeVars fonksiyonu
 * liste içindeki değişkenleri (ör. {-1,5,...,a} → a) bulabilir.
 *
 * @param {string} text
 * @returns {string}
 */
export function collectFreeVarText(text) {
    if (!text || !containsList(text)) return text;

    // {...} bloklarını bul; evalFn yok → aralıklar genişletilmez, ham elemanlar döner
    return text.replace(/\{([^}]*)\}/g, (_match, inner) => {
        const parts = inner.split(',')
            .map(s => s.trim())
            .filter(s => s && s !== '...');
        return parts.length > 0 ? '(' + parts.join('+') + ')' : '(0)';
    });
}

export function getListElementCount(text) {
    if (!text || !containsList(text)) return 1;

    const lists = _findListLiterals(text);
    if (lists.length === 0) return 1;

    const multiLists = lists.filter(l => l.elements.length > 1);
    if (multiLists.length === 0) return 1;

    const size = multiLists[0].elements.length;
    for (let i = 1; i < multiLists.length; i++) {
        if (multiLists[i].elements.length !== size) return -1;
    }
    return size;
}

// ═══════════════════════════════════════════════════════════════
//  DAHİLİ YARDIMCILAR
// ═══════════════════════════════════════════════════════════════

/** Aralık genişletme için maksimum eleman sayısı */
const MAX_RANGE_SIZE = 1000;

/**
 * Bir string değeri sayıya çevirir.
 * Önce parseFloat ile doğrudan çevrim denenir; başarısız olursa
 * evalFn (ör. evalWithSliders) ile değişken/ifade değerlendirilir.
 *
 * @private
 * @param {string} str
 * @param {((expr:string)=>number)|undefined} evalFn
 * @returns {number}  Sonuç veya NaN
 */
function _resolveNumber(str, evalFn) {
    const trimmed = str.trim();
    const parsed = parseFloat(trimmed);
    if (Number.isFinite(parsed)) return parsed;
    if (!evalFn) return NaN;
    try {
        const val = evalFn(trimmed);
        return (typeof val === 'number' && Number.isFinite(val)) ? val : NaN;
    } catch { return NaN; }
}

/**
 * Eleman dizisinde aritmetik dizi kalıplarını tespit edip genişletir.
 *
 * Desteklenen kalıplar:
 *   {a,...,b}    → a'dan b'ye tüm tam sayılar (adım 1 veya -1)
 *   {a,b,...,c}  → a'dan c'ye aritmetik dizi (adım = b - a)
 *
 * evalFn verildiğinde değişken ifadeler (ör. slider değişkenleri)
 * sayısal değerlerine çevrilebilir.
 *
 * @private
 * @param {string[]} elements
 * @param {((expr:string)=>number)|undefined} evalFn
 * @returns {string[]|null}  Genişletilmiş eleman dizisi, kalıp yoksa null
 */
function _expandRangeElements(elements, evalFn) {
    const ellipsisIdx = elements.findIndex(e => e.trim() === '...');
    if (ellipsisIdx === -1) return null;

    // Kalıp: {a,...,b} — tamsayı adımlı aralık
    if (ellipsisIdx === 1 && elements.length === 3) {
        const start = _resolveNumber(elements[0], evalFn);
        const end   = _resolveNumber(elements[2], evalFn);
        if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
        if (!Number.isInteger(start) || !Number.isInteger(end)) return null;

        const step  = start <= end ? 1 : -1;
        const count = Math.abs(end - start) + 1;
        if (count > MAX_RANGE_SIZE) return null;

        const result = [];
        for (let v = start; step > 0 ? v <= end : v >= end; v += step) {
            result.push(String(v));
        }
        return result;
    }

    // Kalıp: {a,b,...,c} — aritmetik dizi
    if (ellipsisIdx === 2 && elements.length === 4) {
        const first  = _resolveNumber(elements[0], evalFn);
        const second = _resolveNumber(elements[1], evalFn);
        const last   = _resolveNumber(elements[3], evalFn);
        if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(last)) return null;

        const step = second - first;
        if (step === 0) return null;

        const EPSILON = Math.abs(step) * 1e-9;
        const result = [];
        for (
            let v = first;
            step > 0 ? v <= last + EPSILON : v >= last - EPSILON;
            v += step
        ) {
            if (result.length >= MAX_RANGE_SIZE) return null;
            result.push(String(parseFloat(v.toPrecision(10))));
        }
        return result.length > 0 ? result : null;
    }

    return null;
}

/**
 * İfade metnindeki tüm üst-düzey {…} bloklarını bulur.
 * İç içe parantezleri ve stringlari dikkate alır.
 *
 * @private
 * @param {string} text
 * @param {((expr:string)=>number)|undefined} evalFn
 * @returns {Array<{ start: number, end: number, elements: string[] }>}
 */
function _findListLiterals(text, evalFn) {
    const results = [];
    let i = 0;
    const len = text.length;

    while (i < len) {
        if (text[i] === '{') {
            // İç içe { } ve ( ) dikkate alarak kapanış } bul
            const start = i;
            i++; // '{' atla
            let depth = 1;
            let parenDepth = 0;

            while (i < len && depth > 0) {
                const ch = text[i];
                if (ch === '{') depth++;
                else if (ch === '}') depth--;
                else if (ch === '(') parenDepth++;
                else if (ch === ')') parenDepth--;
                if (depth > 0) i++;
            }

            if (depth !== 0) {
                // Eşleşmeyen süslü parantez — atla
                i++;
                continue;
            }

            const end = i + 1; // '}' dahil
            const inner = text.slice(start + 1, i).trim();

            // Elemanları üst-düzey virgülle ayır; aralık kalıplarını genişlet
            const rawElements = _splitTopLevelComma(inner);
            const rangeExpanded = _expandRangeElements(rawElements, evalFn);
            let elements;
            if (rangeExpanded !== null) {
                elements = rangeExpanded;
            } else if (rawElements.some(e => e.trim() === '...')) {
                // Aralık kalıbı algılandı ama değerler çözümlenemedi
                // (ör. slider değişkeni henüz tanımlı değil) → bekleyen aralık
                elements = [];
            } else {
                elements = rawElements;
            }
            results.push({ start, end, elements });

            i++; // '}' atla
        } else {
            i++;
        }
    }

    return results;
}

/**
 * Metni üst-düzey virgüllerle ayırır.
 * Parantez (()), süslü parantez ({}) ve köşeli parantez ([]) içindeki
 * virgüller yok sayılır.
 *
 * @private
 * @param {string} text
 * @returns {string[]}
 */
function _splitTopLevelComma(text) {
    if (!text.trim()) return [];

    const parts = [];
    let depth = 0;   // () derinlik
    let braceDepth = 0; // {} derinlik
    let bracketDepth = 0; // [] derinlik
    let start = 0;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (ch === '{') braceDepth++;
        else if (ch === '}') braceDepth--;
        else if (ch === '[') bracketDepth++;
        else if (ch === ']') bracketDepth--;
        else if (ch === ',' && depth === 0 && braceDepth === 0 && bracketDepth === 0) {
            parts.push(text.slice(start, i).trim());
            start = i + 1;
        }
    }

    // Son eleman
    const last = text.slice(start).trim();
    if (last) parts.push(last);

    return parts;
}
