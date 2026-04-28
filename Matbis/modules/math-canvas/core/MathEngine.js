/**
 * MathEngine.js
 *
 * math.js kütüphanesi üzerine inşa edilmiş matematiksel ifade motoru.
 *
 * Sorumluluklar:
 *   - Denklem metnini analiz ederek türünü belirleme
 *     (explicit, polar, parametric, implicit)
 *   - Türe göre uygun derleme (compile) yapma ve evaluateFn üretme
 *   - Eksik / hatalı giriş durumlarında sistemin çökmesini önleme
 *
 * Desteklenen türler:
 *   explicit    : y = f(x) veya f(x)            → evaluateFn(x)    => number|null
 *   polar       : r = f(th) veya r = f(theta)   → evaluateFn(th)   => {x,y}|null
 *   parametric  : (xExpr, yExpr)  (t değişkeni)  → evaluateFn(t)    => {x,y}|null
 *   implicit    : g(x,y) = h(x,y)               → evaluateFn(x,y)  => number|null
 *   polygon     : (a,b) veya çokgen((...),...)    → evaluateFn()     => [{x,y}, ...]
 *
 * Bağımlılık: window.math  (math.js CDN üzerinden yüklenir)
 */

import { sliderScope } from './SliderScope.js';
import { nameRegistry } from './NameRegistry.js';

/* Sistem / yerleşik değişkenler — slider için aday değil */
const SYSTEM_VARS = new Set(['x', 'y', 't', 'th', 'theta', 'r']);

/**
 * Bir metinde belirli bir değişkenin (x, y, r vb.) bağımsız kullanımını
 * tespit eder. \b kalıbı "2x" gibi örtük çarpmada başarısız olduğundan,
 * lookbehind / lookahead kullanılır.
 */
const hasVarX = (s) => /(?<![a-zA-Z_])x(?![a-zA-Z0-9_])/.test(s);
const hasVarY = (s) => /(?<![a-zA-Z_])y(?![a-zA-Z0-9_])/.test(s);

export class MathEngine {

    constructor() {
        /** @type {object|null} Eski API için derlenmiş ifade. */
        this._compiled = null;
        /** @type {string} Son başarılı derlemenin ham string'i. */
        this._lastValidExpr = '';
    }

    // ═══════════════════════════════════════════════════════════════
    //  METİN ANALİZİ — parseEquation
    // ═══════════════════════════════════════════════════════════════

    /**
     * Kullanıcının girdiği metni analiz ederek denklem türünü ve
     * ayrıştırılmış ifade bileşenlerini döndürür.
     *
     * Kural sırası (ilk eşleşen kazanır):
     *   -1. dinamik(a,b) formatı       → dynamicPoint
     *   0. çokgen((...), ...) formatı  → polygon
     *   1. (expr, expr) + t değişkeni  → parametric
     *   1b. (sabit, sabit) — t yoksa   → polygon (tek nokta)
     *   2. r ve th/theta değişkeni     → polar
     *   3. y = f(x) formatı            → explicit
     *   4. = işareti + x veya y varsa  → implicit
     *   5. Diğer                       → explicit
     *
     * @param {string} text  Kullanıcının yazdığı ham metin
     * @returns {{ type: 'explicit'|'polar'|'parametric'|'implicit'|'error', ... }}
     */
    parseEquation(text) {
        if (!text || !text.trim()) {
            return { type: 'error', reason: 'empty' };
        }

        // Unicode eşitsizlik sembollerini ASCII eşdeğerlerine normalize et
        const trimmed = text.trim()
            .replace(/≤/g, '<=')
            .replace(/≥/g, '>=');

        // ── Kural -1: Dinamik Nokta ───────────────────────────
        const dynamicResult = this._tryParseDynamicPoint(trimmed);
        if (dynamicResult) return dynamicResult;

        // ── Kural 0: Polygon (çokgen / tek nokta) ─────────────
        const polygonResult = this._tryParsePolygon(trimmed);
        if (polygonResult) return polygonResult;

        // ── Kural 1: Parametric ─────────────────────────────────
        const paramResult = this._tryParseParametric(trimmed);
        if (paramResult) return paramResult;

        // ── Kural 2: Polar ──────────────────────────────────────
        const polarResult = this._tryParsePolar(trimmed);
        if (polarResult) return polarResult;

        // ── Kural 2b: Çift-taraflı eşitsizlik (a op1 expr op2 b) ─────────
        const compoundResult = this._tryParseCompoundInequality(trimmed);
        if (compoundResult) return compoundResult;

        // ── Kural 3 & 4: karşılaştırma operatörü varsa ────────────────────────
        // Önce çift-karakter operatörler (çakışma önlemek için uzundan kısaya)
        const OP_RE = /(<=|>=|<|>|=)/;
        const opMatch = trimmed.match(OP_RE);
        if (opMatch) {
            const opStr   = opMatch[1];
            const opIndex = trimmed.indexOf(opStr);
            const lhs     = trimmed.substring(0, opIndex).trim();
            const rhs     = trimmed.substring(opIndex + opStr.length).trim();

            // y = f(x) formatı → explicit (yalnızca tam eşitlik ve rhs'de y yoksa)
            if (opStr === '=' && lhs === 'y' && !hasVarY(rhs)) {
                return { type: 'explicit', expr: rhs };
            }

            // x veya y içeriyorsa → implicit (eşitsizlik dahil)
            const fullExpr = lhs + ' ' + rhs;
            if (hasVarX(fullExpr) || hasVarY(fullExpr)) {
                return { type: 'implicit', lhs, rhs, operator: opStr };
            }
        }

        // ── Kural 4b: Computation (saf hesaplama) ─────────────
        const compResult = this._tryParseComputation(trimmed);
        if (compResult) return compResult;

        // ── Kural 5: Explicit ───────────────────────────────────
        return { type: 'explicit', expr: trimmed };
    }

