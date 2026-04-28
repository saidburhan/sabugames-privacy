/**
 * core/LatexRenderer.js — LaTeX Önizleme Motoru
 *
 * Sorumluluklar:
 *   ✓ math.js parse çıktısını KaTeX uyumlu LaTeX stringine dönüştürür.
 *   ✓ Tüm değişkenleri \mathrm{} ile dik yapar.
 *   ✓ Kesirleri \dfrac ile görüntüler.
 *   ✓ Geçersiz / eksik ifadelerde \texttt{} fallback ile her zaman dik upright metin gösterir.
 *
 * Bağımlılıklar: window.math (math.js), window.katex (KaTeX)
 *
 * Dışa aktarılan:
 *   equationToLatex(text)          → string   — geçerli KaTeX kodu veya ''
 *   renderEquation(text, element)  → boolean  — true: içerik gösterildi; false: boş alan
 */

/** Yunan harfi komutları — \mathrm{} ile dik gösterilir */
const _GREEK_RE = /\\(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)\b/g;

/**
 * math.js toTex() çıktısındaki değişkenleri dik (upright) yapar.
 * — Tanınan LaTeX komutları (\sin, \cos, \left, \right, …) dokunulmaz.
 * — Yunan harfi komutları \mathrm{\theta} haline getirilir.
 * — Kalan tek veya çok harfli latin tanımlayıcılar \mathrm{…} haline getirilir.
 *
 * Önemli: çok harfli eşleşme önce yapılır; \sin içindeki "sin" gibi
 * komutlara dokunmamak için (?<!\\) lookbehind kullanılır.
 *
 * @param {string} expr
 * @returns {string}
 */
function _exprToLatex(expr) {
    if (!expr || !window.math) return '';
    try {
        // ── Türkçe özel karakterleri placeholder ile değiştir ──────────
        // KaTeX math modunda ç, ğ, ö, ş, ü, ı vb. düzgün render edilmez
        // (ç → LaTeX \c komutu gibi yorumlanır, diğerleri italik kalır).
        // ASCII placeholder'lar parse/toTex sonrası \text{} ile geri yüklenir.
        const _trMap = new Map();
        let _trIdx = 0;
        const exprSafe = expr.replace(
            /[a-zA-ZçÇğĞıİöÖşŞüÜ]*[çÇğĞıİöÖşŞüÜ][a-zA-ZçÇğĞıİöÖşŞüÜ]*/g,
            (m) => { const ph = `TRPH${_trIdx++}`; _trMap.set(ph, m); return ph; }
        );

        let raw = window.math.parse(exprSafe).toTex({ parenthesis: 'keep' });
        // \dfrac → \tfrac: satır içi görüntü modü; kesirler kompakt kalır
        raw = raw.replace(/\\d?frac/g, '\\tfrac');
        // Yunan harflerini dik yap: \theta → \mathrm{\theta}
        raw = raw.replace(_GREEK_RE, '\\mathrm{\\$1}');
        // Çok harfli tanımlayıcılar (math.js zaten çoğunu \mathrm tagar; ama bazılarını kaçırır)
        // Yalnızca \, harf veya { ile BAŞLAMAYAN kelimeler yakalanır (double-wrap önleme).
        raw = raw.replace(/(?<![\\a-zA-Z{])\b([a-zA-Z]{2,})\b/g, (m) => `\\mathrm{${m}}`);
        // Tek harfli latin değişkenleri
        raw = raw.replace(/(?<![\\a-zA-Z{])\b([a-zA-Z])\b/g, '\\mathrm{$1}');
        // Subscript desteği: identifier_digits → identifier_{digits}
        // \mathrm{abc_12} → \mathrm{abc}_{12}  veya  a\_1 → a_{1}
        raw = raw.replace(/\\mathrm\{([^}]+?)_([^}]+?)\}/g, '\\mathrm{$1}_{$2}');
        raw = raw.replace(/\\_(\d+)/g, '_{$1}');

        // ── Türkçe placeholder'ları \text{} ile geri yükle ────────────
        for (const [ph, orig] of _trMap) {
            raw = raw.replace(new RegExp(`\\\\mathrm\\{${ph}\\}`, 'g'), `\\text{${orig}}`);
            raw = raw.replace(new RegExp(ph, 'g'), `\\text{${orig}}`);
        }

        return raw;
    } catch { return ''; }
}

