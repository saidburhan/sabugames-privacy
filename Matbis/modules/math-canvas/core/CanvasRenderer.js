/**
 * CanvasRenderer.js  –  Kamera Yönetimi & Çizim Orkestratörü
 *
 * Özellikler:
 *   ✓ High-DPI / Retina canvas (devicePixelRatio)
 *   ✓ ResizeObserver ile dinamik yeniden boyutlandırma
 *   ✓ Kamera durumu: scale, offsetX, offsetY
 *   ✓ mathToScreen / screenToMath koordinat dönüşümleri
 *   ✓ Mouse → Pan (sol tuş sürükleme) + Zoom-to-cursor (tekerlek)
 *   ✓ Touch → Tek parmak pan + İki parmak pinch-zoom
 *   ✓ Adaptif ızgara: zoom seviyesine göre dinamik step (0,1 / 0,5 / 1 / 2 / 5 / 10…)
 *   ✓ requestAnimationFrame ile toplu yeniden çizim (gereksiz kare atlanmaz)
 *   ✓ Strategy Pattern: curve.type'a göre uygun Drawer'a yönlendirme
 */

import { ExplicitDrawer }    from '../features/graphs/ExplicitDrawer.js';
import { PolarDrawer }       from '../features/graphs/PolarDrawer.js';
import { ParametricDrawer }  from '../features/graphs/ParametricDrawer.js';
import { ImplicitDrawer }    from '../features/graphs/ImplicitDrawer.js';
import { PolygonDrawer }     from '../features/graphs/PolygonDrawer.js';
import { eventBus }          from './EventBus.js';

/* ── Kamera sınır değerleri ──────────────────────────────────────── */
const MIN_SCALE = 4;      // piksel / birim (çok uzaklaştırıldığında alt sınır)
const MAX_SCALE = 2000;   // piksel / birim (çok yaklaştırıldığında üst sınır)

/* ── Zoom çarpanı (her tekerlek tıklaması / pinch adımı başına) ─── */
const ZOOM_FACTOR_MOUSE = 1.12;
const ZOOM_FACTOR_TOUCH = 1.0;   // pinch'te sürekli hesaplandığı için 1,0

export class CanvasRenderer {

