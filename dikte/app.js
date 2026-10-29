// ==========================================================================
// NEŞELİ DİKTE YARIŞI - ANA UYGULAMA MANTIĞI (app.js)
// ==========================================================================

(function () {
  "use strict";

  const STORAGE_KEY = "neseli_dikte_yarisi_v2";

  // Uygulama Durumu (State)
  const state = {
    players: {
      p1: { name: "Berk", avatarIdx: 0, score: 0, wordsWon: [] },
      p2: { name: "Said", avatarIdx: 1, score: 0, wordsWon: [] }
    },
    settings: {
      repeatIntervalMs: 1000,
      speechRate: 0.92,
      hideTextDuringDictation: true,
      shuffleOnStart: false
    },
    activeCategoryId: WORD_CATEGORIES[0].id,
    activeGroupFilter: "all", // 'all' | 'words' | 'sentences'
    selectedItems: [...DEFAULT_SELECTED_ITEMS],

    // Oyun İçi Durum
    gameActive: false,
    isPaused: false,
    roundLocked: false,
    wordTemporarilyRevealed: false,
    playQueue: [],
    currentIndex: 0,
    completedRounds: [], // { word, winner: 'p1' | 'p2' | 'skipped' }

    // Ses & Tekrar Döngüsü Zamanlayıcıları
    repeatTimerId: null,
    roundTransitionTimerId: null,
    speechSessionId: 0,

    // Supabase Durumu
    supabaseClient: null,
    supabaseSession: null,
    cloudWords: []
  };

  // DOM Referansları
  const dom = {
    screens: {
      setup: document.getElementById("setupScreen"),
      game: document.getElementById("gameScreen"),
      result: document.getElementById("resultScreen")
    },
    brandHomeBtn: document.getElementById("brandHomeBtn"),
    btnBackToSetup: document.getElementById("btnBackToSetup"),
    fxLayer: document.getElementById("fx-layer"),

    // Oyuncu Kurulumu
    p1AvatarPrev: document.getElementById("p1AvatarPrev"),
    p1AvatarNext: document.getElementById("p1AvatarNext"),
    p1AvatarDisplay: document.getElementById("p1AvatarDisplay"),
    p1NameInput: document.getElementById("p1NameInput"),

    p2AvatarPrev: document.getElementById("p2AvatarPrev"),
    p2AvatarNext: document.getElementById("p2AvatarNext"),
    p2AvatarDisplay: document.getElementById("p2AvatarDisplay"),
    p2NameInput: document.getElementById("p2NameInput"),

    // Ses Ayarları
    btnTestVoice: document.getElementById("btnTestVoice"),
    repeatIntervalSelect: document.getElementById("repeatIntervalSelect"),
    speechRateSelect: document.getElementById("speechRateSelect"),
    chkHideTextDuringDictation: document.getElementById("chkHideTextDuringDictation"),
    chkShuffleWords: document.getElementById("chkShuffleWords"),

    // Kelime & Cümle Havuzu
    customWordInput: document.getElementById("customWordInput"),
    btnAddCustomWord: document.getElementById("btnAddCustomWord"),
    btnAddCategoryAll: document.getElementById("btnAddCategoryAll"),
    btnRandomGroup10: document.getElementById("btnRandomGroup10"),
    btnRandomMix: document.getElementById("btnRandomMix"),
    categoryTabs: document.getElementById("categoryTabs"),
    groupInfoBanner: document.getElementById("groupInfoBanner"),
    groupLettersTiles: document.getElementById("groupLettersTiles"),
    categoryItemsContainer: document.getElementById("categoryItemsContainer"),
    selectedCountBadge: document.getElementById("selectedCountBadge"),
    btnReverseQueue: document.getElementById("btnReverseQueue"),
    btnClearQueue: document.getElementById("btnClearQueue"),
    selectedQueueList: document.getElementById("selectedQueueList"),
    btnStartGame: document.getElementById("btnStartGame"),
    startBtnSubtext: document.getElementById("startBtnSubtext"),

    // Oyun Ekranı
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

    // Oyuncu Alanları
    player1Zone: document.getElementById("player1Zone"),
    gameP1Avatar: document.getElementById("gameP1Avatar"),
    gameP1Name: document.getElementById("gameP1Name"),
    gameP1Score: document.getElementById("gameP1Score"),
    p1ScorePill: document.getElementById("p1ScorePill"),
    p1StarsTray: document.getElementById("p1StarsTray"),
    btnPlayer1Claim: document.getElementById("btnPlayer1Claim"),
    btnP1SubName: document.getElementById("btnP1SubName"),

    player2Zone: document.getElementById("player2Zone"),
    gameP2Avatar: document.getElementById("gameP2Avatar"),
    gameP2Name: document.getElementById("gameP2Name"),
    gameP2Score: document.getElementById("gameP2Score"),
    p2ScorePill: document.getElementById("p2ScorePill"),
    p2StarsTray: document.getElementById("p2StarsTray"),
    btnPlayer2Claim: document.getElementById("btnPlayer2Claim"),
    btnP2SubName: document.getElementById("btnP2SubName"),

    // Tur Geçiş Katmanı
    roundWinnerOverlay: document.getElementById("roundWinnerOverlay"),
    roundWinnerTitle: document.getElementById("roundWinnerTitle"),
    roundRevealedWord: document.getElementById("roundRevealedWord"),
    roundNextHint: document.getElementById("roundNextHint"),
    btnForceNextNow: document.getElementById("btnForceNextNow"),

    // Sonuç Ekranı
    winnerHeadline: document.getElementById("winnerHeadline"),
    winnerSubtext: document.getElementById("winnerSubtext"),
    finalCardP1: document.getElementById("finalCardP1"),
    finalCrownP1: document.getElementById("finalCrownP1"),
    finalP1Avatar: document.getElementById("finalP1Avatar"),
    finalP1Name: document.getElementById("finalP1Name"),
    finalP1Stars: document.getElementById("finalP1Stars"),
    finalP1StarsVisual: document.getElementById("finalP1StarsVisual"),

    finalCardP2: document.getElementById("finalCardP2"),
    finalCrownP2: document.getElementById("finalCrownP2"),
    finalP2Avatar: document.getElementById("finalP2Avatar"),
    finalP2Name: document.getElementById("finalP2Name"),
    finalP2Stars: document.getElementById("finalP2Stars"),
    finalP2StarsVisual: document.getElementById("finalP2StarsVisual"),

    completedWordsSummary: document.getElementById("completedWordsSummary"),
    btnPlayAgainSame: document.getElementById("btnPlayAgainSame"),
    btnBackToPoolFromResult: document.getElementById("btnBackToPoolFromResult"),

    // Yönetici & Supabase Modalı
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
  // 1. WEB AUDIO API SES EFEKTLERİ & HOPARLÖR UYANIK TUTUCU (KEEP-ALIVE)
  // ==========================================================================
  let audioCtx = null;
  let keepAliveStarted = false;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  // Bluetooth veya PC ses kartlarının kelimenin ilk hecesini yutmasını (uyku modunu)
  // engellemek için duyulmayacak seviyede (0.00002) sürekli sinyal üretir.
  function ensureAudioKeepAlive() {
    try {
      const ctx = getAudioContext();
      if (!ctx || keepAliveStarted) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 40;
      gain.gain.value = 0.00002;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      keepAliveStarted = true;
    } catch (e) {
      // Ses izni henüz verilmemişse sessizce geç
    }
  }

  function playStarChime(isPlayer1) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = isPlayer1 ? [523.25, 659.25, 783.99, 1046.5] : [587.33, 739.99, 880, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.075);

        gain.gain.setValueAtTime(0.001, now + idx * 0.075);
        gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.075 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.075 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.075);
        osc.stop(now + idx * 0.075 + 0.3);
      });
    } catch (e) {}
  }

  function playVictoryFanfare() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const melody = [
        { f: 523.25, t: 0, d: 0.14 },
        { f: 659.25, t: 0.14, d: 0.14 },
        { f: 783.99, t: 0.28, d: 0.14 },
        { f: 1046.5, t: 0.42, d: 0.42 }
      ];
      melody.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.25, now + n.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch (e) {}
  }

  // ==========================================================================
  // 2. GELİŞMİŞ TÜRKÇE KADIN SESLENDİRME MOTORU (TTS)
  // ==========================================================================
  // 1) Birincil olarak Google Neural Türkçe Kadın Sesini (translate_tts) kullanır.
  //    GitHub Pages (https://...github.io) üzerinde Referer başlığı gönderildiğinde
  //    Google 404 döndürdüğü için index.html'de <meta name="referrer" content="no-referrer" />
  //    tanımlıdır ve yedek Google uç noktası (client=tw-ob) da eklidir.
  // 2) Aynı kelime tekrar okunurken ağdan tekrar indirilmez; bellekteki <audio>
  //    başa sarılarak (currentTime = 0) sıfır gecikmeyle okunur.
  // 3) İnternet tamamen kesikse çevrimdışı SAPI fonetik düzeltici devreye girer.

  let ttsAudioPlayer = null;
  let lastLoadedTtsKey = "";

  const SAPI_PHONETIC_FIX_MAP = {
    el: "eel",
    al: "aal",
    at: "aat",
    et: "eet",
    il: "iil",
    in: "iin",
    ok: "ook",
    su: "suu",
    ni: "nii",
    ip: "iip",
    un: "uun",
    ut: "uut",
    üç: "üüç",
    on: "oon",
    ay: "aay",
    ev: "eev"
  };

  function buildGoogleTtsUrls(text) {
    const clean = text.trim();
    const q = encodeURIComponent(clean);
    return [
      `https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=tr-TR&client=gtx&q=${q}`,
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=tr&client=tw-ob&q=${q}`
    ];
  }

  function formatForOfflineSapi(text) {
    const clean = text.trim();
    const lower = clean.toLocaleLowerCase("tr-TR");
    if (SAPI_PHONETIC_FIX_MAP[lower]) {
      return SAPI_PHONETIC_FIX_MAP[lower];
    }
    return clean;
  }

  function stopAllSpeech() {
    state.speechSessionId++;
    if (state.repeatTimerId) {
      clearTimeout(state.repeatTimerId);
      state.repeatTimerId = null;
    }
    if (ttsAudioPlayer) {
      try {
        ttsAudioPlayer.pause();
        ttsAudioPlayer.currentTime = 0;
      } catch (e) {}
    }
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    dom.speakerWaveWrapper.classList.remove("speaking");
  }

  function speakTextOnce(rawText, onFinishedCallback) {
    const text = (rawText || "").trim();
    if (!text) return;

    ensureAudioKeepAlive();
    const currentSession = ++state.speechSessionId;
    const rate = Number(state.settings.speechRate) || 0.92;

    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    const cacheKey = `female|${text}`;
    const urls = buildGoogleTtsUrls(text);

    if (!ttsAudioPlayer) {
      ttsAudioPlayer = new Audio();
      ttsAudioPlayer.preload = "auto";
      ttsAudioPlayer.referrerPolicy = "no-referrer";
    }

    // Aynı kelime zaten yüklüyse hiç ağ isteği yapmadan anında baştan çal
    if (lastLoadedTtsKey === cacheKey && ttsAudioPlayer.src && ttsAudioPlayer.readyState >= 2) {
      ttsAudioPlayer.onended = () => {
        if (currentSession !== state.speechSessionId) return;
        dom.speakerWaveWrapper.classList.remove("speaking");
        if (typeof onFinishedCallback === "function") onFinishedCallback();
      };
      ttsAudioPlayer.onerror = () => {
        if (currentSession !== state.speechSessionId) return;
        speakViaBrowserSAPI(text, rate, currentSession, onFinishedCallback);
      };
      try {
        ttsAudioPlayer.pause();
        ttsAudioPlayer.currentTime = 0;
        ttsAudioPlayer.playbackRate = rate;
        dom.speakerWaveWrapper.classList.add("speaking");
        const playPromise = ttsAudioPlayer.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            if (currentSession !== state.speechSessionId) return;
            tryUrlIndex(0);
          });
        }
        return;
      } catch (err) {
        // Hata olursa URL'den yeniden yükle
      }
    }

    function tryUrlIndex(urlIndex) {
      if (currentSession !== state.speechSessionId) return;
      if (urlIndex >= urls.length) {
        lastLoadedTtsKey = "";
        speakViaBrowserSAPI(text, rate, currentSession, onFinishedCallback);
        return;
      }

      try {
        ttsAudioPlayer.pause();
        ttsAudioPlayer.referrerPolicy = "no-referrer";
        ttsAudioPlayer.src = urls[urlIndex];
        ttsAudioPlayer.playbackRate = rate;

        ttsAudioPlayer.onplaying = () => {
          if (currentSession !== state.speechSessionId) return;
          lastLoadedTtsKey = cacheKey;
          dom.speakerWaveWrapper.classList.add("speaking");
        };

        ttsAudioPlayer.onended = () => {
          if (currentSession !== state.speechSessionId) return;
          dom.speakerWaveWrapper.classList.remove("speaking");
          if (typeof onFinishedCallback === "function") onFinishedCallback();
        };

        ttsAudioPlayer.onerror = () => {
          if (currentSession !== state.speechSessionId) return;
          tryUrlIndex(urlIndex + 1);
        };

        const playPromise = ttsAudioPlayer.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            if (currentSession !== state.speechSessionId) return;
            tryUrlIndex(urlIndex + 1);
          });
        }
      } catch (e) {
        tryUrlIndex(urlIndex + 1);
      }
    }

    tryUrlIndex(0);
  }

  function speakViaBrowserSAPI(rawText, rate, sessionId, onFinishedCallback) {
    if (!("speechSynthesis" in window)) {
      dom.speakerWaveWrapper.classList.remove("speaking");
      if (typeof onFinishedCallback === "function") onFinishedCallback();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const spokenText = formatForOfflineSapi(rawText);
      const utter = new SpeechSynthesisUtterance(spokenText);
      utter.lang = "tr-TR";
      utter.rate = rate;
      utter.pitch = 1.15;

      const voices = window.speechSynthesis.getVoices() || [];
      const trVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("tr"));
      const femaleVoice = trVoices.find((v) => /emel|filiz|yelda|female|kadın|zeynep|google/i.test(v.name));
      if (femaleVoice) {
        utter.voice = femaleVoice;
      } else if (trVoices.length > 0) {
        utter.voice = trVoices[0];
      }

      utter.onstart = () => {
        if (sessionId !== state.speechSessionId) return;
        dom.speakerWaveWrapper.classList.add("speaking");
      };

      utter.onend = () => {
        if (sessionId !== state.speechSessionId) return;
        dom.speakerWaveWrapper.classList.remove("speaking");
        if (typeof onFinishedCallback === "function") onFinishedCallback();
      };

      utter.onerror = () => {
        if (sessionId !== state.speechSessionId) return;
        dom.speakerWaveWrapper.classList.remove("speaking");
        if (typeof onFinishedCallback === "function") onFinishedCallback();
      };

      window.speechSynthesis.speak(utter);
    } catch (e) {
      dom.speakerWaveWrapper.classList.remove("speaking");
      if (typeof onFinishedCallback === "function") onFinishedCallback();
    }
  }

  // Oyun içi sürekli 1 saniye aralıklı dikte döngüsü
  function startDictationLoopForCurrentWord() {
    stopAllSpeech();
    if (!state.gameActive || state.isPaused || state.roundLocked) return;

    const currentWord = state.playQueue[state.currentIndex];
    if (!currentWord) return;

    const loopSession = state.speechSessionId;

    function runCycle() {
      if (!state.gameActive || state.isPaused || state.roundLocked) return;
      if (loopSession !== state.speechSessionId) return;

      speakTextOnce(currentWord, () => {
        if (!state.gameActive || state.isPaused || state.roundLocked) return;
        if (loopSession !== state.speechSessionId) return;

        const waitMs = Number(state.settings.repeatIntervalMs) || 1000;
        state.repeatTimerId = setTimeout(() => {
          if (!state.gameActive || state.isPaused || state.roundLocked) return;
          runCycle();
        }, waitMs);
      });
    }

    runCycle();
  }

  // ==========================================================================
  // 3. YEREL DEPOLAMA (LOCALSTORAGE) KAYIT & YÜKLEME
  // ==========================================================================
  function saveStateToStorage() {
    try {
      const payload = {
        p1Name: state.players.p1.name,
        p1AvatarIdx: state.players.p1.avatarIdx,
        p2Name: state.players.p2.name,
        p2AvatarIdx: state.players.p2.avatarIdx,
        repeatIntervalMs: state.settings.repeatIntervalMs,
        speechRate: state.settings.speechRate,
        hideTextDuringDictation: state.settings.hideTextDuringDictation,
        shuffleOnStart: state.settings.shuffleOnStart,
        selectedItems: state.selectedItems
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}
  }

  function loadStateFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);

      if (typeof data.p1Name === "string" && data.p1Name.trim()) {
        state.players.p1.name = data.p1Name.trim();
      }
      if (typeof data.p2Name === "string" && data.p2Name.trim()) {
        state.players.p2.name = data.p2Name.trim();
      }
      if (Number.isInteger(data.p1AvatarIdx) && data.p1AvatarIdx >= 0 && data.p1AvatarIdx < AVATAR_OPTIONS.length) {
        state.players.p1.avatarIdx = data.p1AvatarIdx;
      }
      if (Number.isInteger(data.p2AvatarIdx) && data.p2AvatarIdx >= 0 && data.p2AvatarIdx < AVATAR_OPTIONS.length) {
        state.players.p2.avatarIdx = data.p2AvatarIdx;
      }
      if (data.repeatIntervalMs) {
        state.settings.repeatIntervalMs = Number(data.repeatIntervalMs);
      }
      if (data.speechRate) {
        state.settings.speechRate = Number(data.speechRate);
      }
      if (typeof data.hideTextDuringDictation === "boolean") {
        state.settings.hideTextDuringDictation = data.hideTextDuringDictation;
      }
      if (typeof data.shuffleOnStart === "boolean") {
        state.settings.shuffleOnStart = data.shuffleOnStart;
      }
      if (Array.isArray(data.selectedItems) && data.selectedItems.length > 0) {
        state.selectedItems = data.selectedItems;
      }
    } catch (e) {}
  }

  // ==========================================================================
  // 4. KURULUM EKRANI VE KELİME HAVUZU ARAYÜZÜ
  // ==========================================================================
  function syncSetupInputsFromState() {
    dom.p1NameInput.value = state.players.p1.name;
    dom.p2NameInput.value = state.players.p2.name;
    dom.p1AvatarDisplay.textContent = AVATAR_OPTIONS[state.players.p1.avatarIdx].emoji;
    dom.p2AvatarDisplay.textContent = AVATAR_OPTIONS[state.players.p2.avatarIdx].emoji;

    dom.repeatIntervalSelect.value = String(state.settings.repeatIntervalMs);
    dom.speechRateSelect.value = String(state.settings.speechRate);
    dom.chkHideTextDuringDictation.checked = state.settings.hideTextDuringDictation;
    dom.chkShuffleWords.checked = state.settings.shuffleOnStart;
  }

  function cycleAvatar(playerKey, delta) {
    const p = state.players[playerKey];
    p.avatarIdx = (p.avatarIdx + delta + AVATAR_OPTIONS.length) % AVATAR_OPTIONS.length;
    if (playerKey === "p1") {
      dom.p1AvatarDisplay.textContent = AVATAR_OPTIONS[p.avatarIdx].emoji;
    } else {
      dom.p2AvatarDisplay.textContent = AVATAR_OPTIONS[p.avatarIdx].emoji;
    }
    saveStateToStorage();
  }

  function renderCategoryTabs() {
    dom.categoryTabs.innerHTML = "";
    WORD_CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-tab-btn" + (cat.id === state.activeCategoryId ? " active" : "");
      btn.textContent = cat.title;
      btn.addEventListener("click", () => {
        state.activeCategoryId = cat.id;
        renderCategoryTabs();
        renderActiveCategoryInfoAndItems();
      });
      dom.categoryTabs.appendChild(btn);
    });
  }

  function getActiveCategory() {
    return WORD_CATEGORIES.find((c) => c.id === state.activeCategoryId) || WORD_CATEGORIES[0];
  }

  function renderActiveCategoryInfoAndItems() {
    const cat = getActiveCategory();
    if (!cat) return;

    // Harf taşlarını oluştur
    dom.groupLettersTiles.innerHTML = "";
    const letters = cat.letters.split("-").map((s) => s.trim()).filter(Boolean);
    letters.forEach((letter) => {
      const tile = document.createElement("span");
      tile.className = "letter-tile";
      tile.style.borderColor = cat.color;
      tile.textContent = letter;
      dom.groupLettersTiles.appendChild(tile);
    });

    // Kelime / Cümle çiplerini oluştur
    dom.categoryItemsContainer.innerHTML = "";
    let listToRender = [];
    if (state.activeGroupFilter === "words") {
      listToRender = cat.words;
    } else if (state.activeGroupFilter === "sentences") {
      listToRender = cat.sentences;
    } else {
      listToRender = [...cat.words, ...cat.sentences];
    }

    listToRender.forEach((itemText) => {
      const isSentence = itemText.includes(" ");
      const isSelected = state.selectedItems.includes(itemText);

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className =
        "pool-chip" +
        (isSentence ? " sentence-chip" : "") +
        (isSelected ? " selected" : "");

      const iconSpan = document.createElement("span");
      iconSpan.className = "chip-icon";
      iconSpan.textContent = isSelected ? "✓" : "+";

      const textSpan = document.createElement("span");
      textSpan.textContent = itemText;

      chip.appendChild(iconSpan);
      chip.appendChild(textSpan);

      chip.addEventListener("click", () => {
        toggleItemInSelectedQueue(itemText);
      });

      dom.categoryItemsContainer.appendChild(chip);
    });
  }

  function toggleItemInSelectedQueue(itemText) {
    const idx = state.selectedItems.indexOf(itemText);
    if (idx >= 0) {
      state.selectedItems.splice(idx, 1);
    } else {
      state.selectedItems.push(itemText);
    }
    saveStateToStorage();
    renderActiveCategoryInfoAndItems();
    renderSelectedQueue();
  }

  function addCustomWordsFromInput() {
    const raw = dom.customWordInput.value.trim();
    if (!raw) return;

    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    parts.forEach((item) => {
      if (!state.selectedItems.includes(item)) {
        state.selectedItems.push(item);
      }
    });

    dom.customWordInput.value = "";
    saveStateToStorage();
    renderActiveCategoryInfoAndItems();
    renderSelectedQueue();
  }

  function renderSelectedQueue() {
    const count = state.selectedItems.length;
    dom.selectedCountBadge.textContent = String(count);

    if (count === 0) {
      dom.startBtnSubtext.textContent = "Başlamak için en az 1 kelime seçin";
      dom.btnStartGame.disabled = true;
      dom.selectedQueueList.innerHTML =
        '<div class="empty-queue-msg">Henüz kelime veya cümle seçilmedi. Yukarıdaki 1. sınıf harf gruplarından tıklayarak ekleyebilirsiniz. ⭐</div>';
      return;
    }

    dom.btnStartGame.disabled = false;
    dom.startBtnSubtext.textContent = `${count} kelime/cümle yarışa hazır`;

    dom.selectedQueueList.innerHTML = "";
    state.selectedItems.forEach((item, index) => {
      const pill = document.createElement("div");
      pill.className = "queue-item-pill";

      const numSpan = document.createElement("span");
      numSpan.className = "queue-num";
      numSpan.textContent = `${index + 1}.`;

      const txtSpan = document.createElement("span");
      txtSpan.textContent = item;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "queue-remove-btn";
      removeBtn.title = "Listeden Çıkar";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", () => {
        state.selectedItems.splice(index, 1);
        saveStateToStorage();
        renderActiveCategoryInfoAndItems();
        renderSelectedQueue();
      });

      pill.appendChild(numSpan);
      pill.appendChild(txtSpan);
      pill.appendChild(removeBtn);
      dom.selectedQueueList.appendChild(pill);
    });
  }

  // ==========================================================================
  // 5. OYUN AKIŞI, YILDIZ KAZANMA VE EKRAN GEÇİŞLERİ
  // ==========================================================================
  function switchScreen(screenName) {
    Object.keys(dom.screens).forEach((key) => {
      dom.screens[key].classList.toggle("active", key === screenName);
    });
    dom.btnBackToSetup.classList.toggle("hidden", screenName === "setup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startGame() {
    if (state.selectedItems.length === 0) return;

    ensureAudioKeepAlive();

    state.players.p1.name = dom.p1NameInput.value.trim() || "Berk";
    state.players.p2.name = dom.p2NameInput.value.trim() || "Said";
    state.players.p1.score = 0;
    state.players.p2.score = 0;
    state.players.p1.wordsWon = [];
    state.players.p2.wordsWon = [];
    saveStateToStorage();

    state.playQueue = state.settings.shuffleOnStart
      ? shuffleArray(state.selectedItems)
      : [...state.selectedItems];

    state.currentIndex = 0;
    state.completedRounds = [];
    state.gameActive = true;
    state.isPaused = false;
    state.roundLocked = false;

    // Oyuncu bilgilerini yarış ekranına yansıt
    dom.gameP1Avatar.textContent = AVATAR_OPTIONS[state.players.p1.avatarIdx].emoji;
    dom.gameP1Name.textContent = state.players.p1.name;
    dom.btnP1SubName.textContent = state.players.p1.name;
    dom.gameP1Score.textContent = "0";
    dom.p1StarsTray.innerHTML =
      '<span class="empty-tray-hint">İlk yıldızını kazanmak için bitirince düğmeye bas!</span>';

    dom.gameP2Avatar.textContent = AVATAR_OPTIONS[state.players.p2.avatarIdx].emoji;
    dom.gameP2Name.textContent = state.players.p2.name;
    dom.btnP2SubName.textContent = state.players.p2.name;
    dom.gameP2Score.textContent = "0";
    dom.p2StarsTray.innerHTML =
      '<span class="empty-tray-hint">İlk yıldızını kazanmak için bitirince düğmeye bas!</span>';

    dom.roundWinnerOverlay.classList.add("hidden");
    switchScreen("game");
    loadCurrentRound();
  }

  function loadCurrentRound() {
    if (state.roundTransitionTimerId) {
      clearTimeout(state.roundTransitionTimerId);
      state.roundTransitionTimerId = null;
    }

    if (state.currentIndex >= state.playQueue.length) {
      finishGame();
      return;
    }

    state.roundLocked = false;
    state.isPaused = false;
    state.wordTemporarilyRevealed = false;
    dom.roundWinnerOverlay.classList.add("hidden");

    const total = state.playQueue.length;
    const stepNum = state.currentIndex + 1;
    dom.gameStepCounter.textContent = `${stepNum} / ${total}`;
    const pct = Math.max(5, Math.round((stepNum / total) * 100));
    dom.gameProgressBar.style.width = `${pct}%`;

    const currentWord = state.playQueue[state.currentIndex];
    dom.wordVisibleText.textContent = currentWord;

    updateWordVisibilityUI();
    updatePauseUI();
    startDictationLoopForCurrentWord();
  }

  function updateWordVisibilityUI() {
    const shouldHide = state.settings.hideTextDuringDictation && !state.wordTemporarilyRevealed;
    dom.wordHiddenMask.classList.toggle("hidden", !shouldHide);
    dom.wordVisibleText.classList.toggle("hidden", shouldHide);
    dom.toggleRevealLabel.textContent = shouldHide ? "Göster" : "Gizle";
  }

  function updatePauseUI() {
    const intervalSec = (Number(state.settings.repeatIntervalMs) / 1000).toFixed(1).replace(".0", "");
    if (state.isPaused) {
      dom.pauseResumeLabel.textContent = "Devam Et";
      dom.livePulseDot.classList.add("paused");
      dom.dictationStatusText.textContent = "Dikte duraklatıldı. Devam etmek için düğmeye basın.";
    } else {
      dom.pauseResumeLabel.textContent = "Duraklat";
      dom.livePulseDot.classList.remove("paused");
      dom.dictationStatusText.textContent = `Dinleyin ve kağıda yazın! (${intervalSec} sn arayla tekrar ediyor)`;
    }
  }

  function handlePlayerClaim(playerKey) {
    if (!state.gameActive || state.roundLocked) return;
    state.roundLocked = true;
    stopAllSpeech();

    const currentWord = state.playQueue[state.currentIndex];
    const player = state.players[playerKey];
    player.score += 1;
    player.wordsWon.push(currentWord);

    state.completedRounds.push({
      word: currentWord,
      winner: playerKey
    });

    const isP1 = playerKey === "p1";
    playStarChime(isP1);

    // Skoru ve yıldız tepsisini güncelle
    const scoreEl = isP1 ? dom.gameP1Score : dom.gameP2Score;
    const pillEl = isP1 ? dom.p1ScorePill : dom.p2ScorePill;
    const trayEl = isP1 ? dom.p1StarsTray : dom.p2StarsTray;
    const btnEl = isP1 ? dom.btnPlayer1Claim : dom.btnPlayer2Claim;

    scoreEl.textContent = String(player.score);
    pillEl.classList.remove("score-bump");
    void pillEl.offsetWidth;
    pillEl.classList.add("score-bump");

    if (player.score === 1) {
      trayEl.innerHTML = "";
    }
    const starBadge = document.createElement("span");
    starBadge.className = "star-earned-item";
    starBadge.textContent = "⭐";
    starBadge.title = currentWord;
    trayEl.appendChild(starBadge);

    spawnFlyingStarAndConfetti(btnEl, pillEl);

    // Tur kazanan katmanını göster
    dom.roundWinnerTitle.textContent = `Harika! ${player.name} Yıldızı Kaptı!`;
    dom.roundRevealedWord.textContent = currentWord;
    dom.roundWinnerOverlay.classList.remove("hidden");

    state.roundTransitionTimerId = setTimeout(() => {
      advanceToNextWord();
    }, 1800);
  }

  function skipCurrentWord() {
    if (!state.gameActive || state.roundLocked) return;
    state.roundLocked = true;
    stopAllSpeech();

    const currentWord = state.playQueue[state.currentIndex];
    state.completedRounds.push({
      word: currentWord,
      winner: "skipped"
    });

    advanceToNextWord();
  }

  function advanceToNextWord() {
    if (state.roundTransitionTimerId) {
      clearTimeout(state.roundTransitionTimerId);
      state.roundTransitionTimerId = null;
    }
    state.currentIndex += 1;
    loadCurrentRound();
  }

  function finishGame() {
    state.gameActive = false;
    stopAllSpeech();
    playVictoryFanfare();
    spawnCelebrationConfetti(42);

    const p1 = state.players.p1;
    const p2 = state.players.p2;

    dom.finalP1Avatar.textContent = AVATAR_OPTIONS[p1.avatarIdx].emoji;
    dom.finalP1Name.textContent = p1.name;
    dom.finalP1Stars.textContent = String(p1.score);
    dom.finalP1StarsVisual.textContent = "⭐".repeat(Math.min(p1.score, 20));

    dom.finalP2Avatar.textContent = AVATAR_OPTIONS[p2.avatarIdx].emoji;
    dom.finalP2Name.textContent = p2.name;
    dom.finalP2Stars.textContent = String(p2.score);
    dom.finalP2StarsVisual.textContent = "⭐".repeat(Math.min(p2.score, 20));

    dom.finalCardP1.classList.remove("winner-glow");
    dom.finalCardP2.classList.remove("winner-glow");
    dom.finalCrownP1.classList.add("hidden");
    dom.finalCrownP2.classList.add("hidden");

    if (p1.score > p2.score) {
      dom.winnerHeadline.textContent = `🏆 Şampiyon ${p1.name}! Tebrikler!`;
      dom.winnerSubtext.textContent = `${p1.name} ${p1.score} yıldız, ${p2.name} ${p2.score} yıldız topladı. İkinizin de ellerine sağlık!`;
      dom.finalCardP1.classList.add("winner-glow");
      dom.finalCrownP1.classList.remove("hidden");
    } else if (p2.score > p1.score) {
      dom.winnerHeadline.textContent = `🏆 Şampiyon ${p2.name}! Tebrikler!`;
      dom.winnerSubtext.textContent = `${p2.name} ${p2.score} yıldız, ${p1.name} ${p1.score} yıldız topladı. İkinizin de ellerine sağlık!`;
      dom.finalCardP2.classList.add("winner-glow");
      dom.finalCrownP2.classList.remove("hidden");
    } else {
      dom.winnerHeadline.textContent = `🤝 Dostluk Kazandı! Berabere!`;
      dom.winnerSubtext.textContent = `${p1.name} ve ${p2.name} ${p1.score}'er yıldız kazandılar! Harika bir dikte çalışmasıydı!`;
      dom.finalCardP1.classList.add("winner-glow");
      dom.finalCardP2.classList.add("winner-glow");
      dom.finalCrownP1.classList.remove("hidden");
      dom.finalCrownP2.classList.remove("hidden");
    }

    // Kağıt kontrol özetini oluştur
    dom.completedWordsSummary.innerHTML = "";
    state.completedRounds.forEach((round, idx) => {
      const card = document.createElement("div");
      card.className = "summary-word-card";

      const wordSpan = document.createElement("span");
      wordSpan.className = "summary-word-text";
      wordSpan.textContent = `${idx + 1}. ${round.word}`;

      const badgeSpan = document.createElement("span");
      badgeSpan.className = "summary-winner-badge ";
      if (round.winner === "p1") {
        badgeSpan.className += "p1";
        badgeSpan.textContent = `⭐ ${p1.name}`;
      } else if (round.winner === "p2") {
        badgeSpan.className += "p2";
        badgeSpan.textContent = `⭐ ${p2.name}`;
      } else {
        badgeSpan.className += "skipped";
        badgeSpan.textContent = "Atlandı";
      }

      card.appendChild(wordSpan);
      card.appendChild(badgeSpan);
      dom.completedWordsSummary.appendChild(card);
    });

    switchScreen("result");
  }

  // ==========================================================================
  // 6. GÖRSEL EFEKTLER (UÇAN YILDIZ VE KONFETİ)
  // ==========================================================================
  function spawnFlyingStarAndConfetti(fromEl, toEl) {
    if (!fromEl || !toEl || !dom.fxLayer) return;
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const startX = fromRect.left + fromRect.width / 2;
    const startY = fromRect.top + fromRect.height / 2;
    const endX = toRect.left + toRect.width / 2;
    const endY = toRect.top + toRect.height / 2;

    const star = document.createElement("div");
    star.className = "flying-star";
    star.textContent = "⭐";
    star.style.left = `${startX - 24}px`;
    star.style.top = `${startY - 24}px`;
    dom.fxLayer.appendChild(star);

    requestAnimationFrame(() => {
      star.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.45) rotate(360deg)`;
      star.style.opacity = "0.2";
    });

    setTimeout(() => {
      star.remove();
    }, 750);

    spawnCelebrationConfetti(18, startX, startY);
  }

  function spawnCelebrationConfetti(count, originX, originY) {
    if (!dom.fxLayer) return;
    const colors = ["#FACC15", "#38BDF8", "#FB923C", "#4ADE80", "#F472B6", "#A855F7"];

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.backgroundColor = colors[i % colors.length];

      const x = originX !== undefined ? originX + (Math.random() - 0.5) * 160 : Math.random() * window.innerWidth;
      const y = originY !== undefined ? originY - 20 : -20;

      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.animationDuration = `${900 + Math.random() * 800}ms`;

      dom.fxLayer.appendChild(piece);
      setTimeout(() => {
        piece.remove();
      }, 1800);
    }
  }

  // ==========================================================================
  // 7. SUPABASE ENTEGRASYONU & YÖNETİCİ PANELİ
  // ==========================================================================
  // MEB Harf Grupları kümülatif harf kümeleri (Yönetici kelime eklerken kontrol için)
  const GROUP_ALLOWED_LETTERS = {
    grup_1_anetil: new Set(["a", "n", "e", "t", "i", "l"]),
    grup_2_okurim: new Set(["a", "n", "e", "t", "i", "l", "o", "k", "u", "r", "ı", "m"]),
    grup_3_usoydz: new Set(["a", "n", "e", "t", "i", "l", "o", "k", "u", "r", "ı", "m", "ü", "s", "ö", "y", "d", "z"]),
    grup_4_cbgcs: new Set(["a", "n", "e", "t", "i", "l", "o", "k", "u", "r", "ı", "m", "ü", "s", "ö", "y", "d", "z", "ç", "b", "g", "c", "ş"]),
    grup_5_phvgfj: new Set(["a", "n", "e", "t", "i", "l", "o", "k", "u", "r", "ı", "m", "ü", "s", "ö", "y", "d", "z", "ç", "b", "g", "c", "ş", "p", "h", "v", "ğ", "f", "j"])
  };

  function initSupabaseClient() {
    if (typeof window.supabase === "undefined" || typeof SUPABASE_DEFAULT_CONFIG === "undefined") {
      updateConnectionBadge("err", "⚠️ Supabase SDK yüklenemedi");
      return;
    }

    const { url, anonKey } = SUPABASE_DEFAULT_CONFIG;
    if (!url || !anonKey) {
      updateConnectionBadge("err", "⚠️ supabase-config.js eksik");
      return;
    }

    try {
      state.supabaseClient = window.supabase.createClient(url, anonKey);
      fetchCloudWordsAndMerge();

      state.supabaseClient.auth.getSession().then(({ data }) => {
        state.supabaseSession = data ? data.session : null;
        updateAdminAuthUI();
      });

      state.supabaseClient.auth.onAuthStateChange((_event, session) => {
        state.supabaseSession = session;
        updateAdminAuthUI();
      });
    } catch (err) {
      updateConnectionBadge("err", "⚠️ Bağlantı hatası");
    }
  }

  function updateConnectionBadge(statusType, text) {
    if (!dom.adminConnectionBadge) return;
    dom.adminConnectionBadge.textContent = text;
    dom.adminConnectionBadge.className = "admin-conn-status " + (statusType || "");
  }

  async function fetchCloudWordsAndMerge() {
    if (!state.supabaseClient) return;
    const tableName = SUPABASE_DEFAULT_CONFIG.tableName || "dikte_havuzu";

    try {
      const { data, error } = await state.supabaseClient
        .from(tableName)
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        updateConnectionBadge("err", `⚠️ Tablo okunamadı (${error.message})`);
        return;
      }

      state.cloudWords = Array.isArray(data) ? data : [];
      updateConnectionBadge("ok", `☁️ Supabase bağlı (${state.cloudWords.length} kayıt)`);

      // Buluttaki kelimeleri ilgili MEB harf gruplarına birleştir
      state.cloudWords.forEach((row) => {
        const text = (row.content || "").trim();
        if (!text) return;
        const cat = WORD_CATEGORIES.find((c) => c.id === row.group_id);
        if (!cat) return;

        const isSentence = row.item_type === "sentence" || text.includes(" ");
        if (isSentence) {
          if (!cat.sentences.includes(text)) {
            cat.sentences.push(text);
          }
        } else {
          if (!cat.words.includes(text)) {
            cat.words.push(text);
          }
        }
        if (!cat.items.includes(text)) {
          cat.items.push(text);
        }
      });

      renderActiveCategoryInfoAndItems();
      renderAdminRecordsList();
    } catch (err) {
      updateConnectionBadge("err", "⚠️ Sunucuya ulaşılamadı");
    }
  }

  function updateAdminAuthUI() {
    const isLogged = Boolean(state.supabaseSession && state.supabaseSession.user);
    dom.adminAuthSection.classList.toggle("hidden", isLogged);
    dom.adminDashboardSection.classList.toggle("hidden", !isLogged);
    dom.btnOpenAdmin.classList.toggle("logged-in", isLogged);

    if (isLogged) {
      const email = state.supabaseSession.user.email || "Yönetici";
      dom.adminUserEmailDisplay.textContent = email;
      dom.adminBtnLabel.textContent = "Yönetici (Aktif)";
      renderAdminRecordsList();
    } else {
      dom.adminBtnLabel.textContent = "Yönetici";
    }
  }

  function checkAdminTextareaLetters() {
    const raw = dom.adminContentTextarea.value.trim();
    const groupId = dom.adminGroupSelect.value;
    const allowedSet = GROUP_ALLOWED_LETTERS[groupId];

    if (!raw || !allowedSet) {
      dom.adminLetterCheckHint.classList.add("hidden");
      return;
    }

    const extraLetters = new Set();
    for (const ch of raw.toLocaleLowerCase("tr-TR")) {
      if (/[a-zçğıöşü]/.test(ch) && !allowedSet.has(ch)) {
        extraLetters.add(ch.toLocaleUpperCase("tr-TR"));
      }
    }

    dom.adminLetterCheckHint.classList.remove("hidden");
    if (extraLetters.size === 0) {
      dom.adminLetterCheckHint.className = "letter-check-hint ok";
      dom.adminLetterCheckHint.textContent =
        "✓ Harika! Yazdığınız tüm harfler seçili MEB harf grubuna uygun.";
    } else {
      dom.adminLetterCheckHint.className = "letter-check-hint warn";
      dom.adminLetterCheckHint.textContent = `ℹ️ Not: Bu grupta henüz öğrenilmeyen harfler var: ${Array.from(extraLetters).join(", ")} (Yine de kaydedebilirsiniz).`;
    }
  }

  async function handleAdminInsertWords() {
    if (!state.supabaseClient || !state.supabaseSession) return;
    const raw = dom.adminContentTextarea.value.trim();
    if (!raw) {
      dom.adminInsertStatus.className = "admin-feedback-msg err";
      dom.adminInsertStatus.textContent = "Lütfen eklenecek kelime veya cümle yazın.";
      return;
    }

    const groupId = dom.adminGroupSelect.value;
    const typeChoice = dom.adminTypeSelect.value;
    const tableName = SUPABASE_DEFAULT_CONFIG.tableName || "dikte_havuzu";

    const lines = raw
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);

    const rowsToInsert = lines.map((line) => {
      const detectedType =
        typeChoice === "auto"
          ? line.includes(" ")
            ? "sentence"
            : "word"
          : typeChoice;
      return {
        group_id: groupId,
        content: line,
        item_type: detectedType
      };
    });

    dom.btnAdminInsertWords.disabled = true;
    dom.adminInsertStatus.className = "admin-feedback-msg";
    dom.adminInsertStatus.textContent = "Kaydediliyor...";

    try {
      const { error } = await state.supabaseClient.from(tableName).insert(rowsToInsert);
      if (error) {
        dom.adminInsertStatus.className = "admin-feedback-msg err";
        dom.adminInsertStatus.textContent = `Hata: ${error.message}`;
      } else {
        dom.adminContentTextarea.value = "";
        dom.adminLetterCheckHint.classList.add("hidden");
        dom.adminInsertStatus.className = "admin-feedback-msg ok";
        dom.adminInsertStatus.textContent = `✓ ${rowsToInsert.length} kayıt başarıyla eklendi!`;
        await fetchCloudWordsAndMerge();
      }
    } catch (e) {
      dom.adminInsertStatus.className = "admin-feedback-msg err";
      dom.adminInsertStatus.textContent = "Sunucu hatası oluştu.";
    } finally {
      dom.btnAdminInsertWords.disabled = false;
    }
  }

  async function handleAdminSeedDefaults() {
    if (!state.supabaseClient || !state.supabaseSession) return;
    const tableName = SUPABASE_DEFAULT_CONFIG.tableName || "dikte_havuzu";

    const existingSet = new Set(state.cloudWords.map((r) => `${r.group_id}|${(r.content || "").trim()}`));
    const rows = [];

    WORD_CATEGORIES.forEach((cat) => {
      cat.words.forEach((w) => {
        if (!existingSet.has(`${cat.id}|${w}`)) {
          rows.push({ group_id: cat.id, content: w, item_type: "word" });
        }
      });
      cat.sentences.forEach((s) => {
        if (!existingSet.has(`${cat.id}|${s}`)) {
          rows.push({ group_id: cat.id, content: s, item_type: "sentence" });
        }
      });
    });

    if (rows.length === 0) {
      dom.adminInsertStatus.className = "admin-feedback-msg ok";
      dom.adminInsertStatus.textContent = "✓ Tüm başlangıç kelimeleri zaten tabloda mevcut.";
      return;
    }

    dom.btnAdminSeedDefaults.disabled = true;
    dom.adminInsertStatus.className = "admin-feedback-msg";
    dom.adminInsertStatus.textContent = `${rows.length} kayıt tabloya yükleniyor...`;

    try {
      const { error } = await state.supabaseClient.from(tableName).insert(rows);
      if (error) {
        dom.adminInsertStatus.className = "admin-feedback-msg err";
        dom.adminInsertStatus.textContent = `Hata: ${error.message}`;
      } else {
        dom.adminInsertStatus.className = "admin-feedback-msg ok";
        dom.adminInsertStatus.textContent = `✓ ${rows.length} başlangıç kelimesi/cümlesi tabloya yüklendi!`;
        await fetchCloudWordsAndMerge();
      }
    } catch (e) {
      dom.adminInsertStatus.className = "admin-feedback-msg err";
      dom.adminInsertStatus.textContent = "Yükleme sırasında hata oluştu.";
    } finally {
      dom.btnAdminSeedDefaults.disabled = false;
    }
  }

  function renderAdminRecordsList() {
    if (!dom.adminRecordsList) return;
    dom.adminTotalRecordsCount.textContent = String(state.cloudWords.length);

    if (state.cloudWords.length === 0) {
      dom.adminRecordsList.innerHTML =
        '<div class="empty-queue-msg">Tabloda henüz kayıt yok. Yukarıdan yeni kelime ekleyebilir veya başlangıç havuzunu yükleyebilirsiniz.</div>';
      return;
    }

    dom.adminRecordsList.innerHTML = "";
    state.cloudWords.slice().reverse().forEach((row) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "admin-record-row";

      const leftDiv = document.createElement("div");
      leftDiv.className = "admin-record-meta";

      const badge = document.createElement("span");
      badge.className = "record-group-badge";
      const cat = WORD_CATEGORIES.find((c) => c.id === row.group_id);
      badge.textContent = cat ? cat.badge : row.group_id;

      const textSpan = document.createElement("span");
      textSpan.className = "record-content-text";
      textSpan.textContent = row.content;

      leftDiv.appendChild(badge);
      leftDiv.appendChild(textSpan);

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "record-delete-btn";
      delBtn.textContent = "Sil";
      delBtn.addEventListener("click", async () => {
        if (!state.supabaseClient) return;
        const tableName = SUPABASE_DEFAULT_CONFIG.tableName || "dikte_havuzu";
        const { error } = await state.supabaseClient.from(tableName).delete().eq("id", row.id);
        if (!error) {
          fetchCloudWordsAndMerge();
        }
      });

      itemDiv.appendChild(leftDiv);
      itemDiv.appendChild(delBtn);
      dom.adminRecordsList.appendChild(itemDiv);
    });
  }

  // ==========================================================================
  // 8. OLAY DİNLEYİCİLERİ (EVENT LISTENERS) VE BAŞLATMA
  // ==========================================================================
  function bindEvents() {
    // Üst Bar
    dom.brandHomeBtn.addEventListener("click", () => {
      state.gameActive = false;
      stopAllSpeech();
      switchScreen("setup");
    });

    dom.btnBackToSetup.addEventListener("click", () => {
      state.gameActive = false;
      stopAllSpeech();
      switchScreen("setup");
    });

    // Karakter & İsim Seçimi
    dom.p1AvatarPrev.addEventListener("click", () => cycleAvatar("p1", -1));
    dom.p1AvatarNext.addEventListener("click", () => cycleAvatar("p1", 1));
    dom.p2AvatarPrev.addEventListener("click", () => cycleAvatar("p2", -1));
    dom.p2AvatarNext.addEventListener("click", () => cycleAvatar("p2", 1));

    dom.p1NameInput.addEventListener("input", () => {
      state.players.p1.name = dom.p1NameInput.value.trim() || "Berk";
      saveStateToStorage();
    });

    dom.p2NameInput.addEventListener("input", () => {
      state.players.p2.name = dom.p2NameInput.value.trim() || "Said";
      saveStateToStorage();
    });

    // Sesi Test Et Butonu
    dom.btnTestVoice.addEventListener("click", () => {
      speakTextOnce("Kalemler ve kağıtlar hazırsa dikte yarışına başlayalım!");
    });

    dom.repeatIntervalSelect.addEventListener("change", () => {
      state.settings.repeatIntervalMs = Number(dom.repeatIntervalSelect.value) || 1000;
      saveStateToStorage();
    });

    dom.speechRateSelect.addEventListener("change", () => {
      state.settings.speechRate = Number(dom.speechRateSelect.value) || 0.92;
      saveStateToStorage();
    });

    dom.chkHideTextDuringDictation.addEventListener("change", () => {
      state.settings.hideTextDuringDictation = dom.chkHideTextDuringDictation.checked;
      saveStateToStorage();
    });

    dom.chkShuffleWords.addEventListener("change", () => {
      state.settings.shuffleOnStart = dom.chkShuffleWords.checked;
      saveStateToStorage();
    });

    // Özel Kelime Ekleme
    dom.btnAddCustomWord.addEventListener("click", addCustomWordsFromInput);
    dom.customWordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustomWordsFromInput();
      }
    });

    // Grup Filtre Butonları (Tümü / Kelimeler / Cümleler)
    const filterBtns = document.querySelectorAll(".type-filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeGroupFilter = btn.getAttribute("data-filter") || "all";
        renderActiveCategoryInfoAndItems();
      });
    });

    // Hızlı Grup Seçim Butonları
    dom.btnAddCategoryAll.addEventListener("click", () => {
      const cat = getActiveCategory();
      if (!cat) return;
      const source =
        state.activeGroupFilter === "words"
          ? cat.words
          : state.activeGroupFilter === "sentences"
          ? cat.sentences
          : cat.items;

      source.forEach((item) => {
        if (!state.selectedItems.includes(item)) {
          state.selectedItems.push(item);
        }
      });
      saveStateToStorage();
      renderActiveCategoryInfoAndItems();
      renderSelectedQueue();
    });

    dom.btnRandomGroup10.addEventListener("click", () => {
      const cat = getActiveCategory();
      if (!cat) return;
      const source =
        state.activeGroupFilter === "words"
          ? cat.words
          : state.activeGroupFilter === "sentences"
          ? cat.sentences
          : cat.items;
      state.selectedItems = shuffleArray(source).slice(0, 10);
      saveStateToStorage();
      renderActiveCategoryInfoAndItems();
      renderSelectedQueue();
    });

    dom.btnRandomMix.addEventListener("click", () => {
      const allItems = WORD_CATEGORIES.flatMap((c) => c.items);
      state.selectedItems = shuffleArray(allItems).slice(0, 10);
      saveStateToStorage();
      renderActiveCategoryInfoAndItems();
      renderSelectedQueue();
    });

    dom.btnReverseQueue.addEventListener("click", () => {
      state.selectedItems.reverse();
      saveStateToStorage();
      renderSelectedQueue();
    });

    dom.btnClearQueue.addEventListener("click", () => {
      state.selectedItems = [];
      saveStateToStorage();
      renderActiveCategoryInfoAndItems();
      renderSelectedQueue();
    });

    dom.btnStartGame.addEventListener("click", startGame);

    // Oyun İçi Kontroller
    dom.btnRepeatNow.addEventListener("click", () => {
      if (!state.gameActive || state.roundLocked) return;
      state.isPaused = false;
      updatePauseUI();
      startDictationLoopForCurrentWord();
    });

    dom.btnToggleReveal.addEventListener("click", () => {
      state.wordTemporarilyRevealed = !state.wordTemporarilyRevealed;
      updateWordVisibilityUI();
    });

    dom.btnPauseResume.addEventListener("click", () => {
      if (!state.gameActive || state.roundLocked) return;
      state.isPaused = !state.isPaused;
      updatePauseUI();
      if (state.isPaused) {
        stopAllSpeech();
      } else {
        startDictationLoopForCurrentWord();
      }
    });

    dom.btnSkipWord.addEventListener("click", skipCurrentWord);
    dom.btnForceNextNow.addEventListener("click", advanceToNextWord);

    // Oyuncu Dokunmatik / Tıklama Butonları
    dom.btnPlayer1Claim.addEventListener("click", () => handlePlayerClaim("p1"));
    dom.btnPlayer2Claim.addEventListener("click", () => handlePlayerClaim("p2"));

    // Klavye Kısayolları (Sol Oyuncu: A, Sağ Oyuncu: L, Tekrar: Space)
    window.addEventListener("keydown", (e) => {
      if (!state.gameActive || state.roundLocked) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        handlePlayerClaim("p1");
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        handlePlayerClaim("p2");
      } else if (e.code === "Space") {
        e.preventDefault();
        state.isPaused = false;
        updatePauseUI();
        startDictationLoopForCurrentWord();
      }
    });

    // Sonuç Ekranı Butonları
    dom.btnPlayAgainSame.addEventListener("click", startGame);
    dom.btnBackToPoolFromResult.addEventListener("click", () => {
      state.gameActive = false;
      stopAllSpeech();
      switchScreen("setup");
    });

    // Yönetici Modalı Olayları
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

    dom.adminLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!state.supabaseClient) return;
      dom.adminAuthError.textContent = "";
      dom.btnAdminLoginSubmit.disabled = true;

      const email = dom.adminEmailInput.value.trim();
      const password = dom.adminPasswordInput.value;

      try {
        const { data, error } = await state.supabaseClient.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          dom.adminAuthError.textContent = `Giriş başarısız: ${error.message}`;
        } else {
          state.supabaseSession = data.session;
          dom.adminPasswordInput.value = "";
          updateAdminAuthUI();
        }
      } catch (err) {
        dom.adminAuthError.textContent = "Bağlantı hatası oluştu.";
      } finally {
        dom.btnAdminLoginSubmit.disabled = false;
      }
    });

    dom.btnAdminLogout.addEventListener("click", async () => {
      if (!state.supabaseClient) return;
      await state.supabaseClient.auth.signOut();
      state.supabaseSession = null;
      updateAdminAuthUI();
    });

    dom.adminContentTextarea.addEventListener("input", checkAdminTextareaLetters);
    dom.adminGroupSelect.addEventListener("change", checkAdminTextareaLetters);
    dom.btnAdminInsertWords.addEventListener("click", handleAdminInsertWords);
    dom.btnAdminSeedDefaults.addEventListener("click", handleAdminSeedDefaults);
    dom.btnAdminRefreshRecords.addEventListener("click", fetchCloudWordsAndMerge);
  }

  function init() {
    loadStateFromStorage();
    syncSetupInputsFromState();
    renderCategoryTabs();
    renderActiveCategoryInfoAndItems();
    renderSelectedQueue();
    bindEvents();
    initSupabaseClient();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