/**
 * Eşitsizlik operatörü içeren ifadeleri KaTeX eşdeğerlerine çevirir.
 * Örn: '<=' → '\\leq', '>=' → '\\geq', '<' → '<', '>' → '>'
 */
const _INEQ_RE = /(<=|>=|<|>)/g;
const _INEQ_LATEX = { '<=': '\\leq', '>=': '\\geq', '<': '<', '>': '>' };

/**
 * Metnin sonundaki domain bracket bloklarını `[...]` olarak soyar ve
 * içindeki koşulları \\leq / \\geq sembolleriyle KaTeX dizisi üretir.
 *
 * Döndürdüğü obje:
 *   cleanText    — bracket'lar kaldırılmış ana ifade metni
 *   bracketLatex — \\left[...\\right] dizisi veya '' (bracket yoksa)
 *
 * @param {string} text  Normalize edilmiş (ASCII operatörlü) metin
 * @returns {{ cleanText: string, bracketLatex: string }}
 */
function _stripDomainBracketsForLatex(text) {
    const groups = [];
    let remaining = text.trimEnd();

    while (remaining.endsWith(']')) {
        let depth = 0, start = -1;
        for (let i = remaining.length - 1; i >= 0; i--) {
            const ch = remaining[i];
            if (ch === ']') depth++;
            else if (ch === '[') { depth--; if (depth === 0) { start = i; break; } }
        }
        if (start === -1) break;

        const inner = remaining.slice(start + 1, remaining.length - 1).trim();
        if (!/<|>/.test(inner)) break;  // domain değil

        groups.unshift(inner);
        remaining = remaining.slice(0, start).trimEnd();
    }

    if (groups.length === 0) return { cleanText: text, bracketLatex: '' };

    // Her grup içindeki koşulları LaTeX operatörleriyle değiştir
    const groupsLatex = groups.map(groupStr => {
        // Üst-düzey virgülden ayır
        const conds = [];
        let d = 0, s = 0;
        for (let i = 0; i < groupStr.length; i++) {
            const c = groupStr[i];
            if (c === '(' || c === '[') d++;
            else if (c === ')' || c === ']') d--;
            else if (c === ',' && d === 0) { conds.push(groupStr.slice(s, i).trim()); s = i + 1; }
        }
        conds.push(groupStr.slice(s).trim());

        const condsLatex = conds.map(cond => {
            // koşul içindeki <=  >= < > sembollerini LaTeX'e çevir
            // Önce çift karakterli operatörleri, sonra tek karakterlileri
            return cond
                .replace(/<=|>=/g, op => op === '<=' ? '\\leq ' : '\\geq ')
                .replace(/(?<![<>])[<>](?!=)/g, op => op === '<' ? '<' : '>');
        });

        return condsLatex.join(',\ ');
    });

    const bracketLatex = groupsLatex.map(g => {
            // \leq, \geq ve < > sembollerini \mathrm dışına çıkar
            // Strateji: LaTeX komutlarını (\leq, \geq) ve < > karakterlerini ayıraç olarak kullan,
            // aradaki metin parçalarını \mathrm{} ile sar.
            const operatorPattern = /\\leq\s*|\\geq\s*|[<>]/g;
            let result = '';
            let lastIndex = 0;
            let m;
            while ((m = operatorPattern.exec(g)) !== null) {
                const textBefore = g.slice(lastIndex, m.index);
                if (textBefore) result += `\\mathrm{${textBefore}}`;
                result += m[0].trimEnd(); // operatörü olduğu gibi ekle
                lastIndex = operatorPattern.lastIndex;
            }
            const textAfter = g.slice(lastIndex);
            if (textAfter) result += `\\mathrm{${textAfter}}`;
            return `\\left[${result}\\right]`;
        }).join('');
    return { cleanText: remaining, bracketLatex };
}

