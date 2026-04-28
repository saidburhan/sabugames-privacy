/**
 * features/Slider/index.js  —  Slider & Animasyon Yöneticisi
 *
 * Sorumluluklar:
 *   ✓ Denklemlerdeki serbest değişkenleri (x, y, t, th, theta, r dışı) tespit eder.
 *   ✓ Her değişken için yapılandırma formu (min / max / step) gösterir.
 *   ✓ Yapılandırma onaylandıktan sonra kaydırıcı (range input) ve animasyon butonu sunar.
 *   ✓ Animasyon: verilen aralıkta artan yönde ilerler, max'a ulaşınca durur.
 *   ✓ Aynı değişken birden fazla denklemde kullanılırsa tek slider hepsini etkiler.
 *   ✓ Parametrik/kutupsal aralık inputlarına yazılan değişkenler de slider'a bağlanabilir.
 *
 * Fırlattığı olaylar  : SLIDER_VALUE_CHANGED
 * Dinlediği olaylar   : STATE_FREE_VARS_UPDATED · STATE_EQUATIONS_UPDATED
 */

import { eventBus }    from '../../core/EventBus.js';
import { sliderScope } from '../../core/SliderScope.js';

export class SliderManager {

    /**
     * @param {HTMLElement} parentEl  Sidebar body — slider bölümü bunun altına eklenir
     */
    constructor(parentEl) {
        this._parentEl = parentEl;

        /**
         * Slider bilgisi haritası.
         * @type {Map<string, {
         *   min: number, max: number, step: number, value: number,
         *   configured: boolean, animating: boolean, rafId: number|null,
         *   elements: { wrap, configForm, control, rangeInput, label, playBtn }
         * }>}
         */
        this._sliders = new Map();

        /**
         * Hangi denklem hangi serbest değişkenleri kullanıyor.
         * @type {Map<string, string[]>}
         */
        this._equationVars = new Map();

        /**
         * Denklem başına debounce timer ID'leri.
         * Kullanıcı yazmayı bitirene kadar slider oluşturma ertelenir.
         * @type {Map<string, number>}
         */
        this._debounceTimers = new Map();

        /**
         * Son STATE_CHANGED'den gelen dynamicPoint curve'larının cache'i.
         * Slider onay doğrulaması için evaluateWith'e ihtiyaç duyar.
         * @type {Array<object>}
         */
        this._dynPointCurves = [];

        this._buildSection();

        /* ── EventBus abonelikleri ─────────────────────────── */
        eventBus.on('STATE_FREE_VARS_UPDATED',  (data) => this._onFreeVarsUpdated(data));
        eventBus.on('STATE_EQUATIONS_UPDATED',   (eqs) => this._onEquationsUpdated(eqs));
        eventBus.on('STATE_CHANGED', (curves) => {
            this._dynPointCurves = curves.filter(c => c.type === 'dynamicPoint');
        });
    }

    // ═══════════════════════════════════════════════════════════════
    //  DOM YAPISI
    // ═══════════════════════════════════════════════════════════════

    /** Slider bölümünü (başlık + liste) oluşturur. */
    _buildSection() {
        this._sectionEl = document.createElement('div');
        this._sectionEl.id = 'slider-section';
        this._sectionEl.style.display = 'none'; // slider yokken gizli

        const title = document.createElement('div');
        title.className   = 'slider-section-title';
        title.textContent = 'Değişkenler';

        this._listEl = document.createElement('div');
        this._listEl.className = 'slider-list';

        this._sectionEl.appendChild(title);
        this._sectionEl.appendChild(this._listEl);
        this._parentEl.appendChild(this._sectionEl);
    }

    /** Bölüm görünürlüğünü slider sayısına göre günceller. */
    _updateVisibility() {
        this._sectionEl.style.display = this._sliders.size > 0 ? '' : 'none';
    }

    // ═══════════════════════════════════════════════════════════════
    //  OLAY İŞLEYİCİLERİ
    // ═══════════════════════════════════════════════════════════════

