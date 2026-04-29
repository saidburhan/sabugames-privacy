/**
 * Matbis JSON Köprüsü (Matbis JSON Bridge)
 * 
 * Bu dosya, farklı teknolojilerle (React, Vue, Vanilla JS vb.) geliştirilen modüllerin
 * Matbis ana platformu ile haberleşmesini ve veritabanı (Supabase) işlemlerini 
 * yapabilmesini sağlar.
 */

const Matbis = (function() {
    let _moduleId = '';

    /**
     * Köprüyü başlatır.
     * @param {string} moduleId - Modülünüzün benzersiz kimliği (örn: 'geometry', 'math-canvas')
     */
    function init(moduleId) {
        _moduleId = moduleId;
        console.log(`[Matbis JSON Bridge] "${_moduleId}" modülü için başlatıldı.`);
    }

    /**
     * Mevcut çalışmayı buluta kaydeder.
     * @param {string} title - Projenin başlığı
     * @param {Object} data - Kaydedilecek JSON verisi
     */
    function save(title, data) {
        if (!_moduleId) {
            console.error('[Matbis JSON Bridge] Hata: save() çağırmadan önce init() ile moduleId belirtmelisiniz.');
            return;
        }
        window.parent.postMessage({
            type: 'SAVE_PROJECT_TO_CLOUD',
            payload: { module_id: _moduleId, title: title, data: data }
        }, '*');
    }

    /**
     * Veritabanından bu modüle ait kayıtlı projeleri çeker.
     */
    function fetch() {
        if (!_moduleId) {
            console.error('[Matbis JSON Bridge] Hata: fetch() çağırmadan önce init() ile moduleId belirtmelisiniz.');
            return;
        }
        window.parent.postMessage({
            type: 'FETCH_PROJECTS',
            payload: { module_id: _moduleId }
        }, '*');
    }

    /**
     * Ana platformdan gelen mesajları dinler.
     * @param {Function} callback - Mesaj geldiğinde çalışacak fonksiyon (msg => { ... })
     */
    function listen(callback) {
        window.addEventListener('message', (event) => {
            if (event.data && typeof event.data === 'object') {
                callback(event.data);
            }
        });
    }

    // Public API
    return {
        init: init,
        save: save,
        fetch: fetch,
        listen: listen
    };
})();

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Matbis;
} else {
    window.Matbis = Matbis;
}