/**
 * Kullanıcı girdisini yapısal LaTeX'e çevirir.
 *
 * @param {string} text
 * @returns {string}  — KaTeX renderlanabilir LaTeX kodu; boş string = başarısız
 */
export function equationToLatex(text) {
    if (!text || !text.trim() || !window.math) return '';
    try {
        // Unicode eşitsizlik sembolleri normalize
        const normalized = text.trim().replace(/≤/g, '<=').replace(/≥/g, '>=');

        // Domain bracket'larını soy; bracket LaTeX'ini sonraya ekleyeceğiz
        const { cleanText, bracketLatex } = _stripDomainBracketsForLatex(normalized);
        const hasBrackets = bracketLatex !== '';

        // {a,b,c} liste sözdizimi varsa → liste-farkında LaTeX üret
        if (cleanText.includes('{') && cleanText.includes('}')) {
            const listLatex = _listAwareToLatex(cleanText);
            if (listLatex) return listLatex + bracketLatex;
        }

        const t = cleanText;

        // çokgen((...), ...) veya çokgen(A, B, C)
        const polyMatch = t.match(/^çokgen\s*\((.+)\)$/s);
        if (polyMatch) {
            const polyInner = polyMatch[1].trim();
            // Koordinat çiftleri: çokgen((1,2),(3,4))
            const pairsLatex = _polygonPairsToLatex(polyInner);
            if (pairsLatex) {
                return `\\text{çokgen}${pairsLatex}`;
            }
            // İsimli referanslar: çokgen(A, B, C)
            const refsLatex = _polygonRefsToLatex(polyInner);
            if (refsLatex) {
                return `\\text{çokgen}${refsLatex}`;
            }
        }

        // İsimli nokta: A = (expr, expr)
        const namedPtMatch = t.match(/^([a-zA-ZçğıöşüÇĞİÖŞÜ_][a-zA-ZçğıöşüÇĞİÖŞÜ_0-9]*)\s*=\s*\((.+)\)$/s);
        if (namedPtMatch) {
            const _name = namedPtMatch[1];
            const _inner = namedPtMatch[2];
            let _d = 0, _c = -1;
            for (let i = 0; i < _inner.length; i++) {
                if (_inner[i] === '(') _d++;
                else if (_inner[i] === ')') _d--;
                else if (_inner[i] === ',' && _d === 0) { _c = i; break; }
            }
            if (_c !== -1) {
                const _xe = _exprToLatex(_inner.slice(0, _c).trim());
                const _ye = _exprToLatex(_inner.slice(_c + 1).trim());
                if (_xe && _ye) {
                    return `\\mathrm{${_name}} = \\left(${_xe},\\ ${_ye}\\right)`;
                }
            }
        }

        // Parametrik: (xExpr, yExpr) veya tek nokta (a, b)
        if (t.startsWith('(') && t.endsWith(')')) {
            const inner = t.slice(1, -1);
            let depth = 0, comma = -1;
            for (let i = 0; i < inner.length; i++) {
                if (inner[i] === '(') depth++;
                else if (inner[i] === ')') depth--;
                else if (inner[i] === ',' && depth === 0) { comma = i; break; }
            }
            if (comma !== -1) {
                const xe = _exprToLatex(inner.slice(0, comma).trim());
                const ye = _exprToLatex(inner.slice(comma + 1).trim());
                return xe && ye ? `\\left(${xe},\\ ${ye}\\right)` : '';
            }
        }

        // Eşitsizlik veya eşitlik operatörü: <=, >=, <, >, =
        // Önce çift-karakter (çakışma önlemek için)
        const ineqMatch = t.match(/(<=|>=|<|>|=)/);
        if (ineqMatch) {
            const op    = ineqMatch[1];
            const opIdx = t.indexOf(op);
            const lhsStr = t.slice(0, opIdx).trim();
            const rhsStr = t.slice(opIdx + op.length).trim();
            const lhs = _exprToLatex(lhsStr);
            const rhs = _exprToLatex(rhsStr);
            if (lhs && rhs) {
                const latexOp = _INEQ_LATEX[op] ?? op;
                return `${lhs} ${latexOp} ${rhs}${bracketLatex}`;
            }
        }

        return _exprToLatex(t) + bracketLatex;
    } catch { return ''; }
}