    /**
     * @param {HTMLElement} container - Canvas'ın ekleneceği kapsayıcı element.
     */
    constructor(container) {
        this.container = container;

        /* ── Canvas ve context ──────────────────────────────────── */
        this.canvas = document.createElement('canvas');
        this.ctx    = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        /* ── Görünür (CSS) piksel boyutu ────────────────────────── */
        this.cssWidth  = 0;
        this.cssHeight = 0;

        /* ── Kamera Durumu (Camera State) ───────────────────────────
         *
         *   scale   : 1 matematik birimi = kaç CSS piksel
         *             Varsayılan 60 → eksen üzerindeki her 1 birim 60 px
         *   offsetX : matematik orijininin (0,0) ekrandaki X piksel konumu
         *   offsetY : matematik orijininin (0,0) ekrandaki Y piksel konumu
         *             (İlk _resize() çağrısında canvas merkezine ayarlanır.)
         * ─────────────────────────────────────────────────────────── */
        this.scale   = 60;
        this.offsetX = 0;   // _resize() içinde güncellenir
        this.offsetY = 0;

        /* ── requestAnimationFrame kimliği (null = bekleyen kare yok) */
        this._rafId = null;
        /* ── Eğri listesi ─────────────────────────────────────
         * Her öğe: { evaluateFn: (x: number) => number|null, color: string }
         * render() sırasında tüm eğriler yeniden çizilir (pan/zoom sonrası da). */
        this._curves = [];
        /* ── Mouse pan durumu ───────────────────────────────────── */
        this._isPanning = false;
        this._panLastX  = 0;
        this._panLastY  = 0;

        /* ── Touch durumu ───────────────────────────────────────── */
        this._activeTouches   = [];   // Son touchmove'daki dokunma listesi
        this._lastPinchDist   = 0;    // İki parmak arasındaki son mesafe

        /* ── Dış modül tarafından pan engelleme bayrağı ───────────── */
        this.isPanLocked = false;

        /* ── İlk boyutlandırma ve event bağlama ─────────────────── */
        this._resize();
        this._bindEvents();

        /* ── ResizeObserver: container boyutu değişince güncelle ─── */
        this._observer = new ResizeObserver(() => this._resize());
        this._observer.observe(this.container);
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: BOYUTLANDIRMA
    // ═══════════════════════════════════════════════════════════════

    /**
     * Container boyutunu okur; canvas fiziksel çözünürlüğünü DPR ile ayarlar.
     * Yeniden boyutlandırmada, ekranın ortasındaki matematik noktası sabit
     * kalacak biçimde offsetX/Y güncellenir (cihaz döndürmede de doğal görünür).
     *
     * DPR boru hattı:
     *   canvas.width/height       → fiziksel piksel (DPR × CSS px)
     *   canvas.style.width/height → CSS px (sabit, DOM render boyutu)
     *   ctx.setTransform(dpr…)    → tüm çizim komutları CSS px biriminde çalışır
     */
    _resize() {
        const dpr  = window.devicePixelRatio || 1;
        const rect = this.container.getBoundingClientRect();

        const oldW = this.cssWidth;
        const oldH = this.cssHeight;

        this.cssWidth  = rect.width;
        this.cssHeight = rect.height;

        if (oldW > 0 && oldH > 0) {
            // Mevcut merkezi sabit tut: orijin farkı kadar offset kaydır
            this.offsetX += (this.cssWidth  - oldW) / 2;
            this.offsetY += (this.cssHeight - oldH) / 2;
        } else {
            // İlk çalışma: orijini tam merkeze yerleştir
            this.offsetX = this.cssWidth  / 2;
            this.offsetY = this.cssHeight / 2;
        }

        // Fiziksel piksel boyutu (keskin görüntü için DPR ile çarp)
        this.canvas.width  = Math.round(this.cssWidth  * dpr);
        this.canvas.height = Math.round(this.cssHeight * dpr);

        // CSS görsel boyutu (sabit tut)
        this.canvas.style.width  = this.cssWidth  + 'px';
        this.canvas.style.height = this.cssHeight + 'px';

        // Dönüşüm matrisini sıfırla; DPR ölçeği uygula
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this._scheduleRender();
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: RENDER ZAMANLAYICISI (requestAnimationFrame)
    // ═══════════════════════════════════════════════════════════════

    /**
     * Bir sonraki animasyon karesinde render() çağrısını planlar.
     * Aynı kare içinde birden fazla durum değişikliği olursa (örneğin hızlı
     * mouse kaydırma) yalnızca tek bir çizim yapılır; kare atlanmaz.
     */
    _scheduleRender() {
        if (this._rafId !== null) return;  // Zaten planlandı
        this._rafId = requestAnimationFrame(() => {
            this._rafId = null;
            this.render();
        });
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: ORTAK ZOOM YARDIMCISI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Belirtilen ekran noktasını (focusSx, focusSy) merkez alarak ölçeği
     * newScale değerine ayarlar.
     *
     * Zoom-to-point formülü:
     *   Zoom öncesi:  screenToMath(focusSx) = mx
     *   Zoom sonrası: mathToScreen(mx) = focusSx  → sabit tutulmalı
     *   ⟹  newOffsetX = focusSx - mx × newScale
     *
     * @param {number} newScale   Uygulanacak yeni ölçek değeri
     * @param {number} focusSx    Odak noktası ekran X (CSS px)
     * @param {number} focusSy    Odak noktası ekran Y (CSS px)
     */
    _applyZoom(newScale, focusSx, focusSy) {
        // Sınırları zorla
        newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

        // Odak noktasının zoom öncesi matematik koordinatı
        const mx = (focusSx - this.offsetX) / this.scale;
        const my = (focusSy - this.offsetY) / this.scale;   // eksi yok; aşağıda düzeltilir

        this.scale   = newScale;
        // Odak noktasının ekran pozisyonunu koru
        this.offsetX = focusSx - mx * this.scale;
        this.offsetY = focusSy - my * this.scale;
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: EVENT LISTENER BAĞLAMA
    // ═══════════════════════════════════════════════════════════════

    /**
     * Canvas üzerindeki tüm etkileşim olaylarını bağlar.
     * Ok fonksiyonları kullandığı için `this` bağlamı korunur.
     */
    _bindEvents() {
        const c = this.canvas;

        /* ── MOUSE: PAN ─────────────────────────────────────────── */
        c.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;   // Yalnızca sol tuş
            if (this.isPanLocked) return;  // Dinamik nokta sürüklemesi aktif
            this._isPanning = true;
            this._panLastX  = e.clientX;
            this._panLastY  = e.clientY;
            c.style.cursor  = 'grabbing';
        });

        c.addEventListener('mousemove', (e) => {
            if (!this._isPanning) return;
            const dx = e.clientX - this._panLastX;
            const dy = e.clientY - this._panLastY;
            this._panLastX = e.clientX;
            this._panLastY = e.clientY;
            this.offsetX += dx;
            this.offsetY += dy;
            this._scheduleRender();
        });

        const stopPan = () => {
            this._isPanning = false;
            c.style.cursor  = 'default';
        };
        c.addEventListener('mouseup',    stopPan);
        c.addEventListener('mouseleave', stopPan);

        /* ── MOUSE: ZOOM-TO-CURSOR ──────────────────────────────── */
        c.addEventListener('wheel', (e) => {
            e.preventDefault();

            // Farenin canvas üzerindeki CSS piksel konumu
            const rect = c.getBoundingClientRect();
            const sx   = e.clientX - rect.left;
            const sy   = e.clientY - rect.top;

            // e.deltaY > 0 → uzaklaştır, < 0 → yaklaştır
            const factor = e.deltaY > 0
                ? 1 / ZOOM_FACTOR_MOUSE
                : ZOOM_FACTOR_MOUSE;

            this._applyZoom(this.scale * factor, sx, sy);
            this._scheduleRender();
        }, { passive: false });

        /* ── TOUCH: TEK PARMAK PAN + İKİ PARMAK PİNCH-ZOOM ─────── */
        c.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.isPanLocked) return;  // Dinamik nokta sürüklemesi aktif
            this._activeTouches = Array.from(e.touches);

            if (e.touches.length === 2) {
                // Pinch başlangıcında iki parmak arasındaki mesafeyi kaydet
                this._lastPinchDist = Math.hypot(
                    e.touches[1].clientX - e.touches[0].clientX,
                    e.touches[1].clientY - e.touches[0].clientY
                );
            }
        }, { passive: false });