    // ── Parametric algılama yardımcıları ────────────────────────

    /**
     * Metnin parametrik denklem olup olmadığını test eder.
     * Kalıp: (xExpr, yExpr)  –  t değişkeni içermelidir.
     *
     * @private
     * @param {string} text
     * @returns {{ type:'parametric', xExpr:string, yExpr:string }|null}
     */
    _tryParseParametric(text) {
        if (!text.startsWith('(') || !text.endsWith(')')) return null;

        const inner = text.slice(1, -1).trim();
        const commaIndex = this._findTopLevelComma(inner);
        if (commaIndex === -1) return null;

        const xExpr = inner.substring(0, commaIndex).trim();
        const yExpr = inner.substring(commaIndex + 1).trim();

        if (!xExpr || !yExpr) return null;

        // En az birinde t değişkeni bulunmalı.
        // Not: \bt\b yetersiz; "3t^2" gibi ifadelerde 3 ve t arasında \b yok.
        // Harf/_ ile başlamayan ve alfanümerik/_ ile bitmeyen t aranır.
        const hasTvar = (s) => /(?<![a-zA-Z_])t(?![a-zA-Z0-9_])/.test(s);
        if (!hasTvar(xExpr) && !hasTvar(yExpr)) return null;

        return { type: 'parametric', xExpr, yExpr };
    }