/**
 * Kullanıcı girdisini KaTeX ile DOM elementine render eder.
 *
 * Davranış:
 *   • Boş metin   → element temizlenir, false döner (placeholder görünür).
 *   • Geçerli ifade → KaTeX çıktısı, true döner.
 *   • Geçersiz/eksik ifade → \texttt{} fallback ile upright monospace render, true döner.
 *     Böylece "3sin(" gibi yarım ifadeler bile HER ZAMAN dik ve görünür.
 *
 * @param {string}      text
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function renderEquation(text, element) {
    if (!element) return false;

    // Boş → placeholder görünsün
    if (!text || !text.trim()) {
        element.innerHTML = '';
        return false;
    }

    // KaTeX yoksa ham span göster
    if (!window.katex) {
        element.innerHTML = `<span class="eq-raw-fallback">${_escapeHtml(text)}</span>`;
        return true;
    }

    // 1) Geçerli ifade → yapısal LaTeX
    const latex = equationToLatex(text);
    if (latex) {
        try {
            window.katex.render(latex, element, { throwOnError: true, displayMode: false });
            return true;
        } catch { /* geçersiz LaTeX üretildi; fallback'e düş */ }
    }

    // 2) Fallback: ham metni KaTeX_Main fontuyla dik span olarak göster.
    //    \texttt{} değil — o monospace görünür ve KaTeX render'larıyla tutarsız kalır.
    element.innerHTML = `<span class="eq-raw-fallback">${_escapeHtml(text)}</span>`;
    return true;
}

// ─── yardımcı fonksiyonlar ───────────────────────────────────────────────────

/** HTML özel karakterlerini escape eder */
function _escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * çokgen(A, B, C) gibi isimli referans listesini LaTeX'e çevirir.
 * @param {string} inner  — virgülle ayrılmış tanımlayıcılar: "A, B, C"
 * @returns {string|null}  — LaTeX dizisi veya null
 */
function _polygonRefsToLatex(inner) {
    const parts = inner.split(',').map(s => s.trim());
    if (parts.length < 2) return null;
    const ID_RE = /^[a-zA-ZçğıöşüÇĞİÖŞÜ_][a-zA-ZçğıöşüÇĞİÖŞÜ_0-9]*$/;
    for (const part of parts) {
        if (!ID_RE.test(part)) return null;
    }
    const latexParts = parts.map(p => `\\mathrm{${p}}`);
    return `\\left(${latexParts.join(',\\ ')}\\right)`;
}

/**
 * çokgen(...) içindeki (a,b), (c,d), ... çiftlerini LaTeX'e çevirir.
 * @param {string} inner  — parantez içi metin: "(a,b), (c,d), ..."
 * @returns {string|null}  — LaTeX dizisi veya null
 */
