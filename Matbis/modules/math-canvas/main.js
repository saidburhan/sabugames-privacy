/**
 * main.js  —  Uygulama Giriş Noktası & Bağlayıcı (Compositor)
 *
 * Sorumlulukları:
 *   ✓ Çekirdek modülleri (CanvasRenderer, EquationManager) başlatır.
 *   ✓ UI modülünü (Sidebar) başlatır.
 *   ✓ Tek bağ: STATE_CHANGED → renderer.setCurves()
 *   ✓ Mobil drawer davranışını yönetir.
 *
 * Bu dosya hiçbir matematiksel işlem veya DOM manipülasyonu yapmaz;
 * yalnızca modülleri bir araya getirir.
 */

import { CanvasRenderer }       from './core/CanvasRenderer.js';
import { EquationManager }     from './core/EquationManager.js';
import { Sidebar }             from './features/Sidebar/index.js';
import { SliderManager }       from './features/Slider/index.js';
import { SpecialPointsManager } from './features/SpecialPoints/index.js';
import { DynamicPointManager }  from './features/DynamicPoint/index.js';
import { eventBus }            from './core/EventBus.js';

document.addEventListener('DOMContentLoaded', () => {

    // ── Canvas Renderer ───────────────────────────────────────────────────
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) {
        console.error('[main] #canvas-container elementi bulunamadı.');
        return;
    }
    const renderer = new CanvasRenderer(canvasContainer);

    // ── Durum Yöneticisi ──────────────────────────────────────────────────
    const equationManager = new EquationManager();

    // ── Sidebar (UI Modülü) ───────────────────────────────────────────────
    const sidebarBody = document.getElementById('sidebar-body');
    const sidebar     = new Sidebar(sidebarBody);
    // ── Slider Yöneticisi (Değişken Kaydırıcıları & Animasyon) ──────────────
    const sliderManager = new SliderManager(sidebarBody);
    // ── Tuval ↔ Durum Bağı ────────────────────────────────────────────────
    // Tek ve tek bağ: STATE_CHANGED → setCurves
    eventBus.on('STATE_CHANGED', (curves) => {
        renderer.setCurves(curves);
    });

    // ── Mobil Drawer Davranışı ────────────────────────────────────────────
    const sidebarEl      = document.getElementById('sidebar');
    const overlay        = document.getElementById('sidebar-overlay');
    const floatingMenuBtn = document.getElementById('floating-menu-btn');

    const openSidebar  = () => { sidebarEl?.classList.add('open');    overlay?.classList.add('visible');    };
    const closeSidebar = () => { sidebarEl?.classList.remove('open'); overlay?.classList.remove('visible'); };

    floatingMenuBtn?.addEventListener('click', openSidebar);
    overlay?.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });

    /* ── Mobil sidebar toggle butonu (başlık içindeki ✕ / ☰) ─────── */
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');

    const _updateToggleIcon = () => {
        if (!sidebarToggleBtn) return;
        const collapsed = sidebarEl?.classList.contains('collapsed');
        sidebarToggleBtn.textContent    = collapsed ? '☰' : '✕';
        sidebarToggleBtn.setAttribute('aria-label', collapsed ? 'Paneli aç' : 'Paneli kapat');
    };

    sidebarToggleBtn?.addEventListener('click', () => {
        const landscape = window.matchMedia('(max-width: 768px) and (orientation: landscape)').matches;
        if (landscape) {
            /* Yatay modda: çekmece davranışı — kapatır (yeniden açmak için hamburger butonu) */
            closeSidebar();
        } else {
            /* Dikey modda: sidebar gövdesini daralt / genişlet */
            sidebarEl?.classList.toggle('collapsed');
            _updateToggleIcon();
        }
    });

    // ── Özel Noktalar (kesişim, ekstrema, kök) ────────────────────────────
    const specialPoints = new SpecialPointsManager(renderer);

    // ── Dinamik Noktalar (slider'a bağlı sürüklenebilir noktalar) ────────
    const dynamicPoints = new DynamicPointManager(renderer, sliderManager);

    // ── Geliştirme referansları ───────────────────────────────────────────
    window._renderer        = renderer;
    window._equationManager = equationManager;
    window._sliderManager   = sliderManager;
    window._specialPoints   = specialPoints;
    window._dynamicPoints   = dynamicPoints;
    window._eventBus        = eventBus;

});
