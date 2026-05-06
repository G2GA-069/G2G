/* ============================================================
   G2G CHAPTER PROGRESS BAR

   A thin, glowing bar at the very top of the viewport that
   shows progress through the current chapter (beat N of M).
   ============================================================ */

(function() {
  'use strict';

  var bar, fill;

  function create() {
    bar = document.createElement('div');
    bar.className = 'g2g-progress-bar';
    fill = document.createElement('div');
    fill.className = 'g2g-progress-bar__fill';
    bar.appendChild(fill);
    document.body.appendChild(bar);
  }

  function update(currentIndex, totalBeats) {
    if (!fill) return;
    var pct = totalBeats > 1 ? (currentIndex / (totalBeats - 1)) * 100 : 0;
    pct = Math.min(100, Math.max(0, pct));
    fill.style.width = pct + '%';

    if (pct >= 100) {
      fill.classList.add('complete');
    } else {
      fill.classList.remove('complete');
    }
  }

  function init() {
    var beats = document.querySelectorAll('.beat');
    if (!beats.length) return;

    create();
    update(0, beats.length);

    // Hook into goTo
    if (typeof window.goTo === 'function') {
      var originalGoTo = window.goTo;
      window.goTo = function(index) {
        originalGoTo.call(this, index);
        update(index, beats.length);
      };
    } else {
      // Fallback: observe style changes
      var observer = new MutationObserver(function() {
        beats.forEach(function(beat, i) {
          var transform = beat.style.transform || '';
          if ((transform.includes('translateY(0') || transform === '' || transform === 'none') && beat.style.opacity !== '0') {
            update(i, beats.length);
          }
        });
      });
      beats.forEach(function(beat) {
        observer.observe(beat, { attributes: true, attributeFilter: ['style'] });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