function _polygonPairsToLatex(inner) {
    const parts = [];
    let i = 0;
    const len = inner.length;

    while (i < len) {
        while (i < len && (inner[i] === ' ' || inner[i] === ',' || inner[i] === '\n')) i++;
        if (i >= len) break;
        if (inner[i] !== '(') return null;
        i++;

        let depth = 1, start = i;
        while (i < len && depth > 0) {
            if (inner[i] === '(') depth++;
            else if (inner[i] === ')') depth--;
            if (depth > 0) i++;
        }
        if (depth !== 0) return null;

        const pairInner = inner.substring(start, i).trim();
        i++;

        // Üst-düzey virgülü bul
        let d2 = 0, comma = -1;
        for (let j = 0; j < pairInner.length; j++) {
            if (pairInner[j] === '(') d2++;
            else if (pairInner[j] === ')') d2--;
            else if (pairInner[j] === ',' && d2 === 0) { comma = j; break; }
        }
        if (comma === -1) return null;

        const xL = _exprToLatex(pairInner.slice(0, comma).trim());
        const yL = _exprToLatex(pairInner.slice(comma + 1).trim());
        if (!xL || !yL) return null;

        parts.push(`\\left(${xL},\\ ${yL}\\right)`);
    }

    return parts.length > 0 ? `\\left(${parts.join(',\\ ')}\\right)` : null;
}

/**
 * {a,b,c} listesi içeren ifadeyi LaTeX'e dönüştürür.
 * Strateji: Her {…} bloğunu geçici bir placeholder değişkene (LPHX)
 * dönüştürüp mevcut equationToLatex akışından geçirir; çıktıda
 * placeholder'ları \left\{…\right\} ile değiştirir.
 *
 * @param {string} text
 * @returns {string|null}
 */
function _listAwareToLatex(text) {
    // {…} bloklarını bul
    const segments = [];
    let i = 0;
    const len = text.length;

    while (i < len) {
        if (text[i] === '{') {
            const start = i;
            i++;
            let depth = 1;
            while (i < len && depth > 0) {
                if (text[i] === '{') depth++;
                else if (text[i] === '}') depth--;
                if (depth > 0) i++;
            }
            if (depth !== 0) return null;

            const inner = text.slice(start + 1, i).trim();
            segments.push({ start, end: i + 1, inner });
            i++;
        } else {
            i++;
        }
    }

    if (segments.length === 0) return null;

    // Her {…} bloğunu placeholder ile değiştir + listeyi LaTeX'e çevir
    const placeholders = new Map(); // placeholderName → listLatex
    let replaced = text;

    // Sondan başa (indeks kayması olmasın)
    for (let j = segments.length - 1; j >= 0; j--) {
        const seg = segments[j];
        const phName = `LPHX${j}`;

        // Liste elemanlarını LaTeX'e çevir.
        // Domain bracket içeren elemanlar için bracket ayrı işlenir
        // (ör. sin(x)[-1<x<2] → sin(x) + \left[-1<x<2\right]).
        const elements = _splitListComma(seg.inner);
        const elemLatex = elements.map(e => {
            if (e.trim() === '...') return '\\ldots';
            const { cleanText: eClean, bracketLatex: eBracket } = _stripDomainBracketsForLatex(e.trim());
            return (_exprToLatex(eClean) || _escapeHtml(eClean)) + eBracket;
        });
        const listLatex = `\\left\\{${elemLatex.join(',\\ ')}\\right\\}`;
        placeholders.set(phName, listLatex);

        // Placeholder olarak ilk elemanı parantez içinde koy (math.js parse edebilsin).
        // Domain bracket içeriyorsa temiz versiyonu kullan.
        const firstElem = elements.length > 0 ? elements[0].trim() : '0';
        const { cleanText: firstElemForPlaceholder } = _stripDomainBracketsForLatex(firstElem);
        replaced = replaced.slice(0, seg.start) + `(${firstElemForPlaceholder})` + replaced.slice(seg.end);
    }

    // Normal equationToLatex akışından geçir (listeler temizlenmiş halde)
    let latex = _renderWithoutListCheck(replaced);
    if (!latex) return null;

    // İlk elemanların LaTeX render'ını bulup listeyle değiştir
    // Doğrudan strateji: her placeholder'ın ilk eleman LaTeX'ini bul
    for (let j = 0; j < segments.length; j++) {
        const phName = `LPHX${j}`;
        const listLatex = placeholders.get(phName);
        const elements = _splitListComma(segments[j].inner);
        const firstElem = elements.length > 0 ? elements[0].trim() : '0';
        const { cleanText: firstElemClean } = _stripDomainBracketsForLatex(firstElem);
        const firstElemLatex = _exprToLatex(firstElemClean);

        if (firstElemLatex) {
            // LaTeX çıktısında parantezli veya parantezsiz arayabilir
            // \\left( ... \\right) formatında olabilir
            const parenLatex = `\\left(${firstElemLatex}\\right)`;
            if (latex.includes(parenLatex)) {
                latex = latex.replace(parenLatex, listLatex);
            } else if (latex.includes(firstElemLatex)) {
                latex = latex.replace(firstElemLatex, listLatex);
            }
        }
    }

    return latex;
}

