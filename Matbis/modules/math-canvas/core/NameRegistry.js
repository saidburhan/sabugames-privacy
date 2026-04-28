/**
 * core/NameRegistry.js  —  İsim Tanımlama Kayıt Sistemi
 *
 * Sorumluluklar:
 *   ✓ Kullanıcı tanımlı fonksiyonları, sabitleri ve listeleri saklar.
 *   ✓ Metin düzeyinde çözümleme (text substitution) yapar.
 *   ✓ Döngüsel referans koruması sağlar.
 *   ✓ Korumalı isimleri (sistem değişkenleri ve math.js builtins) reddeder.
 *
 * Kullanım:
 *   import { nameRegistry } from './NameRegistry.js';
 *
 *   nameRegistry.clear();
 *   nameRegistry.tryRegister('eq-1', 'f(x)=x^2-3x-5');
 *   const { resolved } = nameRegistry.resolve('f(x)+1');
 *   // → '(x^2-3x-5)+1'
 */

/* ── Korumalı isimler ──────────────────────────────────────────── */

const SYSTEM_VARS = new Set(['x', 'y', 't', 'th', 'theta', 'r']);

/**
 * math.js yerleşik fonksiyon ve sabit isimleri.
 * Bu isimler kullanıcı tanımı olarak kabul edilmez.
 */
const MATH_BUILTINS = new Set([
    // Trigonometrik
    'sin', 'cos', 'tan', 'sec', 'csc', 'cot',
    'asin', 'acos', 'atan', 'atan2', 'asec', 'acsc', 'acot',
    'sinh', 'cosh', 'tanh', 'sech', 'csch', 'coth',
    'asinh', 'acosh', 'atanh', 'asech', 'acsch', 'acoth',
    // Üstel / Logaritmik
    'exp', 'log', 'log2', 'log10', 'ln', 'pow', 'sqrt', 'cbrt',
    'nthRoot', 'square', 'cube',
    // Aritmetik
    'abs', 'ceil', 'floor', 'round', 'sign', 'mod',
    'gcd', 'lcm', 'min', 'max', 'sum',
    // Sabitler
    'pi', 'e', 'i', 'Infinity', 'NaN', 'phi', 'tau',
    'LN2', 'LN10', 'LOG2E', 'LOG10E', 'SQRT2', 'SQRT1_2',
    // Diğer
    'random', 'factorial', 'gamma', 'combinations', 'permutations',
    'number', 'string', 'boolean', 'complex', 'matrix',
    'range', 'size', 'det', 'inv', 'transpose',
    // Türkçe çokgen anahtar kelimesi
    'çokgen',
]);

/** Bir ismin korumalı olup olmadığını test eder. */
function _isProtected(name) {
    if (SYSTEM_VARS.has(name)) return true;
    if (MATH_BUILTINS.has(name)) return true;
    // math.js'te tanımlı olan herhangi bir sembol
    try {
        if (typeof window.math !== 'undefined' && typeof window.math[name] !== 'undefined') return true;
    } catch { /* ignore */ }
    return false;
}

/* ── Tanım algılama regex kalıpları ──────────────────────────── */

// Türkçe harfler dahil tanımlayıcı karakter sınıfları
// \w sadece ASCII [a-zA-Z0-9_] eşler — Türkçe harfler için genişletilmesi gerekir.
const ID_START = 'a-zA-ZçğıöşüÇĞİÖŞÜ_';
const ID_CONT  = 'a-zA-ZçğıöşüÇĞİÖŞÜ_0-9';
const _NAME    = `[${ID_START}][${ID_CONT}]*`;   // gül, f_1, parabol, ...
const _PARAM   = `[${ID_CONT}]+`;                 // x, t, theta, th, ...

// Parametrik çift: (name1(param), name2(param)) = (expr1, expr2)
const RE_PARAMETRIC_PAIR = new RegExp(
    `^\\(\\s*(${_NAME})\\s*\\((${_PARAM})\\)\\s*,\\s*(${_NAME})\\s*\\((${_PARAM})\\)\\s*\\)\\s*=\\s*\\((.+)\\)$`,
    's'
);