    /**
     * İç içe parantezleri dikkate alarak en üst seviyedeki
     * ilk virgülün indeksini döndürür.
     *
     * @private
     * @param {string} text
     * @returns {number} Virgül indeksi veya -1
     */
    _findTopLevelComma(text) {
        let depth = 0;
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === '(') depth++;
            else if (ch === ')') depth--;
            else if (ch === ',' && depth === 0) return i;
        }
        return -1;
    }

    // ── Polygon algılama yardımcısı ─────────────────────────────

    /**
     * Metnin dinamik nokta ifadesi olup olmadığını test eder.
     *
     * Kalıplar:
     *   dinamik(a, b)                    → Basit: iki bağımsız slider değişkeni
     *   dinamik(sin(7*pi*a), cos(5*pi*a))→ Parametrik: ifadeler içinde slider var
     *   dinamik(m, f(m))                 → Fonksiyon: resolve edilmiş ifade
     *
     * @private
     * @param {string} text
     * @returns {{ type:'dynamicPoint', xExpr:string, yExpr:string }|null}
     */
    _tryParseDynamicPoint(text) {
        const m = text.match(/^dinamik\s*\((.+)\)$/s);
        if (!m) return null;

        const inner = m[1].trim();
        const commaIndex = this._findTopLevelComma(inner);
        if (commaIndex === -1) return null;

        const xExpr = inner.substring(0, commaIndex).trim();
        const yExpr = inner.substring(commaIndex + 1).trim();
        if (!xExpr || !yExpr) return null;

        return { type: 'dynamicPoint', xExpr, yExpr };
    }

    /**
     * Metnin çokgen / tek nokta ifadesi olup olmadığını test eder.
     *
     * Kalıplar:
     *   çokgen((a,b), (c,d), ...)   → N≥2 köşeli çokgen / doğru parçası
     *   (sabit, sabit)              → Tek nokta (t değişkeni YOKSA)
     *
     * @private
     * @param {string} text
     * @returns {{ type:'polygon', points: Array<{xExpr:string, yExpr:string}> }|null}
     */
    _tryParsePolygon(text) {
        // ── çokgen(...) formatı ──────────────────────────────────
        const polyMatch = text.match(/^çokgen\s*\((.+)\)$/s);
        if (polyMatch) {
            const inner = polyMatch[1].trim();
            const pairs = this._extractCoordPairs(inner);
            if (pairs && pairs.length >= 2) {
                return { type: 'polygon', points: pairs };
            }
            return null;
        }

        // ── Tek nokta: (expr, expr) — t değişkeni YOKSA ─────────
        if (text.startsWith('(') && text.endsWith(')')) {
            const inner = text.slice(1, -1).trim();
            const commaIndex = this._findTopLevelComma(inner);
            if (commaIndex === -1) return null;

            const xExpr = inner.substring(0, commaIndex).trim();
            const yExpr = inner.substring(commaIndex + 1).trim();
            if (!xExpr || !yExpr) return null;

            // t değişkeni varsa → parametric'e bırak
            const hasTvar = (s) => /(?<![a-zA-Z_])t(?![a-zA-Z0-9_])/.test(s);
            if (hasTvar(xExpr) || hasTvar(yExpr)) return null;

            // x veya y değişkeni varsa → implicit/explicit'e bırak
            if (hasVarX(xExpr + yExpr) || hasVarY(xExpr + yExpr)) return null;

            return { type: 'polygon', points: [{ xExpr, yExpr }] };
        }

        return null;
    }

    /**
     * "(a,b), (c,d), ..." biçimindeki metinden koordinat çiftlerini çıkarır.
     * İç içe parantezleri dikkate alır.
     *
     * @private
     * @param {string} text
     * @returns {Array<{xExpr:string, yExpr:string}>|null}
     */
    _extractCoordPairs(text) {
        const pairs = [];
        let i = 0;
        const len = text.length;

        while (i < len) {
            // Boşlukları ve virgülleri atla
            while (i < len && (text[i] === ' ' || text[i] === ',' || text[i] === '\n' || text[i] === '\r' || text[i] === '\t')) i++;
            if (i >= len) break;

            // Açılış parantezi bekleniyor
            if (text[i] !== '(') return null;
            i++; // '(' atla

            // Kapanış parantezini bul (iç içe parantez dikkate alınır)
            let depth = 1;
            let start = i;
            while (i < len && depth > 0) {
                if (text[i] === '(') depth++;
                else if (text[i] === ')') depth--;
                if (depth > 0) i++;
            }
            if (depth !== 0) return null;

            const pairInner = text.substring(start, i).trim();
            i++; // ')' atla

            // İç kısımdaki üst-düzey virgülü bul
            const commaIdx = this._findTopLevelComma(pairInner);
            if (commaIdx === -1) return null;

            const xExpr = pairInner.substring(0, commaIdx).trim();
            const yExpr = pairInner.substring(commaIdx + 1).trim();
            if (!xExpr || !yExpr) return null;

            pairs.push({ xExpr, yExpr });
        }

        return pairs.length > 0 ? pairs : null;
    }

    // ── Computation algılama yardımcısı ──────────────────────────

    /**
     * Metnin saf hesaplama ifadesi olup olmadığını test eder.
     * x, y, t, th, theta, r gibi sistem değişkenleri içermemeli;
     * karşılaştırma operatörü (=, <, >, <=, >=) bulunmamalı;
     * math.js ile sonlu bir sayıya değerlenmeli.
     *
     * @private
     * @param {string} text
     * @returns {{ type:'computation', expr:string }|null}
     */
    _tryParseComputation(text) {
        // Sistem değişkeni varsa hesaplama değil
        for (const v of SYSTEM_VARS) {
            const re = new RegExp(`\\b${v}\\b`);
            if (re.test(text)) return null;
        }

        // Not: Karşılaştırma operatörü olan ifadeler (örn. domain-sarmalı fonksiyon çağrıları)
        // burada reddedilmez; math.evaluate boolean döndürürse typeof!=='number' ile elenirler.

        try {
            // Bilinmeyen serbest değişkenleri 0 ile doldur;
            // slider henüz oluşturulmamış olabilir ama ifade sözdizimi geçerliyse
            // computation olarak işaretleyelim.
            const freeVars = this.extractFreeVars(text, null);
            const scope = { ...sliderScope };
            for (const v of freeVars) {
                if (!(v in scope)) scope[v] = 0;
            }
            const result = math.evaluate(text, scope);
            // NaN dahil her sayısal sonuç geçerli hesaplama.
            // NaN → "tanımsız" (domain dışı fonksiyon çağrılarında oluşur).
            if (typeof result === 'number') {
                return { type: 'computation', expr: text };
            }
        } catch { /* geçersiz ifade — hesaplama değil */ }

        return null;
    }

    // ── Çift-taraflı eşitsizlik algılama yardımcısı ────────────────

    /**
     * Metnin çift-taraflı eşitsizlik olup olmadığını test eder.
     * Kalıp: a op1 expr op2 b  (örn. -1 < x <= 3, 0 <= y < 5)
     * Her iki op da aynı yönde olmalı (</<= veya >/>= ).
     *
     * @private
     * @param {string} text
     * @returns {{ type:'implicit', kind:'compound', ... }|null}
     */
    _tryParseCompoundInequality(text) {
        // Üst-düzey eşitsizlik operatörlerini bul (parantez içini atla)
        const ineqOps = [];
        let depth = 0;
        let i = 0;
        while (i < text.length) {
            const ch = text[i];
            if (ch === '(' || ch === '[') { depth++; i++; continue; }
            if (ch === ')' || ch === ']') { depth--; i++; continue; }
            if (depth !== 0) { i++; continue; }
            if (ch === '<' && text[i + 1] === '=') {
                ineqOps.push({ op: '<=', index: i, len: 2 }); i += 2; continue;
            }
            if (ch === '>' && text[i + 1] === '=') {
                ineqOps.push({ op: '>=', index: i, len: 2 }); i += 2; continue;
            }
            if (ch === '<') {
                ineqOps.push({ op: '<', index: i, len: 1 }); i++; continue;
            }
            if (ch === '>') {
                ineqOps.push({ op: '>', index: i, len: 1 }); i++; continue;
            }
            i++;
        }

        if (ineqOps.length !== 2) return null;

        const [o1, o2] = ineqOps;
        const p0 = text.substring(0, o1.index).trim();
        const p1 = text.substring(o1.index + o1.len, o2.index).trim();
        const p2 = text.substring(o2.index + o2.len).trim();

        if (!p0 || !p1 || !p2) return null;

        // Yönlerin tutarlı olması gerekir (</<= veya >/>= )
        const isLt = (op) => op === '<' || op === '<=';
        const isGt = (op) => op === '>' || op === '>=';
        if (!((isLt(o1.op) && isLt(o2.op)) || (isGt(o1.op) && isGt(o2.op)))) return null;

        // En az birinde x veya y olmalı
        const fullExpr = p0 + ' ' + p1 + ' ' + p2;
        if (!hasVarX(fullExpr) && !hasVarY(fullExpr)) return null;

        // f1 = rhs1 - lhs1 > 0 (veya >= 0) ← sol koşul
        // f2 = rhs2 - lhs2 > 0 (veya >= 0) ← sağ koşul
        const strict = (op) => op === '<' || op === '>';
        let lhs1, rhs1, lhs2, rhs2;

        if (isLt(o1.op)) {
            // p0 < p1: f1 = p1 - p0; f1 > 0 ↔ p1 > p0
            lhs1 = p0; rhs1 = p1;
        } else {
            // p0 > p1: f1 = p0 - p1; f1 > 0 ↔ p0 > p1
            lhs1 = p1; rhs1 = p0;
        }

        if (isLt(o2.op)) {
            // p1 < p2: f2 = p2 - p1
            lhs2 = p1; rhs2 = p2;
        } else {
            // p1 > p2: f2 = p1 - p2
            lhs2 = p2; rhs2 = p1;
        }

        const fillOp1 = strict(o1.op) ? '>' : '>=';
        const fillOp2 = strict(o2.op) ? '>' : '>=';

        return {
            type: 'implicit',
            kind: 'compound',
            lhs1, rhs1, op1: fillOp1,
            lhs2, rhs2, op2: fillOp2,
        };
    }

    // ── Polar algılama yardımcısı ───────────────────────────────

    /**
     * Metnin polar denklem olup olmadığını test eder.
     * İçinde bağımsız r ve th/theta değişkenleri aranır.
     * x veya y de geçiyorsa polar kabul edilmez.
     *
     * @private
     * @param {string} text
     * @returns {{ type:'polar', rExpr:string }|null}
     */
    _tryParsePolar(text) {
        const hasR  = /\br\b/.test(text);
        const hasTh = /\bth\b/.test(text) || /\btheta\b/.test(text);

        if (!hasR || !hasTh) return null;

        // x veya y de varsa polar değil — implicit/explicit olabilir
        if (hasVarX(text) || hasVarY(text)) return null;

        // r = expr formatı
        const match = text.match(/^\s*r\s*=\s*(.+)$/);
        if (match) {
            return { type: 'polar', rExpr: match[1].trim() };
        }

        // = işareti yoksa tamamı r ifadesi olarak ele alınır
        return { type: 'polar', rExpr: text };
    }

    // ═══════════════════════════════════════════════════════════════
    //  BİRLEŞİK DERLEME — compile()
    // ═══════════════════════════════════════════════════════════════

    /**
     * Metni analiz edip türe göre derler.
     * Başarılıysa { type, evaluateFn } döndürür; hatalıysa null.
     *
     * @param {string} text  Kullanıcı girdisi
     * @returns {{ type: string, evaluateFn: Function }|null}
     */
    compile(text) {
        const parsed = this.parseEquation(text);
        if (parsed.type === 'error') return null;

        // Serbest değişkenler için geçici scope oluştur.
        // sliderScope henüz bu değişkenleri içermeyebilir;
        // doğrulama adımında hata olmasın diye 0 ile dolduruyoruz.
        this._validationScope = this._buildValidationScope(text);

        try {
            switch (parsed.type) {
                case 'dynamicPoint': return this._compileDynamicPoint(parsed.xExpr, parsed.yExpr);
                case 'polygon':     return this._compilePolygon(parsed.points);
                case 'explicit':    return this._compileExplicit(parsed.expr);
                case 'polar':       return this._compilePolar(parsed.rExpr);
                case 'parametric':  return this._compileParametric(parsed.xExpr, parsed.yExpr);
                case 'implicit':
                    if (parsed.kind === 'compound') {
                        return this._compileCompoundImplicit(
                            parsed.lhs1, parsed.rhs1, parsed.op1,
                            parsed.lhs2, parsed.rhs2, parsed.op2
                        );
                    }
                    return this._compileImplicit(parsed.lhs, parsed.rhs, parsed.operator ?? '=');
                case 'computation': return this._compileComputation(parsed.expr);
                default:            return null;
            }
        } catch (_err) {
            return null;
        }
    }

    /**
     * İfadedeki serbest değişkenler için doğrulama scope'u oluşturur.
     * sliderScope'taki değerleri kullanır; eksik olanları 0 ile doldurur.
     * @private
     */
    _buildValidationScope(text) {
        const freeVars = this.extractFreeVars(text, null);
        const scope = { ...sliderScope };
        for (const v of freeVars) {
            if (!(v in scope)) scope[v] = 0;
        }
        return scope;
    }
    // ── DynamicPoint derleme ─────────────────────────────────

    /**
     * Dinamik nokta ifadelerini derler.
     * Basit durum (her iki ifade yalnızca değişken adı) ile
     * ifade tabanlı durumu (parametrik/fonksiyon) ayırt eder.
     *
     * @private
     * @param {string} xExpr  X koordinat ifadesi
     * @param {string} yExpr  Y koordinat ifadesi
     * @returns {object|null}
     */
    _compileDynamicPoint(xExpr, yExpr) {
        try {
            const compiledX = math.compile(xExpr);
            const compiledY = math.compile(yExpr);

            // İfade başına serbest değişkenleri tespit et
            const xFreeVars = this._extractExprFreeVars(xExpr);
            const yFreeVars = this._extractExprFreeVars(yExpr);

            // Doğrulama — birden fazla test değeri dener.
            // Domain kısıtlı fonksiyonlar bazı slider değerlerinde NaN (0/0) döndürebilir;
            // tek bir test noktası yanlış "geçersiz" kararı verebilir.
            // Örn: dinamik(a, f(a)) — f domain'i [-2,3) iken a=-4 geçersiz ama a=1 geçerlidir.
            // En az bir test değerinde her iki ifade de sonlu sayı veriyorsa geçerli kabul edilir.
            const uniqueFreeVars = [...new Set([...xFreeVars, ...yFreeVars])];
            const baseScope = { ...this._validationScope };
            const testScopes = [
                baseScope,
                ...([0, 0.5, 1, 1.5, 2, -0.5, -1, -1.5, -2, 3, -3].map(v => {
                    const s = {};
                    for (const fv of uniqueFreeVars) s[fv] = v;
                    return s;
                }))
            ];
            let validated = false;
            for (const testScope of testScopes) {
                try {
                    const xVal = compiledX.evaluate({ ...testScope });
                    const yVal = compiledY.evaluate({ ...testScope });
                    if (typeof xVal === 'number' && isFinite(xVal) &&
                        typeof yVal === 'number' && isFinite(yVal)) {
                        validated = true;
                        break;
                    }
                } catch { /* bu test değeri başarısız, sonrakini dene */ }
            }
            if (!validated) return null;

            // Basit durum tespiti: her iki ifade yalnızca değişken adı mı?
            const bareVarRe = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
            const isSimple = bareVarRe.test(xExpr) && bareVarRe.test(yExpr)
                && xExpr !== yExpr
                && !SYSTEM_VARS.has(xExpr) && !SYSTEM_VARS.has(yExpr);

            // Her çağrıda sliderScope ile canlı hesaplar
            const evaluateFn = () => {
                try {
                    const s = { ...sliderScope };
                    const x = compiledX.evaluate(s);
                    const y = compiledY.evaluate(s);
                    if (typeof x !== 'number' || !isFinite(x)) return null;
                    if (typeof y !== 'number' || !isFinite(y)) return null;
                    return { x, y };
                } catch { return null; }
            };

            // Belirli değişken değerlerini override ederek hesaplar
            // (parametrik sürükleme için gerekli)
            const evaluateWith = (overrides) => {
                try {
                    const s = { ...sliderScope, ...overrides };
                    const x = compiledX.evaluate(s);
                    const y = compiledY.evaluate(s);
                    if (typeof x !== 'number' || !isFinite(x)) return null;
                    if (typeof y !== 'number' || !isFinite(y)) return null;
                    return { x, y };
                } catch { return null; }
            };

            return {
                type: 'dynamicPoint',
                evaluateFn,
                evaluateWith,
                xExpr,
                yExpr,
                isSimple,
                simpleVarX: isSimple ? xExpr : null,
                simpleVarY: isSimple ? yExpr : null,
                xFreeVars,
                yFreeVars,
            };
        } catch {
            return null;
        }
    }

    /**
     * Tek bir ifadedeki serbest değişkenleri döndürür.
     * extractFreeVars'ın tek-ifade versiyonu.
     * @private
     * @param {string} expr
     * @returns {string[]}
     */
    _extractExprFreeVars(expr) {
        try {
            const node = math.parse(expr);
            const symbols = new Set();
            node.traverse(n => { if (n.isSymbolNode) symbols.add(n.name); });
            const registeredNames = nameRegistry.getRegisteredNames();
            const result = [];
            for (const name of symbols) {
                if (SYSTEM_VARS.has(name)) continue;
                if (typeof math[name] !== 'undefined') continue;
                if (registeredNames.has(name)) continue;
                result.push(name);
            }
            return result;
        } catch {
            return [];
        }
    }
    // ── Polygon derleme ─────────────────────────────────────────

    /**
     * Nokta ifadelerini sayısal koordinatlara derler.
     * Her {xExpr, yExpr} çifti math.evaluate ile hesaplanır.
     *
     * @private
     * @param {Array<{xExpr:string, yExpr:string}>} pointExprs
     * @returns {{ type:'polygon', evaluateFn: () => Array<{x:number,y:number}> }|null}
     */
    _compilePolygon(pointExprs) {
        // Her koordinat ifadesini derle (math.compile ile)
        // Doğrulama: validationScope ile bir kez test et
        const pairs = [];

        for (const { xExpr, yExpr } of pointExprs) {
            let compiledX, compiledY;
            try {
                compiledX = math.compile(xExpr);
                compiledY = math.compile(yExpr);
                // Doğrulama — serbest değişkenler 0 kabul edilir
                const xVal = compiledX.evaluate({ ...this._validationScope });
                const yVal = compiledY.evaluate({ ...this._validationScope });
                if (typeof xVal !== 'number' || !isFinite(xVal)) return null;
                if (typeof yVal !== 'number' || !isFinite(yVal)) return null;
            } catch {
                return null;
            }
            pairs.push({ compiledX, compiledY });
        }

        // evaluateFn her çağrıda sliderScope ile canlı hesaplar
        const evaluateFn = () => {
            const pts = [];
            for (const { compiledX, compiledY } of pairs) {
                try {
                    const x = compiledX.evaluate({ ...sliderScope });
                    const y = compiledY.evaluate({ ...sliderScope });
                    if (typeof x !== 'number' || !isFinite(x)) return null;
                    if (typeof y !== 'number' || !isFinite(y)) return null;
                    pts.push({ x, y });
                } catch { return null; }
            }
            return pts;
        };

        return { type: 'polygon', evaluateFn };
    }

    // ── Explicit derleme ────────────────────────────────────────

    /**
     * y = f(x) formatındaki ifadeyi derler.
     * @private
     * @returns {{ type:'explicit', evaluateFn: (x:number)=>number|null }}
     */
    _compileExplicit(expr) {
        const compiled = math.compile(expr);
        // Doğrulama: x = 0 ile test et
        compiled.evaluate({ x: 0, ...this._validationScope });

        const evaluateFn = (x) => {
            try {
                const r = compiled.evaluate({ x, ...sliderScope });
                if (typeof r !== 'number' || !isFinite(r)) return null;
                return r;
            } catch { return null; }
        };

        return { type: 'explicit', evaluateFn };
    }

    // ── Polar derleme ───────────────────────────────────────────

    /**
     * r = f(th) formatındaki ifadeyi derler.
     * theta → th otomatik normalize edilir.
     * @private
     * @returns {{ type:'polar', evaluateFn: (th:number)=>{x,y}|null }}
     */
    _compilePolar(rExpr) {
        const normalized = rExpr.replace(/\btheta\b/g, 'th');
        const compiled = math.compile(normalized);
        // Doğrulama
        compiled.evaluate({ th: 0, ...this._validationScope });

        const evaluateFn = (th) => {
            try {
                const r = compiled.evaluate({ th, ...sliderScope });
                if (typeof r !== 'number' || !isFinite(r)) return null;
                return { x: r * Math.cos(th), y: r * Math.sin(th) };
            } catch { return null; }
        };

        return { type: 'polar', evaluateFn };
    }

    // ── Parametric derleme ──────────────────────────────────────

    /**
     * (xExpr, yExpr) formatını derler; t parametre değişkenidir.
     * @private
     * @returns {{ type:'parametric', evaluateFn: (t:number)=>{x,y}|null }}
     */
    _compileParametric(xExpr, yExpr) {
        const compiledX = math.compile(xExpr);
        const compiledY = math.compile(yExpr);
        // Doğrulama
        compiledX.evaluate({ t: 0, ...this._validationScope, ...sliderScope });
        compiledY.evaluate({ t: 0, ...this._validationScope, ...sliderScope });

        const evaluateFn = (t) => {
            try {
                const x = compiledX.evaluate({ t, ...sliderScope });
                const y = compiledY.evaluate({ t, ...sliderScope });
                if (typeof x !== 'number' || !isFinite(x)) return null;
                if (typeof y !== 'number' || !isFinite(y)) return null;
                return { x, y };
            } catch { return null; }
        };

        return { type: 'parametric', evaluateFn };
    }

    // ── Computation derleme ─────────────────────────────────────

    /**
     * Saf hesaplama ifadesini derler.
     * Slider değişkenleriyle birlikte sonlu bir sayı üretir.
     * @private
     * @returns {{ type:'computation', evaluateFn: ()=>number|null }}
     */
    _compileComputation(expr) {
        const compiled = math.compile(expr);
        // Doğrulama
        compiled.evaluate({ ...this._validationScope });

        const evaluateFn = () => {
            try {
                const r = compiled.evaluate({ ...sliderScope });
                // NaN dahil her sayısal sonuç döndür.
                // NaN → Sidebar'da _fmtComputationValue(NaN) → 'tanımsız' olarak gösterilir.
                // (domain dışı fonksiyon çağrıları NaN üretir)
                if (typeof r !== 'number') return null;
                return r;
            } catch { return null; }
        };

        return { type: 'computation', evaluateFn };
    }

    // ── Compound implicit derleme ────────────────────────────────

    /**
     * Çift-taraflı eşitsizliği iki ayrı evaluateFn ile derler.
     * f1 = rhs1 - lhs1 ve f2 = rhs2 - lhs2; doldurma op1/op2 ile belirlenir.
     * @private
     */
    _compileCompoundImplicit(lhs1, rhs1, op1, lhs2, rhs2, op2) {
        const expr1 = `(${rhs1}) - (${lhs1})`;
        const expr2 = `(${rhs2}) - (${lhs2})`;
        const compiled1 = math.compile(expr1);
        const compiled2 = math.compile(expr2);
        // Doğrulama
        compiled1.evaluate({ x: 0, y: 0, ...this._validationScope });
        compiled2.evaluate({ x: 0, y: 0, ...this._validationScope });

        const evaluateFn = (x, y) => {
            try {
                const r = compiled1.evaluate({ x, y, ...sliderScope });
                if (typeof r !== 'number') return null;
                return r;
            } catch { return null; }
        };

        const evaluateFn2 = (x, y) => {
            try {
                const r = compiled2.evaluate({ x, y, ...sliderScope });
                if (typeof r !== 'number') return null;
                return r;
            } catch { return null; }
        };

        return { type: 'implicit', evaluateFn, evaluateFn2, operator: 'compound', op1, op2 };
    }

    // ── Implicit derleme ────────────────────────────────────────

    /**
     * g(x,y) = h(x,y) formatını f(x,y) = g - h = 0 biçimine çevirip derler.
     * @private
     * @returns {{ type:'implicit', evaluateFn: (x:number,y:number)=>number|null }}
     */
    _compileImplicit(lhs, rhs, operator = '=') {
        const expr = `(${lhs}) - (${rhs})`;
        const compiled = math.compile(expr);
        // Doğrulama
        compiled.evaluate({ x: 0, y: 0, ...this._validationScope });

        const evaluateFn = (x, y) => {
            try {
                const r = compiled.evaluate({ x, y, ...sliderScope });
                if (typeof r !== 'number') return null;
                return r;
            } catch { return null; }
        };

        return { type: 'implicit', evaluateFn, operator };
    }

    // ═══════════════════════════════════════════════════════════════
    //  ESKİ API (geriye uyumluluk)
    // ═══════════════════════════════════════════════════════════════

    /** @deprecated compile() kullanın. */
    compileEquation(expression) {
        if (!expression || !expression.trim()) {
            this._compiled = null;
            return null;
        }
        try {
            const compiled = math.compile(expression.trim());
            this._compiled      = compiled;
            this._lastValidExpr = expression.trim();
            return { compiled, expression: expression.trim() };
        } catch (_err) {
            this._compiled = null;
            return null;
        }
    }

    /** @deprecated compile() ile dönen evaluateFn kullanın. */
    evaluate(x) {
        if (!this._compiled) return null;
        try {
            const result = this._compiled.evaluate({ x });
            if (typeof result !== 'number') return null;
            if (!isFinite(result))          return null;
            return result;
        } catch (_err) {
            return null;
        }
    }

    /** Derlenmiş ifade geçerli mi? */
    get isValid() {
        return this._compiled !== null;
    }

    /** Son başarıyla derlenen ifade string'i. */
    get lastExpression() {
        return this._lastValidExpr;
    }

    // ═══════════════════════════════════════════════════════════════
    //  SERBEST DEĞİŞKEN TESPİTİ
    // ═══════════════════════════════════════════════════════════════

    /**
     * Denklem metnindeki "serbest değişkenleri" (slider adayları) döndürür.
     * Sistem değişkenleri (x, y, t, th, theta, r) ve math.js yerleşik
     * sabitleri/fonksiyonları (pi, e, sin, cos, …) filtrelenir.
     *
     * @param {string} text  — ham denklem metni
     * @param {string|null} type — denklem türü (explicit|polar|parametric|implicit|polygon)
     * @returns {string[]}  Serbest değişken isimleri
     */
    extractFreeVars(text, type) {
        if (!text || !text.trim()) return [];

        try {
            // Unicode eşitsizlik normalize
            let cleaned = text.trim()
                .replace(/≤/g, '<=')
                .replace(/≥/g, '>=');

            // çokgen(...) → içeriği al
            const polyMatch = cleaned.match(/^çokgen\s*\((.+)\)$/s);
            if (polyMatch) cleaned = polyMatch[1];

            // dinamik(xExpr, yExpr) → köşeli parantezle sar (math.js geçerli sözdizimi)
            const dynMatch = cleaned.match(/^dinamik\s*\((.+)\)$/s);
            if (dynMatch) cleaned = '[' + dynMatch[1] + ']';

            // Operatörleri ayır (= → -), implicit/explicit LHS=RHS
            cleaned = cleaned.replace(/(<=|>=|<|>|=)/g, '+');

            // Polar: theta → th
            cleaned = cleaned.replace(/\btheta\b/g, 'th');

            // Parametrik (xExpr,yExpr) formatı math.js için geçersiz sözdizimi;
            // math.js yalnızca [a,b] matris sözdizimini destekler.
            // Dış parantezleri köşeli paranteze çevirerek geçerli kılıyoruz.
            // Ancak yalnızca dıştaki ( ve ) gerçekten eşleşen bir çift ise dönüştür.
            // Örn: "(x-a)^2+4c*(y-b)" → başlangıç ( ve bitiş ) eşleşmez.
            if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
                let depth = 1;
                let isOuterPair = true;
                for (let i = 1; i < cleaned.length - 1; i++) {
                    if (cleaned[i] === '(') depth++;
                    else if (cleaned[i] === ')') depth--;
                    if (depth === 0) { isOuterPair = false; break; }
                }
                if (isOuterPair) {
                    cleaned = '[' + cleaned.slice(1, -1) + ']';
                }
            }
            const node = math.parse(cleaned);

            const symbols = new Set();
            node.traverse((n) => {
                if (n.isSymbolNode) symbols.add(n.name);
            });

            // Filtrele
            const registeredNames = nameRegistry.getRegisteredNames();
            const result = [];
            for (const name of symbols) {
                if (SYSTEM_VARS.has(name)) continue;
                // math.js yerleşik mi? (pi, e, sin, cos, log, …)
                if (typeof math[name] !== 'undefined') continue;
                // NameRegistry'de kayıtlı isim mi? (fonksiyon, sabit, liste)
                if (registeredNames.has(name)) continue;
                result.push(name);
            }

            return result;
        } catch {
            return [];
        }
    }
}