    /**
     * Bir denklemin serbest değişkenleri değiştiğinde çağrılır.
     * Kullanıcı yazmayı bitirene kadar (700 ms sessizlik) beklenir;
     * bu süre içinde yeni bir güncelleme gelirse timer sıfırlanır.
     */
    _onFreeVarsUpdated({ id, vars }) {
        if (this._debounceTimers.has(id)) {
            clearTimeout(this._debounceTimers.get(id));
        }
        const timer = setTimeout(() => {
            this._debounceTimers.delete(id);
            this._applyFreeVarsUpdate(id, vars);
        }, 700);
        this._debounceTimers.set(id, timer);
    }

    /**
     * Debounce süresi dolduktan sonra çalışan gerçek işlem.
     */
    _applyFreeVarsUpdate(id, vars) {
        this._equationVars.set(id, vars);

        // Tüm denklemlerdeki benzersiz değişken kümesi
        const allVars = this._getAllVars();

        // Yeni değişkenler → DOM'a ekle
        for (const varName of allVars) {
            if (!this._sliders.has(varName)) {
                this._createSliderItem(varName);
            }
        }

        // Artık hiçbir denklemde bulunmayan değişkenler → kaldır
        for (const [varName, s] of this._sliders) {
            if (!allVars.has(varName)) {
                this._removeSliderItem(varName, s);
            }
        }

        this._updateVisibility();
    }

    /**
     * Denklem listesi güncellendi — silinmiş denklemleri tespit et.
     */
    _onEquationsUpdated(eqs) {
        const activeIds = new Set(eqs.map(e => e.id));

        // Silinen denklemlerin bekleyen debounce timer'larını iptal et
        for (const [eqId, timer] of this._debounceTimers) {
            if (!activeIds.has(eqId)) {
                clearTimeout(timer);
                this._debounceTimers.delete(eqId);
            }
        }

        // Silinen denklemleri equationVars'tan temizle
        for (const [eqId] of this._equationVars) {
            if (!activeIds.has(eqId)) {
                this._equationVars.delete(eqId);
            }
        }

        // Artık hiçbir denklemde bulunmayan değişkenleri kaldır
        const allVars = this._getAllVars();
        for (const [varName, s] of this._sliders) {
            if (!allVars.has(varName)) {
                this._removeSliderItem(varName, s);
            }
        }

        this._updateVisibility();
    }

    /**
     * Tüm denklemlerin serbest değişkenlerinin birleşim kümesini döndürür.
     * @returns {Set<string>}
     */
    _getAllVars() {
        const all = new Set();
        for (const vars of this._equationVars.values()) {
            for (const v of vars) all.add(v);
        }
        return all;
    }

    // ═══════════════════════════════════════════════════════════════
    //  SLIDER DOM ÖĞESİ OLUŞTURMA
    // ═══════════════════════════════════════════════════════════════

