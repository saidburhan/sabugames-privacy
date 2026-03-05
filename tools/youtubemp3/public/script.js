// Arayüz elemanlarını seçiyoruz
const form = document.getElementById('download-form');
const urlInput = document.getElementById('youtube-url');
const statusContainer = document.getElementById('status-container');
const statusText = document.getElementById('status-text');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const errorContainer = document.getElementById('error-container');
const errorText = document.getElementById('error-text');

const downloadBtn = document.getElementById('download-btn');
const btnText = document.querySelector('.btn-text');
const btnIcon = document.querySelector('.btn-icon');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Kullanıcının girdiği url'yi alıp sağı solu temizliyoruz
    const url = urlInput.value.trim();

    // Temel baz düzeyde YouTube link doğrulaması
    if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
        showError('Geçersiz link! Lütfen bir YouTube bağlantısı girin.');
        return;
    }

    // Arayüzü yüklenme durumuna(loading state) geçiriyoruz
    startLoading();

    try {
        // İndirme işlemini başlatmak için NodeJS sunucumuza (Local veya Yayınlanan API Sunucusu) istek atıyoruz
        // Eğer Github Pages gibi statik sunucuda barındıracaksanız, BACKEND_URL değişkenini çalıştıracağınız node.js adresine ayarlayın
        const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? '' // Lokal çalışmada aynı adreste
            : 'https://senin-sunucun.onrender.com'; // İlerde yükleyeceğiniz sunucu adresi (Render, Heroku vs.)

        const response = await fetch(`${BACKEND_URL}/download?url=${encodeURIComponent(url)}`);

        // Sunucudan hata dönerse hata mesajını al ve göster
        if (!response.ok) {
            let errorMsg = 'Bilinmeyen bir hata oluştu.';
            try {
                const errorData = await response.json();
                if (errorData.error) errorMsg = errorData.error;
            } catch (e) { /* JSON dönüşü yoksa yoksay */ }
            throw new Error(errorMsg);
        }

        // Başarılı ise arayüzde ilerlemeyi gösteriyoruz
        statusText.textContent = 'MP3 dosyanız indiriliyor...';
        progressContainer.classList.remove('hidden');
        progressBar.style.width = '70%'; // Temsili ilerleme

        // Blob (Binary Large Object) formatında sesi tarayıcıya alıyoruz
        const blob = await response.blob();

        // Content-Disposition başlığında dosya adını tespit edip almak
        const disposition = response.headers.get('Content-Disposition');
        let filename = 'audio.mp3'; // Varsayılan değer
        if (disposition && disposition.indexOf('filename=') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        // Yükleme barını %100'e çek ve bitirme mesajı ver
        progressBar.style.width = '100%';
        statusText.textContent = 'İndirme tamamlandı!';

        // Cihaza fiziki indirmeyi tetiklemek için sanal eleman üzerinden .click() tetikliyoruz
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = decodeURIComponent(filename);
        document.body.appendChild(a);
        a.click();

        // Tıklandıktan sonra tarayıcı belleğini serbest bırakıp elemanı uçuruyoruz
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);

        // 3 saniye sonra arayüz formunu baştan kullanılmaya hazır hale getirmek için sıfırla
        setTimeout(() => {
            resetUI();
        }, 3000);

    } catch (err) {
        showError(err.message);
    }
});

// Arayüzdeki kutuları gizleyip yüklenme ekranını açan fonksiyon
function startLoading() {
    errorContainer.classList.add('hidden');
    statusContainer.classList.remove('hidden');
    progressContainer.classList.add('hidden');
    progressBar.style.width = '10%'; // İstek atıldığı anki simgesel durum
    statusText.textContent = 'Videonuz sunucuda işleniyor, lütfen bekleyin...';

    downloadBtn.disabled = true;
    btnText.textContent = 'İşleniyor...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';
    urlInput.disabled = true;
}

// Hata gösteren fonksiyon
function showError(msg) {
    statusContainer.classList.add('hidden');
    errorContainer.classList.remove('hidden');
    errorText.textContent = msg;

    resetBtnState();
}

// Arayüzü ilk haline döndüren temizleme fonksiyonu
function resetUI() {
    statusContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    urlInput.value = ''; // Kutuyu boşalt
    resetBtnState();
}

// Buton ve input durumunu kullanılabilir hale çeviren yardımcı fonksiyon
function resetBtnState() {
    downloadBtn.disabled = false;
    btnText.textContent = 'Dönüştür ve İndir';
    btnIcon.className = 'fa-solid fa-arrow-down';
    urlInput.disabled = false;
}
