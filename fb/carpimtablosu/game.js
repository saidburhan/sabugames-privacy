/**
 * PatiMatik - Kedi Temalı Çarpım Tablosu Oyunu
 * Oyun Mantığı, Durum Yönetimi, SVG Kedi Çizimleri ve Etkileşimler
 * Çerezler (Cookies) ve LocalStorage ile Kalıcı Hafıza
 * Tüm yorumlar Türkçedir.
 */

// Kedi Karakter Tanımları, Renkleri ve Özellikleri
const CATS = {
    pamuk: {
        id: 'pamuk',
        name: 'Pamuk',
        desc: 'Beyaz pofuduk prenses',
        emoji: '🐱',
        color: '#ffffff',
        accentColor: '#ff9ebb',
        eyeColor: '#54a0ff',
        earInner: '#ffd1dc',
        pattern: 'none'
    },
    tekir: {
        id: 'tekir',
        name: 'Tekir',
        desc: 'Çizgili sevimli afacan',
        emoji: '🐯',
        color: '#c8d6e5',
        accentColor: '#8395a7',
        eyeColor: '#1dd1a1',
        earInner: '#ff9ff3',
        pattern: 'stripes'
    },
    karamel: {
        id: 'karamel',
        name: 'Karamel',
        desc: 'Turuncu tombiş kedi',
        emoji: '😸',
        color: '#ffbe76',
        accentColor: '#f0932b',
        eyeColor: '#ff9f43',
        earInner: '#f8a5c2',
        pattern: 'none'
    },
    zeytin: {
        id: 'zeytin',
        name: 'Zeytin',
        desc: 'Siyah gözlü minik asil',
        emoji: '🐈‍⬛',
        color: '#34495e',
        accentColor: '#2c3e50',
        eyeColor: '#feca57',
        earInner: '#e84393',
        pattern: 'none'
    }
};

// Başarı Rozetleri Tanımları
const BADGES = [
    { id: 'first_correct', name: 'İlk Miyav!', icon: '🐾', desc: 'İlk çarpım sorusunu doğru çöz.', check: s => s.totalCorrect >= 1 },
    { id: 'combo_5', name: 'Pati Serisi', icon: '⚡', desc: 'Arka arkaya 5 doğru cevap ver.', check: s => s.maxCombo >= 5 },
    { id: 'fish_10', name: 'Balık Avcısı', icon: '🐟', desc: 'Toplam 10 balık topla.', check: s => s.fishCount >= 10 },
    { id: 'speed_15', name: 'Yıldırım Pati', icon: '⏱️', desc: 'Zamana karşı modda 15 soru bil.', check: s => s.highScoreSpeed >= 15 },
    { id: 'cat_friend', name: 'En İyi Dost', icon: '💖', desc: 'Kedicik ile 20 kez etkileşime geç.', check: s => s.pettingCount >= 20 },
    { id: 'fish_50', name: 'Büyük Balıkçı', icon: '👑', desc: 'Toplam 50 balık kazan.', check: s => s.fishCount >= 50 }
];

// Güvenli Çerez (Cookie) Yardımcı Fonksiyonları (Veri kaybını önlemek için)
function setPatiCookie(name, value, days = 365) {
    try {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
    } catch (e) {}
}

function getPatiCookie(name) {
    try {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    } catch (e) {}
    return null;
}

class PatiMatikGame {
    constructor() {
        this.loadState();

        // Çalışma anı oyun durumu (Runtime State)
        this.currentScreen = 'screen-menu';
        this.lastGameModeScreen = 'screen-practice';
        this.gameMode = 'practice'; // 'practice', 'classic', 'speed'
        this.selectedTable = 'all'; // 'all' veya '1' .. '10'
        
        // Dinamik oyun sayaçları
        this.score = 0;
        this.lives = 3;
        this.combo = 0;
        this.currentQuestion = null;
        this.timer = null;
        this.timeLeft = 60;
        this.canAnswer = true;
        this.practiceAnswered = false;

        this.initDOM();
        this.initEvents();
        this.renderAll();

        // Başlangıç ekranı olarak Ana Menüyü aç
        this.switchNav('screen-menu');
    }

    /**
     * Hem Yerel Depolamadan (LocalStorage) hem Çerezlerden (Cookies) ilerlemeyi yükler
     */
    loadState() {
        let saved = null;
        try {
            saved = localStorage.getItem('patimatik_save');
        } catch (e) {}

        // Eğer localStorage'da yoksa çerezlerden oku
        if (!saved) {
            saved = getPatiCookie('patimatik_save');
        }

        if (saved) {
            try {
                this.state = JSON.parse(saved);
            } catch (e) {
                this.state = this.getDefaultState();
            }
        } else {
            this.state = this.getDefaultState();
        }

        // Her kedi için ayrı ve bağımsız seviye garantisi
        if (!this.state.catLevels) {
            this.state.catLevels = {
                pamuk: { level: 1, xp: 0 },
                tekir: { level: 1, xp: 0 },
                karamel: { level: 1, xp: 0 },
                zeytin: { level: 1, xp: 0 }
            };
        } else {
            ['pamuk', 'tekir', 'karamel', 'zeytin'].forEach(catId => {
                if (!this.state.catLevels[catId]) {
                    this.state.catLevels[catId] = { level: 1, xp: 0 };
                }
            });
        }

        if (!this.state.selectedCat || !CATS[this.state.selectedCat]) {
            this.state.selectedCat = 'pamuk';
        }
    }

    getDefaultState() {
        return {
            selectedCat: 'pamuk',
            fishCount: 0,
            highScoreClassic: 0,
            highScoreSpeed: 0,
            totalCorrect: 0,
            maxCombo: 0,
            pettingCount: 0,
            unlockedBadges: [],
            // Her kedinin bağımsız sonsuz seviye ve XP'si
            catLevels: {
                pamuk: { level: 1, xp: 0 },
                tekir: { level: 1, xp: 0 },
                karamel: { level: 1, xp: 0 },
                zeytin: { level: 1, xp: 0 }
            }
        };
    }

    /**
     * İlerlemeyi hem LocalStorage'a hem de 1 yıllık Çereze (Cookie) kaydeder
     */
    saveState() {
        const jsonStr = JSON.stringify(this.state);
        try {
            localStorage.setItem('patimatik_save', jsonStr);
        } catch (e) {}
        setPatiCookie('patimatik_save', jsonStr, 365);

        this.checkBadges();
        this.updateFishBadges();
    }

    /**
     * Rozet kazanımları kontrolü
     */
    checkBadges() {
        let newlyUnlocked = false;
        BADGES.forEach(badge => {
            if (!this.state.unlockedBadges.includes(badge.id)) {
                if (badge.check(this.state)) {
                    this.state.unlockedBadges.push(badge.id);
                    newlyUnlocked = true;
                }
            }
        });

        if (newlyUnlocked) {
            if (window.soundEngine) window.soundEngine.playFanfare();
            this.fireConfetti();
        }
    }