/**
 * equationToLatex'in liste kontrolünü atlayan iç versiyonu.
 * (Sonsuz döngüyü önlemek için liste kontrolü yapılmaz.)
 */
function _renderWithoutListCheck(text) {
    if (!text || !text.trim() || !window.math) return '';
    try {
        const normalized = text.trim().replace(/≤/g, '<=').replace(/≥/g, '>=');

        const { cleanText, bracketLatex } = _stripDomainBracketsForLatex(normalized);
        const t = cleanText;

        // çokgen
        const polyMatch = t.match(/^çokgen\s*\((.+)\)$/s);
        if (polyMatch) {
            const pairsLatex = _polygonPairsToLatex(polyMatch[1].trim());
            if (pairsLatex) return `\\text{çokgen}${pairsLatex}`;
        }

        // Parametrik
        if (t.startsWith('(') && t.endsWith(')')) {
            const inner = t.slice(1, -1);
            let depth = 0, comma = -1;
            for (let ii = 0; ii < inner.length; ii++) {
                if (inner[ii] === '(') depth++;
                else if (inner[ii] === ')') depth--;
                else if (inner[ii] === ',' && depth === 0) { comma = ii; break; }
            }
            if (comma !== -1) {
                const xe = _exprToLatex(inner.slice(0, comma).trim());
                const ye = _exprToLatex(inner.slice(comma + 1).trim());
                return xe && ye ? `\\left(${xe},\\ ${ye}\\right)` : '';
            }
        }

        // Eşitsizlik / eşitlik operatörü
        const ineqMatch = t.match(/(<=|>=|<|>|=)/);
        if (ineqMatch) {
            const op    = ineqMatch[1];
            const opIdx = t.indexOf(op);
            const lhsStr = t.slice(0, opIdx).trim();
            const rhsStr = t.slice(opIdx + op.length).trim();
            const lhs = _exprToLatex(lhsStr);
            const rhs = _exprToLatex(rhsStr);
            if (lhs && rhs) {
                const latexOp = _INEQ_LATEX[op] ?? op;
                return `${lhs} ${latexOp} ${rhs}${bracketLatex}`;
            }
        }

        return _exprToLatex(t) + bracketLatex;
    } catch { return ''; }
}

/**
 * Metni üst-düzey virgüllerle ayırır (liste elemanları için).
 * @param {string} text
 * @returns {string[]}
 */
function _splitListComma(text) {
    if (!text.trim()) return [];
    const parts = [];
    let depth = 0;
    let braceDepth = 0;
    let start = 0;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (ch === '{') braceDepth++;
        else if (ch === '}') braceDepth--;
        else if (ch === ',' && depth === 0 && braceDepth === 0) {
            parts.push(text.slice(start, i).trim());
            start = i + 1;
        }
    }
    const last = text.slice(start).trim();
    if (last) parts.push(last);
    return parts;
}