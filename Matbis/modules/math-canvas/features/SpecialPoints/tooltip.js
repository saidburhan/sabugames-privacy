/**
 * features/SpecialPoints/tooltip.js  —  KaTeX LaTeX Tooltip Bileşeni
 *
 * Canvas üzerinde özel nokta koordinatlarını LaTeX formatında gösteren
 * DOM tooltip. Hover (geçici) ve pin (kalıcı) modlarını destekler.
 */

export class Tooltip {

    /**
     * @param {HTMLElement} container  #canvas-container — tooltip'ler buraya eklenir
     */
    constructor(container) {
        this._container = container;

        /** Hover tooltip elementi (tek). */
        this._hoverEl = this._createElement();
        this._hoverEl.classList.add('sp-tooltip', 'sp-tooltip-hover');
        this._container.appendChild(this._hoverEl);
        this._hoverVisible = false;

        /** Pinned tooltip'ler — Map<specialPoint, HTMLElement>. */
        this._pinnedEls = new Map();
    }

    // ── Hover Tooltip ──────────────────────────────────────────

    /**
     * Hover tooltip'i gösterir.
     *
     * @param {number} sx     Ekran X (CSS px, container-relative)
     * @param {number} sy     Ekran Y (CSS px, container-relative)
     * @param {string} latex  KaTeX tarafından render edilecek LaTeX string
     */
    showHover(sx, sy, latex) {
        this._renderLatex(this._hoverEl, latex);
        this._position(this._hoverEl, sx, sy);
        this._hoverEl.classList.add('visible');
        this._hoverVisible = true;
    }

    /** Hover tooltip'i gizler. */
    hideHover() {
        if (!this._hoverVisible) return;
        this._hoverEl.classList.remove('visible');
        this._hoverVisible = false;
    }

    // ── Pinned Tooltips ────────────────────────────────────────

    /**
     * Bir noktayı "sabitle": kalıcı tooltip oluşturur.
     *
     * @param {object} point   specialPoint referansı (key olarak)
     * @param {number} sx
     * @param {number} sy
     * @param {string} latex
     */
    pin(point, sx, sy, latex) {
        if (this._pinnedEls.has(point)) return;   // zaten pinli

        const el = this._createElement();
        el.classList.add('sp-tooltip', 'sp-tooltip-pinned');
        this._container.appendChild(el);
        this._renderLatex(el, latex);
        this._position(el, sx, sy);

        // Kısa gecikmeyle görünür yap (transition tetiklemesi için)
        requestAnimationFrame(() => el.classList.add('visible'));
        this._pinnedEls.set(point, el);
    }

    /**
     * Pinned tooltip'i kaldırır.
     * @param {object} point
     */
    unpin(point) {
        const el = this._pinnedEls.get(point);
        if (!el) return;
        el.classList.remove('visible');
        // Transition bittikten sonra DOM'dan kaldır
        setTimeout(() => el.remove(), 180);
        this._pinnedEls.delete(point);
    }

    /** Bir noktanın pinlenmiş olup olmadığını döner. */
    isPinned(point) {
        return this._pinnedEls.has(point);
    }

    /**
     * Tüm pinned tooltip'lerin ekran konumlarını günceller.
     * Pan/zoom sonrası çağrılır.
     *
     * @param {object} renderer  CanvasRenderer (mathToScreen)
     */
    updatePinnedPositions(renderer) {
        for (const [point, el] of this._pinnedEls) {
            const { sx, sy } = renderer.mathToScreen(point.x, point.y);
            this._position(el, sx, sy);
        }
    }

    /** Tüm tooltip'leri kaldırır (destroy). */
    removeAll() {
        this.hideHover();
        this._hoverEl.remove();
        for (const [, el] of this._pinnedEls) el.remove();
        this._pinnedEls.clear();
    }

    // ── Internal ───────────────────────────────────────────────

    /** Yeni bir tooltip DOM elementi oluşturur. */
    _createElement() {
        const el = document.createElement('div');
        el.style.position      = 'absolute';
        el.style.pointerEvents = 'none';
        return el;
    }

    /** Tooltip'i KaTeX ile render eder. */
    _renderLatex(el, latex) {
        try {
            // KaTeX global olarak yüklü (index.html'den)
            // eslint-disable-next-line no-undef
            katex.render(latex, el, {
                throwOnError: false,
                displayMode : false,
            });
        } catch {
            el.textContent = latex;
        }
    }

    /**
     * Tooltip'i noktanın üstüne konumlar.
     * Ekran kenarlarından taşma kontrolü yapar.
     */
    _position(el, sx, sy) {
        const gap = 10;    // noktayla tooltip arası boşluk

        // Önce geçici olarak görünür yap ki boyut ölçebilelim
        const wasHidden = !el.classList.contains('visible');
        if (wasHidden) {
            el.style.visibility = 'hidden';
            el.classList.add('visible');
        }

        const cW = this._container.clientWidth;
        const cH = this._container.clientHeight;
        const tW = el.offsetWidth  || 80;
        const tH = el.offsetHeight || 30;

        if (wasHidden) {
            el.classList.remove('visible');
            el.style.visibility = '';
        }

        // Varsayılan: noktanın üstünde, yatay ortada
        let left = sx - tW / 2;
        let top  = sy - tH - gap;

        // Sağ kenar taşması
        if (left + tW > cW - 4) left = cW - tW - 4;
        // Sol kenar taşması
        if (left < 4) left = 4;
        // Üst kenar taşması → aşağıya al
        if (top < 4) top = sy + gap;
        // Alt kenar taşması
        if (top + tH > cH - 4) top = cH - tH - 4;

        el.style.left = `${left}px`;
        el.style.top  = `${top}px`;
    }
}