// Fonksiyon: name(params) = body
const RE_FUNCTION = new RegExp(`^(${_NAME})\\s*\\(([^)]+)\\)\\s*=\\s*(.+)$`, 's');

// Liste: name = {elements}
const RE_LIST = new RegExp(`^(${_NAME})\\s*=\\s*(\\{.+\\})$`, 's');

// Sabit: name = expr (RHS'de sistem değişkeni olmayan)
const RE_CONSTANT = new RegExp(`^(${_NAME})\\s*=\\s*(.+)$`, 's');

/* ── Yardımcı fonksiyonlar ───────────────────────────────────── */

/**
 * Metni üst-düzey virgüllerle ayırır (parantez derinliğine dikkat eder).
 */
function _splitTopLevelComma(text) {
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

/**
 * Parametre türüne göre tanım alt tipini (defSubType) belirler.
 */
function _classifyParams(params) {
    if (params.length === 2) {
        // (x,y) veya (y,x) → implicit
        const hasX = params.includes('x');
        const hasY = params.includes('y');
        if (hasX && hasY) return 'implicit';
    }
    if (params.length === 1) {
        const p = params[0];
        if (p === 'theta' || p === 'th') return 'polar';
    }
    // Tek parametre (x, t, vs.) veya diğer → explicit
    return 'explicit';
}

/**
 * Bir metinde + sonrasında ( gelmeyen, serbest bir isim oluşumunu bulur.
 * Fonksiyon çağrısı olmayan isimleri yakalamak için.
 */
function _replaceNonCallOccurrences(text, name, replacement) {
    // name'den sonra ( gelmemelidir (fonksiyon çağrısı değil)
    // name'den önce harf, rakam veya _ gelmemelidir (kelime sınırı)
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<![a-zA-ZçğıöşüÇĞİÖŞÜ_0-9])${escaped}(?![a-zA-ZçğıöşüÇĞİÖŞÜ_0-9(])`, 'g');
    return text.replace(re, replacement);
}

/* ══════════════════════════════════════════════════════════════════
   NameRegistry Sınıfı
   ══════════════════════════════════════════════════════════════════ */

class NameRegistry {

    constructor() {
        /**
         * İsim → tanım haritası.
         * @type {Map<string, {type: string, params: string[], body: string, defSubType: string, equationId: string}>}
         */
        this._definitions = new Map();

        /**
         * Bu rebuild döngüsünde sliderScope'a yazılan sabit isimleri.
         * Bir sonraki rebuild'da temizlenmesi için saklanır.
         * @type {Set<string>}
         */
        this._registeredConstants = new Set();

        /**
         * Fonksiyon adı → domain math ifadesi haritası.
         * DomainRestriction modülü tarafından doldurulur.
         * Fonksiyon çağrısı çözümlenirken domain koşulu metne enjekte edilir.
         * @type {Map<string, string>}
         */
        this._functionDomains = new Map();

        /**
         * Fonksiyon adı → ham domain koşul grupları haritası.
         * Liste bağlamında fonksiyon çağrıları çözümlenirken bracket form
         * üretmek için kullanılır; ternary yerine `body[cond]` biçimi verilir.
         * @type {Map<string, string[][]>}
         */
        this._functionDomainGroups = new Map();
    }

    /** Tüm tanımları siler (rebuild döngüsünün başında çağrılır). */
    clear() {
        this._definitions.clear();
        this._functionDomains.clear();
        this._functionDomainGroups.clear();
        // _registeredConstants clear'de SİLİNMEZ — sliderScope temizliği
        // ayrı yapılır (clearConstantsFromScope ile)
    }

    /**
     * Bir fonksiyon için domain kısıtlama ifadesini kaydeder.
     * EquationCompiler tarafından, fonksiyon tanımı derlenirken çağrılır.
     *
     * @param {string} name            Fonksiyon adı (örn. 'f')
     * @param {string} domainMathExpr  math.js boolean ifadesi (örn. '-4 < x and x < 4')
     */
    setFunctionDomain(name, domainMathExpr) {
        this._functionDomains.set(name, domainMathExpr);
    }

    /**
     * Bir fonksiyon için ham domain koşul gruplarını kaydeder.
     * Liste bağlamında bracket form üretmek için kullanılır.
     *
     * @param {string}   name         Fonksiyon adı (örn. 'f')
     * @param {string[][]} domainGroups Ham koşul grupları (örn. [['x<=-3']])
     */
    setFunctionDomainRaw(name, domainGroups) {
        this._functionDomainGroups.set(name, domainGroups);
    }

    /**
     * sliderScope'tan önceki rebuild'da eklenen sabitleri temizler.
     * @param {object} scope  — sliderScope referansı
     */
    clearConstantsFromScope(scope) {
        for (const name of this._registeredConstants) {
            delete scope[name];
        }
        this._registeredConstants.clear();
    }

    /**
     * Bir denklem metnini parse edip tanım olarak kaydetmeyi dener.
     *
     * @param {string} equationId  — denklem ID'si
     * @param {string} text        — ham denklem metni
     * @returns {{ isDef: boolean, defInfo: object|null }}
     *   isDef: true ise tanım olarak kaydedildi
     *   defInfo: { name, type, params, body, defSubType, compilableText }
     */
    tryRegister(equationId, text) {
        if (!text || !text.trim()) return { isDef: false, defInfo: null };

        const trimmed = text.trim();

        // ── 1) Parametrik çift ────────────────────────────────
        const paramPairMatch = trimmed.match(RE_PARAMETRIC_PAIR);
        if (paramPairMatch) {
            const name1 = paramPairMatch[1];
            const param1 = paramPairMatch[2];
            const name2 = paramPairMatch[3];
            const param2 = paramPairMatch[4];
            const rhsInner = paramPairMatch[5];

            // İsimleri kontrol et
            if (_isProtected(name1) || _isProtected(name2)) {
                return { isDef: false, defInfo: null };
            }

            // Zaten kayıtlıysa, tanım olarak kabul etme (kullanım olacak)
            if (this._definitions.has(name1) || this._definitions.has(name2)) {
                return { isDef: false, defInfo: null };
            }

            // RHS'deki iki ifadeyi ayır (top-level comma)
            const rhsParts = _splitTopLevelComma(rhsInner);
            if (rhsParts.length !== 2) return { isDef: false, defInfo: null };

            const bodyX = rhsParts[0];
            const bodyY = rhsParts[1];

            // Her iki fonksiyonu ayrı kaydet
            this._definitions.set(name1, {
                type: 'function',
                params: [param1],
                body: bodyX,
                defSubType: 'explicit',
                equationId,
            });
            this._definitions.set(name2, {
                type: 'function',
                params: [param2],
                body: bodyY,
                defSubType: 'explicit',
                equationId,
            });

            return {
                isDef: true,
                defInfo: {
                    name: `(${name1},${name2})`,
                    type: 'parametric-pair',
                    params: [param1],
                    body: null,
                    bodyX,
                    bodyY,
                    defSubType: 'parametric',
                    compilableText: `(${bodyX}, ${bodyY})`,
                },
            };
        }

        // ── 2) Fonksiyon ─────────────────────────────────────
        const funcMatch = trimmed.match(RE_FUNCTION);
        if (funcMatch) {
            const name = funcMatch[1];
            const paramsStr = funcMatch[2];
            const body = funcMatch[3].trim();

            if (_isProtected(name)) return { isDef: false, defInfo: null };
            if (this._definitions.has(name)) return { isDef: false, defInfo: null };

            const params = paramsStr.split(',').map(s => s.trim()).filter(Boolean);
            const defSubType = _classifyParams(params);

            this._definitions.set(name, {
                type: 'function',
                params,
                body,
                defSubType,
                equationId,
            });

            // Compilable text: tanım satırının kendisi de çizilsin
            let compilableText;
            if (defSubType === 'implicit') {
                compilableText = `${body}=0`;
            } else if (defSubType === 'polar') {
                compilableText = `r=${body}`;
            } else {
                // explicit (veya t parametreli)
                compilableText = body;
            }

            return {
                isDef: true,
                defInfo: {
                    name,
                    type: 'function',
                    params,
                    body,
                    defSubType,
                    compilableText,
                },
            };
        }

        // ── 3) Liste ─────────────────────────────────────────
        const listMatch = trimmed.match(RE_LIST);
        if (listMatch) {
            const name = listMatch[1];
            const body = listMatch[2]; // {1,2,3} dahil süslü parantezlerle

            if (_isProtected(name)) return { isDef: false, defInfo: null };
            if (this._definitions.has(name)) return { isDef: false, defInfo: null };

            this._definitions.set(name, {
                type: 'list',
                params: [],
                body,    // süslü parantez dahil: "{1,2,3}"
                defSubType: 'list',
                equationId,
            });

            return {
                isDef: true,
                defInfo: {
                    name,
                    type: 'list',
                    params: [],
                    body,
                    defSubType: 'list',
                    compilableText: null, // liste satırı grafik olarak çizilmez
                },
            };
        }

        // ── 4) Sabit ─────────────────────────────────────────
        const constMatch = trimmed.match(RE_CONSTANT);
        if (constMatch) {
            const name = constMatch[1];
            const body = constMatch[2].trim();

            if (_isProtected(name)) return { isDef: false, defInfo: null };
            if (this._definitions.has(name)) return { isDef: false, defInfo: null };

            // RHS'de sistem değişkeni varsa sabit değil
            for (const sv of SYSTEM_VARS) {
                const re = new RegExp(`\\b${sv}\\b`);
                if (re.test(body)) return { isDef: false, defInfo: null };
            }

            // RHS'de liste sözdizimi varsa sabit değil (yukarıda yakalanmış olmalı ama garanti)
            if (body.includes('{')) return { isDef: false, defInfo: null };

            this._definitions.set(name, {
                type: 'constant',
                params: [],
                body,
                defSubType: 'computation',
                equationId,
            });

            return {
                isDef: true,
                defInfo: {
                    name,
                    type: 'constant',
                    params: [],
                    body,
                    defSubType: 'computation',
                    compilableText: body,
                },
            };
        }

        return { isDef: false, defInfo: null };
    }

    /**
     * Metindeki tanımlı isimleri çözümler (text substitution).
     *
     * @param {string} text           — çözümlenecek ifade
     * @param {Set<string>} [visited] — döngü koruması (iç kullanım)
     * @returns {{ resolved: string, usedDefSubTypes: Set<string> }}
     */
    resolve(text, visited) {
        if (!text || !text.trim()) return { resolved: text, usedDefSubTypes: new Set() };

        const usedDefSubTypes = new Set();
        let result = text;

        // A) Fonksiyon çağrıları: tek geçiş (recursive descent kendi içinde döngü korumalı)
        result = this._resolveFunctionCalls(result, visited || new Set(), usedDefSubTypes);

        // B+C) Liste ve sabit isimlerini iteratif çözümle (yakınsamaya kadar)
        const maxIter = 10;
        for (let iter = 0; iter < maxIter; iter++) {
            const prev = result;

            result = this._resolveNonCalls(result, 'list', usedDefSubTypes);
            result = this._resolveNonCalls(result, 'constant', usedDefSubTypes);

            if (result === prev) break;
        }

        return { resolved: result, usedDefSubTypes };
    }

    /**
     * Liste elemanı bağlamında tanımlı isimleri çözümler.
     * Domain-kısıtlı fonksiyon çağrıları ternary yerine bracket form üretir
     * (`body[cond]`), böylece _compileWithList rawEvaluateFn ve domainEndpoints'i
     * düzgün kurabilir.
     *
     * @param {string} text           — çözümlenecek ifade
     * @param {Set<string>} [visited] — döngü koruması (iç kullanım)
     * @returns {{ resolved: string, usedDefSubTypes: Set<string> }}
     */
    resolveForList(text, visited) {
        if (!text || !text.trim()) return { resolved: text, usedDefSubTypes: new Set() };

        const usedDefSubTypes = new Set();
        let result = text;

        result = this._resolveFunctionCalls(result, visited || new Set(), usedDefSubTypes, true);

        const maxIter = 10;
        for (let iter = 0; iter < maxIter; iter++) {
            const prev = result;
            result = this._resolveNonCalls(result, 'list', usedDefSubTypes);
            result = this._resolveNonCalls(result, 'constant', usedDefSubTypes);
            if (result === prev) break;
        }

        return { resolved: result, usedDefSubTypes };
    }

    /**
     * Fonksiyon çağrılarını çözümler: name(args) → (body with substituted params)
     *
     * @param {boolean} [listMode=false]
     *   true ise: domain-kısıtlı fonksiyon çağrıları ternary yerine bracket form
     *   üretir (`body[cond]`). Bu sayede liste elemanları rawEvaluateFn ve
     *   domainEndpoints'ten yararlanabilir.
     * @private
     */
    _resolveFunctionCalls(text, visited, usedDefSubTypes, listMode = false) {
        let result = text;

        // Tüm kayıtlı fonksiyonları tara (en uzun isim önce — greedy match)
        const funcNames = [];
        for (const [name, def] of this._definitions) {
            if (def.type === 'function') funcNames.push(name);
        }
        // Uzun isimler önce (kısa isim uzun ismin prefix'i olabilir)
        funcNames.sort((a, b) => b.length - a.length);

        for (const name of funcNames) {
            if (visited.has(name)) continue;

            const def = this._definitions.get(name);

            // Tüm çağrı konumlarını topla (soldan sağa)
            const occurrences = [];
            let startPos = 0;
            while (startPos < result.length) {
                const idx = this._findFunctionCall(result, name, startPos);
                if (idx === -1) break;

                const argsStart = idx + name.length + 1; // '(' sonrası
                let depth = 1;
                let i = argsStart;
                while (i < result.length && depth > 0) {
                    if (result[i] === '(') depth++;
                    else if (result[i] === ')') depth--;
                    i++;
                }
                if (depth !== 0) { startPos = idx + 1; continue; }

                const argsText = result.slice(argsStart, i - 1);
                occurrences.push({ callStart: idx, callEnd: i, argsText });
                startPos = i; // bir sonraki arama bu çağrıdan sonra başlar
            }

            // Sağdan sola değiştir (indeks kayması önlenir)
            for (let o = occurrences.length - 1; o >= 0; o--) {
                const { callStart, callEnd, argsText } = occurrences[o];
                const args = _splitTopLevelComma(argsText);

                // Body'deki parametreleri argümanlarla değiştir
                let substituted = def.body;
                for (let p = 0; p < def.params.length; p++) {
                    const param = def.params[p];
                    const arg = args[p] ?? '0';
                    const paramEscaped = param.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const paramRe = new RegExp(`(?<![a-zA-ZçğıöşüÇĞİÖŞÜ_])${paramEscaped}(?![a-zA-ZçğıöşüÇĞİÖŞÜ_])`, 'g');
                    substituted = substituted.replace(paramRe, `(${arg})`);
                }

                // Domain kısıtlaması varsa: liste bağlamında bracket ekle;
                // normal bağlamda ternary injection ile NaN → null davranışı.
                if (listMode && this._functionDomainGroups.has(name)) {
                    // Liste bağlamı: body[cond] → _compileWithList rawEvaluateFn ve
                    // domainEndpoints düzgün kurabilsin.
                    const rawGroups = this._functionDomainGroups.get(name);
                    const bracketStr = rawGroups.map(group =>
                        '[' + group.map(cond => {
                            let c = cond;
                            for (let p = 0; p < def.params.length; p++) {
                                const param = def.params[p];
                                const arg = args[p] ?? '0';
                                const paramEscaped = param.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                const paramRe = new RegExp(`(?<![a-zA-ZçğıöşüÇĞİÖŞÜ_])${paramEscaped}(?![a-zA-ZçğıöşüÇĞİÖŞÜ_])`, 'g');
                                c = c.replace(paramRe, `(${arg})`);
                            }
                            return c;
                        }).join(',') + ']'
                    ).join('');
                    substituted = substituted + bracketStr;
                } else if (this._functionDomains.has(name)) {
                    // Normal bağlam: domain ifadesine de parametre
                    // değişimi uygula, ardından koşullu ifadeye sar.
                    // Dışarıda kalan noktalarda (0/0) → NaN → evaluateFn null döner.
                    let domainExpr = this._functionDomains.get(name);
                    for (let p = 0; p < def.params.length; p++) {
                        const param = def.params[p];
                        const arg = args[p] ?? '0';
                        const paramEscaped = param.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const paramRe = new RegExp(`(?<![a-zA-ZçğıöşüÇĞİÖŞÜ_])${paramEscaped}(?![a-zA-ZçğıöşüÇĞİÖŞÜ_])`, 'g');
                        domainExpr = domainExpr.replace(paramRe, `(${arg})`);
                    }
                    // 'y' domain koşulunda varsa ve fonksiyonun parametresi değilse
                    // (örn. f(x)=x^2[y<2] → y fonksiyon çıktısını temsil eder),
                    // gövde değeriyle (substituted) değiştir. Böylece f(1) çağrısında
                    // domain koşulu sayısal olarak değerlendirilebilir.
                    if (!def.params.includes('y')) {
                        const yRe = /(?<![a-zA-ZçğıöşüÇĞİÖŞÜ_])y(?![a-zA-ZçğıöşüÇĞİÖŞÜ_0-9])/g;
                        domainExpr = domainExpr.replace(yRe, `(${substituted})`);
                    }
                    substituted = `(${domainExpr} ? ${substituted} : (0/0))`;
                }

                // Recursive resolve — bu fonksiyonu visited'a ekle
                const innerVisited = new Set(visited);
                innerVisited.add(name);
                const { resolved: innerResolved, usedDefSubTypes: innerUsed } =
                    listMode
                        ? this.resolveForList(substituted, innerVisited)
                        : this.resolve(substituted, innerVisited);
                for (const st of innerUsed) usedDefSubTypes.add(st);

                usedDefSubTypes.add(def.defSubType);

                result = result.slice(0, callStart) + `(${innerResolved})` + result.slice(callEnd);
            }
        }

        return result;
    }

    /**
     * Metinde isim( kalıbını kelime sınırıyla bulur.
     * @private
     * @param {string} text
     * @param {string} name
     * @param {number} [from=0] Aramaya başlanacak indeks
     * @returns {number} Başlangıç indeksi veya -1
     */
    _findFunctionCall(text, name, from = 0) {
        let startPos = from;
        while (startPos < text.length) {
            const idx = text.indexOf(name + '(', startPos);
            if (idx === -1) return -1;

            // Kelime sınırı kontrolü: önceki karakter harf veya _ olmamalı
            // (rakam olabilir — 2f(x) = 2*f(x) implicit çarpma)
            if (idx > 0) {
                const prevChar = text[idx - 1];
                if (/[a-zA-ZçğıöşüÇĞİÖŞÜ_]/.test(prevChar)) {
                    startPos = idx + 1;
                    continue;
                }
            }

            return idx;
        }
        return -1;
    }

    /**
     * Fonksiyon çağrısı olmayan isimleri (liste / sabit) çözümler.
     * @private
     */
    _resolveNonCalls(text, targetType, usedDefSubTypes) {
        let result = text;

        for (const [name, def] of this._definitions) {
            if (def.type !== targetType) continue;

            const replacement = targetType === 'constant' ? `(${def.body})` : def.body;
            const newResult = _replaceNonCallOccurrences(result, name, replacement);

            if (newResult !== result) {
                usedDefSubTypes.add(def.defSubType);
                result = newResult;
            }
        }

        return result;
    }

    /** İsim kayıtlı mı? */
    isRegistered(name) {
        return this._definitions.has(name);
    }

    /** Tanım objesini döndürür veya undefined. */
    getDefinition(name) {
        return this._definitions.get(name);
    }

    /** Tüm kayıtlı isimleri döndürür. */
    getAll() {
        return new Map(this._definitions);
    }

    /** Tüm kayıtlı isim setini döndürür (extractFreeVars filtresi için). */
    getRegisteredNames() {
        return new Set(this._definitions.keys());
    }

    /**
     * Bir sabitin değerini sliderScope'a yazar.
     * @param {string} name
     * @param {number} value
     * @param {object} scope  — sliderScope referansı
     */
    registerConstantValue(name, value, scope) {
        scope[name] = value;
        this._registeredConstants.add(name);
    }
}

/* ── Singleton export ──────────────────────────────────────────── */
export const nameRegistry = new NameRegistry();