    /**
     * Bir değişken için slider yapılandırma formu / kontrol öğesi oluşturur.
     */
    _createSliderItem(varName) {
        const wrap = document.createElement('div');
        wrap.className      = 'slider-item';
        wrap.dataset.varName = varName;

        // ── Yapılandırma formu ──────────────────────────────
        const configForm = document.createElement('div');
        configForm.className = 'slider-config-form';

        const configTitle = document.createElement('span');
        configTitle.className   = 'slider-config-title';
        configTitle.textContent = `${varName}`;

        const minInput = document.createElement('input');
        minInput.type        = 'number';
        minInput.className   = 'slider-config-input';
        minInput.placeholder = 'min';
        minInput.setAttribute('step', 'any');
        minInput.setAttribute('aria-label', `${varName} alt sınır`);

        const maxInput = document.createElement('input');
        maxInput.type        = 'number';
        maxInput.className   = 'slider-config-input';
        maxInput.placeholder = 'max';
        maxInput.setAttribute('step', 'any');
        maxInput.setAttribute('aria-label', `${varName} üst sınır`);

        const stepInput = document.createElement('input');
        stepInput.type        = 'number';
        stepInput.className   = 'slider-config-input';
        stepInput.placeholder = 'adım';
        stepInput.setAttribute('step', 'any');
        stepInput.setAttribute('aria-label', `${varName} adım değeri`);

        const confirmBtn = document.createElement('button');
        confirmBtn.className   = 'slider-confirm-btn';
        confirmBtn.textContent = 'Onayla';

        confirmBtn.addEventListener('click', () => {
            const min  = parseFloat(minInput.value);
            const max  = parseFloat(maxInput.value);
            const step = parseFloat(stepInput.value);
            if (isNaN(min) || isNaN(max) || isNaN(step)) return;
            if (min >= max || step <= 0) return;
            this._onConfirm(varName, min, max, step);
        });

        // Enter tuşuyla da onaylansın
        const handleEnter = (e) => { if (e.key === 'Enter') confirmBtn.click(); };
        minInput.addEventListener('keydown', handleEnter);
        maxInput.addEventListener('keydown', handleEnter);
        stepInput.addEventListener('keydown', handleEnter);

        configForm.appendChild(configTitle);
        configForm.appendChild(minInput);
        configForm.appendChild(maxInput);
        configForm.appendChild(stepInput);
        configForm.appendChild(confirmBtn);

        // ── Slider kontrol alanı (başlangıçta gizli) ────────
        const control = document.createElement('div');
        control.className = 'slider-control';
        control.style.display = 'none';

        const labelEl = document.createElement('span');
        labelEl.className = 'slider-label';
        labelEl.textContent = `${varName} = 0`;

        const rangeInput = document.createElement('input');
        rangeInput.type      = 'range';
        rangeInput.className = 'slider-range';
        rangeInput.setAttribute('aria-label', `${varName} değeri`);

        rangeInput.addEventListener('input', () => {
            this._onRangeInput(varName, parseFloat(rangeInput.value));
        });

        const playBtn = document.createElement('button');
        playBtn.className   = 'slider-play-btn';
        playBtn.textContent = '▶';
        playBtn.setAttribute('aria-label', 'Animasyonu başlat');

        playBtn.addEventListener('click', () => {
            const s = this._sliders.get(varName);
            if (!s) return;
            if (s.animating) {
                this._stopAnimation(varName);
            } else {
                this._startAnimation(varName);
            }
        });

        const editBtn = document.createElement('button');
        editBtn.className   = 'slider-edit-btn';
        editBtn.textContent = '✎';
        editBtn.setAttribute('aria-label', 'Aralığı düzenle');

        editBtn.addEventListener('click', () => {
            const s = this._sliders.get(varName);
            if (!s) return;
            // Animasyon varsa durdur
            if (s.animating) this._stopAnimation(varName);
            // Mevcut değerleri forma doldur
            s.elements.minInput.value  = String(s.min);
            s.elements.maxInput.value  = String(s.max);
            s.elements.stepInput.value = String(s.step);
            // Kontrolü gizle, formu göster
            s.elements.control.style.display    = 'none';
            s.elements.configForm.style.display = '';
            s.elements.minInput.focus();
        });

        control.appendChild(labelEl);
        control.appendChild(rangeInput);
        control.appendChild(playBtn);
        control.appendChild(editBtn);

        // ── Birleştir ───────────────────────────────────────
        wrap.appendChild(configForm);
        wrap.appendChild(control);
        this._listEl.appendChild(wrap);

        // Haritaya kaydet
        this._sliders.set(varName, {
            min: 0, max: 1, step: 0.1, value: 0,
            configured: false,
            animating: false,
            rafId: null,
            elements: { wrap, configForm, control, rangeInput, label: labelEl, playBtn, editBtn,
                        minInput, maxInput, stepInput }
        });
        // Not: odak çalmak yerine slider sessizce açılır;
        // kullanıcı hazır olduğunda formu kendisi doldurur.
    }

    /**
     * Bir slider öğesini DOM'dan ve haritadan kaldırır.
     */
    _removeSliderItem(varName, s) {
        if (s.animating) this._stopAnimation(varName);
        s.elements.wrap.remove();
        this._sliders.delete(varName);
        delete sliderScope[varName];
    }