    /**
     * Ultra Sevimli ve Modern Chibi Kedi SVG İllüstrasyonu Üretir
     * @param {string} catId Kedi Kimliği (pamuk, tekir, karamel, zeytin)
     * @param {string} mood Kedi Durumu ('normal', 'happy', 'sad', 'eating')
     */
    getCatSVG(catId, mood = 'normal') {
        const cat = CATS[catId] || CATS.pamuk;
        const isWhite = cat.color === '#ffffff';
        const strokeColor = isWhite ? '#ffccd5' : 'rgba(0,0,0,0.08)';

        // Gözler ve Yüz İfadeleri
        let eyesSVG = '';
        let mouthSVG = '';
        let blushOpacity = '0.75';

        if (mood === 'happy' || mood === 'eating') {
            eyesSVG = `
                <path d="M36,48 Q46,36 56,48" fill="none" stroke="#2c3a47" stroke-width="4.5" stroke-linecap="round"/>
                <path d="M68,48 Q78,36 88,48" fill="none" stroke="#2c3a47" stroke-width="4.5" stroke-linecap="round"/>
                <polygon points="46,34 47,38 51,39 47,40 46,44 45,40 41,39 45,38" fill="#feca57"/>
                <polygon points="78,34 79,38 83,39 79,40 78,44 77,40 73,39 77,38" fill="#feca57"/>
            `;
            if (mood === 'eating') {
                mouthSVG = `
                    <ellipse cx="62" cy="65" rx="7" ry="9" fill="#e84393" stroke="#2c3a47" stroke-width="2"/>
                    <ellipse cx="62" cy="68" rx="4" ry="4" fill="#ff7675"/>
                `;
            } else {
                mouthSVG = `<path d="M55,62 Q62,68 69,62" fill="none" stroke="#ff5e7e" stroke-width="3.5" stroke-linecap="round"/>`;
            }
            blushOpacity = '0.9';
        } else if (mood === 'sad') {
            eyesSVG = `
                <ellipse cx="46" cy="48" rx="7.5" ry="9" fill="${cat.eyeColor}" stroke="#2c3a47" stroke-width="2.5"/>
                <circle cx="43" cy="45" r="3" fill="#ffffff"/>
                <ellipse cx="78" cy="48" rx="7.5" ry="9" fill="${cat.eyeColor}" stroke="#2c3a47" stroke-width="2.5"/>
                <circle cx="75" cy="45" r="3" fill="#ffffff"/>
                <path d="M40,38 L48,42" stroke="#2c3a47" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M84,38 L76,42" stroke="#2c3a47" stroke-width="2.5" stroke-linecap="round"/>
            `;
            mouthSVG = `<path d="M58,64 Q62,60 66,64" fill="none" stroke="#2c3a47" stroke-width="3" stroke-linecap="round"/>`;
            blushOpacity = '0.4';
        } else {
            eyesSVG = `
                <ellipse cx="46" cy="48" rx="8.5" ry="10" fill="#2c3a47"/>
                <ellipse cx="46" cy="49" rx="7" ry="8.5" fill="${cat.eyeColor}"/>
                <circle cx="43" cy="45" r="3.5" fill="#ffffff"/>
                <circle cx="48" cy="52" r="1.8" fill="#ffffff"/>

                <ellipse cx="78" cy="48" rx="8.5" ry="10" fill="#2c3a47"/>
                <ellipse cx="78" cy="49" rx="7" ry="8.5" fill="${cat.eyeColor}"/>
                <circle cx="75" cy="45" r="3.5" fill="#ffffff"/>
                <circle cx="80" cy="52" r="1.8" fill="#ffffff"/>
            `;
            mouthSVG = `
                <path d="M59,58 Q62,62 65,58" fill="none" stroke="#2c3a47" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M53,58 Q56,62 59,58" fill="none" stroke="#2c3a47" stroke-width="2.5" stroke-linecap="round"/>
            `;
        }

        // Kedi Aksesuarları
        let accessorySVG = '';
        if (catId === 'pamuk') {
            accessorySVG = `
                <g transform="translate(82, 18) rotate(15)">
                    <ellipse cx="-7" cy="0" rx="7" ry="5" fill="#ff5e7e"/>
                    <ellipse cx="7" cy="0" rx="7" ry="5" fill="#ff5e7e"/>
                    <circle cx="0" cy="0" r="4" fill="#ffffff" stroke="#ff5e7e" stroke-width="1.5"/>
                </g>
            `;
        } else if (catId === 'tekir') {
            accessorySVG = `
                <path d="M60,10 C50,0 70,0 60,10 Z" fill="#1dd1a1" transform="translate(2, 6) rotate(10 60 10)"/>
            `;
        } else if (catId === 'karamel') {
            accessorySVG = `
                <g transform="translate(62, 90)">
                    <circle cx="0" cy="0" r="6.5" fill="#feca57" stroke="#e58e26" stroke-width="1.5"/>
                    <circle cx="0" cy="2" r="1.5" fill="#e58e26"/>
                </g>
            `;
        } else if (catId === 'zeytin') {
            accessorySVG = `
                <g transform="translate(62, 89)">
                    <polygon points="-7,-4 0,0 -7,4" fill="#ff4757"/>
                    <polygon points="7,-4 0,0 7,4" fill="#ff4757"/>
                    <circle cx="0" cy="0" r="3" fill="#feca57"/>
                </g>
            `;
        }

        // Tekir çizgileri
        let stripes = '';
        if (cat.pattern === 'stripes') {
            stripes = `
                <path d="M62,26 L62,34" stroke="${cat.accentColor}" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M53,28 L56,35" stroke="${cat.accentColor}" stroke-width="3" stroke-linecap="round"/>
                <path d="M71,28 L68,35" stroke="${cat.accentColor}" stroke-width="3" stroke-linecap="round"/>
            `;
        }

        return `
        <svg viewBox="0 0 124 124" width="100%" height="100%" class="cat-illustration cat-${mood}">
            <path d="M28,88 C10,95 12,118 36,114 C48,112 36,98 32,90 Z" fill="${cat.color}" stroke="${strokeColor}" stroke-width="2"/>

            <polygon points="26,50 18,14 50,30" fill="${cat.color}" stroke="${strokeColor}" stroke-width="2" stroke-linejoin="round"/>
            <polygon points="28,44 24,22 44,32" fill="${cat.earInner}"/>

            <polygon points="98,50 106,14 74,30" fill="${cat.color}" stroke="${strokeColor}" stroke-width="2" stroke-linejoin="round"/>
            <polygon points="96,44 100,22 80,32" fill="${cat.earInner}"/>

            <ellipse cx="62" cy="92" rx="34" ry="24" fill="${cat.color}" stroke="${strokeColor}" stroke-width="2"/>
            <ellipse cx="62" cy="94" rx="18" ry="14" fill="${isWhite ? '#fff0f4' : '#ffffff'}" opacity="0.9"/>

            <ellipse cx="62" cy="54" rx="44" ry="38" fill="${cat.color}" stroke="${strokeColor}" stroke-width="2"/>

            ${stripes}

            <ellipse cx="34" cy="58" rx="7" ry="4" fill="#ff8fa3" opacity="${blushOpacity}"/>
            <ellipse cx="90" cy="58" rx="7" ry="4" fill="#ff8fa3" opacity="${blushOpacity}"/>

            ${eyesSVG}

            <polygon points="62,53 59,57 65,57" fill="#ff5e7e"/>

            ${mouthSVG}

            <line x1="20" y1="54" x2="35" y2="56" stroke="#8395a7" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="20" y1="62" x2="35" y2="61" stroke="#8395a7" stroke-width="2.2" stroke-linecap="round"/>

            <line x1="104" y1="54" x2="89" y2="56" stroke="#8395a7" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="104" y1="62" x2="89" y2="61" stroke="#8395a7" stroke-width="2.2" stroke-linecap="round"/>

            ${accessorySVG}

            <ellipse cx="50" cy="98" rx="9" ry="7" fill="${cat.color}" stroke="${strokeColor}" stroke-width="1.8"/>
            <ellipse cx="74" cy="98" rx="9" ry="7" fill="${cat.color}" stroke="${strokeColor}" stroke-width="1.8"/>
        </svg>
        `;
    }

