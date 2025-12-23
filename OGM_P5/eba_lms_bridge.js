// eba_lms_bridge.js
(function () {
  // ---------- Helpers ----------
  function isoDurationFromSeconds(sec) {
    const s = Number(sec);
    if (!isFinite(s) || s < 0) return "PT0S";
    // 2 basamak hassasiyet
    return `PT${s.toFixed(2)}S`;
  }

  // ---------- EBA LMS callback (frmSkillBasedApp) ----------
  function getEbaLmsWindow() {
    try {
      return window.parent?.document
        ?.getElementById("frmSkillBasedApp")
        ?.contentWindow || null;
    } catch (e) {
      // same-origin engeli olabilir
      return null;
    }
  }

  function sendToEbaOnCompleted(result) {
    const cw = getEbaLmsWindow();
    if (cw && typeof cw.onCompleted === "function") {
      cw.onCompleted(result);
      return true;
    }
    return false;
  }

  // ---------- SCORM 1.2 minimal wrapper ----------
  let scormApi = null;
  let scormInited = false;

  function findScormAPI(win) {
    const maxTries = 500;
    let tries = 0;
    while (win && tries < maxTries) {
      if (win.API) return win.API; // SCORM 1.2
      tries++;
      win = win.parent;
      if (win === win.parent) break;
    }
    return null;
  }

  function getScormAPI() {
    if (scormApi) return scormApi;
    scormApi = findScormAPI(window) || findScormAPI(window.opener);
    return scormApi;
  }

  function scormInit() {
    if (scormInited) return true;
    const API = getScormAPI();
    if (!API || typeof API.LMSInitialize !== "function") return false;
    try {
      scormInited = (API.LMSInitialize("") === "true");
      return scormInited;
    } catch (e) {
      return false;
    }
  }

  function scormSet(k, v) {
    const API = getScormAPI();
    if (!API || typeof API.LMSSetValue !== "function") return false;
    try {
      return API.LMSSetValue(k, String(v)) === "true";
    } catch (e) {
      return false;
    }
  }

  function scormCommit() {
    const API = getScormAPI();
    if (!API || typeof API.LMSCommit !== "function") return false;
    try {
      return API.LMSCommit("") === "true";
    } catch (e) {
      return false;
    }
  }

  function scormFinish() {
    const API = getScormAPI();
    if (!API || typeof API.LMSFinish !== "function") return false;
    try {
      const ok = API.LMSFinish("") === "true";
      scormInited = false;
      return ok;
    } catch (e) {
      return false;
    }
  }

  // ---------- Public API ----------
  window.EBA_LMS = {
    // EBA LMS var mı?
    hasEbaCallback: function () {
      const cw = getEbaLmsWindow();
      return !!(cw && typeof cw.onCompleted === "function");
    },

    // SCORM var mı?
    hasScorm: function () {
      const API = getScormAPI();
      return !!(API && typeof API.LMSInitialize === "function");
    },

    // Başlat (opsiyonel)
    init: function () {
      // SCORM varsa init ederiz; EBA callback init gerektirmez
      scormInit();
      return true;
    },

    // Tamamlandı sinyali (EBA öncelikli, SCORM yedekli)
    complete: function (opts) {
      const o = opts || {};
      const durationSec = o.durationSec ?? 5;
      const score = (o.score ?? null);
      const maxScore = (o.maxScore ?? 100);
      const minScore = (o.minScore ?? 0);
      const success = (o.success ?? true);

      // 1) EBA LMS callback
      const result = {
        completion: true,
        success: !!success,
        duration: isoDurationFromSeconds(durationSec),
        // İstersen ek alanlar:
        score: score == null ? undefined : Number(score),
        maxScore: Number(maxScore),
        minScore: Number(minScore),
      };
      // undefined alanları temizle
      Object.keys(result).forEach(k => result[k] === undefined && delete result[k]);

      const sentEba = sendToEbaOnCompleted(result);

      // 2) SCORM yedek (varsa)
      const sentScorm = (function () {
        if (!scormInit()) return false;

        // completion & success map
        // SCORM 1.2: cmi.core.lesson_status = completed/passed/failed/incomplete
        const status = success ? "completed" : "failed";
        scormSet("cmi.core.lesson_status", status);

        if (score != null) {
          scormSet("cmi.core.score.raw", Number(score));
          scormSet("cmi.core.score.min", Number(minScore));
          scormSet("cmi.core.score.max", Number(maxScore));
        }

        // süreyi SCORM time formatına çevirmiyoruz (HH:MM:SS.SS) çünkü LMS'ler çok farklı;
        // istersen ekleriz. Şimdilik suspend_data içine duration atıyoruz:
        scormSet("cmi.suspend_data", JSON.stringify({ durationSec: Number(durationSec) }));

        const ok = scormCommit();
        // Bazı LMS'lerde hemen finish iyi, bazılarında kötü. İstersen o.finish=true gönder.
        if (o.finish === true) scormFinish();
        return ok;
      })();

      return {
        eba: sentEba,
        scorm: sentScorm
      };
    },

    // İlerleme göndermek istersen (EBA tarafı destekliyorsa result içine ekler)
    progress: function (percent01) {
      const p = Math.max(0, Math.min(1, Number(percent01)));
      // EBA'da onCompleted haricinde özel progress callback yoksa, en güvenlisi suspend_data/scorm.
      if (scormInit()) {
        scormSet("cmi.suspend_data", JSON.stringify({ progress: p }));
        scormCommit();
        return true;
      }
      return false;
    },

    // Kapanış
    finish: function () {
      if (scormInited) {
        scormCommit();
        scormFinish();
      }
      return true;
    }
  };

  // Sayfa kapanırken
  window.addEventListener("beforeunload", function () {
    try { window.EBA_LMS.finish(); } catch (e) {}
  });
})();