    // ═══════════════════════════════════════════════════════════════
    //  YAPILANDIRMA ONAYI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Kullanıcı min/max/step değerlerini onayladığında çağrılır.
     */
    _onConfirm(varName, min, max, step) {
        const s = this._sliders.get(varName);
        if (!s) return;

        // ── Doğrulama: tüm [min, max] aralığında dinamik nokta tanımlı mı? ─
        // Bu değişkeni kullanan ve diğer TÜM serbest değişkenleri zaten
        // konfigüre edilmiş (sliderScope'ta mevcut) curve'ları bul.
        // Örn: dinamik(a,b) — 'a' onaylanırken 'b' henüz scope'ta yoksa
        //      bu curve atlanır (eksik değişken yüzünden yanlış hata çıkmasın).
        const dynCurves = this._dynPointCurves.filter(c => {
            if (!c.freeVars || !c.freeVars.includes(varName)) return false;
            const otherVars = c.freeVars.filter(v => v !== varName);
            return otherVars.every(v => v in sliderScope);
        });

        if (dynCurves.length > 0) {
            // Aralığı sabit sayıda adımla tara (yeterli çözünürlük için 200 nokta).
            // evaluateWith doğrudan çağrılır — EventBus/rebuild maliyeti yok.
            const SCAN_COUNT  = 200;
            const prevVal = sliderScope[varName]; // mevcut değeri sakla
            let badVal = null;

            outer: for (let i = 0; i <= SCAN_COUNT; i++) {
                const t = min + (max - min) * i / SCAN_COUNT;
                for (const curve of dynCurves) {
                    const pos = curve.evaluateWith({ [varName]: t });
                    if (pos === null) {
                        badVal = t;
                        break outer;
                    }
                }
            }

            // Scope'u önceki değere geri al (tarama scope'u kirletmesin).
            if (prevVal === undefined) delete sliderScope[varName];
            else sliderScope[varName] = prevVal;

            if (badVal !== null) {
                // Config formda hata mesajı göster (varsa güncelle).
                let errorEl = s.elements.configForm.querySelector('.slider-config-error');
                if (!errorEl) {
                    errorEl = document.createElement('span');
                    errorEl.className = 'slider-config-error';
                    errorEl.style.cssText = 'color:#f87171;font-size:0.75rem;display:block;margin-top:4px;';
                    s.elements.configForm.appendChild(errorEl);
                }
                errorEl.textContent = `${varName} = ${this._fmtValue(badVal)} noktasında tanımsız`;
                return;
            }
        }

        // ── Hata mesajını temizle (önceki başarısız denemeden kalmışsa) ───
        const prevErrorEl = s.elements.configForm.querySelector('.slider-config-error');
        if (prevErrorEl) prevErrorEl.remove();

        // ── Normal onaylama akışı ─────────────────────────────────────────
        s.min        = min;
        s.max        = max;
        s.step       = step;
        s.value      = min;
        s.configured = true;

        sliderScope[varName] = min;

        // DOM: formu gizle, kontrolü göster
        s.elements.configForm.style.display = 'none';
        s.elements.control.style.display    = '';

        // Range input ayarları
        s.elements.rangeInput.min   = String(min);
        s.elements.rangeInput.max   = String(max);
        s.elements.rangeInput.step  = String(step);
        s.elements.rangeInput.value = String(min);

        s.elements.label.textContent = `${varName} = ${this._fmtValue(min)}`;

        eventBus.emit('SLIDER_VALUE_CHANGED', { varName, value: min });
    }

    // ═══════════════════════════════════════════════════════════════
    //  SLIDER DEĞİŞİMİ
    // ═══════════════════════════════════════════════════════════════

    /**
     * Kullanıcı slider'ı elle süründüğünde çağrılır.
     */
    _onRangeInput(varName, rawValue) {
        const s = this._sliders.get(varName);
        if (!s) return;

        s.value = rawValue;
        sliderScope[varName] = rawValue;
        s.elements.label.textContent = `${varName} = ${this._fmtValue(rawValue)}`;

        eventBus.emit('SLIDER_VALUE_CHANGED', { varName, value: rawValue });
    }

    // ═══════════════════════════════════════════════════════════════
    //  ANİMASYON
    // ═══════════════════════════════════════════════════════════════