    /**
     * DOM eleman referanslarını bağlar
     */
    initDOM() {
        this.dom = {
            appContainer: document.getElementById('app-container'),
            fishCountBadges: document.querySelectorAll('.fish-count-text'),
            brandHomeBtn: document.getElementById('brand-home-btn'),
            catHouseBtn: document.getElementById('cat-house-btn'),
            soundBtn: document.getElementById('sound-toggle-btn'),
            musicBtn: document.getElementById('music-toggle-btn'),

            // Alt Sabit Gezinme Çubuğu (Bottom Navigation Bar)
            navItems: document.querySelectorAll('.bottom-nav-bar .nav-item'),
            
            // Ekranlar (Modlar)
            screenMenu: document.getElementById('screen-menu'),
            screenPractice: document.getElementById('screen-practice'),
            screenGame: document.getElementById('screen-game'),
            screenSpeed: document.getElementById('screen-speed'),
            screenCatHouse: document.getElementById('screen-cat-house'),
            screenGameOver: document.getElementById('screen-game-over'),

            // Ana Menü Elemanları
            mainCatAvatar: document.getElementById('main-cat-avatar'),
            mainCatLevelBadge: document.getElementById('main-cat-level-badge'),
            mainCatXpFill: document.getElementById('main-cat-xp-fill'),
            mainCatXpText: document.getElementById('main-cat-xp-text'),

            // Mod 1: Pati Okulu (Sürükle & Bırak)
            practiceChips: document.querySelectorAll('#practice-chips .chip-btn'),
            practiceCatContainer: document.getElementById('practice-cat-container'),
            practiceQuestionText: document.getElementById('practice-question-text'),
            practiceSpeechBubble: document.getElementById('practice-speech-bubble'),
            practiceBowlTarget: document.getElementById('practice-bowl-target'),
            practiceAnswerBox: document.getElementById('practice-answer-box'),
            practicePlatesContainer: document.getElementById('practice-plates-container'),
            practiceNextBtn: document.getElementById('practice-next-btn'),

            // Mod 2: Balık Avı (Klasik 3 Canlı Mod)
            classicChips: document.querySelectorAll('#classic-chips .chip-btn'),
            gameLives: document.getElementById('game-lives'),
            gameScore: document.getElementById('game-score'),
            gameCombo: document.getElementById('game-combo'),
            gameCatContainer: document.getElementById('game-cat-container'),
            gameQuestionText: document.getElementById('question-text'),
            gameSpeechBubble: document.getElementById('game-speech-bubble'),
            gameOptionsGrid: document.getElementById('options-grid'),

            // Mod 3: Hızlı Pati (60s Zamana Karşı Mod)
            speedChips: document.querySelectorAll('#speed-chips .chip-btn'),
            speedTimer: document.getElementById('speed-timer'),
            speedScore: document.getElementById('speed-score'),
            speedBest: document.getElementById('speed-best'),
            speedCatContainer: document.getElementById('speed-cat-container'),
            speedQuestionText: document.getElementById('speed-question-text'),
            speedSpeechBubble: document.getElementById('speed-speech-bubble'),
            speedOptionsGrid: document.getElementById('speed-options-grid'),

            // Mod 4: Kedi Evi
            pettingCatContainer: document.getElementById('petting-cat-box'),
            feedCatBtn: document.getElementById('feed-cat-btn'),
            badgesList: document.getElementById('badges-grid'),
            houseCatLevelBadge: document.getElementById('house-cat-level-badge'),
            houseCatXpFill: document.getElementById('house-cat-xp-fill'),
            houseCatXpText: document.getElementById('house-cat-xp-text'),

            // Oyun Bitiş Ekranı
            overTitle: document.getElementById('over-title'),
            overScore: document.getElementById('over-score'),
            overFish: document.getElementById('over-fish'),
            overBest: document.getElementById('over-best'),
            overPlayAgainBtn: document.getElementById('over-play-again-btn'),
            confettiCanvas: document.getElementById('confetti-canvas'),

            // Seviye Atlama Modalı
            levelUpModal: document.getElementById('level-up-modal'),
            levelUpCatAvatar: document.getElementById('level-up-cat-avatar'),
            levelUpText: document.getElementById('level-up-text'),
            levelUpCloseBtn: document.getElementById('level-up-close-btn')
        };
    }

