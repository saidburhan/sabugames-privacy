/**
 * features/Sidebar/index.js  —  Dikey Kesit UI Modülü
 *
 * Sorumluluklar:
 *   ✓ #sidebar-body içine "Yeni Denklem Ekle" butonu ve denklem listesini yerleştirir.
 *   ✓ Her satırda renk göstergesi, girdi alanı ve silme butonu bulunur.
 *   ✓ Polar / parametrik denklemlerde parametre aralığı seçici satırı gösterilir.
 *   ✓ DOM olaylarını doğrudan tuval/renderer'a bağlamaz;
 *     yalnızca EventBus üzerinden UI olayları fırlatır.
 *   ✓ STATE_EQUATIONS_UPDATED ile satır ekler/kaldırır (mevcut input odağını korur).
 *   ✓ STATE_EQUATION_ERROR ile satır bazlı hata stilini ve aralık UI'sini günceller.
 *
 * Fırlattığı olaylar  : UI_ADD_EQUATION · UI_UPDATE_EQUATION · UI_REMOVE_EQUATION · UI_UPDATE_RANGE
 * Dinlediği olaylar   : STATE_EQUATIONS_UPDATED · STATE_EQUATION_ERROR
 */

import { eventBus } from '../../core/EventBus.js';
import { renderEquation } from '../../core/LatexRenderer.js';

/**
 * Bir sayıyı aralık inputları için görünebilir formata çevirir.
 * Geçersiz değerlerde boş string döner, nokta ondalik ayıracı olarak korunur.
 * @param {number} n
 * @returns {string}
 */
const _fmtRange = (n) => {
    if (typeof n === 'string') return n;
    if (typeof n === 'number' && isFinite(n))
        return parseFloat(n.toPrecision(6)).toString();
    return '';
};

/**
 * Tek bir computation değerini biçimlendirir.
 * @param {number|null} v
 * @returns {string}
 */
const _fmtComputationValue = (v) => {
    if (v == null || typeof v !== 'number' || Number.isNaN(v)) return 'tanımsız';
    if (!isFinite(v) || Math.abs(v) > 1e15) return 'tanımsız';
    const EPSILON = 1e-10;
    const cleaned = Math.abs(v) < EPSILON ? 0 : v;
    return parseFloat(cleaned.toPrecision(10)).toString();
};

export class Sidebar {