    /**
     * Artan yönde animasyonu başlatır.
     * max'a ulaşınca otomatik durur.
     */
    _startAnimation(varName) {
        const s = this._sliders.get(varName);
        if (!s || !s.configured) return;

        // Eğer max'taysa başa sar
        if (s.value >= s.max) {
            s.value = s.min;
            sliderScope[varName] = s.min;
            s.elements.rangeInput.value = String(s.min);
            s.elements.label.textContent = `${varName} = ${this._fmtValue(s.min)}`;
        }

        s.animating = true;
        s.elements.playBtn.textContent = '⏹';
        s.elements.playBtn.setAttribute('aria-label', 'Animasyonu durdur');

        let lastTime = null;

        const tick = (timestamp) => {
            if (!s.animating) return;

            if (lastTime === null) {
                lastTime = timestamp;
                s.rafId = requestAnimationFrame(tick);
                return;
            }

            // Her frame'de step kadar artır
            // (60fps'de her ~16.7ms bir step)
            s.value += s.step;

            // Hassasiyet düzeltmesi
            s.value = parseFloat(s.value.toFixed(10));

            if (s.value >= s.max) {
                s.value     = s.max;
                s.animating = false;
                s.elements.playBtn.textContent = '▶';
                s.elements.playBtn.setAttribute('aria-label', 'Animasyonu başlat');
            }

            sliderScope[varName] = s.value;
            s.elements.rangeInput.value  = String(s.value);
            s.elements.label.textContent = `${varName} = ${this._fmtValue(s.value)}`;

            eventBus.emit('SLIDER_VALUE_CHANGED', { varName, value: s.value });

            lastTime = timestamp;

            if (s.animating) {
                s.rafId = requestAnimationFrame(tick);
            }
        };

        s.rafId = requestAnimationFrame(tick);
    }

    /**
     * Animasyonu durdurur.
     */
    _stopAnimation(varName) {
        const s = this._sliders.get(varName);
        if (!s) return;

        s.animating = false;
        if (s.rafId != null) {
            cancelAnimationFrame(s.rafId);
            s.rafId = null;
        }
        s.elements.playBtn.textContent = '▶';
        s.elements.playBtn.setAttribute('aria-label', 'Animasyonu başlat');
    }

    // ═══════════════════════════════════════════════════════════════
    //  YARDIMCI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Sayıyı gösterim için formatlar.
     * @param {number} v
     * @returns {string}
     */
    _fmtValue(v) {
        if (Number.isInteger(v)) return String(v);
        // En fazla 4 ondalık
        const s = v.toFixed(4);
        // Sondaki sıfırları sil
        return s.replace(/\.?0+$/, '');
    }

    // ═══════════════════════════════════════════════════════════════
    //  PUBLIC API
    // ═══════════════════════════════════════════════════════════════

    /**
     * Bir slider'ın yapılandırma bilgisini döndürür.
     * DynamicPointManager tarafından sınır ve step bilgisi için kullanılır.
     *
     * @param {string} varName  Değişken adı
     * @returns {{ min: number, max: number, step: number, value: number, configured: boolean }|null}
     */
    getSliderConfig(varName) {
        const s = this._sliders.get(varName);
        if (!s) return null;
        return { min: s.min, max: s.max, step: s.step, value: s.value, configured: s.configured };
    }

    /**
     * Bir slider'ın değerini dışarıdan programatik olarak günceller.
     * DynamicPointManager sürükleme sırasında kullanır.
     *
     * @param {string}  varName          Değişken adı
     * @param {number}  value            Yeni değer (min/max aralığında olmalı)
     * @param {object}  [opts]           Seçenekler
     * @param {boolean} [opts.smooth]    true ise step snap atlanır (sürükleme sırasında pürüzsüz hareket)
     */
    setSliderValue(varName, value, opts) {
        const s = this._sliders.get(varName);
        if (!s || !s.configured) return;

        // Sınırlara zorla
        value = Math.max(s.min, Math.min(s.max, value));

        // Step'e snap (smooth modda atla — sürükleme sırasında pürüzsüz hareket için)
        if (!opts || !opts.smooth) {
            value = Math.round((value - s.min) / s.step) * s.step + s.min;
            value = parseFloat(value.toFixed(10));
            value = Math.max(s.min, Math.min(s.max, value));
        }

        s.value = value;
        sliderScope[varName] = value;

        // UI senkronize
        s.elements.rangeInput.value  = String(value);
        s.elements.label.textContent = `${varName} = ${this._fmtValue(value)}`;

        eventBus.emit('SLIDER_VALUE_CHANGED', { varName, value });
    }
}
