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
    const url = urlInput.value.trim();

    if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
        showError('Geçersiz link! Lütfen bir YouTube bağlantısı girin.');
        return;
    }

    startLoading();

    try {
        // PythonAnywhere Adresiniz
        const BACKEND_URL = 'https://saidburhan.pythonanywhere.com';

        const response = await fetch(`${BACKEND_URL}/download?url=${encodeURIComponent(url)}`);

        if (!response.ok) {
            let errorMsg = 'Sunucu hatası (HTTP ' + response.status + ')';
            try {
                const errorData = await response.json();
                if (errorData.error) errorMsg = errorData.error;
            } catch (e) { }
            throw new Error(errorMsg);
        }

        statusText.textContent = 'MP3 dosyanız indiriliyor...';
        progressContainer.classList.remove('hidden');
        progressBar.style.width = '70%';

        const blob = await response.blob();
        const disposition = response.headers.get('Content-Disposition');
        let filename = 'audio.mp3';

        if (disposition && disposition.indexOf('filename=') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
            }
        }

        progressBar.style.width = '100%';
        statusText.textContent = 'İndirme tamamlandı!';

        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);

        setTimeout(() => {
            resetUI();
        }, 3000);

    } catch (err) {
        showError(err.message);
        console.error("Hata Detayı:", err);
    }
});

function startLoading() {
    errorContainer.classList.add('hidden');
    statusContainer.classList.remove('hidden');
    progressContainer.classList.add('hidden');
    progressBar.style.width = '10%';
    statusText.textContent = 'Videonuz sunucuda işleniyor, lütfen bekleyin...';
    downloadBtn.disabled = true;
    btnText.textContent = 'İşleniyor...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';
    urlInput.disabled = true;
}

function showError(msg) {
    statusContainer.classList.add('hidden');
    errorContainer.classList.remove('hidden');
    errorText.textContent = msg;
    resetBtnState();
}

function resetUI() {
    statusContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    urlInput.value = '';
    resetBtnState();
}

function resetBtnState() {
    downloadBtn.disabled = false;
    btnText.textContent = 'Dönüştür ve İndir';
    btnIcon.className = 'fa-solid fa-arrow-down';
    urlInput.disabled = false;
}
