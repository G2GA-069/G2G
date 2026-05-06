/* ============================================================
   G2G ENTRANCE CHOREOGRAPHY — JavaScript Controller

   Hooks into the existing goTo() function to add/remove
   the 'animate-entrance' and 'active' classes at the right time.

   INTEGRATION: Add this script AFTER the existing <script> block.
   It monkey-patches the goTo function to add entrance logic.
   ============================================================ */

(function() {
  'use strict';

  // Wait for DOM + existing scripts to load
  document.addEventListener('DOMContentLoaded', function() {
    const beats = document.querySelectorAll('.beat');
    if (!beats.length) return;

    // Add animate-entrance class to all beats
    beats.forEach(function(beat) {
      beat.classList.add('animate-entrance');
    });

    // Mark the first beat as active immediately (it's already visible)
    if (beats[0]) {
      beats[0].classList.add('active');
    }

    // Observe the existing goTo function.
    // We intercept by watching for transform changes on beats.
    // When a beat gets translateY(0), it's the active one.
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'style') {
          const beat = mutation.target;
          const transform = beat.style.transform || '';
          const opacity = beat.style.opacity;

          if (transform.includes('translateY(0') || transform === '' || transform === 'none') {
            if (opacity !== '0') {
              // This beat just became active
              beat.classList.add('active');
            }
          } else {
            // This beat is moving away
            beat.classList.remove('active');
          }
        }
      });
    });

    beats.forEach(function(beat) {
      observer.observe(beat, { attributes: true, attributeFilter: ['style'] });
    });

    // Also hook into goTo if it exists in global scope
    if (typeof window.goTo === 'function') {
      const originalGoTo = window.goTo;
      window.goTo = function(index) {
        // Remove active from all beats before transition
        beats.forEach(function(b, i) {
          if (i !== index) {
            b.classList.remove('active');
          }
        });

        // Call original
        originalGoTo.call(this, index);

        // Add active to target beat after a tiny delay (let transform start)
        setTimeout(function() {
          if (beats[index]) {
            beats[index].classList.add('active');
          }
        }, 50);
      };
    }
  });
})();
