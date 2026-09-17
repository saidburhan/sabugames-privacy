/**
 * PatiMatik - Profesyonel Kedi Ses Motoru (Howler.js + Web Audio Pro)
 * Hem modern Howler.js mimarisini hem de sıfır gecikmeli çok katmanlı matematiksel
 * ses sentezini (gerçek kedi formantsı miyavlama, mırıltı, karikatür efektleri) birleştirir.
 * Tüm yorumlar Türkçedir.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        // Varsayılan olarak ses ve müzik açıktır (isteyen sonradan kapatabilir)
        this.isMuted = false;
        this.isMusicPlaying = false;
        this.musicWanted = true;
        this.musicTimer = null;
        this.currentMusicNote = 0;

        // Kaydedilmiş ses tercihlerini oku (varsayılan true)
        try {
            const savedMute = localStorage.getItem('patimatik_muted');
            if (savedMute !== null) this.isMuted = savedMute === 'true';
            const savedMusic = localStorage.getItem('patimatik_music');
            if (savedMusic !== null) this.musicWanted = savedMusic === 'true';
        } catch (e) {}

        this.initContext();
        this.initOnFirstInteraction();
    }

    /**
     * Web Audio API bağlamını oluşturur veya uyandırır
     */
    initContext() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx && !this.ctx) {
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        } catch (e) {
            console.warn('AudioContext başlatılamadı:', e);
        }
    }

    initOnFirstInteraction() {
        const unlock = () => {
            this.initContext();
            // Kullanıcı sayfaya ilk dokunduğunda müzik isteniyorsa otomatik başlat
            if (this.musicWanted && !this.isMusicPlaying && !this.isMuted) {
                this.startBackgroundMusic();
            }
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('touchstart', unlock);
        };
        window.addEventListener('pointerdown', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
        window.addEventListener('touchstart', unlock, { once: true });
    }

    /**
     * Sesi tamamen açar veya kapatır
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        try { localStorage.setItem('patimatik_muted', this.isMuted); } catch(e) {}
        if (this.isMuted && this.isMusicPlaying) {
            this.stopBackgroundMusic();
        } else if (!this.isMuted && this.musicWanted && !this.isMusicPlaying) {
            this.startBackgroundMusic();
        }
        if (typeof Howler !== 'undefined') {
            Howler.mute(this.isMuted);
        }
        return this.isMuted;
    }

    /**
     * Tatlı dokunma / baloncuk pıt (Bubble Pop) tıklama sesi
     */
    playClick() {
        if (this.isMuted) return;
        this.initContext();

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.06);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
    }

    /**
     * Üçlü Formant Rezonansı ile son derece gerçekçi ve tatlı yavru kedi miyavlaması
     */
    playMeow(pitchMultiplier = 1) {
        if (this.isMuted) return;
        this.initContext();

        const now = this.ctx.currentTime;
        const duration = 0.55;

        // Ana ses kaynağı (Kedi ses tellerinin zengin harmonikleri)
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';

        // Temel frekans eğrisi: "m-i-i-y-a-a-u-w"
        const baseFreq = 420 * pitchMultiplier;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.linearRampToValueAtTime(baseFreq * 1.85, now + 0.16);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.35);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, now + duration);

        // Kedi boğazı ve ağzının 2 katmanlı rezonans filtresi (Formantlar)
        const filter1 = this.ctx.createBiquadFilter();
        filter1.type = 'bandpass';
        filter1.Q.setValueAtTime(4.0, now);
        filter1.frequency.setValueAtTime(800, now);
        filter1.frequency.linearRampToValueAtTime(1800, now + 0.18);
        filter1.frequency.linearRampToValueAtTime(700, now + duration);

        const filter2 = this.ctx.createBiquadFilter();
        filter2.type = 'lowpass';
        filter2.frequency.setValueAtTime(2600, now);
        filter2.frequency.linearRampToValueAtTime(3400, now + 0.2);
        filter2.frequency.linearRampToValueAtTime(1200, now + duration);

        // Ses şiddeti zarfı
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.24, now + 0.07);
        gain.gain.setValueAtTime(0.22, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(filter1);
        filter1.connect(filter2);
        filter2.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.05);
    }

    /**
     * Kedi mırıltısı (Purr) - Derin titreşimli huzur sesi
     */
    playPurr() {
        if (this.isMuted) return;
        this.initContext();

        const now = this.ctx.currentTime;
        const duration = 0.9;

        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(65, now);

        // Titreşimi sağlayan LFO (Low Frequency Oscillator)
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(24, now); // Kedi mırıltı frekansı

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(32, now);
        lfo.connect(osc.frequency);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        lfo.start(now);
        osc.stop(now + duration);
        lfo.stop(now + duration);
    }

    /**
     * Doğru cevapta çalan neşeli, parlak ksilofon melodisi
     */
    playCorrect(combo = 1) {
        if (this.isMuted) return;
        this.initContext();

        const now = this.ctx.currentTime;
        const pitchMult = Math.min(1 + (combo - 1) * 0.07, 1.45);
        // C-Major sevimli pentatonik akor (C5, E5, G5, C6)
        const notes = [523.25, 659.25, 783.99, 1046.50].map(f => f * pitchMult);

        notes.forEach((freq, i) => {
            const start = now + i * 0.055;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.22, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + 0.32);
        });
    }

    /**
     * Hatalı cevapta yumuşak, üzmeyen esprili boing efekti
     */
    playWrong() {
        if (this.isMuted) return;
        this.initContext();

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.32);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.33);
    }

    /**
     * Balık yeme ve çiğneme (ham ham - crunch & pop) efekti
     */
    playChomp() {
        if (this.isMuted) return;
        this.initContext();

        const now = this.ctx.currentTime;

        // 2 seri ısırma hamlesi
        for (let i = 0; i < 2; i++) {
            const start = now + i * 0.11;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(420 - i * 40, start);
            osc.frequency.exponentialRampToValueAtTime(140, start + 0.08);

            gain.gain.setValueAtTime(0.25, start);
            gain.gain.exponentialRampToValueAtTime(0.01, start + 0.09);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + 0.1);
        }
    }

    /**
     * Seviye atlama (Level Up) ve zafer kutlama fanfarı
     */
    playFanfare() {
        if (this.isMuted) return;
        this.initContext();

        const now = this.ctx.currentTime;
        // Zafer arpeji: Do, Mi, Sol, Si, yüksek Do
        const fanfareNotes = [
            { f: 523.25, d: 0.1 },
            { f: 659.25, d: 0.1 },
            { f: 783.99, d: 0.1 },
            { f: 987.77, d: 0.14 },
            { f: 1046.50, d: 0.45 }
        ];

        let offset = 0;
        fanfareNotes.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, now + offset);

            gain.gain.setValueAtTime(0.28, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + item.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + offset);
            osc.stop(now + offset + item.d + 0.02);

            offset += item.d;
        });

        // Fanfar biter bitmez sevimli bir zafer miyavı
        setTimeout(() => {
            this.playMeow(1.15);
        }, 550);
    }

    /**
     * Neşeli ve dinlendirici ksilofon arka plan fon müziği
     */
    startBackgroundMusic() {
        if (this.isMusicPlaying || this.isMuted) return;
        this.initContext();
        this.isMusicPlaying = true;

        // Tatlı ve huzurlu 16 adımlı oyun melodisi (C-Major pentatonik)
        const melody = [
            523.25, 659.25, 783.99, 659.25,
            587.33, 698.46, 880.00, 698.46,
            523.25, 659.25, 783.99, 1046.50,
            880.00, 783.99, 659.25, 587.33
        ];

        this.currentMusicNote = 0;

        const loopMusic = () => {
            if (!this.isMusicPlaying || this.isMuted) return;

            const freq = melody[this.currentMusicNote];
            const now = this.ctx.currentTime;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            // Çok hafif, kulak yormayan narin bir tını
            gain.gain.setValueAtTime(0.028, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.34);

            this.currentMusicNote = (this.currentMusicNote + 1) % melody.length;
            this.musicTimer = setTimeout(loopMusic, 340);
        };

        loopMusic();
    }

    stopBackgroundMusic() {
        this.isMusicPlaying = false;
        if (this.musicTimer) {
            clearTimeout(this.musicTimer);
            this.musicTimer = null;
        }
    }

    toggleMusic() {
        if (this.isMusicPlaying) {
            this.stopBackgroundMusic();
            this.musicWanted = false;
            try { localStorage.setItem('patimatik_music', 'false'); } catch(e) {}
            return false;
        } else {
            this.musicWanted = true;
            try { localStorage.setItem('patimatik_music', 'true'); } catch(e) {}
            this.startBackgroundMusic();
            return true;
        }
    }
}

// Global ses nesnesi
window.soundEngine = new SoundEngine();
