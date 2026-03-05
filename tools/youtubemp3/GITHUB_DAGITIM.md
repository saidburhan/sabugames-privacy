# YouTube MP3 İndirici - Dağıtım (Deployment) Kılavuzu

Uygulamanın arayüzü GitHub Pages gibi statik sunucularda, arka planı (Backend) ise Node.js destekleyen bir uzak sunucuda (ör. Render.com, Railway.app, Vercel) çalıştırılacak şekilde yapılandırılmıştır.

## 1. Adım: GitHub Deponuzu Oluşturun
- GitHub hesabınıza giriş yapın ve `youtube-mp3-app` adında yeni bir repo oluşturun.
- Projede bulunan uygulama dosyalarının tamamını bu repoya yükleyin (Commit and Push).

## 2. Adım: Backend'i Render.com'da Yayınlamak (Ücretsiz)
Backend (API Sunucusu) verilerin YouTube'dan alınıp dönüştürülmesini sağlar. **GitHub Pages bunu çalıştıramaz!** Bu sebeple API'yi şurada ayağa kaldırıyoruz:

1. [Render.com](https://render.com/) adresine girin ve GitHub hesabınızla giriş yapın.
2. Dashboard üzerinden **"New > Web Service"** butonuna tıklayın.
3. Önceden oluşturduğunuz GitHub reponuzu seçin.
4. Çıkan ayarlarda şu konfigürasyonları yapın:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Kaydedip "Create Web Service" tuşuna basın. Kurulum bittiğinde sol üstte size `https://abidik-gubidik.onrender.com` gibi canli sunucu linki verilecektir.

## 3. Adım: Frontend (Arayüz) Adresini Güncellemek
1. Kendi klasörünüzde veya GitHub üzerinden `public/script.js` dosyasını açın.
2. Yaklaşık 36. satırlarda bulunan `BACKEND_URL` alanınında yer alan `https://senin-sunucun.onrender.com` yazısını, Render'ın az önce size vermiş olduğu Canlı URL ile değiştirip tırnaklara dikkat edin!
3. Dosyayı kaydedin ve yeni halini GitHub'a yükleyin (Commit'leyin).

## 4. Adım: GitHub Pages (Arayüz) Etkinleştirmek
1. GitHub reponuza gidip üstteki tab'den **Settings (Ayarlar)** sekmesine tıklayın.
2. Sol menüden **"Pages" (Sayfalar)** bölümüne gelin.
3. "Source" seçeneğini **Deploy from a branch** olarak seçili bırakın.
4. "Branch" altında **main** dizinini seçin, yanındaki klasör sekmesini `/docs` olarak seçerek kaydedin! Neden /docs? Çünkü GitHub root klasör veya /docs destekler, /public klasörünü desteklemez. 
*(Eğer kodlarınız `/public` adlı klasördeyse, bu klasörün ismini manuel olarak `/docs` şeklinde değiştirip öyle atmanız gerekmektedir)*. 
5. "Save" (Kaydet) tuşuna bastığınızda, saniyeler içinde size sitenizin erişim adresi verilecektir!

İşte bu kadar 🎉 Artık projeye ait mükemmel ve internette yayınlanmış ücretsiz bir YouTube MP3 aracınız var!