        c.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.isPanLocked) return;  // Dinamik nokta sürüklemesi aktif
            const touches = e.touches;
            const rect    = c.getBoundingClientRect();

            if (touches.length === 1) {
                /* ── Tek parmak: PAN ──────────────────────────── */
                const prev = this._activeTouches[0];
                if (!prev) {
                    this._activeTouches = [touches[0]];
                    return;
                }
                const dx = touches[0].clientX - prev.clientX;
                const dy = touches[0].clientY - prev.clientY;
                this.offsetX += dx;
                this.offsetY += dy;

            } else if (touches.length === 2) {
                /* ── İki parmak: PİNCH-ZOOM ────────────────────
                 *
                 * 1. Parmaklar arasındaki yeni mesafeyi hesapla.
                 * 2. Oran = yeniMesafe / eskiMesafe → zoom çarpanı.
                 * 3. Odak noktası = iki parmağın orta noktası.
                 * ─────────────────────────────────────────────── */
                const newDist = Math.hypot(
                    touches[1].clientX - touches[0].clientX,
                    touches[1].clientY - touches[0].clientY
                );

                if (this._lastPinchDist > 0) {
                    const ratio   = newDist / this._lastPinchDist;
                    const midSx   = ((touches[0].clientX + touches[1].clientX) / 2) - rect.left;
                    const midSy   = ((touches[0].clientY + touches[1].clientY) / 2) - rect.top;
                    this._applyZoom(this.scale * ratio, midSx, midSy);
                }

                this._lastPinchDist = newDist;
            }

            // Mevcut dokunma listesini güncelle (bir sonraki delta için)
            this._activeTouches = Array.from(touches);
            this._scheduleRender();
        }, { passive: false });

        const stopTouch = () => {
            this._activeTouches = [];
            this._lastPinchDist = 0;
        };
        c.addEventListener('touchend',    stopTouch);
        c.addEventListener('touchcancel', stopTouch);
    }

    // ═══════════════════════════════════════════════════════════════
    //  KOORDİNAT DÖNÜŞÜM METODLARI (genel kullanım için public)
    // ═══════════════════════════════════════════════════════════════

    /**
     * Matematik koordinatını ekran (CSS piksel) koordinatına çevirir.
     *
     * Formül:
     *   sx = offsetX + mx × scale
     *   sy = offsetY - my × scale   ← Y ekseni ters (canvas'ta aşağı artar)
     *
     * @param {number} mx  Matematik X
     * @param {number} my  Matematik Y
     * @returns {{ sx: number, sy: number }}
     */
    mathToScreen(mx, my) {
        return {
            sx: this.offsetX + mx * this.scale,
            sy: this.offsetY - my * this.scale,
        };
    }

    /**
     * Ekran (CSS piksel) koordinatını matematik koordinatına çevirir
     * (mathToScreen'in tersi).
     *
     * @param {number} sx  Ekran X (CSS px)
     * @param {number} sy  Ekran Y (CSS px)
     * @returns {{ mx: number, my: number }}
     */
    screenToMath(sx, sy) {
        return {
            mx:  (sx - this.offsetX) / this.scale,
            my: -(sy - this.offsetY) / this.scale,
        };
    }

    /**
     * @deprecated  Geriye uyumluluk için  →  mathToScreen kullanın.
     * @returns {{ px: number, py: number }}
     */
    toPixel(x, y) {
        const { sx, sy } = this.mathToScreen(x, y);
        return { px: sx, py: sy };
    }

    /**
     * @deprecated  Geriye uyumluluk için  →  screenToMath kullanın.
     * @returns {{ x: number, y: number }}
     */
    toCartesian(px, py) {
        const { mx, my } = this.screenToMath(px, py);
        return { x: mx, y: my };
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: ADAPTİF IZGARA ADIMI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Mevcut ölçeğe (scale) göre ızgara çizgilerinin kaç matematik birimi
     * aralıkla çizileceğini hesaplar.
     *
     * Hedef: satırlar arasında ~MIN_PX ile ~MAX_PX piksel olsun.
     * Adım her zaman "güzel" bir sayıdır: 1 × 10^n, 2 × 10^n veya 5 × 10^n.
     *
     * Örnek değerler (scale = 60 piksel/birim ile):
     *   step = 1  → çizgiler 60 px aralıkla (normal görünüm)
     *   scale = 6 (çok uzak) → step = 10, çizgiler 60 px
     *   scale = 600 (çok yakın) → step = 0,1, çizgiler 60 px
     *
     * @returns {number} step — matematik birimi cinsinden ızgara aralığı
     */
    _adaptiveStep() {
        const targetPx = 60;                       // İdeal aralık (CSS px)
        const roughStep = targetPx / this.scale;   // Ham adım (matematik birimi)

        // Büyüklük basamağı: 10^floor(log10(roughStep))
        const magnitude  = Math.pow(10, Math.floor(Math.log10(roughStep)));
        const normalized = roughStep / magnitude;

        let step;
        if      (normalized < 1.5) step = magnitude;
        else if (normalized < 3.5) step = 2 * magnitude;
        else if (normalized < 7.5) step = 5 * magnitude;
        else                       step = 10 * magnitude;

        return step;
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÖZEL: ETIKET FORMATLAMA
    // ═══════════════════════════════════════════════════════════════

    /**
     * Sayıyı ekran etiketi olarak biçimlendirir.
     * Ondalık ayracı olarak virgül kullanır (Türkçe gösterim).
     * Kayan noktalı hata payını önlemek için toPrecision ile yuvarlar.
     *
     * @param {number} n
     * @returns {string}
     */
    _fmt(n) {
        // 10 anlamlı rakamla yuvarlayıp gereksiz sıfırları at
        const s = parseFloat(n.toPrecision(10)).toString();
        return s.replace('.', ',');
    }

    // ═══════════════════════════════════════════════════════════════
    //  ÇİZİM METODLARI
    // ═══════════════════════════════════════════════════════════════

    /**
     * Canvas'ı tamamen temizler.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    }

    /**
     * Adaptif Kartezyen ızgarayı, eksenleri ve sayısal etiketleri çizer.
     *
     * Renk paleti (koyu tema):
     *   Izgara      : #1e2d3d  –  çok hafif, dikkat dağıtmaz
     *   Eksenler    : #3a5068  –  belirgin ama sakin
     *   Etiketler   : #4a6782  –  okunabilir, geri planda
     */
    drawGrid() {
        const ctx = this.ctx;
        const W   = this.cssWidth;
        const H   = this.cssHeight;

        // Ekran köşelerinin matematik karşılıkları
        const { mx: xMin } = this.screenToMath(0,  0);
        const { mx: xMax } = this.screenToMath(W,  0);
        const { my: yMin } = this.screenToMath(0,  H);
        const { my: yMax } = this.screenToMath(0,  0);

        // Mevcut ölçeğe uygun ızgara adımı
        const step = this._adaptiveStep();

        // Izgara aralığını matematik başlangıç değerine hizala
        const xStart = Math.ceil(xMin / step) * step;
        const yStart = Math.ceil(yMin / step) * step;

        // ── Izgara Çizgileri ───────────────────────────────────────
        ctx.save();
        ctx.strokeStyle = '#1e2d3d';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();

        // Dikey çizgiler (x ekseni boyunca)
        for (let x = xStart; x <= xMax + step; x += step) {
            const { sx } = this.mathToScreen(x, 0);
            ctx.moveTo(sx, 0);
            ctx.lineTo(sx, H);
        }

        // Yatay çizgiler (y ekseni boyunca)
        for (let y = yStart; y <= yMax + step; y += step) {
            const { sy } = this.mathToScreen(0, y);
            ctx.moveTo(0, sy);
            ctx.lineTo(W, sy);
        }

        ctx.stroke();
        ctx.restore();

        // ── Eksenler ──────────────────────────────────────────────
        // Orijinin ekran konumu (kamera offseti ile birlikte)
        const { sx: ox, sy: oy } = this.mathToScreen(0, 0);

        ctx.save();
        ctx.strokeStyle = '#3a5068';
        ctx.lineWidth   = 1.5;

        // X ekseni (y = 0 doğrusu, yatay)
        ctx.beginPath();
        ctx.moveTo(0, oy);
        ctx.lineTo(W, oy);
        ctx.stroke();

        // Y ekseni (x = 0 doğrusu, dikey)
        ctx.beginPath();
        ctx.moveTo(ox, 0);
        ctx.lineTo(ox, H);
        ctx.stroke();

        ctx.restore();

        // ── Eksen Ok Uçları ───────────────────────────────────────
        this._drawArrow(W - 2, oy, 'right');
        this._drawArrow(ox,    2,  'up');

        // ── Sayısal Etiketler ─────────────────────────────────────
        ctx.save();
        ctx.fillStyle = '#4a6782';
        ctx.font      = '11px "Segoe UI", system-ui, sans-serif';

        // Etiket eksenin üstünden/altından taşmasın diye görünür bölge sınırı
        const labelPad = 4;    // eksenle etiket arasındaki boşluk (px)

        // X ekseni etiketleri
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'top';
        for (let x = xStart; x <= xMax + step; x += step) {
            if (Math.abs(x) < step * 0.01) continue;   // Orijin etiketi ayrı
            const { sx } = this.mathToScreen(x, 0);
            // Etiketin y konumunu eksen sınırları içinde tut
            const labelY = Math.min(Math.max(oy + labelPad, labelPad), H - 16);
            ctx.fillText(this._fmt(x), sx, labelY);
        }

        // Y ekseni etiketleri
        ctx.textAlign    = 'right';
        ctx.textBaseline = 'middle';
        for (let y = yStart; y <= yMax + step; y += step) {
            if (Math.abs(y) < step * 0.01) continue;
            const { sy } = this.mathToScreen(0, y);
            const labelX = Math.min(Math.max(ox - labelPad, 30), W - labelPad);
            ctx.fillText(this._fmt(y), labelX, sy);
        }

        // Orijin etiketi
        ctx.textAlign    = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('0', ox - labelPad, oy + labelPad);

        ctx.restore();
    }

    /**
     * Eksen ok ucu çizer (küçük dolu üçgen).
     *
     * @param {number} x          Ok ucunun X koordinatı (CSS px)
     * @param {number} y          Ok ucunun Y koordinatı (CSS px)
     * @param {'right'|'up'} dir  Ok yönü
     */
    _drawArrow(x, y, dir) {
        const ctx  = this.ctx;
        const size = 7;   // Ok ucu kenar uzunluğu (CSS px)

        ctx.save();
        ctx.fillStyle = '#3a5068';
        ctx.beginPath();

        if (dir === 'right') {
            ctx.moveTo(x,        y);
            ctx.lineTo(x - size, y - size / 2);
            ctx.lineTo(x - size, y + size / 2);
        } else {   // 'up'
            ctx.moveTo(x,            y);
            ctx.lineTo(x - size / 2, y + size);
            ctx.lineTo(x + size / 2, y + size);
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // ═══════════════════════════════════════════════════════════════
    //  ANA RENDER DÖNGÜSÜ
    // ═══════════════════════════════════════════════════════════════

    /**
     * CanvasRenderer'da saklanan eğri listesini (this._curves) günceller
     * ve bir render planlar.
     *
     * @param {Array<{ evaluateFn: Function, color?: string }>} curves
     */
    setCurves(curves) {
        this._curves = curves;
        this._scheduleRender();
    }

    /**
     * Mevcut eğri listesini temizler ve ekranı yeniler.
     */
    clearCurves() {
        this._curves = [];
        this._scheduleRender();
    }

    // ═══════════════════════════════════════════════════════════════
    //  EĞRİ ÇİZİMİ — Strategy Pattern ile Drawer Yönlendirme
    // ═══════════════════════════════════════════════════════════════

    /**
     * Tek bir eğriyi türüne göre uygun Drawer modülüne yönlendirir.
     *
     * @param {{ evaluateFn: Function, color: string, type: string }} curve
     */
    renderCurve(curve) {
        switch (curve.type) {
            case 'dynamicPoint':
                break;   // Overlay canvas üzerinde DynamicPointManager tarafından çizilir
            case 'polygon':
                PolygonDrawer.draw(this, curve);
                break;
            case 'polar':
                PolarDrawer.draw(this, curve);
                break;
            case 'parametric':
                ParametricDrawer.draw(this, curve);
                break;
            case 'implicit':
                ImplicitDrawer.draw(this, curve);
                break;
            case 'explicit':
            default:
                ExplicitDrawer.draw(this, curve);
                break;
        }
    }

    /**
     * @deprecated  renderCurve() kullanın.
     * Geriye uyumluluk: eski API ile tek bir explicit fonksiyonu çizer.
     *
     * @param {(x: number) => number|null} evaluateFn
     * @param {string} [color='#58a6ff']
     */
    drawEquation(evaluateFn, color = '#58a6ff') {
        ExplicitDrawer.draw(this, { evaluateFn, color });
    }

    // ───────────────────────────────────────────────────────────────

    /**
     * Tam yeniden çizim döngüsü.
     * Her eğri, türüne göre uygun Drawer'a yönlendirilir.
     */
    render() {
        this.clear();
        this.drawGrid();

        for (const curve of this._curves) {
            try {
                this.renderCurve(curve);
            } catch (err) {
                console.error('[CanvasRenderer] renderCurve hatası:', err, curve);
            }
        }

        eventBus.emit('RENDER_COMPLETE');
    }

    // ═══════════════════════════════════════════════════════════════
    //  TEMİZLİK
    // ═══════════════════════════════════════════════════════════════

    /**
     * Renderer'ı ve tüm kaynakları temizler.
     * Sayfa içi navigasyon veya component unmount durumlarında çağır.
     */
    destroy() {
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        this._observer.disconnect();
        this.canvas.remove();
    }
}
