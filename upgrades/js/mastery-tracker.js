/* ============================================================
   G2G MASTERY TRACKER — Chapter Completion + Rewards

   Tracks beat progress per chapter, triggers completion
   celebration when user reaches the last beat, stores state
   in localStorage.

   INTEGRATION: Add AFTER the main chapter script block.
   ============================================================ */

(function() {
  'use strict';

  var STORAGE_KEY = 'g2g_mastery';
  var masterData = {};

  // ---- Persistence ----
  function load() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) masterData = JSON.parse(stored);
    } catch(e) { masterData = {}; }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(masterData));
    } catch(e) { /* ignore */ }
  }

  // ---- Detect current chapter ----
  function getCurrentChapter() {
    var path = window.location.pathname;
    var match = path.match(/ch(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
  }

  // ---- Record highest beat reached ----
  function recordBeat(chapterNum, beatIndex, totalBeats) {
    var key = 'ch' + chapterNum;
    if (!masterData[key]) {
      masterData[key] = { highestBeat: 0, totalBeats: totalBeats, completed: false, completedAt: null };
    }
    masterData[key].totalBeats = totalBeats;
    if (beatIndex > masterData[key].highestBeat) {
      masterData[key].highestBeat = beatIndex;
    }
    // Check completion (reached last beat)
    if (beatIndex >= totalBeats - 1 && !masterData[key].completed) {
      masterData[key].completed = true;
      masterData[key].completedAt = Date.now();
      save();
      showCompletionCelebration(chapterNum, totalBeats);
      return;
    }
    save();
  }

  // ---- Completion celebration ----
  function showCompletionCelebration(chapterNum, totalBeats) {
    // Confetti
    spawnConfetti();

    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'g2g-completion-overlay';

    var completedCount = Object.values(masterData).filter(function(d) { return d.completed; }).length;
    var learnedTerms = 0;
    try {
      var lt = localStorage.getItem('g2g_learned_terms');
      if (lt) learnedTerms = Object.keys(JSON.parse(lt)).length;
    } catch(e) {}

    overlay.innerHTML =
      '<div class="g2g-completion-badge">✦</div>' +
      '<div class="g2g-completion-title">Chapter ' + chapterNum + ' Complete</div>' +
      '<div class="g2g-completion-subtitle">You made it through every beat.</div>' +
      '<div class="g2g-completion-stats">' +
        '<div class="g2g-completion-stat">' +
          '<span class="g2g-completion-stat__number">' + totalBeats + '</span>' +
          '<span class="g2g-completion-stat__label">Beats</span>' +
        '</div>' +
        '<div class="g2g-completion-stat">' +
          '<span class="g2g-completion-stat__number">' + completedCount + '</span>' +
          '<span class="g2g-completion-stat__label">Chapters Done</span>' +
        '</div>' +
        '<div class="g2g-completion-stat">' +
          '<span class="g2g-completion-stat__number">' + learnedTerms + '</span>' +
          '<span class="g2g-completion-stat__label">Terms Learned</span>' +
        '</div>' +
      '</div>' +
      '<button class="g2g-completion-continue">Continue</button>';

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(function() {
      overlay.classList.add('visible');
    });

    // Continue button
    overlay.querySelector('.g2g-completion-continue').addEventListener('click', function() {
      overlay.classList.remove('visible');
      setTimeout(function() { overlay.remove(); }, 600);
    });

    // Also dismiss on Escape
    var escHandler = function(e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('visible');
        setTimeout(function() { overlay.remove(); }, 600);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  // ---- Confetti effect ----
  function spawnConfetti() {
    var container = document.createElement('div');
    container.className = 'g2g-confetti';
    document.body.appendChild(container);

    var colors = ['#d4a0ff', '#d946ef', '#6b2fa0', '#4a9e6e', '#5a8fc4', '#ffbe0b', '#ff006e'];

    for (var i = 0; i < 60; i++) {
      var particle = document.createElement('div');
      particle.className = 'g2g-confetti-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '-10px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = (4 + Math.random() * 8) + 'px';
      particle.style.height = (4 + Math.random() * 8) + 'px';
      particle.style.animationDuration = (2 + Math.random() * 2) + 's';
      particle.style.animationDelay = (Math.random() * 0.8) + 's';
      container.appendChild(particle);
    }

    // Remove after animation
    setTimeout(function() { container.remove(); }, 5000);
  }

  // ---- Hook into goTo ----
  function hookGoTo() {
    var chapterNum = getCurrentChapter();
    if (!chapterNum) return;

    var beats = document.querySelectorAll('.beat');
    var totalBeats = beats.length;

    // Record initial beat
    recordBeat(chapterNum, 0, totalBeats);

    // Monkey-patch goTo
    if (typeof window.goTo === 'function') {
      var originalGoTo = window.goTo;
      window.goTo = function(index) {
        originalGoTo.call(this, index);
        recordBeat(chapterNum, index, totalBeats);
      };
    } else {
      // Fallback: observe style changes on beats
      var observer = new MutationObserver(function(mutations) {
        beats.forEach(function(beat, i) {
          var transform = beat.style.transform || '';
          if ((transform.includes('translateY(0') || transform === '' || transform === 'none') && beat.style.opacity !== '0') {
            recordBeat(chapterNum, i, totalBeats);
          }
        });
      });
      beats.forEach(function(beat) {
        observer.observe(beat, { attributes: true, attributeFilter: ['style'] });
      });
    }
  }

  // ---- Public API (for mastery map page) ----
  window.G2G_Mastery = {
    getData: function() { load(); return masterData; },
    getChapter: function(num) { load(); return masterData['ch' + num] || null; },
    isCompleted: function(num) { load(); var d = masterData['ch' + num]; return d ? d.completed : false; },
    getProgress: function(num) { load(); var d = masterData['ch' + num]; if (!d) return 0; return d.totalBeats > 0 ? d.highestBeat / (d.totalBeats - 1) : 0; },
    getCompletedCount: function() {
      load();
      return Object.values(masterData).filter(function(d) { return d.completed; }).length;
    },
    reset: function() { masterData = {}; save(); }
  };

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookGoTo);
  } else {
    hookGoTo();
  }

})();