    /**
     * @param {HTMLElement} containerEl  Içerik enjekte edilecek element (örn. #sidebar-body)
     */
    constructor(containerEl) {
        this._container = containerEl;

        /**
         * Denklem id'si → satır DOM referansları haritası.
         * @type {Map<string, { wrap: HTMLElement, inputWrap: HTMLElement, input: HTMLInputElement, errorMsg: HTMLElement }>}
         */
        this._rows = new Map();

        this._buildShell();

        /* ── EventBus abonelikleri ─────────────────────────── */
        eventBus.on('STATE_EQUATIONS_UPDATED', (eqs) => this._syncRows(eqs));
        eventBus.on('STATE_EQUATION_ERROR',    ({ id, error, type, tMin, tMax, computationResult }) =>
            this._setError(id, error, type, tMin, tMax, computationResult)
        );
        /* Sayfa ilk yüklenince ilk satırı otomatik oluştur */
        eventBus.emit('UI_ADD_EQUATION');    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: BAŞLANGIÇ YAPISI
    // ═══════════════════════════════════════════════════════════════

    /** Eski statik içeriği temizler, liste sarmalayıcısını yerleştirir ve ilk ghost satırını ekler. */
    _buildShell() {
        this._container.innerHTML = '';

        this._listEl = document.createElement('div');
        this._listEl.id = 'eq-list';

        this._container.appendChild(this._listEl);

        /** @type {HTMLElement|null} Listenin en altındaki hayalet (ghost) satır. */
        this._ghostRow = null;
        this._ensureGhostRow();
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: SATIR SENKRONIZASYONU
    // ═══════════════════════════════════════════════════════════════

    /**
     * STATE_EQUATIONS_UPDATED geldiğinde satırları günceller.
     * — Listede artık olmayan satırları DOM'dan kaldırır.
     * — Yeni eklenen denklemler için yeni satır oluşturur.
     * — Mevcut satırlara dokunmaz (input odağı veya imleci bozulmaz).
     *
     * @param {Array<{ id, text, color, visible, error }>} eqs
     */
    _syncRows(eqs) {
        /* Ghost satırı geçici olarak kaldır — sona yeniden eklenecek */
        this._ghostRow?.remove();
        this._ghostRow = null;

        /* Silinmiş satırları temizle */
        for (const [id] of this._rows) {
            if (!eqs.find(e => e.id === id)) {
                const el = this._listEl.querySelector(`[data-eq-id="${id}"]`);
                el?.remove();
                this._rows.delete(id);
            }
        }

        /* Yeni satırları ekle (sıra korunur) */
        for (const eq of eqs) {
            if (!this._rows.has(eq.id)) {
                this._addRow(eq);
            }
        }

        /* DOM sırasını denklem dizisiyle eşitle (araya ekleme / sürükle-bırak) */
        const currentOrder  = [...this._listEl.querySelectorAll('.eq-item:not(.eq-ghost)')]
            .map(el => el.dataset.eqId);
        const expectedOrder = eqs.map(e => e.id);
        const needsReorder  = currentOrder.some((id, i) => id !== expectedOrder[i]);

        if (needsReorder) {
            /* Odağı koru: sıralama sırasında blur'u önlemek için elementin taşınmasından önce kaydet */
            const focused   = document.activeElement;
            const focusedId = focused?.closest?.('.eq-item[data-eq-id]')?.dataset.eqId;
            const selStart  = focused?.selectionStart;
            const selEnd    = focused?.selectionEnd;

            /* Tüm satırları doğru sırayla fragment'e al, sonra listeye geri ekle */
            const frag = document.createDocumentFragment();
            for (const eq of eqs) {
                const el = this._listEl.querySelector(`[data-eq-id="${eq.id}"]`);
                if (el) frag.appendChild(el);
            }
            this._listEl.appendChild(frag);

            /* Odağı geri ver */
            if (focusedId) {
                const row = this._rows.get(focusedId);
                if (row && document.activeElement !== row.input) {
                    row.input.focus();
                    if (selStart != null) {
                        try { row.input.setSelectionRange(selStart, selEnd); } catch { /* ignore */ }
                    }
                }
            }
        }

        /* Ghost satırını en sona ekle */
        this._ensureGhostRow();
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: TEK SATIR OLUŞTURMA
    // ═══════════════════════════════════════════════════════════════

    /**
     * Verilen denklem nesnesi için bir satır DOM öğesi oluşturur ve listeye ekler.
     *
     * Satır yapısı:
     *   .eq-item[data-eq-id]
     *     .eq-item-header
     *       .eq-color-dot
     *       .eq-input-wrap
     *         .eq-prefix  "y ="
     *         input.eq-input
     *       button.eq-remove-btn
     *     span.eq-error-msg
     *
     * @param {{ id: string, text: string, color: string }} eq
     */
    _addRow(eq) {
        /* ── Kök sarmalayıcı ─────────────────────────────── */
        const wrap = document.createElement('div');
        wrap.className    = 'eq-item';
        wrap.dataset.eqId = eq.id;

        /* ── Renk göstergesi ─────────────────────────────── */
        const colorDot = document.createElement('span');
        colorDot.className        = 'eq-color-dot';
        colorDot.style.background = eq.color;

        /* ── Girdi sarmalayıcısı ─────────────────────────── */
        const inputWrap = document.createElement('div');
        inputWrap.className = 'eq-input-wrap';

        const input = document.createElement('input');
        input.type        = 'text';
        input.className   = 'eq-input';

        input.value       = eq.text ?? '';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('aria-label', 'Denklem girişi');

        /* Her tuş vuruşunda: ≤/≥ → <=/>=  normalize et, event fırlat + LaTeX güncelle */
        input.addEventListener('input', () => {
            const raw = input.value;
            const normalized = raw.replace(/≤/g, '<=').replace(/≥/g, '>=');
            if (normalized !== raw) {
                // Cursor pozisyonunu koru (kaçan semboller aynı uzunlukta, sorun yok)
                const sel = input.selectionStart;
                input.value = normalized;
                try { input.setSelectionRange(sel, sel); } catch { /* ignore */ }
            }
            eventBus.emit('UI_UPDATE_EQUATION', { id: eq.id, text: input.value });
            const row = this._rows.get(eq.id);
            if (row) this._renderLatex(row, input.value);
        });

        /* Enter: sonraki satır boşsa oraya geç; doluysa araya yeni satır aç */
        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            const allItems = [...this._listEl.querySelectorAll('.eq-item:not(.eq-ghost)')];
            const idx      = allItems.findIndex(el => el.dataset.eqId === eq.id);
            const nextItem = allItems[idx + 1];
            if (nextItem) {
                const nextInput = nextItem.querySelector('.eq-input');
                if (nextInput && nextInput.value.trim() === '') {
                    nextInput.focus();
                    return;
                }
            }
            eventBus.emit('UI_INSERT_EQUATION_AFTER', eq.id);
        });

        /* Odaklanınca: ham metni göster, overlay gizle */
        input.addEventListener('focus', () => {
            const row = this._rows.get(eq.id);
            if (row) {
                row.latexPreview.classList.remove('visible');
                input.classList.remove('latex-active');
            }
        });

        /* Odak kaybedince: LaTeX overlay göster */
        input.addEventListener('blur', () => {
            const row = this._rows.get(eq.id);
            if (row) this._renderLatex(row, input.value);
        });

        /* ── Input satırı sarmalayıcısı ──────────────────── */
        const inputRow = document.createElement('div');
        inputRow.className = 'eq-input-row';
        inputRow.appendChild(input);

        /* ── KaTeX önizleme: input satırını kaplar (overlay) ── */
        const latexPreview = document.createElement('div');
        latexPreview.className = 'eq-latex-preview';
        inputRow.appendChild(latexPreview);  // inputRow içinde absolute
        inputWrap.appendChild(inputRow);

        /* Renk noktasına sürükle-bırak davranışı ata */
        this._attachDrag(eq, colorDot);

        /* ── Silme butonu ────────────────────────────────── */
        const removeBtn = document.createElement('button');
        removeBtn.className   = 'eq-remove-btn';
        removeBtn.textContent = '✕';
        removeBtn.setAttribute('aria-label', 'Denklemi sil');
        removeBtn.addEventListener('click', () => {
            eventBus.emit('UI_REMOVE_EQUATION', eq.id);
        });

        /* ── Satır başlığı (yatay sıralama) ─────────────── */
        const header = document.createElement('div');
        header.className = 'eq-item-header';
        header.appendChild(colorDot);
        header.appendChild(inputWrap);
        header.appendChild(removeBtn);

        /* ── Hata mesajı ─────────────────────────────────── */
        const errorMsg = document.createElement('span');
        errorMsg.className = 'eq-error-msg';
        errorMsg.setAttribute('role', 'alert');
        errorMsg.setAttribute('aria-live', 'polite');

        /* ── Aralık seçici satırı (polar / parametrik) ───────────── */
        const rangeRow = document.createElement('div');
        rangeRow.className = 'eq-range-row';

        const rangeMin = document.createElement('input');
        rangeMin.type      = 'text';
        rangeMin.className = 'eq-range-input';
        rangeMin.setAttribute('aria-label', 'Parametre alt sınırı');
        rangeMin.setAttribute('autocomplete', 'off');
        rangeMin.setAttribute('spellcheck', 'false');

        const rangeSep = document.createElement('span');
        rangeSep.className   = 'eq-range-sep';
        rangeSep.textContent = '≤ t ≤';

        const rangeMax = document.createElement('input');
        rangeMax.type      = 'text';
        rangeMax.className = 'eq-range-input';
        rangeMax.setAttribute('aria-label', 'Parametre üst sınırı');
        rangeMax.setAttribute('autocomplete', 'off');
        rangeMax.setAttribute('spellcheck', 'false');

        /* Aralık değişince UI_UPDATE_RANGE fırlat (change: tuş başına değil, onayında) */
        const emitRange = () => {
            const minRaw = rangeMin.value.trim();
            const maxRaw = rangeMax.value.trim();
            if (!minRaw || !maxRaw) return;

            const minNum = parseFloat(minRaw);
            const maxNum = parseFloat(maxRaw);
            // Her ikisi de sayıysa sıra kontrolü yap; en az biri ifadeyse geç
            const bothNumeric = !isNaN(minNum) && !isNaN(maxNum)
                             && String(minNum) === minRaw && String(maxNum) === maxRaw;
            if (bothNumeric && minNum >= maxNum) return;

            eventBus.emit('UI_UPDATE_RANGE', {
                id:   eq.id,
                tMin: bothNumeric ? minNum : minRaw,
                tMax: bothNumeric ? maxNum : maxRaw
            });
        };
        rangeMin.addEventListener('change', emitRange);
        rangeMax.addEventListener('change', emitRange);
        /* Enter tuşuyla da onaylansın */
        rangeMin.addEventListener('keydown', (e) => { if (e.key === 'Enter') emitRange(); });
        rangeMax.addEventListener('keydown', (e) => { if (e.key === 'Enter') emitRange(); });

        rangeRow.appendChild(rangeMin);
        rangeRow.appendChild(rangeSep);
        rangeRow.appendChild(rangeMax);
        /* Aralık satırı kart içinde, inputWrap'in alt kısmında yer alır */
        inputWrap.appendChild(rangeRow);
        /* ── Hesaplama sonuç satırı (computation) ───────────── */
        const resultRow = document.createElement('div');
        resultRow.className = 'eq-result-row';

        const resultLabel = document.createElement('span');
        resultLabel.className   = 'eq-result-label';
        resultLabel.textContent = '=';

        const resultValueEl = document.createElement('span');
        resultValueEl.className = 'eq-result-value';

        resultRow.appendChild(resultLabel);
        resultRow.appendChild(resultValueEl);
        inputWrap.appendChild(resultRow);
        /* ── Satırı birleştir ────────────────────────────────── */
        wrap.appendChild(header);
        wrap.appendChild(errorMsg);
        this._listEl.appendChild(wrap);

        /* Referansı haritaya kaydet */
        this._rows.set(eq.id, { wrap, inputWrap, colorDot, input, latexPreview, errorMsg, rangeRow, rangeMin, rangeMax, rangeSep, resultRow, resultValueEl });

        /* Yeni satır eklenince odak ver */
        input.focus();

        // İlk render (yeni eklendi — boş başlar; önceden dolu değer varsa render et)
        if (eq.text) this._renderLatex(this._rows.get(eq.id), eq.text);
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: GHOST (HAYALET) SATIRI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Listenin en altına hayalet (boş, sönük) bir satır ekler.
     * Kullanıcı bu satıra tıklayınca / odaklanınca UI_ADD_EQUATION fırlatılır;
     * gerçek bir satır oluşur ve ghost bir alt satıra kayar.
     *
     * İlk satır olduğunda (gerçek denklem yok) tam opaklıkta görünür;
     * gerçek satırların altına düşünce CSS ile sönükleşir.
     */
    _ensureGhostRow() {
        const ghost = document.createElement('div');
        ghost.className = 'eq-item eq-ghost';

        /* Renk noktası — hizalamayı korur, görünmez */
        const colorDot = document.createElement('span');
        colorDot.className = 'eq-color-dot';
        colorDot.setAttribute('aria-hidden', 'true');

        /* Input sarmalayıcısı */
        const inputWrap = document.createElement('div');
        inputWrap.className = 'eq-input-wrap';

        const inputRow = document.createElement('div');
        inputRow.className = 'eq-input-row';

        const input = document.createElement('input');
        input.type      = 'text';
        input.className = 'eq-input';

        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('aria-label', 'Yeni denklem girin');

        /* Odaklanınca yeni denklem oluştur — ghost satır _syncRows ile değişecek */
        input.addEventListener('focus', () => {
            eventBus.emit('UI_ADD_EQUATION');
        });

        const latexPreview = document.createElement('div');
        latexPreview.className = 'eq-latex-preview';

        inputRow.appendChild(input);
        inputRow.appendChild(latexPreview);
        inputWrap.appendChild(inputRow);

        /* Silme butonu placeholder — hizalamayı korur, görünmez
           Gerçek butonla aynı genişlikte olması için aynı metin (✕) verilir. */
        const removePlaceholder = document.createElement('button');
        removePlaceholder.className = 'eq-remove-btn';
        removePlaceholder.textContent = '✕';
        removePlaceholder.setAttribute('aria-hidden', 'true');
        removePlaceholder.tabIndex = -1;

        const header = document.createElement('div');
        header.className = 'eq-item-header';
        header.appendChild(colorDot);
        header.appendChild(inputWrap);
        header.appendChild(removePlaceholder);

        ghost.appendChild(header);
        this._listEl.appendChild(ghost);
        this._ghostRow = ghost;
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: SÜRÜKLE-BIRAK SIRALAMA
    // ═══════════════════════════════════════════════════════════════

    /**
     * Verilen renk noktasına fare ve dokunmatik sürükleme olaylarını bağlar.
     * @param {{ id: string }} eq
     * @param {HTMLElement}    colorDot
     */
    _attachDrag(eq, colorDot) {
        colorDot.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            this._beginDrag(eq.id, e.clientX, e.clientY);
        });

        colorDot.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            e.preventDefault();
            const t = e.touches[0];
            this._beginDrag(eq.id, t.clientX, t.clientY);
        }, { passive: false });
    }

    /**
     * Sürükleme işlemini başlatır: kayan klon oluşturur, global olayları dinler.
     * @param {string} id
     * @param {number} clientX
     * @param {number} clientY
     */
    _beginDrag(id, clientX, clientY) {
        const row = this._rows.get(id);
        if (!row) return;

        const rect = row.wrap.getBoundingClientRect();

        /* Başlangıç konumlarını kaydet — animasyon sırasında sabit hit-test referansı */
        const allRows = [...this._listEl.querySelectorAll('.eq-item:not(.eq-ghost)')];
        const rowRects = allRows.map(r => {
            const br = r.getBoundingClientRect();
            return { el: r, top: br.top, height: br.height };
        });

        /* Kayan görsel klon */
        const clone = row.wrap.cloneNode(true);
        Object.assign(clone.style, {
            position:     'fixed',
            left:         rect.left + 'px',
            top:          rect.top + 'px',
            width:        rect.width + 'px',
            margin:       '0',
            opacity:      '0.88',
            zIndex:       '1000',
            pointerEvents:'none',
            boxShadow:    '0 8px 28px rgba(0,0,0,0.55)',
            borderRadius: '8px',
            transition:   'none',
        });
        document.body.appendChild(clone);

        row.wrap.classList.add('drag-source');

        const moveHandler = (e) => this._onDragMove(e);
        const endHandler  = (e) => this._onDragEnd(e);

        this._drag = { id, clone, wrap: row.wrap, offsetY: clientY - rect.top,
                       dropIndex: null, rowRects, moveHandler, endHandler };

        document.addEventListener('mousemove',  moveHandler);
        document.addEventListener('mouseup',    endHandler);
        document.addEventListener('touchmove',  moveHandler, { passive: false });
        document.addEventListener('touchend',   endHandler);
        document.addEventListener('touchcancel',endHandler);
    }

    /**
     * Fare / parmak hareketi: klonu hareket ettirir, diğer satırları kaydırır.
     * @param {MouseEvent|TouchEvent} e
     */
    _onDragMove(e) {
        if (!this._drag) return;
        if (e.touches) e.preventDefault();

        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const { clone, wrap, offsetY, rowRects } = this._drag;

        clone.style.top = (clientY - offsetY) + 'px';

        /* Bırakma hedefini başlangıç konumlarına göre hesapla (transform'dan etkilenmez) */
        let dropIndex = rowRects.length;
        for (let i = 0; i < rowRects.length; i++) {
            if (rowRects[i].el === wrap) continue;
            if (clientY < rowRects[i].top + rowRects[i].height / 2) { dropIndex = i; break; }
        }
        this._drag.dropIndex = dropIndex;

        const sourceIndex  = rowRects.findIndex(r => r.el === wrap);
        const sourceHeight = rowRects[sourceIndex].height;

        /* Diğer satırları transform ile kaydır — kaynak satır için açıklık oluşur */
        rowRects.forEach(({ el }, i) => {
            if (el === wrap) return;
            let shift = 0;
            if (dropIndex <= sourceIndex && i >= dropIndex && i < sourceIndex) {
                shift = sourceHeight;   /* üsttekiler aşağı it */
            } else if (dropIndex > sourceIndex && i > sourceIndex && i < dropIndex) {
                shift = -sourceHeight;  /* alttakiler yukarı çek */
            }
            el.style.transform  = `translateY(${shift}px)`;
            el.style.transition = 'transform 0.15s ease';
        });
    }

    /**
     * Fare / parmak bırakma: animasyonları sıfırlar, event fırlatır, temizlik yapar.
     * @param {MouseEvent|TouchEvent} e
     */
    _onDragEnd(e) {
        if (!this._drag) return;
        const { id, clone, wrap, dropIndex, rowRects, moveHandler, endHandler } = this._drag;

        /* Kaydırma animasyonlarını temizle */
        rowRects.forEach(({ el }) => {
            el.style.transform  = '';
            el.style.transition = '';
        });

        /* Temizlik */
        clone.remove();
        wrap.classList.remove('drag-source');
        document.removeEventListener('mousemove',   moveHandler);
        document.removeEventListener('mouseup',     endHandler);
        document.removeEventListener('touchmove',   moveHandler);
        document.removeEventListener('touchend',    endHandler);
        document.removeEventListener('touchcancel', endHandler);
        this._drag = null;

        /* Sıralama değişti mi? */
        if (dropIndex == null) return;
        const rows = rowRects.map(r => r.el);
        const currentIndex = rows.indexOf(wrap);
        let newIndex = dropIndex;
        if (currentIndex < dropIndex) newIndex--;          /* kendi konumunun kayması */
        if (newIndex !== currentIndex && newIndex >= 0) {
            eventBus.emit('UI_REORDER_EQUATION', { id, newIndex });
        }
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: HATA STİLİ & ARALIK UI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Satırda hata stilini ve aralık seçiciyi günceller.
     *
     * @param {string}       id
     * @param {boolean}      error
     * @param {string|null}  type    — denklem türü (polar|parametric|computation|...|null)
     * @param {number|null}  tMin
     * @param {number|null}  tMax
     * @param {number|null}  computationResult
     */
    _setError(id, error, type, tMin, tMax, computationResult) {
        const row = this._rows.get(id);
        if (!row) return;

        /* Hata sınıfı */
        row.inputWrap.classList.toggle('error', error);
        row.colorDot.classList.toggle('has-error', error);

        /* Aralık & hesaplama UI güncelle */
        this._updateRangeUI(row, type, tMin, tMax, computationResult);
    }

    /**
     * Aralık satırını ve hesaplama sonuç satırını gösterir / gizler.
     * Yalnızca geçerli polar / parametrik denklemlerde aralık satırı,
     * computation türünde sonuç satırı görünür.
     *
     * @param {object}      row  — _rows Map girişi
     * @param {string|null} type
     * @param {number|null} tMin
     * @param {number|null} tMax
     * @param {number|number[]|null} computationResult
     */
    _updateRangeUI(row, type, tMin, tMax, computationResult) {
        /* ── Hesaplama sonuç satırı ───────────────────────── */
        const showResult = (type === 'computation' || type === 'dynamicPoint') && computationResult != null;
        row.resultRow.classList.toggle('visible', showResult);
        if (showResult) {
            // Dinamik nokta: computationResult zaten biçimlendirilmiş string
            if (typeof computationResult === 'string') {
                row.resultValueEl.textContent = computationResult;
            }
            // Liste-bazlı computation sonucu (dizi)
            else if (Array.isArray(computationResult)) {
                const formatted = computationResult.map(v => _fmtComputationValue(v));
                row.resultValueEl.textContent = `{${formatted.join(', ')}}`;
            } else {
                row.resultValueEl.textContent = _fmtComputationValue(computationResult);
            }
        }

        /* ── Aralık satırı (polar / parametrik) ────────── */
        const show = (type === 'polar' || type === 'parametric')
                     && tMin !== null && tMax !== null;

        row.rangeRow.classList.toggle('visible', show);
        if (!show) return;

        /* Ayırıcı metni: polar → θ, parametrik → t */
        row.rangeSep.textContent = type === 'polar' ? '≤ θ ≤' : '≤ t ≤';

        /* Input değerlerini yalnızca odakta değilse güncelle
           (kullanıcı yazarken üzerine yazılmasın) */
        if (document.activeElement !== row.rangeMin) {
            row.rangeMin.value = _fmtRange(tMin);
        }
        if (document.activeElement !== row.rangeMax) {
            row.rangeMax.value = _fmtRange(tMax);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: KATEX ÖNIZLEME
    // ═══════════════════════════════════════════════════════════════

    /**
     * Denklem metnini KaTeX ile önizler.
     * Geçersiz / boş girişte önizleme alanı gizlenir.
     *
     * @param {object} row  — _rows Map girişi
     * @param {string} text — input.value
     */
    _renderLatex(row, text) {
        if (!row) return;
        const ok = renderEquation(text, row.latexPreview);
        row._hasLatex = ok;
        const isFocused = document.activeElement === row.input;
        if (isFocused) {
            row.latexPreview.classList.remove('visible');
            row.input.classList.remove('latex-active');
        } else {
            row.latexPreview.classList.toggle('visible', ok);
            row.input.classList.toggle('latex-active', ok);
        }
    }
}
