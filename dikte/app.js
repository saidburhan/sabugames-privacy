// ==========================================================================
// NEŞELİ DİKTE YARIŞI - Ana Uygulama Mantığı (app.js)
// ==========================================================================

(function () {
  "use strict";

  const STORAGE_KEY = "berk_dikte_state_v2";
  const SUPABASE_CREDS_KEY = "berk_dikte_supabase_creds_v1";

  // Başlangıçtaki yerel (varsayılan) havuz kopyasını sakla (Seed işlemi için)
  const INITIAL_LOCAL_CATEGORIES = WORD_CATEGORIES.map((cat) => ({
    id: cat.id,
    words: [...cat.words],
    sentences: [...cat.sentences]
  }));

  // Supabase İstemcisi ve Yönetici Durumu
  let supabaseClient = null;
  let adminUser = null;
  let supabaseRows = []; // Tablodan çekilen ham kayıtlar

  // Uygulama Durumu (State)
  const state = {
    p1Name: "Berk",
    p2Name: "Said",
    p1AvatarIndex: 0, // 🦁
    p2AvatarIndex: 1, // 🚀
    voiceGender: "female", // 'female' | 'male'
    repeatIntervalMs: 1000, // 1 saniye aralıklarla tekrar
    speechRate: 0.92,
    hideTextDuringDictation: true,
    shuffleOnStart: false,
    activeCategoryId: WORD_CATEGORIES[0].id,
    groupFilterType: "all", // 'all' | 'words' | 'sentences'
    selectedWords: [...DEFAULT_SELECTED_ITEMS],

    // Oyun İçi Durum
    currentScreen: "setup", // 'setup' | 'game' | 'result'
    gameQueue: [],
    currentIndex: 0,
    p1Score: 0,
    p2Score: 0,
    roundHistory: [], // { word, winner: 1 | 2 | 0 }
    isPaused: false,
    isWordRevealedInRound: false,
    roundTransitioning: false
  };

  // Ses Sentezi (TTS), Ön-Bellek (Pre-buffer) ve Zamanlayıcı Değişkenleri
  let availableTurkishVoices = [];
  let repeatTimerId = null;
  let watchdogTimerId = null;
  let roundAdvanceTimerId = null;
  let activeUtteranceToken = 0;
  let audioCtx = null;
  let keepAliveStarted = false;
  let ttsAudioPlayer = null;
  let ttsPreloadAudio = null;
  let currentLoadedAudioUrl = "";

  // DOM Referansları
  const dom = {
    setupScreen: document.getElementById("setupScreen"),
    gameScreen: document.getElementById("gameScreen"),
    resultScreen: document.getElementById("resultScreen"),
    btnBackToSetup: document.getElementById("btnBackToSetup"),
    brandHomeBtn: document.getElementById("brandHomeBtn"),
    fxLayer: document.getElementById("fx-layer"),

    // Oyuncu Kurulumu
    p1NameInput: document.getElementById("p1NameInput"),
    p2NameInput: document.getElementById("p2NameInput"),
    p1AvatarDisplay: document.getElementById("p1AvatarDisplay"),
    p2AvatarDisplay: document.getElementById("p2AvatarDisplay"),
    p1AvatarPrev: document.getElementById("p1AvatarPrev"),
    p1AvatarNext: document.getElementById("p1AvatarNext"),
    p2AvatarPrev: document.getElementById("p2AvatarPrev"),
    p2AvatarNext: document.getElementById("p2AvatarNext"),

    // Ses Ayarları
    btnTestVoice: document.getElementById("btnTestVoice"),
    repeatIntervalSelect: document.getElementById("repeatIntervalSelect"),
    speechRateSelect: document.getElementById("speechRateSelect"),
    chkHideTextDuringDictation: document.getElementById("chkHideTextDuringDictation"),
    chkShuffleWords: document.getElementById("chkShuffleWords"),

    // Kelime Havuzu ve Liste
    customWordInput: document.getElementById("customWordInput"),
    btnAddCustomWord: document.getElementById("btnAddCustomWord"),
    categoryTabs: document.getElementById("categoryTabs"),
    groupLettersTiles: document.getElementById("groupLettersTiles"),
    categoryItemsContainer: document.getElementById("categoryItemsContainer"),
    btnAddCategoryAll: document.getElementById("btnAddCategoryAll"),
    btnRandomGroup10: document.getElementById("btnRandomGroup10"),
    btnRandomMix: document.getElementById("btnRandomMix"),
    selectedCountBadge: document.getElementById("selectedCountBadge"),
    selectedQueueList: document.getElementById("selectedQueueList"),
    btnReverseQueue: document.getElementById("btnReverseQueue"),
    btnClearQueue: document.getElementById("btnClearQueue"),
    btnStartGame: document.getElementById("btnStartGame"),
    startBtnSubtext: document.getElementById("startBtnSubtext"),

    // Canlı Oyun Ekranı
    gameStepCounter: document.getElementById("gameStepCounter"),
    gameProgressBar: document.getElementById("gameProgressBar"),
    speakerWaveWrapper: document.getElementById("speakerWaveWrapper"),
    btnRepeatNow: document.getElementById("btnRepeatNow"),
    livePulseDot: document.getElementById("livePulseDot"),
    dictationStatusText: document.getElementById("dictationStatusText"),
    wordHiddenMask: document.getElementById("wordHiddenMask"),
    wordVisibleText: document.getElementById("wordVisibleText"),
    btnToggleReveal: document.getElementById("btnToggleReveal"),
    toggleRevealLabel: document.getElementById("toggleRevealLabel"),
    btnPauseResume: document.getElementById("btnPauseResume"),
    pauseResumeLabel: document.getElementById("pauseResumeLabel"),
    btnSkipWord: document.getElementById("btnSkipWord"),

    // Oyuncu Zonları
    gameP1Avatar: document.getElementById("gameP1Avatar"),
    gameP1Name: document.getElementById("gameP1Name"),
    gameP1Score: document.getElementById("gameP1Score"),
    p1StarsTray: document.getElementById("p1StarsTray"),
    btnPlayer1Claim: document.getElementById("btnPlayer1Claim"),
    btnP1SubName: document.getElementById("btnP1SubName"),

    gameP2Avatar: document.getElementById("gameP2Avatar"),
    gameP2Name: document.getElementById("gameP2Name"),
    gameP2Score: document.getElementById("gameP2Score"),
    p2StarsTray: document.getElementById("p2StarsTray"),
    btnPlayer2Claim: document.getElementById("btnPlayer2Claim"),
    btnP2SubName: document.getElementById("btnP2SubName"),

    // Tur Sonu Kutlama Katmanı
    roundWinnerOverlay: document.getElementById("roundWinnerOverlay"),
    roundWinnerTitle: document.getElementById("roundWinnerTitle"),
    roundRevealedWord: document.getElementById("roundRevealedWord"),
    roundNextHint: document.getElementById("roundNextHint"),
    btnForceNextNow: document.getElementById("btnForceNextNow"),

    // Sonuç Ekranı
    winnerHeadline: document.getElementById("winnerHeadline"),
    winnerSubtext: document.getElementById("winnerSubtext"),
    finalCardP1: document.getElementById("finalCardP1"),
    finalCardP2: document.getElementById("finalCardP2"),
    finalCrownP1: document.getElementById("finalCrownP1"),
    finalCrownP2: document.getElementById("finalCrownP2"),
    finalP1Avatar: document.getElementById("finalP1Avatar"),
    finalP2Avatar: document.getElementById("finalP2Avatar"),
    finalP1Name: document.getElementById("finalP1Name"),
    finalP2Name: document.getElementById("finalP2Name"),
    finalP1Stars: document.getElementById("finalP1Stars"),
    finalP2Stars: document.getElementById("finalP2Stars"),
    finalP1StarsVisual: document.getElementById("finalP1StarsVisual"),
    finalP2StarsVisual: document.getElementById("finalP2StarsVisual"),
    completedWordsSummary: document.getElementById("completedWordsSummary"),
    btnPlayAgainSame: document.getElementById("btnPlayAgainSame"),
    btnBackToPoolFromResult: document.getElementById("btnBackToPoolFromResult"),

    // Yönetici ve Supabase Modalı
    btnOpenAdmin: document.getElementById("btnOpenAdmin"),
    adminBtnLabel: document.getElementById("adminBtnLabel"),
    adminModal: document.getElementById("adminModal"),
    btnCloseAdminModal: document.getElementById("btnCloseAdminModal"),
    adminConnectionBadge: document.getElementById("adminConnectionBadge"),
    adminAuthSection: document.getElementById("adminAuthSection"),
    adminLoginForm: document.getElementById("adminLoginForm"),
    adminEmailInput: document.getElementById("adminEmailInput"),
    adminPasswordInput: document.getElementById("adminPasswordInput"),
    btnAdminLoginSubmit: document.getElementById("btnAdminLoginSubmit"),
    adminAuthError: document.getElementById("adminAuthError"),
    adminDashboardSection: document.getElementById("adminDashboardSection"),
    adminUserEmailDisplay: document.getElementById("adminUserEmailDisplay"),
    btnAdminLogout: document.getElementById("btnAdminLogout"),
    adminGroupSelect: document.getElementById("adminGroupSelect"),
    adminTypeSelect: document.getElementById("adminTypeSelect"),
    adminContentTextarea: document.getElementById("adminContentTextarea"),
    adminLetterCheckHint: document.getElementById("adminLetterCheckHint"),
    btnAdminInsertWords: document.getElementById("btnAdminInsertWords"),
    btnAdminSeedDefaults: document.getElementById("btnAdminSeedDefaults"),
    adminInsertStatus: document.getElementById("adminInsertStatus"),
    adminTotalRecordsCount: document.getElementById("adminTotalRecordsCount"),
    btnAdminRefreshRecords: document.getElementById("btnAdminRefreshRecords"),
    adminRecordsList: document.getElementById("adminRecordsList")
  };

  // ==========================================================================
  // 1. BAŞLATMA VE LOCALSTORAGE YÖNETİMİ
  // ==========================================================================
  function init() {
    loadSavedState();
    initSpeechVoices();
    renderSetupUI();
    bindEvents();
    initSupabaseIntegration();
  }

  function loadSavedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);

      if (typeof saved.p1Name === "string" && saved.p1Name.trim()) {
        state.p1Name = saved.p1Name.trim();
      }
      if (typeof saved.p2Name === "string" && saved.p2Name.trim()) {
        state.p2Name = saved.p2Name.trim();
      }
      if (typeof saved.p1AvatarIndex === "number") {
        state.p1AvatarIndex = saved.p1AvatarIndex % AVATAR_OPTIONS.length;
      }
      if (typeof saved.p2AvatarIndex === "number") {
        state.p2AvatarIndex = saved.p2AvatarIndex % AVATAR_OPTIONS.length;
      }
      state.voiceGender = "female";
      if (typeof saved.repeatIntervalMs === "number") {
        state.repeatIntervalMs = saved.repeatIntervalMs;
      }
      if (typeof saved.speechRate === "number") {
        state.speechRate = saved.speechRate;
      }
      if (typeof saved.hideTextDuringDictation === "boolean") {
        state.hideTextDuringDictation = saved.hideTextDuringDictation;
      }
      if (typeof saved.shuffleOnStart === "boolean") {
        state.shuffleOnStart = saved.shuffleOnStart;
      }
      if (Array.isArray(saved.selectedWords) && saved.selectedWords.length > 0) {
        state.selectedWords = saved.selectedWords;
      }
    } catch (err) {
      console.warn("Kaydedilmiş ayarlar okunamadı:", err);
    }
  }

  function saveState() {
    try {
      const payload = {
        p1Name: state.p1Name,
        p2Name: state.p2Name,
        p1AvatarIndex: state.p1AvatarIndex,
        p2AvatarIndex: state.p2AvatarIndex,
        voiceGender: state.voiceGender,
        repeatIntervalMs: state.repeatIntervalMs,
        speechRate: state.speechRate,
        hideTextDuringDictation: state.hideTextDuringDictation,
        shuffleOnStart: state.shuffleOnStart,
        selectedWords: state.selectedWords
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Ayarlar kaydedilemedi:", err);
    }
  }

  // ==========================================================================
  // 2. GELİŞMİŞ TÜRKÇE SESLENDİRME MOTORU (KADIN NEURAL & ERKEK SAPI + ÖN-BELLEK)
  // ==========================================================================

  // Kısa 1. sınıf hece ve kelimelerinin Windows TTS (Tolga) tarafından kısaltma veya
  // kimyasal element ("ni" -> "nikel", "ip" -> "i-pe", "na" -> "sodyum" vb.) olarak
  // okunmasını engelleyen Türkçe fonetik koruma sözlüğü:
  const SAPI_PHONETIC_FIX_MAP = {
    "ni": "nî",
    "na": "nâ",
    "la": "lâ",
    "ti": "tî",
    "li": "lî",
    "si": "sî",
    "mi": "mî",
    "ip": "îp",
    "av": "aav",
    "tl": "teel",
    "sn": "seen",
    "dk": "deek",
    "tr": "teer"
  };

  function initSpeechVoices() {
    // Google Doğal Kadın Sesi için <audio referrerpolicy="no-referrer"> oynatıcısını hazırla
    if (!ttsAudioPlayer) {
      ttsAudioPlayer = document.createElement("audio");
      ttsAudioPlayer.setAttribute("referrerpolicy", "no-referrer");
      ttsAudioPlayer.preload = "auto";
      ttsAudioPlayer.style.display = "none";
      document.body.appendChild(ttsAudioPlayer);
    }

    if (!ttsPreloadAudio) {
      ttsPreloadAudio = document.createElement("audio");
      ttsPreloadAudio.setAttribute("referrerpolicy", "no-referrer");
      ttsPreloadAudio.preload = "auto";
      ttsPreloadAudio.style.display = "none";
      document.body.appendChild(ttsPreloadAudio);
    }

    if (!("speechSynthesis" in window)) return;

    function updateVoiceList() {
      const allVoices = window.speechSynthesis.getVoices() || [];
      availableTurkishVoices = allVoices.filter((v) =>
        v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("tr")
      );
    }

    updateVoiceList();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoiceList;
    }
  }

  /**
   * Windows ses sürücülerinin (HDMI / Realtek / Bluetooth) 1 saniyelik boşluklarda
   * uyku moduna geçip kelimelerin ilk harfini yutmasını (%100) engelleyen
   * duyulmaz (ultra düşük genlikli) sürekli ses kanalı.
   */
  function ensureAudioKeepAlive() {
    const ctx = getAudioContext();
    if (!ctx || keepAliveStarted) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(30, ctx.currentTime);
      // İnsan kulağının duyamayacağı fakat ses kartını uyanık tutan seviye
      gain.gain.setValueAtTime(0.00002, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      keepAliveStarted = true;
    } catch (e) {
      // ignore
    }
  }

  function detectVoiceGender(voice) {
    if (!voice || !voice.name) return "unknown";
    const nameLower = voice.name.toLowerCase();

    const femaleKeywords = [
      "emel", "yelda", "seda", "filiz", "zeynep", "ayşe", "ayse",
      "fatma", "elif", "female", "kadın", "kadin", "woman", "siri female"
    ];
    const maleKeywords = [
      "tolga", "cem", "ahmet", "onur", "murat", "mehmet",
      "male", "erkek", "man", "siri male"
    ];

    for (const kw of femaleKeywords) {
      if (nameLower.includes(kw)) return "female";
    }
    for (const kw of maleKeywords) {
      if (nameLower.includes(kw)) return "male";
    }
    return "unknown";
  }

  /**
   * Metni ses motoruna göndermeden önce temizler.
   * forSapi=true ise Windows SAPI ("ni" -> "nikel" vb.) kısaltma hatalarını önler.
   */
  function prepareTextForTTS(rawText, forSapi) {
    const trimmed = String(rawText || "").trim();
    if (!trimmed) return "";

    // Tek kelime ise büyük harften kaynaklı kısaltma/sembol okumalarını (Ni=Nikel, Al=Alüminyum)
    // önlemek için tamamen küçük Türkçe harfe çevir:
    const isSingleWord = !/\s/.test(trimmed);
    const lower = trimmed.toLocaleLowerCase("tr-TR").replace(/[.,!?;:]+$/g, "");

    if (forSapi) {
      if (SAPI_PHONETIC_FIX_MAP[lower]) {
        return SAPI_PHONETIC_FIX_MAP[lower];
      }
      // Cümle içinde geçen "ni" gibi tek başına heceleri de koru
      if (!isSingleWord) {
        return trimmed
          .split(/\s+/)
          .map((token) => {
            const cleanToken = token.toLocaleLowerCase("tr-TR").replace(/[.,!?;:]+$/g, "");
            return SAPI_PHONETIC_FIX_MAP[cleanToken] || token;
          })
          .join(" ");
      }
      return lower;
    }

    return isSingleWord ? lower : trimmed;
  }

  function buildGoogleNeuralFemaleUrl(text) {
    const clean = prepareTextForTTS(text, false);
    const rate = Number(state.speechRate) || 0.92;
    const ttsSpeed = rate <= 0.85 ? "0.65" : "0.9";
    return (
      "https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=tr-TR&client=gtx&ttsspeed=" +
      ttsSpeed +
      "&q=" +
      encodeURIComponent(clean)
    );
  }

  function preloadNextWordAudio(nextText) {
    if (!nextText || !ttsPreloadAudio || state.voiceGender !== "female") return;
    try {
      const nextUrl = buildGoogleNeuralFemaleUrl(nextText);
      if (ttsPreloadAudio.src !== nextUrl) {
        ttsPreloadAudio.src = nextUrl;
        ttsPreloadAudio.load();
      }
    } catch (e) {
      // ignore
    }
  }

  /**
   * Ana Seslendirme Fonksiyonu:
   * - Kadın Sesi ('female'): Cihazda doğal/neural kadın sesi (Microsoft Emel Online) varsa onu,
   *   yoksa (Windows Chrome gibi sadece Tolga olan cihazlarda) Google Doğal Türkçe Kadın Sesini
   *   ön-bellekli (pre-buffered) olarak kullanır. Tekrarlarda sesi bellekten (0ms gecikmeyle) çalar.
   * - Erkek Sesi ('male'): Cihazdaki doğal Türkçe erkek sesini (Microsoft Tolga / Ahmet)
   *   fonetik koruma sözlüğüyle ("ni" -> "nî" vb.) ve ses yutmasını önleyerek okur.
   */
  function speakText(text, onComplete) {
    ensureAudioKeepAlive();

    clearTimeout(watchdogTimerId);
    activeUtteranceToken += 1;
    const token = activeUtteranceToken;

    let finished = false;
    function finishOnce() {
      if (finished || token !== activeUtteranceToken) return;
      finished = true;
      clearTimeout(watchdogTimerId);
      dom.speakerWaveWrapper.classList.remove("speaking");
      if (typeof onComplete === "function") {
        onComplete();
      }
    }

    // Güvenlik zamanlayıcısı
    const estimatedDurationMs = Math.max(2200, String(text).length * 150 + 1500);
    watchdogTimerId = setTimeout(finishOnce, estimatedDurationMs);

    // 1. KADIN SESİ SEÇİLİYSE:
    if (state.voiceGender === "female") {
      // Cihazda gerçek bir Neural Kadın sesi (örn. Microsoft Emel Online) var mı kontrol et
      const nativeFemaleVoice = availableTurkishVoices.find(
        (v) => detectVoiceGender(v) === "female" && v.name.toLowerCase().includes("online")
      );

      if (!nativeFemaleVoice && ttsAudioPlayer) {
        // Google Doğal Türkçe Kadın Sesi (Pre-buffered HTML5 Audio)
        if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
          try {
            window.speechSynthesis.cancel();
          } catch (e) {}
        }

        const targetUrl = buildGoogleNeuralFemaleUrl(text);
        const rate = Number(state.speechRate) || 0.92;

        ttsAudioPlayer.onended = finishOnce;
        ttsAudioPlayer.onerror = function () {
          // İnternet kesilirse yerel sese (fallback) düş
          if (token !== activeUtteranceToken) return;
          speakViaBrowserSAPI(text, "female", token, finishOnce);
        };

        dom.speakerWaveWrapper.classList.add("speaking");

        // Eğer aynı kelime 1 saniye arayla tekrar ediliyorsa ve zaten yüklendiyse:
        // Ağdan tekrar çekme, doğrudan 0. saniyeye sarıp anında çal (Kelime başı asla yutulmaz!)
        if (currentLoadedAudioUrl === targetUrl && ttsAudioPlayer.readyState >= 2) {
          try {
            ttsAudioPlayer.pause();
            ttsAudioPlayer.currentTime = 0;
            ttsAudioPlayer.playbackRate = rate <= 0.85 ? 0.9 : 1.0;
            const playPromise = ttsAudioPlayer.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(() => {
                speakViaBrowserSAPI(text, "female", token, finishOnce);
              });
            }
            return;
          } catch (e) {
            // devam et ve yeniden yükle
          }
        }

        currentLoadedAudioUrl = targetUrl;
        ttsAudioPlayer.src = targetUrl;
        ttsAudioPlayer.playbackRate = rate <= 0.85 ? 0.9 : 1.0;

        const playPromise = ttsAudioPlayer.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            if (token !== activeUtteranceToken) return;
            speakViaBrowserSAPI(text, "female", token, finishOnce);
          });
        }
        return;
      }
    }

    // 2. ERKEK SESİ VEYA YEREL SAPI SESİ:
    if (ttsAudioPlayer && !ttsAudioPlayer.paused) {
      try {
        ttsAudioPlayer.pause();
      } catch (e) {}
    }
    speakViaBrowserSAPI(text, state.voiceGender, token, finishOnce);
  }

  function speakViaBrowserSAPI(text, targetGender, token, finishOnce) {
    if (!("speechSynthesis" in window)) {
      finishOnce();
      return;
    }

    // ÖNEMLİ: Sadece halihazırda konuşuyorsa cancel() çağır!
    // Her okuma öncesi gereksiz cancel() çağırmak Windows SAPI'de kelimenin ilk hecesini yutar.
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      // ignore
    }

    if (availableTurkishVoices.length === 0) {
      const allVoices = window.speechSynthesis.getVoices() || [];
      availableTurkishVoices = allVoices.filter((v) =>
        v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("tr")
      );
    }

    const femaleVoices = availableTurkishVoices.filter((v) => detectVoiceGender(v) === "female");
    const maleVoices = availableTurkishVoices.filter((v) => detectVoiceGender(v) === "male");

    let chosenVoice = null;
    let chosenPitch = 1.0;

    if (targetGender === "female") {
      chosenVoice = femaleVoices[0] || availableTurkishVoices[0] || null;
      chosenPitch = femaleVoices.length > 0 ? 1.05 : 1.25;
    } else {
      chosenVoice = maleVoices[0] || availableTurkishVoices[0] || null;
      chosenPitch = 1.0; // Tolga/Ahmet kendi doğal erkek tonunda net okusun
    }

    const safeText = prepareTextForTTS(text, true);
    const utterance = new SpeechSynthesisUtterance(safeText);
    utterance.lang = "tr-TR";
    utterance.rate = Number(state.speechRate) || 0.92;
    utterance.pitch = chosenPitch;
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onstart = function () {
      if (token !== activeUtteranceToken) return;
      dom.speakerWaveWrapper.classList.add("speaking");
    };

    utterance.onend = finishOnce;
    utterance.onerror = finishOnce;

    dom.speakerWaveWrapper.classList.add("speaking");
    window.speechSynthesis.speak(utterance);
  }

  function stopAllSpeech() {
    activeUtteranceToken += 1;
    clearTimeout(repeatTimerId);
    clearTimeout(watchdogTimerId);
    repeatTimerId = null;
    watchdogTimerId = null;
    dom.speakerWaveWrapper.classList.remove("speaking");

    if (ttsAudioPlayer) {
      try {
        ttsAudioPlayer.pause();
        ttsAudioPlayer.currentTime = 0;
      } catch (e) {
        // ignore
      }
    }

    if ("speechSynthesis" in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {
        // ignore
      }
    }
  }

  // ==========================================================================
  // 3. WEB AUDIO API SES EFEKTLERİ (Yıldız, Başlangıç, Kutlama)
  // ==========================================================================
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playStarChime() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.075);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.075);
      gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + idx * 0.075 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.075 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.075);
      osc.stop(ctx.currentTime + idx * 0.075 + 0.3);
    });
  }

  function playVictoryFanfare() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const melody = [
      { f: 523.25, t: 0, d: 0.14 },
      { f: 659.25, t: 0.14, d: 0.14 },
      { f: 783.99, t: 0.28, d: 0.14 },
      { f: 1046.5, t: 0.44, d: 0.38 }
    ];

    melody.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + n.t);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + n.t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + n.t);
      osc.stop(ctx.currentTime + n.t + n.d + 0.02);
    });
  }

  // ==========================================================================
  // 4. KURULUM EKRANI (SETUP) RENDER İŞLEMLERİ
  // ==========================================================================
  function renderSetupUI() {
    // Oyuncu İsimleri ve Karakterleri
    dom.p1NameInput.value = state.p1Name;
    dom.p2NameInput.value = state.p2Name;
    dom.p1AvatarDisplay.textContent = AVATAR_OPTIONS[state.p1AvatarIndex].emoji;
    dom.p2AvatarDisplay.textContent = AVATAR_OPTIONS[state.p2AvatarIndex].emoji;

    // Ses Cinsiyeti Seçimi
    updateVoiceGenderUI();

    // Tekrar Aralığı ve Okuma Hızı
    dom.repeatIntervalSelect.value = String(state.repeatIntervalMs);
    dom.speechRateSelect.value = String(state.speechRate);
    dom.chkHideTextDuringDictation.checked = state.hideTextDuringDictation;
    dom.chkShuffleWords.checked = state.shuffleOnStart;

    // Kategori Sekmeleri ve Havuz
    renderCategoryTabs();
    renderCategoryItems();
    renderSelectedQueue();
  }

  function updateVoiceGenderUI() {
    if (dom.btnTestVoice) {
      dom.btnTestVoice.textContent = "🔔 Sesi Test Et";
    }
  }

  function renderCategoryTabs() {
    dom.categoryTabs.innerHTML = "";
    WORD_CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-tab-btn" + (cat.id === state.activeCategoryId ? " active" : "");
      btn.textContent = cat.title;
      btn.addEventListener("click", () => {
        state.activeCategoryId = cat.id;
        renderCategoryTabs();
        renderCategoryItems();
      });
      dom.categoryTabs.appendChild(btn);
    });
  }

  function getFilteredItemsForCategory(cat) {
    if (!cat) return [];
    if (state.groupFilterType === "words") {
      return cat.words || [];
    }
    if (state.groupFilterType === "sentences") {
      return cat.sentences || [];
    }
    return cat.items || [...(cat.words || []), ...(cat.sentences || [])];
  }

  function renderCategoryItems() {
    dom.categoryItemsContainer.innerHTML = "";
    const activeCat = WORD_CATEGORIES.find((c) => c.id === state.activeCategoryId) || WORD_CATEGORIES[0];

    // Harf grubu taşlarını (A N E T İ L vb.) oluştur
    if (dom.groupLettersTiles && activeCat.letters) {
      const lettersArr = activeCat.letters.split("-").map((s) => s.trim());
      dom.groupLettersTiles.innerHTML =
        `<span class="group-letters-caption">${activeCat.badge} Sesleri:</span>` +
        lettersArr.map((l) => `<span class="letter-tile">${escapeHtml(l)}</span>`).join("");
    }

    const itemsToShow = getFilteredItemsForCategory(activeCat);

    itemsToShow.forEach((itemText) => {
      const inQueue = state.selectedWords.includes(itemText);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "pool-chip" + (inQueue ? " in-queue" : "");
      chip.innerHTML = `<span>${escapeHtml(itemText)}</span> <span>${inQueue ? "✅" : "➕"}</span>`;
      chip.addEventListener("click", () => {
        toggleWordInQueue(itemText);
      });
      dom.categoryItemsContainer.appendChild(chip);
    });
  }

  function renderSelectedQueue() {
    const count = state.selectedWords.length;
    dom.selectedCountBadge.textContent = String(count);
    dom.startBtnSubtext.textContent = count > 0
      ? `${count} kelime/cümle hazır`
      : "Başlamak için en az 1 kelime seçin";

    dom.selectedQueueList.innerHTML = "";

    if (count === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-queue-notice";
      empty.textContent = "Henüz kelime veya cümle seçilmedi. Yukarıdan ekleyebilir veya havuzdan tıklayabilirsiniz.";
      dom.selectedQueueList.appendChild(empty);
      return;
    }

    state.selectedWords.forEach((word, idx) => {
      const pill = document.createElement("div");
      pill.className = "queue-item-pill";
      pill.innerHTML = `
        <span class="queue-item-num">${idx + 1}</span>
        <span>${escapeHtml(word)}</span>
        <button type="button" class="queue-item-remove" title="Listeden Çıkar" aria-label="Sil">✕</button>
      `;
      pill.querySelector(".queue-item-remove").addEventListener("click", () => {
        state.selectedWords.splice(idx, 1);
        saveState();
        renderCategoryItems();
        renderSelectedQueue();
      });
      dom.selectedQueueList.appendChild(pill);
    });
  }

  function toggleWordInQueue(word) {
    const idx = state.selectedWords.indexOf(word);
    if (idx >= 0) {
      state.selectedWords.splice(idx, 1);
    } else {
      state.selectedWords.push(word);
    }
    saveState();
    renderCategoryItems();
    renderSelectedQueue();
  }

  function addCustomWordsFromInput() {
    const raw = dom.customWordInput.value.trim();
    if (!raw) return;

    // Virgül veya satır sonu ile ayrılmış çoklu girişleri destekle
    const parts = raw
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    parts.forEach((item) => {
      if (!state.selectedWords.includes(item)) {
        state.selectedWords.push(item);
      }
    });

    dom.customWordInput.value = "";
    saveState();
    renderCategoryItems();
    renderSelectedQueue();
  }

  // ==========================================================================
  // 5. CANLI DİKTE YARIŞI AKIŞI (GAME ENGINE)
  // ==========================================================================
  function startGame() {
    syncPlayerNamesFromInputs();

    if (state.selectedWords.length === 0) {
      alert("Lütfen yarışmayı başlatmadan önce en az bir kelime veya cümle ekleyin!");
      dom.customWordInput.focus();
      return;
    }

    // Oyun kuyruğunu hazırla
    state.gameQueue = [...state.selectedWords];
    if (state.shuffleOnStart) {
      shuffleArray(state.gameQueue);
    }

    state.currentIndex = 0;
    state.p1Score = 0;
    state.p2Score = 0;
    state.roundHistory = [];
    state.isPaused = false;
    state.roundTransitioning = false;

    // Oyuncu bilgilerini oyun ekranına yerleştir
    dom.gameP1Avatar.textContent = AVATAR_OPTIONS[state.p1AvatarIndex].emoji;
    dom.gameP1Name.textContent = state.p1Name;
    dom.btnP1SubName.textContent = state.p1Name;
    dom.gameP1Score.textContent = "0";

    dom.gameP2Avatar.textContent = AVATAR_OPTIONS[state.p2AvatarIndex].emoji;
    dom.gameP2Name.textContent = state.p2Name;
    dom.btnP2SubName.textContent = state.p2Name;
    dom.gameP2Score.textContent = "0";

    renderPlayerStarsTray(1);
    renderPlayerStarsTray(2);

    switchScreen("game");
    startRound();
  }

  function startRound() {
    stopAllSpeech();
    clearTimeout(roundAdvanceTimerId);

    if (state.currentIndex >= state.gameQueue.length) {
      finishGame();
      return;
    }

    state.roundTransitioning = false;
    state.isPaused = false;
    state.isWordRevealedInRound = !state.hideTextDuringDictation;

    dom.roundWinnerOverlay.classList.add("hidden");

    const currentWord = state.gameQueue[state.currentIndex];
    const total = state.gameQueue.length;
    const stepNum = state.currentIndex + 1;

    dom.gameStepCounter.textContent = `${stepNum} / ${total}`;
    const pct = Math.round((stepNum / total) * 100);
    dom.gameProgressBar.style.width = `${pct}%`;

    dom.wordVisibleText.textContent = currentWord;
    updateWordVisibilityUI();
    updatePauseResumeUI();

    // Sıradaki kelimeyi arka planda ön-belleğe (pre-buffer) yükle
    if (state.currentIndex + 1 < state.gameQueue.length) {
      preloadNextWordAudio(state.gameQueue[state.currentIndex + 1]);
    }

    // İlk okumayı başlat ve ardından 1 saniye aralıklarla tekrar döngüsüne gir
    runDictationRepeatCycle();
  }

  /**
   * Aktif kelime/cümleyi okur; okuma bittikten sonra (onend)
   * tam `state.repeatIntervalMs` (varsayılan 1000ms = 1 saniye) bekleyip
   * oyuncu butona basana kadar tekrar okur.
   */
  function runDictationRepeatCycle() {
    clearTimeout(repeatTimerId);
    if (
      state.currentScreen !== "game" ||
      state.isPaused ||
      state.roundTransitioning ||
      state.currentIndex >= state.gameQueue.length
    ) {
      return;
    }

    const currentWord = state.gameQueue[state.currentIndex];

    speakText(currentWord, () => {
      if (
        state.currentScreen !== "game" ||
        state.isPaused ||
        state.roundTransitioning
      ) {
        return;
      }

      repeatTimerId = setTimeout(() => {
        runDictationRepeatCycle();
      }, state.repeatIntervalMs);
    });
  }

  function handlePlayerClaim(playerNumber) {
    if (state.currentScreen !== "game" || state.roundTransitioning) return;

    state.roundTransitioning = true;
    stopAllSpeech();

    const currentWord = state.gameQueue[state.currentIndex];
    const winnerName = playerNumber === 1 ? state.p1Name : state.p2Name;

    if (playerNumber === 1) {
      state.p1Score += 1;
      dom.gameP1Score.textContent = String(state.p1Score);
      renderPlayerStarsTray(1);
      spawnConfettiBurst(playerNumber);
    } else {
      state.p2Score += 1;
      dom.gameP2Score.textContent = String(state.p2Score);
      renderPlayerStarsTray(2);
      spawnConfettiBurst(playerNumber);
    }

    state.roundHistory.push({
      word: currentWord,
      winner: playerNumber
    });

    playStarChime();

    // Tur sonu yıldız kutlama ve kelime gösterim kartını aç
    dom.roundWinnerTitle.textContent = `⭐ ${winnerName} Yıldızı Kaptı!`;
    dom.roundRevealedWord.textContent = currentWord;

    const isLastWord = state.currentIndex + 1 >= state.gameQueue.length;
    dom.roundNextHint.textContent = isLastWord
      ? "Son kelime tamamlandı! Sonuç ekranı açılıyor..."
      : "Harika! Sıradaki kelimeye geçiliyor...";

    dom.roundWinnerOverlay.classList.remove("hidden");

    roundAdvanceTimerId = setTimeout(() => {
      advanceToNextWord();
    }, 1850);
  }

  function skipCurrentWord() {
    if (state.currentScreen !== "game" || state.roundTransitioning) return;
    stopAllSpeech();

    const currentWord = state.gameQueue[state.currentIndex];
    state.roundHistory.push({
      word: currentWord,
      winner: 0
    });

    advanceToNextWord();
  }

  function advanceToNextWord() {
    clearTimeout(roundAdvanceTimerId);
    dom.roundWinnerOverlay.classList.add("hidden");
    state.currentIndex += 1;

    if (state.currentIndex >= state.gameQueue.length) {
      finishGame();
    } else {
      startRound();
    }
  }

  function renderPlayerStarsTray(playerNumber) {
    const tray = playerNumber === 1 ? dom.p1StarsTray : dom.p2StarsTray;
    const score = playerNumber === 1 ? state.p1Score : state.p2Score;

    tray.innerHTML = "";
    if (score === 0) {
      const hint = document.createElement("span");
      hint.className = "empty-tray-hint";
      hint.textContent = "Kağıda yazmayı bitirince aşağıdaki düğmeye bas!";
      tray.appendChild(hint);
      return;
    }

    for (let i = 0; i < score; i++) {
      const star = document.createElement("span");
      star.className = "earned-star-badge";
      star.textContent = "⭐";
      tray.appendChild(star);
    }
  }

  function updateWordVisibilityUI() {
    if (state.isWordRevealedInRound) {
      dom.wordHiddenMask.classList.add("hidden");
      dom.wordVisibleText.classList.remove("hidden");
      dom.toggleRevealLabel.textContent = "Gizle";
    } else {
      dom.wordHiddenMask.classList.remove("hidden");
      dom.wordVisibleText.classList.add("hidden");
      dom.toggleRevealLabel.textContent = "Göster";
    }
  }

  function updatePauseResumeUI() {
    const secText = (state.repeatIntervalMs / 1000).toFixed(1).replace(".0", "");
    if (state.isPaused) {
      dom.livePulseDot.classList.add("paused");
      dom.dictationStatusText.textContent = "Dikte duraklatıldı. Devam etmek için tıklayın.";
      dom.pauseResumeLabel.textContent = "Devam Et";
    } else {
      dom.livePulseDot.classList.remove("paused");
      dom.dictationStatusText.textContent = `Dinleyin ve kağıda yazın! (${secText} sn arayla tekrar ediyor)`;
      dom.pauseResumeLabel.textContent = "Duraklat";
    }
  }

  // ==========================================================================
  // 6. OYUN SONU ŞAMPİYONLUK EKRANI
  // ==========================================================================
  function finishGame() {
    stopAllSpeech();
    switchScreen("result");
    playVictoryFanfare();
    spawnConfettiBurst(0);

    dom.finalP1Avatar.textContent = AVATAR_OPTIONS[state.p1AvatarIndex].emoji;
    dom.finalP2Avatar.textContent = AVATAR_OPTIONS[state.p2AvatarIndex].emoji;
    dom.finalP1Name.textContent = state.p1Name;
    dom.finalP2Name.textContent = state.p2Name;
    dom.finalP1Stars.textContent = String(state.p1Score);
    dom.finalP2Stars.textContent = String(state.p2Score);

    dom.finalP1StarsVisual.textContent = state.p1Score > 0 ? "⭐".repeat(Math.min(state.p1Score, 20)) : "—";
    dom.finalP2StarsVisual.textContent = state.p2Score > 0 ? "⭐".repeat(Math.min(state.p2Score, 20)) : "—";

    dom.finalCardP1.classList.remove("winner-glow");
    dom.finalCardP2.classList.remove("winner-glow");
    dom.finalCrownP1.classList.add("hidden");
    dom.finalCrownP2.classList.add("hidden");

    if (state.p1Score > state.p2Score) {
      dom.winnerHeadline.textContent = `🎉 Tebrikler ${state.p1Name}! Yıldız Şampiyonu!`;
      dom.winnerSubtext.textContent = `${state.p1Name} ${state.p1Score} yıldız, ${state.p2Name} ${state.p2Score} yıldız topladı. İkiniz de harika yazdınız!`;
      dom.finalCardP1.classList.add("winner-glow");
      dom.finalCrownP1.classList.remove("hidden");
    } else if (state.p2Score > state.p1Score) {
      dom.winnerHeadline.textContent = `🎉 Tebrikler ${state.p2Name}! Yıldız Şampiyonu!`;
      dom.winnerSubtext.textContent = `${state.p2Name} ${state.p2Score} yıldız, ${state.p1Name} ${state.p1Score} yıldız topladı. İkiniz de harika yazdınız!`;
      dom.finalCardP2.classList.add("winner-glow");
      dom.finalCrownP2.classList.remove("hidden");
    } else {
      dom.winnerHeadline.textContent = `🤝 Dostluk Kazandı! Muhteşem Beraberlik!`;
      dom.winnerSubtext.textContent = `${state.p1Name} ve ${state.p2Name} ${state.p1Score}'er yıldız kazandılar!`;
      dom.finalCardP1.classList.add("winner-glow");
      dom.finalCardP2.classList.add("winner-glow");
      dom.finalCrownP1.classList.remove("hidden");
      dom.finalCrownP2.classList.remove("hidden");
    }

    // Yazılan kelimelerin kağıt kontrol özetini oluştur
    dom.completedWordsSummary.innerHTML = "";
    state.roundHistory.forEach((entry, idx) => {
      const row = document.createElement("div");
      row.className = "completed-word-item";
      let badgeLabel = "Atlandı";
      if (entry.winner === 1) badgeLabel = `⭐ ${state.p1Name}`;
      if (entry.winner === 2) badgeLabel = `⭐ ${state.p2Name}`;

      row.innerHTML = `
        <span>${idx + 1}. ${escapeHtml(entry.word)}</span>
        <span class="completed-word-winner">${escapeHtml(badgeLabel)}</span>
      `;
      dom.completedWordsSummary.appendChild(row);
    });
  }

  // ==========================================================================
  // 7. EKRAN GEÇİŞİ VE KONFETİ EFEKTLERİ
  // ==========================================================================
  function switchScreen(screenName) {
    state.currentScreen = screenName;
    dom.setupScreen.classList.toggle("active", screenName === "setup");
    dom.gameScreen.classList.toggle("active", screenName === "game");
    dom.resultScreen.classList.toggle("active", screenName === "result");

    dom.btnBackToSetup.classList.toggle("hidden", screenName === "setup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function spawnConfettiBurst(playerNumber) {
    const colors = ["#FACC15", "#38BDF8", "#FB923C", "#4ADE80", "#A855F7", "#F43F5E"];
    const count = 28;
    const originX = playerNumber === 1 ? 25 : playerNumber === 2 ? 75 : 50;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${originX + (Math.random() * 24 - 12)}vw`;
      piece.style.top = `45vh`;
      piece.style.backgroundColor = colors[i % colors.length];

      const dx = (Math.random() - 0.5) * 320 + "px";
      const dy = (Math.random() * -260 - 40) + "px";
      const rot = (Math.random() * 720 - 360) + "deg";

      piece.style.setProperty("--dx", dx);
      piece.style.setProperty("--dy", dy);
      piece.style.setProperty("--rot", rot);

      dom.fxLayer.appendChild(piece);
      setTimeout(() => {
        piece.remove();
      }, 1550);
    }
  }

  // ==========================================================================
  // 8. OLAY DİNLEYİCİLERİ (EVENT LISTENERS)
  // ==========================================================================
  function syncPlayerNamesFromInputs() {
    const n1 = dom.p1NameInput.value.trim();
    const n2 = dom.p2NameInput.value.trim();
    state.p1Name = n1 || "Berk";
    state.p2Name = n2 || "Said";
    dom.p1NameInput.value = state.p1Name;
    dom.p2NameInput.value = state.p2Name;
    updateVoiceGenderUI();
    saveState();
  }

  function bindEvents() {
    // İsim Değişiklikleri
    dom.p1NameInput.addEventListener("input", () => {
      state.p1Name = dom.p1NameInput.value.trim() || "Berk";
      updateVoiceGenderUI();
      saveState();
    });
    dom.p2NameInput.addEventListener("input", () => {
      state.p2Name = dom.p2NameInput.value.trim() || "Said";
      updateVoiceGenderUI();
      saveState();
    });

    // Avatar Değiştirme
    dom.p1AvatarPrev.addEventListener("click", () => {
      state.p1AvatarIndex = (state.p1AvatarIndex - 1 + AVATAR_OPTIONS.length) % AVATAR_OPTIONS.length;
      dom.p1AvatarDisplay.textContent = AVATAR_OPTIONS[state.p1AvatarIndex].emoji;
      saveState();
    });
    dom.p1AvatarNext.addEventListener("click", () => {
      state.p1AvatarIndex = (state.p1AvatarIndex + 1) % AVATAR_OPTIONS.length;
      dom.p1AvatarDisplay.textContent = AVATAR_OPTIONS[state.p1AvatarIndex].emoji;
      saveState();
    });
    dom.p2AvatarPrev.addEventListener("click", () => {
      state.p2AvatarIndex = (state.p2AvatarIndex - 1 + AVATAR_OPTIONS.length) % AVATAR_OPTIONS.length;
      dom.p2AvatarDisplay.textContent = AVATAR_OPTIONS[state.p2AvatarIndex].emoji;
      saveState();
    });
    dom.p2AvatarNext.addEventListener("click", () => {
      state.p2AvatarIndex = (state.p2AvatarIndex + 1) % AVATAR_OPTIONS.length;
      dom.p2AvatarDisplay.textContent = AVATAR_OPTIONS[state.p2AvatarIndex].emoji;
      saveState();
    });

    // Sesi Test Et
    dom.btnTestVoice.addEventListener("click", () => {
      speakText("Kalemler ve kağıtlar hazırsa dikte yarışına başlayalım!");
    });

    // Tekrar Aralığı ve Okuma Hızı
    dom.repeatIntervalSelect.addEventListener("change", () => {
      state.repeatIntervalMs = Number(dom.repeatIntervalSelect.value) || 1000;
      saveState();
    });

    dom.speechRateSelect.addEventListener("change", () => {
      state.speechRate = Number(dom.speechRateSelect.value) || 0.92;
      saveState();
    });

    dom.chkHideTextDuringDictation.addEventListener("change", () => {
      state.hideTextDuringDictation = dom.chkHideTextDuringDictation.checked;
      saveState();
    });

    dom.chkShuffleWords.addEventListener("change", () => {
      state.shuffleOnStart = dom.chkShuffleWords.checked;
      saveState();
    });

    // Kelime / Cümle Ekleme
    dom.btnAddCustomWord.addEventListener("click", addCustomWordsFromInput);
    dom.customWordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustomWordsFromInput();
      }
    });

    // Kelime / Cümle Alt Filtre Butonları (Tümü / Kelimeler / Cümleler)
    document.querySelectorAll(".type-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".type-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.groupFilterType = btn.getAttribute("data-filter") || "all";
        renderCategoryItems();
      });
    });

    // Havuz Hızlı Butonları
    dom.btnAddCategoryAll.addEventListener("click", () => {
      const activeCat = WORD_CATEGORIES.find((c) => c.id === state.activeCategoryId);
      if (!activeCat) return;
      const itemsToAdd = getFilteredItemsForCategory(activeCat);
      itemsToAdd.forEach((item) => {
        if (!state.selectedWords.includes(item)) {
          state.selectedWords.push(item);
        }
      });
      saveState();
      renderCategoryItems();
      renderSelectedQueue();
    });

    if (dom.btnRandomGroup10) {
      dom.btnRandomGroup10.addEventListener("click", () => {
        const activeCat = WORD_CATEGORIES.find((c) => c.id === state.activeCategoryId) || WORD_CATEGORIES[0];
        const pool = [...getFilteredItemsForCategory(activeCat)];
        shuffleArray(pool);
        state.selectedWords = pool.slice(0, 10);
        saveState();
        renderCategoryItems();
        renderSelectedQueue();
      });
    }

    dom.btnRandomMix.addEventListener("click", () => {
      const allPool = WORD_CATEGORIES.flatMap((c) => getFilteredItemsForCategory(c));
      shuffleArray(allPool);
      state.selectedWords = allPool.slice(0, 10);
      saveState();
      renderCategoryItems();
      renderSelectedQueue();
    });

    dom.btnReverseQueue.addEventListener("click", () => {
      state.selectedWords.reverse();
      saveState();
      renderSelectedQueue();
    });

    dom.btnClearQueue.addEventListener("click", () => {
      state.selectedWords = [];
      saveState();
      renderCategoryItems();
      renderSelectedQueue();
    });

    // Yarışı Başlat
    dom.btnStartGame.addEventListener("click", startGame);

    // Üst Bar Kuruluma Dön
    const returnToSetup = () => {
      stopAllSpeech();
      clearTimeout(roundAdvanceTimerId);
      dom.roundWinnerOverlay.classList.add("hidden");
      switchScreen("setup");
    };
    dom.btnBackToSetup.addEventListener("click", returnToSetup);
    dom.brandHomeBtn.addEventListener("click", returnToSetup);

    // Oyun İçi Kontroller
    dom.btnRepeatNow.addEventListener("click", () => {
      if (state.currentScreen !== "game" || state.roundTransitioning) return;
      state.isPaused = false;
      updatePauseResumeUI();
      runDictationRepeatCycle();
    });

    dom.btnToggleReveal.addEventListener("click", () => {
      state.isWordRevealedInRound = !state.isWordRevealedInRound;
      updateWordVisibilityUI();
    });

    dom.btnPauseResume.addEventListener("click", () => {
      if (state.currentScreen !== "game" || state.roundTransitioning) return;
      state.isPaused = !state.isPaused;
      updatePauseResumeUI();
      if (state.isPaused) {
        stopAllSpeech();
      } else {
        runDictationRepeatCycle();
      }
    });

    dom.btnSkipWord.addEventListener("click", skipCurrentWord);

    dom.btnForceNextNow.addEventListener("click", () => {
      advanceToNextWord();
    });

    // İki Oyuncu Yıldız Kazanma Butonları
    dom.btnPlayer1Claim.addEventListener("click", () => handlePlayerClaim(1));
    dom.btnPlayer2Claim.addEventListener("click", () => handlePlayerClaim(2));

    // Bilgisayar Klavye Kısayolu Desteği (Berk: A veya Sol Ok, Said: L veya Sağ Ok)
    window.addEventListener("keydown", (e) => {
      if (state.currentScreen !== "game") return;
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

      if (state.roundTransitioning) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          advanceToNextWord();
        }
        return;
      }

      const keyLower = e.key.toLowerCase();
      if (keyLower === "a" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePlayerClaim(1);
      } else if (keyLower === "l" || e.key === "ArrowRight") {
        e.preventDefault();
        handlePlayerClaim(2);
      }
    });

    // Oyun Sonu Ekranı Butonları
    dom.btnPlayAgainSame.addEventListener("click", startGame);
    dom.btnBackToPoolFromResult.addEventListener("click", returnToSetup);

    // Yönetici Modalı ve Supabase Olayları
    bindAdminEvents();
  }

  // ==========================================================================
  // 9. SUPABASE ENTEGRASYONU VE YÖNETİCİ PANELİ
  // ==========================================================================
  function getActiveSupabaseConfig() {
    const url = (typeof SUPABASE_DEFAULT_CONFIG !== "undefined" && SUPABASE_DEFAULT_CONFIG.url) ? SUPABASE_DEFAULT_CONFIG.url.trim() : "";
    const anonKey = (typeof SUPABASE_DEFAULT_CONFIG !== "undefined" && SUPABASE_DEFAULT_CONFIG.anonKey) ? SUPABASE_DEFAULT_CONFIG.anonKey.trim() : "";
    const tableName = (typeof SUPABASE_DEFAULT_CONFIG !== "undefined" && SUPABASE_DEFAULT_CONFIG.tableName) ? SUPABASE_DEFAULT_CONFIG.tableName : "dikte_havuzu";

    return { url, anonKey, tableName };
  }

  async function initSupabaseIntegration() {
    const { url, anonKey } = getActiveSupabaseConfig();

    if (!url || !anonKey) {
      updateAdminStatusUI(false, "⚙️ Supabase yapılandırması eksik (supabase-config.js)");
      return;
    }

    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      updateAdminStatusUI(false, "⚠️ Supabase SDK yüklenemedi (İnternet bağlantısını kontrol edin)");
      return;
    }

    try {
      supabaseClient = window.supabase.createClient(url, anonKey);

      // Mevcut oturumu kontrol et
      const { data: sessionData } = await supabaseClient.auth.getSession();
      adminUser = sessionData && sessionData.session ? sessionData.session.user : null;
      updateAdminAuthUI();

      // Oturum değişimlerini dinle
      supabaseClient.auth.onAuthStateChange((_event, session) => {
        adminUser = session ? session.user : null;
        updateAdminAuthUI();
      });

      // Tablodaki kelimeleri çek
      await fetchWordsFromSupabase();
    } catch (err) {
      console.error("Supabase başlatma hatası:", err);
      updateAdminStatusUI(false, "⚠️ Supabase bağlantı hatası: " + (err.message || "Bilinmeyen hata"));
    }
  }

  function updateAdminStatusUI(connected, message) {
    if (!dom.adminConnectionBadge) return;
    dom.adminConnectionBadge.textContent = message;
    dom.adminConnectionBadge.style.color = connected ? "#15803D" : "#B45309";
  }

  function updateAdminAuthUI() {
    const isLoggedIn = Boolean(adminUser);

    if (dom.btnOpenAdmin) {
      dom.btnOpenAdmin.classList.toggle("logged-in", isLoggedIn);
    }
    if (dom.adminBtnLabel) {
      dom.adminBtnLabel.textContent = isLoggedIn ? "Yönetici (Açık)" : "Yönetici";
    }

    if (dom.adminAuthSection && dom.adminDashboardSection) {
      dom.adminAuthSection.classList.toggle("hidden", isLoggedIn);
      dom.adminDashboardSection.classList.toggle("hidden", !isLoggedIn);
    }

    if (isLoggedIn && dom.adminUserEmailDisplay) {
      dom.adminUserEmailDisplay.textContent = adminUser.email || "Yönetici";
      renderAdminRecordsList();
    }
  }

  async function fetchWordsFromSupabase() {
    if (!supabaseClient) return;
    const { tableName } = getActiveSupabaseConfig();

    try {
      const { data, error } = await supabaseClient
        .from(tableName)
        .select("id, group_id, item_type, content, created_at")
        .order("created_at", { ascending: true });

      if (error) {
        updateAdminStatusUI(
          false,
          `⚠️ '${tableName}' tablosu okunamadı (${error.message}). Lütfen supabase_setup.sql dosyasını çalıştırın.`
        );
        return;
      }

      supabaseRows = Array.isArray(data) ? data : [];
      updateAdminStatusUI(true, `☁️ Supabase Bağlı — Tabloda ${supabaseRows.length} kelime/cümle kayıtlı`);

      // Yerel başlangıç havuzuyla Supabase'den gelen kayıtları birleştir
      WORD_CATEGORIES.forEach((cat) => {
        const baseCat = INITIAL_LOCAL_CATEGORIES.find((c) => c.id === cat.id);
        const wordSet = new Set(baseCat ? baseCat.words : []);
        const sentenceSet = new Set(baseCat ? baseCat.sentences : []);

        supabaseRows
          .filter((r) => r.group_id === cat.id)
          .forEach((r) => {
            if (r.item_type === "sentence") {
              sentenceSet.add(r.content);
            } else {
              wordSet.add(r.content);
            }
          });

        cat.words = Array.from(wordSet);
        cat.sentences = Array.from(sentenceSet);
        cat.items = [...cat.words, ...cat.sentences];
      });

      renderCategoryItems();
      renderAdminRecordsList();
    } catch (err) {
      updateAdminStatusUI(false, "⚠️ Veri çekilirken hata oluştu: " + (err.message || err));
    }
  }

  function renderAdminRecordsList() {
    if (!dom.adminRecordsList || !dom.adminTotalRecordsCount) return;
    dom.adminTotalRecordsCount.textContent = String(supabaseRows.length);
    dom.adminRecordsList.innerHTML = "";

    if (supabaseRows.length === 0) {
      dom.adminRecordsList.innerHTML = `<div class="empty-queue-notice">Supabase tablosunda henüz kayıt yok. "📥 Başlangıç Havuzunu Tabloya Yükle" butonuna basabilir veya yukarıdan yeni kelime ekleyebilirsiniz.</div>`;
      return;
    }

    // Son eklenenler en üstte görünsün
    const sorted = [...supabaseRows].reverse();
    sorted.forEach((row) => {
      const cat = WORD_CATEGORIES.find((c) => c.id === row.group_id);
      const groupBadge = cat ? cat.badge : row.group_id;
      const typeBadge = row.item_type === "sentence" ? "📖 Cümle" : "🔤 Kelime";

      const itemEl = document.createElement("div");
      itemEl.className = "admin-record-row";
      itemEl.innerHTML = `
        <div>
          <span class="record-meta-badge">${escapeHtml(groupBadge)} • ${typeBadge}</span>
          <strong style="margin-left:6px;">${escapeHtml(row.content)}</strong>
        </div>
        <button type="button" class="btn-text-action danger" title="Supabase Tablosundan Sil">🗑️ Sil</button>
      `;

      itemEl.querySelector("button").addEventListener("click", async () => {
        await deleteWordFromSupabase(row.id, row.content);
      });

      dom.adminRecordsList.appendChild(itemEl);
    });
  }

  async function deleteWordFromSupabase(id, contentText) {
    if (!supabaseClient || !adminUser) return;
    const { tableName } = getActiveSupabaseConfig();

    const { error } = await supabaseClient.from(tableName).delete().eq("id", id);
    if (error) {
      alert("Silme hatası: " + error.message);
      return;
    }

    // Yerel başlangıç listesinden de çıkar (eğer orada varsa)
    INITIAL_LOCAL_CATEGORIES.forEach((c) => {
      c.words = c.words.filter((w) => w !== contentText);
      c.sentences = c.sentences.filter((s) => s !== contentText);
    });

    await fetchWordsFromSupabase();
  }

  function checkAdminTextLetterGroup() {
    if (!dom.adminContentTextarea || !dom.adminGroupSelect || !dom.adminLetterCheckHint) return;
    const raw = dom.adminContentTextarea.value.trim();
    if (!raw) {
      dom.adminLetterCheckHint.classList.add("hidden");
      return;
    }

    const groupOrder = [
      { id: "grup_1_anetil", num: 1, name: "1. Grup (ANETİL)", chars: "anetil" },
      { id: "grup_2_okurim", num: 2, name: "2. Grup (OKURIM)", chars: "okurım" },
      { id: "grup_3_usoydz", num: 3, name: "3. Grup (ÜSÖYDZ)", chars: "üsöydz" },
      { id: "grup_4_cbgcs", num: 4, name: "4. Grup (ÇBGCŞ)", chars: "çbgcş" },
      { id: "grup_5_phvgfj", num: 5, name: "5. Grup (PHVĞFJ)", chars: "phvğfj" }
    ];

    const selectedGroupId = dom.adminGroupSelect.value;
    const selectedIdx = groupOrder.findIndex((g) => g.id === selectedGroupId);
    if (selectedIdx < 0 || selectedIdx === 4) {
      dom.adminLetterCheckHint.classList.add("hidden");
      return;
    }

    const lowerText = raw.toLocaleLowerCase("tr-TR");
    const laterLettersFound = [];

    for (let i = selectedIdx + 1; i < groupOrder.length; i++) {
      const grp = groupOrder[i];
      for (const ch of grp.chars) {
        if (lowerText.includes(ch)) {
          laterLettersFound.push(`'${ch.toLocaleUpperCase("tr-TR")}' (${grp.num}. Grup)`);
        }
      }
    }

    if (laterLettersFound.length > 0) {
      dom.adminLetterCheckHint.textContent = `💡 Pedagojik İpucu: Yazdığınız metinde sonraki harf gruplarına ait şu harfler bulunuyor: ${laterLettersFound.join(", ")}. Yine de kaydedebilir veya üst grubu seçebilirsiniz.`;
      dom.adminLetterCheckHint.classList.remove("hidden");
    } else {
      dom.adminLetterCheckHint.classList.add("hidden");
    }
  }

  function bindAdminEvents() {
    if (!dom.btnOpenAdmin || !dom.adminModal) return;

    dom.btnOpenAdmin.addEventListener("click", () => {
      dom.adminModal.classList.remove("hidden");
    });

    dom.btnCloseAdminModal.addEventListener("click", () => {
      dom.adminModal.classList.add("hidden");
    });

    dom.adminModal.addEventListener("click", (e) => {
      if (e.target === dom.adminModal) {
        dom.adminModal.classList.add("hidden");
      }
    });

    // Yönetici Giriş Formu (Supabase Auth)
    dom.adminLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      dom.adminAuthError.textContent = "";

      if (!supabaseClient) {
        dom.adminAuthError.textContent = "Supabase istemcisi başlatılamadı. Lütfen bağlantınızı kontrol edin.";
        return;
      }

      const email = dom.adminEmailInput.value.trim();
      const password = dom.adminPasswordInput.value;

      dom.btnAdminLoginSubmit.disabled = true;
      dom.btnAdminLoginSubmit.textContent = "Giriş yapılıyor...";

      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          dom.adminAuthError.textContent = "Giriş başarısız: " + error.message;
        } else {
          adminUser = data.user;
          dom.adminPasswordInput.value = "";
          updateAdminAuthUI();
          await fetchWordsFromSupabase();
        }
      } catch (err) {
        dom.adminAuthError.textContent = "Hata: " + (err.message || err);
      } finally {
        dom.btnAdminLoginSubmit.disabled = false;
        dom.btnAdminLoginSubmit.textContent = "🔑 Giriş Yap";
      }
    });

    // Yönetici Çıkış
    dom.btnAdminLogout.addEventListener("click", async () => {
      if (supabaseClient) {
        await supabaseClient.auth.signOut();
      }
      adminUser = null;
      updateAdminAuthUI();
    });

    // Canlı Harf Grubu Kontrolü
    dom.adminContentTextarea.addEventListener("input", checkAdminTextLetterGroup);
    dom.adminGroupSelect.addEventListener("change", checkAdminTextLetterGroup);

    // Yeni Kelime / Cümle Kaydet
    dom.btnAdminInsertWords.addEventListener("click", async () => {
      if (!supabaseClient || !adminUser) return;

      const raw = dom.adminContentTextarea.value.trim();
      if (!raw) {
        dom.adminInsertStatus.style.color = "#DC2626";
        dom.adminInsertStatus.textContent = "Lütfen eklenecek kelime veya cümle yazın.";
        return;
      }

      const groupId = dom.adminGroupSelect.value;
      const selectedType = dom.adminTypeSelect.value;
      const { tableName } = getActiveSupabaseConfig();

      const lines = raw
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const rowsToInsert = lines.map((line) => {
        let itemType = selectedType;
        if (itemType === "auto") {
          itemType = /\s/.test(line) || /[.!?]$/.test(line) ? "sentence" : "word";
        }
        return {
          group_id: groupId,
          item_type: itemType,
          content: line,
          created_by: adminUser.id
        };
      });

      dom.btnAdminInsertWords.disabled = true;
      dom.adminInsertStatus.style.color = "#0284C7";
      dom.adminInsertStatus.textContent = "Supabase tablosuna kaydediliyor...";

      try {
        const { error } = await supabaseClient
          .from(tableName)
          .upsert(rowsToInsert, { onConflict: "group_id,content" });

        if (error) {
          dom.adminInsertStatus.style.color = "#DC2626";
          dom.adminInsertStatus.textContent = "Kayıt hatası: " + error.message;
        } else {
          dom.adminContentTextarea.value = "";
          dom.adminLetterCheckHint.classList.add("hidden");
          dom.adminInsertStatus.style.color = "#15803D";
          dom.adminInsertStatus.textContent = `✔ ${rowsToInsert.length} adet kelime/cümle başarıyla Supabase'e eklendi!`;
          await fetchWordsFromSupabase();
        }
      } catch (err) {
        dom.adminInsertStatus.style.color = "#DC2626";
        dom.adminInsertStatus.textContent = "Hata: " + (err.message || err);
      } finally {
        dom.btnAdminInsertWords.disabled = false;
      }
    });

    // Başlangıç Havuzunu Tek Tıkla Tabloya Yükle (Seed)
    dom.btnAdminSeedDefaults.addEventListener("click", async () => {
      if (!supabaseClient || !adminUser) return;
      const { tableName } = getActiveSupabaseConfig();

      const allSeedRows = [];
      INITIAL_LOCAL_CATEGORIES.forEach((cat) => {
        cat.words.forEach((w) => {
          allSeedRows.push({
            group_id: cat.id,
            item_type: "word",
            content: w,
            created_by: adminUser.id
          });
        });
        cat.sentences.forEach((s) => {
          allSeedRows.push({
            group_id: cat.id,
            item_type: "sentence",
            content: s,
            created_by: adminUser.id
          });
        });
      });

      dom.btnAdminSeedDefaults.disabled = true;
      dom.adminInsertStatus.style.color = "#0284C7";
      dom.adminInsertStatus.textContent = `${allSeedRows.length} kayıt Supabase tablosuna aktarılıyor...`;

      try {
        const { error } = await supabaseClient
          .from(tableName)
          .upsert(allSeedRows, { onConflict: "group_id,content" });

        if (error) {
          dom.adminInsertStatus.style.color = "#DC2626";
          dom.adminInsertStatus.textContent = "Aktarım hatası: " + error.message;
        } else {
          dom.adminInsertStatus.style.color = "#15803D";
          dom.adminInsertStatus.textContent = `✔ ${allSeedRows.length} başlangıç kelime ve cümlesi Supabase tablosuna yüklendi!`;
          await fetchWordsFromSupabase();
        }
      } catch (err) {
        dom.adminInsertStatus.style.color = "#DC2626";
        dom.adminInsertStatus.textContent = "Hata: " + (err.message || err);
      } finally {
        dom.btnAdminSeedDefaults.disabled = false;
      }
    });

    dom.btnAdminRefreshRecords.addEventListener("click", fetchWordsFromSupabase);
  }

  // Yardımcı Fonksiyonlar
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Başlat
  document.addEventListener("DOMContentLoaded", init);
})();
