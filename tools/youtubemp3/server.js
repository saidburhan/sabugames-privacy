const express = require('express');
const cors = require('cors');
const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const ffmpegStatic = require('ffmpeg-static');

// Uygulama Ayarları
const app = express();
const PORT = process.env.PORT || 3000;

// ffmpeg yolunu fluent-ffmpeg'e tanıtıyoruz
ffmpeg.setFfmpegPath(ffmpegStatic);

// Middleware
app.use(cors());
// Statik dosyaları sunmak için public klasörünü belirliyoruz
app.use(express.static(path.join(__dirname, 'public')));

// MP3 İndirme Endpoint'i
app.get('/download', async (req, res) => {
    let videoUrl = req.query.url;

    try {
        const parsedUrl = new URL(videoUrl);
        const videoId = parsedUrl.searchParams.get('v');
        if (videoId) {
            videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
        }
    } catch (e) {
        // Link hatalıysa URL parsing başarısız olur, bu adım pas geçilir.
    }

    // Bağlantı geçerliliğini kontrol et
    if (!videoUrl || (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be'))) {
        return res.status(400).json({ error: 'Lütfen geçerli bir YouTube bağlantısı girin.' });
    }

    try {
        // Video bilgilerini al
        const info = await youtubedl(videoUrl, {
            dumpJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            noPlaylist: true,
            youtubeSkipDashManifest: true
        });

        // Video başlığındaki geçersiz karakterleri temizle
        const rawTitle = info.title || 'ses-dosyasi';
        const safeTitle = rawTitle.replace(/[^\w\s\p{L}.-]/gu, '').trim() || 'ses-dosyasi';

        // Tarayıcının yanıtı dosya olarak algılaması için başlıklar
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(safeTitle)}.mp3"`);

        // yt-dlp kullanarak videoyu doğrudan mp3 olarak stream ediyoruz.
        // Hata toleransı ve doğru dönüşüm için akışı direkt ffmpeg'e boruluyoruz.
        const yd_proc = youtubedl.exec(videoUrl, {
            extractAudio: true,
            audioFormat: 'mp3',
            output: '-',
            noWarnings: true,
            noCheckCertificates: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            noPlaylist: true
        }, {
            stdio: ['ignore', 'pipe', 'ignore']
        });

        // Hata veya bağlantı kopmalarıyla karşılaşırsak izole ediyoruz
        yd_proc.on('error', (err) => {
            console.error('yd_proc Hatası:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Ses sunucudan çekilirken hata oluştu.' });
            } else {
                res.end();
            }
        });

        yd_proc.on('close', (code) => {
            if (code !== 0 && !res.WritableFinished) {
                res.end(); // kapatıldığında askıda kalmasın.
            }
        });

        // Doğrudan Express response(res) üzerinden tarayıcıya yolluyoruz
        yd_proc.stdout.pipe(res);

    } catch (error) {
        console.error('İndirme hatası:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Video bulunamadı, engellendi veya yaş kısıtlamalı olabilir.' });
        }
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde başarıyla başlatıldı.`);
    console.log(`Tarayıcınızdan http://localhost:${PORT} adresine giderek uygulamayı kullanabilirsiniz.`);
});