    /**
     * Olay dinleyicilerini (Event Listeners) tanımlar
     */
    initEvents() {
        // Alt Sabit Gezinme Çubuğu Butonları (Bottom Nav)
        this.dom.navItems.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetNav = btn.dataset.nav;
                window.soundEngine.playClick();
                this.switchNav(targetNav);
            });
        });

        // Sol Üst Logo / Başlık Tıklanınca Ana Menüye Dön
        if (this.dom.brandHomeBtn) {
            this.dom.brandHomeBtn.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.switchNav('screen-menu');
            });
        }

        // Sağ Üst Kedi Evi Butonu
        if (this.dom.catHouseBtn) {
            this.dom.catHouseBtn.addEventListener('click', () => {
                window.soundEngine.playMeow();
                this.switchNav('screen-cat-house');
            });
        }

        // Ana Menüdeki 3 Büyük Mod Kartı (Alta açılmaz, direkt o modun ekranına geçer)
        document.querySelectorAll('[data-action="open-mode"]').forEach(btn => {
            btn.addEventListener('click', () => {
                window.soundEngine.playClick();
                const mode = btn.dataset.mode;
                if (mode === 'classic') {
                    this.switchNav('screen-game');
                } else if (mode === 'practice') {
                    this.switchNav('screen-practice');
                } else if (mode === 'speed') {
                    this.switchNav('screen-speed');
                }
            });
        });

        // Mod Sayfalarındaki [🏠 Ana Menü] Butonları
        document.querySelectorAll('[data-action="go-menu"]').forEach(btn => {
            btn.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.switchNav('screen-menu');
            });
        });

        // Ana Menüdeki Büyük Kediye Tıklama (Miyavlar ve Kalpler Uçurur)
        if (this.dom.mainCatAvatar) {
            this.dom.mainCatAvatar.addEventListener('click', (e) => {
                window.soundEngine.playMeow();
                this.createFloatingHeart(e.clientX, e.clientY);
                this.state.pettingCount++;
                this.saveState();
            });
        }

        // Kedi Seçimi Kartları (Pamuk, Tekir, Karamel, Zeytin)
        // Her tıklandığında yalnızca o kedinin seviyesi ve resmi ana menüye yansır!
        document.querySelectorAll('.cat-select-card').forEach(card => {
            card.addEventListener('click', () => {
                window.soundEngine.playMeow();
                const catId = card.dataset.cat;
                this.state.selectedCat = catId;
                this.saveState();

                // Tüm arayüzü seçilen kedinin bilgilerine göre anında güncelle
                this.renderAll();
                this.refreshCurrentScreenCat();
            });
        });

        // Yatay Kayan Sayı Çipleri (Pati Okulu)
        this.dom.practiceChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.handleChipClick(this.dom.practiceChips, chip);
                this.nextPracticeQuestion();
            });
        });

        // Yatay Kayan Sayı Çipleri (Balık Avı)
        this.dom.classicChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.handleChipClick(this.dom.classicChips, chip);
                this.loadNextGameQuestion();
            });
        });

        // Yatay Kayan Sayı Çipleri (Hızlı Pati)
        this.dom.speedChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.handleChipClick(this.dom.speedChips, chip);
                this.loadNextSpeedQuestion();
            });
        });

        // Seviye Atlama Modalı Kapatma
        if (this.dom.levelUpCloseBtn) {
            this.dom.levelUpCloseBtn.addEventListener('click', () => {
                window.soundEngine.playClick();
                if (this.dom.levelUpModal) this.dom.levelUpModal.classList.remove('active');
            });
        }

        // Ses Efektleri Butonu
        if (this.dom.soundBtn) {
            // Başlangıç durumu
            this.dom.soundBtn.textContent = window.soundEngine.isMuted ? '🔇' : '🔊';
            this.dom.soundBtn.addEventListener('click', () => {
                const isMuted = window.soundEngine.toggleMute();
                this.dom.soundBtn.textContent = isMuted ? '🔇' : '🔊';
                if (!isMuted) window.soundEngine.playClick();
            });
        }

        // Fon Müziği Butonu
        if (this.dom.musicBtn) {
            // Başlangıç durumu
            this.dom.musicBtn.textContent = window.soundEngine.musicWanted ? '🎵' : '🎼';
            this.dom.musicBtn.addEventListener('click', () => {
                const isPlaying = window.soundEngine.toggleMusic();
                this.dom.musicBtn.textContent = isPlaying ? '🎵' : '🎼';
                window.soundEngine.playClick();
            });
        }

        // Kedi Evi: Kediyi Sevme (Petting)
        if (this.dom.pettingCatContainer) {
            this.dom.pettingCatContainer.addEventListener('click', (e) => {
                this.petCat(e);
            });
        }

        // Kedi Evi: Kediye Balık Verme Butonu (Yalnızca o kediyi besler!)
        if (this.dom.feedCatBtn) {
            this.dom.feedCatBtn.addEventListener('click', () => {
                this.feedCat();
            });
        }

        // Pati Okulu Sıradaki Soru Butonu
        if (this.dom.practiceNextBtn) {
            this.dom.practiceNextBtn.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.nextPracticeQuestion();
            });
        }

        // Oyun Bitiş: Yeniden Oyna Butonu
        if (this.dom.overPlayAgainBtn) {
            this.dom.overPlayAgainBtn.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.switchNav(this.lastGameModeScreen || 'screen-game');
            });
        }
    }

    /**
     * Yatay sayı seçici çiplerine tıklandığında seçimi günceller
     */
    handleChipClick(chipGroup, clickedChip) {
        window.soundEngine.playClick();
        chipGroup.forEach(c => c.classList.remove('active'));
        clickedChip.classList.add('active');
        this.selectedTable = clickedChip.dataset.table;
    }

    /**
     * Ekran Değiştirme Yöneticisi (Modlar asla alta uzamaz, temizce açılır)
     */
    switchNav(screenId) {
        // Süre sayacı varsa durdur
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // Ekranları gizle/göster
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }

        // Alt menü aktif durumunu güncelle
        this.dom.navItems.forEach(item => {
            if (item.dataset.nav === screenId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Seçilen ekrana göre başlatma işlemlerini yap
        if (screenId === 'screen-menu') {
            this.renderMainCat();
            this.renderLevelUI();
        } else if (screenId === 'screen-practice') {
            this.lastGameModeScreen = 'screen-practice';
            this.gameMode = 'practice';
            this.startPractice();
        } else if (screenId === 'screen-game') {
            this.lastGameModeScreen = 'screen-game';
            this.gameMode = 'classic';
            this.startGame();
        } else if (screenId === 'screen-speed') {
            this.lastGameModeScreen = 'screen-speed';
            this.gameMode = 'speed';
            this.startSpeed();
        } else if (screenId === 'screen-cat-house') {
            this.renderCatHouse();
        }
    }

    /**
     * Aktif ekrandaki kedi görselini anında yeniler
     */
    refreshCurrentScreenCat() {
        if (this.currentScreen === 'screen-menu' && this.dom.mainCatAvatar) {
            this.renderMainCat();
        } else if (this.currentScreen === 'screen-practice' && this.dom.practiceCatContainer) {
            this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
        } else if (this.currentScreen === 'screen-game' && this.dom.gameCatContainer) {
            this.dom.gameCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
        } else if (this.currentScreen === 'screen-speed' && this.dom.speedCatContainer) {
            this.dom.speedCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
        } else if (this.currentScreen === 'screen-cat-house' && this.dom.pettingCatContainer) {
            this.dom.pettingCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
        }
    }

    /**
     * Genel arayüz yenilemesi
     */
    renderAll() {
        this.renderMainCat();
        this.renderCatSelectCards();
        this.updateFishBadges();
        this.renderLevelUI();
    }

    /**
     * Ana Menüdeki Büyük Kedi Avatarını Çizdirir
     */
    renderMainCat() {
        if (this.dom.mainCatAvatar) {
            this.dom.mainCatAvatar.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
        }
    }

    /**
     * Bir seviye atlamak için gereken balık (XP) miktarını hesaplar (Sonsuz Seviye)
     */
    getXpNeeded(level) {
        return Math.floor(2 + level * 1.5);
    }

    /**
     * Seviyeye göre kedi unvanını döndürür
     */
    getCatTitle(level) {
        if (level <= 2) return 'Minik Yavru 🐾';
        if (level <= 5) return 'Tatlı Afacan 🐱';
        if (level <= 9) return 'Hızlı Bıyık ⚡';
        if (level <= 14) return 'Çarpım Ustası 🎓';
        if (level <= 19) return 'Süper Kedicik 🦸';
        if (level <= 29) return 'Balık Şampiyonu 🏆';
        if (level <= 49) return 'Efsanevi Pati 🌟';
        return 'Kraliyet Kedisi 👑';
    }

    /**
     * Kediye balık/yemek vererek XP kazandırır ve gerekirse seviye atlatır
     * SADECE VE SADECE parametre olarak verilen catId'nin seviyesini artırır!
     */
    addCatXp(catId, amount = 1) {
        if (!this.state.catLevels[catId]) {
            this.state.catLevels[catId] = { level: 1, xp: 0 };
        }

        const catData = this.state.catLevels[catId];
        catData.xp += amount;

        let leveledUp = false;
        let needed = this.getXpNeeded(catData.level);

        // Seviye atlama döngüsü (Sonsuz Seviye)
        while (catData.xp >= needed) {
            catData.xp -= needed;
            catData.level++;
            leveledUp = true;
            needed = this.getXpNeeded(catData.level);
        }

        // Değişiklikleri hem localStorage hem çerezlere kaydet
        this.saveState();
        this.renderLevelUI();
        this.renderCatSelectCards();

        if (leveledUp) {
            this.triggerLevelUp(catId, catData.level);
        }
    }

    /**
     * Seviye atlama kutlama penceresini açar
     */
    triggerLevelUp(catId, newLevel) {
        window.soundEngine.playFanfare();
        this.fireConfetti();

        const cat = CATS[catId] || CATS.pamuk;
        const title = this.getCatTitle(newLevel);

        if (this.dom.levelUpCatAvatar) {
            this.dom.levelUpCatAvatar.innerHTML = this.getCatSVG(catId, 'happy');
        }
        if (this.dom.levelUpText) {
            this.dom.levelUpText.innerHTML = `<strong>${cat.name}</strong> artık <strong>Seviye ${newLevel}</strong> oldu!<br><span style="color:#d35400; font-size:1.05rem; font-weight:800; display:block; margin-top:4px;">Yeni Unvan: ${title}</span>`;
        }
        if (this.dom.levelUpModal) {
            this.dom.levelUpModal.classList.add('active');
        }
    }

    /**
     * Seviye rozetlerini ve XP çubuklarını günceller
     * ÇOK ÖNEMLİ: Yalnızca ve yalnızca o an seçili olan kedinin (selectedCat)
     * seviyesini ve XP'sini rozete ve çubuğa yansıtır!
     */
    renderLevelUI() {
        const catId = this.state.selectedCat;
        const cat = CATS[catId] || CATS.pamuk;
        const catData = this.state.catLevels[catId] || { level: 1, xp: 0 };
        const needed = this.getXpNeeded(catData.level);
        const title = this.getCatTitle(catData.level);
        const percent = Math.min(100, Math.round((catData.xp / needed) * 100));

        // Ana Menüdeki Seviye Göstergeleri (Yalnızca seçili kediye aittir)
        if (this.dom.mainCatLevelBadge) {
            this.dom.mainCatLevelBadge.textContent = `⭐ Seviye ${catData.level} - ${title}`;
        }
        if (this.dom.mainCatXpFill) {
            this.dom.mainCatXpFill.style.width = `${percent}%`;
        }
        if (this.dom.mainCatXpText) {
            this.dom.mainCatXpText.textContent = `${catData.xp} / ${needed} Balık (${needed - catData.xp} kaldı)`;
        }

        // Kedi Evi Seviye Bilgileri
        if (this.dom.houseCatLevelBadge) {
            this.dom.houseCatLevelBadge.textContent = `⭐ ${cat.name} - Seviye ${catData.level} (${title})`;
        }
        if (this.dom.houseCatXpFill) {
            this.dom.houseCatXpFill.style.width = `${percent}%`;
        }
        if (this.dom.houseCatXpText) {
            this.dom.houseCatXpText.textContent = `${catData.xp} / ${needed} Balık (${needed - catData.xp} kaldı)`;
        }
    }

    /**
     * Kedi Seçim Kartlarındaki Seviye Etiketlerini Günceller
     * Her kartın altında o kedinin kendi gerçek seviyesi yazar! (Örn: Pamuk (Lv.1), Tekir (Lv.3))
     */
    renderCatSelectCards() {
        document.querySelectorAll('.cat-select-card').forEach(card => {
            const catId = card.dataset.cat;
            const catData = this.state.catLevels[catId] || { level: 1, xp: 0 };

            if (catId === this.state.selectedCat) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }

            const svgBox = card.querySelector('.cat-card-svg');
            if (svgBox) {
                svgBox.innerHTML = this.getCatSVG(catId, 'normal');
            }

            const span = card.querySelector('span');
            if (span && CATS[catId]) {
                span.textContent = `${CATS[catId].name} (Lv.${catData.level})`;
            }
        });
    }

    updateFishBadges() {
        this.dom.fishCountBadges.forEach(b => {
            b.textContent = this.state.fishCount;
        });
    }

    /**
     * Kediyi Sevme ve Kalpler Uçurma
     */
    petCat(e) {
        window.soundEngine.playPurr();
        this.state.pettingCount++;
        this.saveState();

        const rect = this.dom.pettingCatContainer.getBoundingClientRect();
        const x = e ? e.clientX : rect.left + rect.width / 2;
        const y = e ? e.clientY : rect.top + rect.height / 2;

        this.createFloatingHeart(x, y);

        // Kedi kutusuna mutlu animasyon
        this.dom.pettingCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'happy');
        setTimeout(() => {
            if (this.dom.pettingCatContainer && this.currentScreen === 'screen-cat-house') {
                this.dom.pettingCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
            }
        }, 800);
    }

    createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['💖', '🐾', '✨', '😻', '💕'][Math.floor(Math.random() * 5)];
        heart.style.left = `${x - 12}px`;
        heart.style.top = `${y - 20}px`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    /**
     * Kediye Balık İkramı (+1 XP) - YALNIZCA SEÇİLİ KEDİYİ BESLER!
     */
    feedCat() {
        if (this.state.fishCount <= 0) {
            window.soundEngine.playWrong();
            alert('Henüz hiç balığın yok! Çarpım oyunlarını oynayarak balık kazanabilirsin. 🐟');
            return;
        }

        this.state.fishCount--;
        this.state.pettingCount += 2;
        // Yalnızca seçili kediye XP ver!
        this.addCatXp(this.state.selectedCat, 1);
        this.saveState();

        window.soundEngine.playChomp();
        window.soundEngine.playMeow();

        if (this.dom.pettingCatContainer) {
            this.dom.pettingCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'happy');
        }

        const rect = this.dom.pettingCatContainer.getBoundingClientRect();
        this.createFloatingHeart(rect.left + 50, rect.top + 30);
        this.createFloatingHeart(rect.left + 100, rect.top + 30);

        setTimeout(() => {
            if (this.dom.pettingCatContainer && this.currentScreen === 'screen-cat-house') {
                this.dom.pettingCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
            }
        }, 1000);
    }

    /**
     * Kedi Evi ve Rozetleri Çizdirir
     */
    renderCatHouse() {
        this.renderLevelUI();
        this.renderCatSelectCards();
        if (this.dom.pettingCatContainer) {
            this.dom.pettingCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
        }

        if (this.dom.badgesList) {
            this.dom.badgesList.innerHTML = '';
            BADGES.forEach(badge => {
                const isUnlocked = this.state.unlockedBadges.includes(badge.id);
                const badgeEl = document.createElement('div');
                badgeEl.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
                badgeEl.innerHTML = `
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-desc">${badge.desc}</div>
                `;
                this.dom.badgesList.appendChild(badgeEl);
            });
        }
    }

    /**
     * Rastgele Çarpım Sorusu Üretir
     */
    generateQuestion(tableChoice) {
        let num1, num2;
        if (tableChoice && tableChoice !== 'all') {
            num1 = parseInt(tableChoice, 10);
            num2 = Math.floor(Math.random() * 10) + 1;
        } else {
            num1 = Math.floor(Math.random() * 9) + 2;
            num2 = Math.floor(Math.random() * 9) + 2;
        }

        if (Math.random() > 0.5 && tableChoice === 'all') {
            [num1, num2] = [num2, num1];
        }

        const answer = num1 * num2;

        const optionsSet = new Set([answer]);
        while (optionsSet.size < 4) {
            let offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
            if (Math.random() > 0.5) {
                offset = (Math.random() > 0.5 ? 1 : -1) * num1;
            }
            let fake = answer + offset;
            if (fake > 0 && fake !== answer && fake <= 100) {
                optionsSet.add(fake);
            } else {
                optionsSet.add(Math.floor(Math.random() * 80) + 2);
            }
        }

        const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

        return {
            num1,
            num2,
            answer,
            options
        };
    }

    /**
     * ===============================================
     * MOD 1: PATİ OKULU (SÜRÜKLE & BIRAK ÖĞRENME)
     * ===============================================
     */
    startPractice() {
        if (this.dom.practiceCatContainer) {
            this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
        }
        this.nextPracticeQuestion();
    }

    nextPracticeQuestion() {
        this.currentQuestion = this.generateQuestion(this.selectedTable);
        const q = this.currentQuestion;
        this.practiceAnswered = false;

        this.dom.practiceQuestionText.textContent = `${q.num1} × ${q.num2} = ?`;
        this.dom.practiceAnswerBox.style.display = 'none';

        const catName = CATS[this.state.selectedCat].name;
        if (this.dom.practiceSpeechBubble) {
            this.dom.practiceSpeechBubble.textContent = `Karnım acıktı! Bana ${q.num1} × ${q.num2} balık olan tabağı sürükle! 🐾`;
        }

        if (this.dom.practiceCatContainer) {
            this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
            this.dom.practiceCatContainer.className = 'game-cat-container normal';
        }

        if (this.dom.practicePlatesContainer) {
            this.dom.practicePlatesContainer.innerHTML = '';

            q.options.forEach(opt => {
                const plateEl = document.createElement('div');
                plateEl.className = 'draggable-plate';

                const miniFishCount = Math.min(Math.max(Math.round(opt / 4), 2), 6);
                let miniFishes = '';
                for (let i = 0; i < miniFishCount; i++) {
                    miniFishes += '🐟';
                }

                plateEl.innerHTML = `
                    <div class="plate-number">${opt}</div>
                    <div class="plate-label">Balık</div>
                    <div class="plate-mini-fishes">${miniFishes}</div>
                `;

                this.setupPlateDrag(plateEl, opt, opt === q.answer);

                this.dom.practicePlatesContainer.appendChild(plateEl);
            });
        }
    }

    setupPlateDrag(plateEl, value, isCorrect) {
        let isDragging = false;
        let clone = null;
        const q = this.currentQuestion;

        const checkIsOverTarget = (clientX, clientY) => {
            const targetEl = this.dom.practiceBowlTarget;
            if (!targetEl) return false;
            const rect = targetEl.getBoundingClientRect();
            return (
                clientX >= rect.left - 20 &&
                clientX <= rect.right + 20 &&
                clientY >= rect.top - 20 &&
                clientY <= rect.bottom + 30
            );
        };

        const onDragStart = (clientX, clientY) => {
            if (this.practiceAnswered) return;
            isDragging = true;

            plateEl.classList.add('placeholder');

            clone = plateEl.cloneNode(true);
            clone.classList.add('is-dragging');
            clone.classList.remove('placeholder');
            clone.style.width = `${plateEl.offsetWidth}px`;
            clone.style.height = `${plateEl.offsetHeight}px`;
            clone.style.left = `${clientX}px`;
            clone.style.top = `${clientY}px`;
            document.body.appendChild(clone);

            window.soundEngine.playClick();
        };

        const onDragMove = (clientX, clientY) => {
            if (!isDragging || !clone) return;

            clone.style.left = `${clientX}px`;
            clone.style.top = `${clientY}px`;

            const isOver = checkIsOverTarget(clientX, clientY);
            if (isOver) {
                if (this.dom.practiceBowlTarget) this.dom.practiceBowlTarget.classList.add('drag-hover');
                if (this.dom.practiceCatContainer) {
                    this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'happy');
                }
                if (this.dom.practiceSpeechBubble) {
                    this.dom.practiceSpeechBubble.textContent = `Miyav! Bırak kaseye, afiyetle yiyeyim! 🍽️`;
                }
            } else {
                if (this.dom.practiceBowlTarget) this.dom.practiceBowlTarget.classList.remove('drag-hover');
                if (this.dom.practiceCatContainer && !this.practiceAnswered) {
                    this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
                }
            }
        };

        const onDragEnd = (clientX, clientY) => {
            if (!isDragging) return;
            isDragging = false;

            if (this.dom.practiceBowlTarget) this.dom.practiceBowlTarget.classList.remove('drag-hover');

            const isOver = checkIsOverTarget(clientX, clientY);

            if (clone) {
                clone.remove();
                clone = null;
            }

            if (isOver) {
                if (isCorrect) {
                    this.practiceAnswered = true;
                    plateEl.classList.add('eaten-disappear');

                    window.soundEngine.playChomp();
                    window.soundEngine.playMeow();
                    window.soundEngine.playCorrect();
                    this.fireConfetti();

                    if (this.dom.practiceCatContainer) {
                        this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'happy');
                        this.dom.practiceCatContainer.className = 'game-cat-container happy';
                    }

                    // Puan, balık ödülü ve kedi seviye XP'si (Yalnızca seçili kediye!)
                    this.state.fishCount++;
                    this.state.totalCorrect++;
                    this.addCatXp(this.state.selectedCat, 1);
                    this.saveState();

                    if (this.dom.practiceSpeechBubble) {
                        this.dom.practiceSpeechBubble.textContent = `Miyav! Nefis! ${q.num1} × ${q.num2} = ${q.answer} balığı afiyetle yedim! 🐟✨`;
                    }

                    if (this.dom.practiceAnswerBox) {
                        this.dom.practiceAnswerBox.innerHTML = `🎉 Harikasın! <strong>${q.num1} × ${q.num2} = ${q.answer}</strong> balık tabağını kediye yedirdin! 🌟 +1 Balık Kazandın!`;
                        this.dom.practiceAnswerBox.style.display = 'block';
                    }
                } else {
                    plateEl.classList.remove('placeholder');
                    plateEl.classList.add('shake');

                    window.soundEngine.playWrong();

                    if (this.dom.practiceCatContainer) {
                        this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'sad');
                        this.dom.practiceCatContainer.className = 'game-cat-container sad';
                    }

                    if (this.dom.practiceSpeechBubble) {
                        this.dom.practiceSpeechBubble.textContent = `Miyav! Bu tabakta ${value} balık var. Bana ${q.num1} × ${q.num2} = ${q.answer} balık lazım! Başka tabağı dene! 🐾`;
                    }

                    setTimeout(() => {
                        plateEl.classList.remove('shake');
                        if (this.dom.practiceCatContainer && !this.practiceAnswered) {
                            this.dom.practiceCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, 'normal');
                            this.dom.practiceCatContainer.className = 'game-cat-container normal';
                        }
                    }, 650);
                }
            } else {
                plateEl.classList.remove('placeholder');
            }
        };

        plateEl.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            onDragStart(touch.clientX, touch.clientY);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            onDragMove(touch.clientX, touch.clientY);
        }, { passive: true });

        window.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const touch = e.changedTouches[0];
            onDragEnd(touch.clientX, touch.clientY);
        });

        window.addEventListener('touchcancel', () => {
            if (isDragging) {
                isDragging = false;
                if (clone) clone.remove();
                plateEl.classList.remove('placeholder');
            }
        });

        plateEl.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            onDragStart(e.clientX, e.clientY);

            const onMouseMove = (moveEvent) => {
                onDragMove(moveEvent.clientX, moveEvent.clientY);
            };

            const onMouseUp = (upEvent) => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                onDragEnd(upEvent.clientX, upEvent.clientY);
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });
    }

    /**
     * ===============================================
     * MOD 2: BALIK AVI (KLASİK 3 CANLI MOD)
     * ===============================================
     */
    startGame() {
        this.gameMode = 'classic';
        this.score = 0;
        this.combo = 0;
        this.canAnswer = true;
        this.lives = 3;

        this.renderGameHeader();
        this.setGameCatMood('normal');
        this.loadNextGameQuestion();
    }

    renderGameHeader() {
        if (this.dom.gameScore) this.dom.gameScore.textContent = `Puan: ${this.score}`;
        
        if (this.dom.gameLives) {
            let hearts = '';
            for (let i = 0; i < 3; i++) {
                hearts += i < this.lives ? '❤️' : '🤍';
            }
            this.dom.gameLives.innerHTML = hearts;
        }

        if (this.dom.gameCombo) {
            if (this.combo > 1) {
                this.dom.gameCombo.textContent = `🐾 ${this.combo}x Seri!`;
                this.dom.gameCombo.style.visibility = 'visible';
            } else {
                this.dom.gameCombo.style.visibility = 'hidden';
            }
        }
    }

    setGameCatMood(mood) {
        if (this.dom.gameCatContainer) {
            this.dom.gameCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, mood);
            this.dom.gameCatContainer.className = `game-cat-container ${mood}`;
        }
    }

    loadNextGameQuestion() {
        this.canAnswer = true;
        this.currentQuestion = this.generateQuestion(this.selectedTable);
        const q = this.currentQuestion;

        if (this.dom.gameQuestionText) this.dom.gameQuestionText.textContent = `${q.num1} × ${q.num2} = ?`;
        if (this.dom.gameSpeechBubble) this.dom.gameSpeechBubble.textContent = `${CATS[this.state.selectedCat].name} balığı bekliyor! 🐟`;
        this.setGameCatMood('normal');

        if (this.dom.gameOptionsGrid) {
            this.dom.gameOptionsGrid.innerHTML = '';
            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `
                    <span>${opt}</span>
                    <span class="paw-subtext">🐾</span>
                `;
                btn.addEventListener('click', () => {
                    this.handleGameAnswer(opt, btn);
                });
                this.dom.gameOptionsGrid.appendChild(btn);
            });
        }
    }

    handleGameAnswer(chosen, buttonEl) {
        if (!this.canAnswer) return;
        this.canAnswer = false;

        const q = this.currentQuestion;
        const isCorrect = chosen === q.answer;

        if (isCorrect) {
            buttonEl.classList.add('correct');
            this.combo++;
            if (this.combo > this.state.maxCombo) {
                this.state.maxCombo = this.combo;
            }

            const earnedPoints = 10 * this.combo;
            this.score += earnedPoints;
            this.state.fishCount++;
            this.state.totalCorrect++;
            this.addCatXp(this.state.selectedCat, 1);
            this.saveState();

            window.soundEngine.playCorrect(this.combo);
            window.soundEngine.playChomp();
            this.setGameCatMood('happy');
            if (this.dom.gameSpeechBubble) this.dom.gameSpeechBubble.textContent = `Miyav! Harikasın! +${earnedPoints} Puan 🎉`;

            this.renderGameHeader();

            setTimeout(() => {
                this.loadNextGameQuestion();
            }, 800);
        } else {
            buttonEl.classList.add('wrong');
            this.combo = 0;
            window.soundEngine.playWrong();
            this.setGameCatMood('sad');
            if (this.dom.gameSpeechBubble) this.dom.gameSpeechBubble.textContent = `Üzülme! Doğru cevap: ${q.answer} 🐾`;

            if (this.dom.gameOptionsGrid) {
                this.dom.gameOptionsGrid.querySelectorAll('.option-btn').forEach(b => {
                    if (parseInt(b.innerText, 10) === q.answer) {
                        b.classList.add('correct');
                    }
                });
            }

            this.lives--;
            this.renderGameHeader();

            if (this.lives <= 0) {
                setTimeout(() => {
                    this.gameOver('Canların Bitti!');
                }, 1100);
                return;
            }

            setTimeout(() => {
                this.loadNextGameQuestion();
            }, 1300);
        }
    }

    /**
     * ===============================================
     * MOD 3: HIZLI PATİ (60 SANİYE ZAMANA KARŞI)
     * ===============================================
     */
    startSpeed() {
        this.gameMode = 'speed';
        this.score = 0;
        this.combo = 0;
        this.timeLeft = 60;
        this.canAnswer = true;

        if (this.dom.speedScore) this.dom.speedScore.textContent = `Puan: 0`;
        if (this.dom.speedBest) this.dom.speedBest.textContent = `Rekor: ${this.state.highScoreSpeed}`;
        if (this.dom.speedTimer) this.dom.speedTimer.textContent = `⏱️ 60s`;

        this.setSpeedCatMood('normal');
        this.startSpeedTimer();
        this.loadNextSpeedQuestion();
    }

    startSpeedTimer() {
        if (this.timer) clearInterval(this.timer);

        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.dom.speedTimer) this.dom.speedTimer.textContent = `⏱️ ${this.timeLeft}s`;

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.gameOver('Süre Doldu! ⏱️');
            }
        }, 1000);
    }

    setSpeedCatMood(mood) {
        if (this.dom.speedCatContainer) {
            this.dom.speedCatContainer.innerHTML = this.getCatSVG(this.state.selectedCat, mood);
            this.dom.speedCatContainer.className = `game-cat-container ${mood}`;
        }
    }

    loadNextSpeedQuestion() {
        this.canAnswer = true;
        this.currentQuestion = this.generateQuestion(this.selectedTable);
        const q = this.currentQuestion;

        if (this.dom.speedQuestionText) this.dom.speedQuestionText.textContent = `${q.num1} × ${q.num2} = ?`;
        if (this.dom.speedSpeechBubble) this.dom.speedSpeechBubble.textContent = `Hızlı ol, rekoru kır! ⚡`;
        this.setSpeedCatMood('normal');

        if (this.dom.speedOptionsGrid) {
            this.dom.speedOptionsGrid.innerHTML = '';
            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `
                    <span>${opt}</span>
                    <span class="paw-subtext">⚡</span>
                `;
                btn.addEventListener('click', () => {
                    this.handleSpeedAnswer(opt, btn);
                });
                this.dom.speedOptionsGrid.appendChild(btn);
            });
        }
    }

    handleSpeedAnswer(chosen, buttonEl) {
        if (!this.canAnswer) return;
        this.canAnswer = false;

        const q = this.currentQuestion;
        const isCorrect = chosen === q.answer;

        if (isCorrect) {
            buttonEl.classList.add('correct');
            this.combo++;
            if (this.combo > this.state.maxCombo) {
                this.state.maxCombo = this.combo;
            }

            const earned = 10 * this.combo;
            this.score += earned;
            this.state.fishCount++;
            this.state.totalCorrect++;
            this.addCatXp(this.state.selectedCat, 1);
            this.saveState();

            if (this.dom.speedScore) this.dom.speedScore.textContent = `Puan: ${this.score}`;

            window.soundEngine.playCorrect(this.combo);
            window.soundEngine.playChomp();
            this.setSpeedCatMood('happy');

            setTimeout(() => {
                this.loadNextSpeedQuestion();
            }, 450);
        } else {
            buttonEl.classList.add('wrong');
            this.combo = 0;
            window.soundEngine.playWrong();
            this.setSpeedCatMood('sad');

            if (this.dom.speedOptionsGrid) {
                this.dom.speedOptionsGrid.querySelectorAll('.option-btn').forEach(b => {
                    if (parseInt(b.innerText, 10) === q.answer) {
                        b.classList.add('correct');
                    }
                });
            }

            setTimeout(() => {
                this.loadNextSpeedQuestion();
            }, 700);
        }
    }

    /**
     * Oyun Bitişi
     */
    gameOver(title) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        window.soundEngine.playFanfare();
        this.fireConfetti();

        let isHighScore = false;
        if (this.gameMode === 'speed') {
            if (this.score > this.state.highScoreSpeed) {
                this.state.highScoreSpeed = this.score;
                isHighScore = true;
            }
        } else {
            if (this.score > this.state.highScoreClassic) {
                this.state.highScoreClassic = this.score;
                isHighScore = true;
            }
        }
        this.saveState();

        if (this.dom.overTitle) this.dom.overTitle.textContent = isHighScore ? '🏆 Yeni Rekor!' : title;
        if (this.dom.overScore) this.dom.overScore.textContent = this.score;
        if (this.dom.overFish) this.dom.overFish.textContent = `🐟 Toplanan Balık: ${this.state.fishCount}`;
        if (this.dom.overBest) {
            this.dom.overBest.textContent = `En İyi Skor: ${this.gameMode === 'speed' ? this.state.highScoreSpeed : this.state.highScoreClassic}`;
        }

        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        if (this.dom.screenGameOver) this.dom.screenGameOver.classList.add('active');
        this.currentScreen = 'screen-game-over';
    }

    /**
     * Başarı Kutlaması - Modern Canvas Confetti Efekti
     */
    fireConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 75,
                origin: { y: 0.65 },
                colors: ['#ff5e7e', '#feca57', '#00d2d3', '#1dd1a1', '#a55eea']
            });

            setTimeout(() => {
                confetti({
                    particleCount: 45,
                    angle: 60,
                    spread: 60,
                    origin: { x: 0.1, y: 0.7 },
                    colors: ['#feca57', '#ff5e7e']
                });
                confetti({
                    particleCount: 45,
                    angle: 120,
                    spread: 60,
                    origin: { x: 0.9, y: 0.7 },
                    colors: ['#00d2d3', '#1dd1a1']
                });
            }, 250);
            return;
        }

        const canvas = this.dom.confettiCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff5e7e', '#feca57', '#00d2d3', '#1dd1a1', '#a55eea'];

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.5) * 14 - 3,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                opacity: 1
            });
        }

        let animationFrame;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35;
                p.opacity -= 0.015;

                if (p.opacity > 0) {
                    alive = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            });

            if (alive) {
                animationFrame = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        };

        render();
    }
}

// Sayfa yüklendiğinde oyunu başlat
window.addEventListener('DOMContentLoaded', () => {
    window.game = new PatiMatikGame();
});
