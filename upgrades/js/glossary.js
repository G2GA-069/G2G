/* ============================================================
   G2G GLOSSARY — Interactive Term Engine

   Scans beat content for glossary terms and wraps them in
   interactive <span> elements. Tap to see definition card.
   Tracks "learned" terms in localStorage.

   REQUIRES: glossary-data.js loaded first (window.G2G_GLOSSARY_TERMS)
   ============================================================ */

(function() {
  'use strict';

  var STORAGE_KEY = 'g2g_learned_terms';
  var card = null;
  var activeTermEl = null;
  var learnedTerms = {};

  // ---- Load learned terms from localStorage ----
  function loadLearned() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) learnedTerms = JSON.parse(stored);
    } catch(e) { /* ignore */ }
  }

  function saveLearned() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learnedTerms));
    } catch(e) { /* ignore */ }
  }

  function markLearned(termKey) {
    learnedTerms[termKey] = Date.now();
    saveLearned();
    // Update all instances of this term
    document.querySelectorAll('.g2g-term[data-term="' + termKey + '"]').forEach(function(el) {
      el.classList.add('learned');
    });
    updateVocabCounter();
  }

  function isLearned(termKey) {
    return !!learnedTerms[termKey];
  }

  // ---- Build term lookup ----
  function buildLookup() {
    var lookup = {};
    if (!window.G2G_GLOSSARY_TERMS) return lookup;

    window.G2G_GLOSSARY_TERMS.forEach(function(entry) {
      // Primary term
      var key = entry.term.toLowerCase();
      lookup[key] = entry;

      // Aliases
      if (entry.aliases) {
        entry.aliases.forEach(function(alias) {
          lookup[alias.toLowerCase()] = entry;
        });
      }
    });

    return lookup;
  }

  // ---- Scan and wrap terms ----
  function scanAndWrap() {
    var lookup = buildLookup();
    if (!Object.keys(lookup).length) return;

    // Build a sorted list of all terms (longest first to avoid partial matches)
    var allTerms = Object.keys(lookup).sort(function(a, b) { return b.length - a.length; });

    // Build regex that matches any term (word-boundary aware)
    var escaped = allTerms.map(function(t) {
      return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    var regex = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');

    // Only scan text content inside beat-inner elements (not nav, not scripts)
    var containers = document.querySelectorAll('.beat-inner');
    var wrapped = {};

    containers.forEach(function(container) {
      // Walk text nodes
      var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          // Skip if parent is already a g2g-term, or is a script/style/code element
          var tag = node.parentElement.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre') {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentElement.classList.contains('g2g-term')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentElement.classList.contains('equation')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      var textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }

      textNodes.forEach(function(textNode) {
        var text = textNode.textContent;
        if (!regex.test(text)) return;

        // Reset regex
        regex.lastIndex = 0;

        var fragment = document.createDocumentFragment();
        var lastIndex = 0;
        var match;

        while ((match = regex.exec(text)) !== null) {
          var termKey = lookup[match[0].toLowerCase()].term.toLowerCase();

          // Only wrap each unique term once per beat to avoid visual clutter
          var beatEl = textNode.closest('.beat');
          var beatId = beatEl ? beatEl.getAttribute('data-section') || '0' : '0';
          var wrapKey = beatId + ':' + termKey;

          if (wrapped[wrapKey]) continue;
          wrapped[wrapKey] = true;

          // Add text before match
          if (match.index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
          }

          // Create the span
          var span = document.createElement('span');
          span.className = 'g2g-term' + (isLearned(termKey) ? ' learned' : '');
          span.setAttribute('data-term', termKey);
          span.textContent = match[0];
          fragment.appendChild(span);

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        if (fragment.childNodes.length > 0) {
          textNode.parentNode.replaceChild(fragment, textNode);
        }
      });
    });
  }

  // ---- Floating card ----
  function createCard() {
    card = document.createElement('div');
    card.className = 'g2g-glossary-card';
    card.innerHTML =
      '<div class="g2g-glossary-card__term"></div>' +
      '<div class="g2g-glossary-card__def"></div>' +
      '<div class="g2g-glossary-card__meta">' +
        '<span class="g2g-glossary-card__chapter"></span>' +
        '<button class="g2g-glossary-card__learn-btn">✓ Got it</button>' +
      '</div>';
    document.body.appendChild(card);

    // Learn button handler
    card.querySelector('.g2g-glossary-card__learn-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      if (activeTermEl) {
        var termKey = activeTermEl.getAttribute('data-term');
        markLearned(termKey);
        this.textContent = '✓ Learned';
        this.classList.add('is-learned');
      }
    });
  }

  function showCard(termEl) {
    if (!card) createCard();
    if (activeTermEl === termEl) {
      hideCard();
      return;
    }

    activeTermEl = termEl;
    termEl.classList.add('active');

    var termKey = termEl.getAttribute('data-term');
    var lookup = buildLookup();
    var entry = lookup[termKey];
    if (!entry) return;

    // Populate card
    card.querySelector('.g2g-glossary-card__term').textContent = entry.term;
    card.querySelector('.g2g-glossary-card__def').textContent = entry.def;
    card.querySelector('.g2g-glossary-card__chapter').textContent = 'First seen: Chapter ' + entry.firstSeen;

    var btn = card.querySelector('.g2g-glossary-card__learn-btn');
    if (isLearned(termKey)) {
      btn.textContent = '✓ Learned';
      btn.classList.add('is-learned');
    } else {
      btn.textContent = '✓ Got it';
      btn.classList.remove('is-learned');
    }

    // Position card near the term
    var rect = termEl.getBoundingClientRect();
    var cardWidth = 340;
    var cardHeight = 180;

    var left = rect.left + rect.width / 2 - cardWidth / 2;
    left = Math.max(16, Math.min(left, window.innerWidth - cardWidth - 16));

    var top;
    if (rect.top > cardHeight + 20) {
      top = rect.top - cardHeight - 12; // Above
    } else {
      top = rect.bottom + 12; // Below
    }

    card.style.left = left + 'px';
    card.style.top = top + 'px';

    // Show
    requestAnimationFrame(function() {
      card.classList.add('visible');
    });

    // Auto-mark as learned after viewing
    if (!isLearned(termKey)) {
      markLearned(termKey);
    }
  }

  function hideCard() {
    if (card) {
      card.classList.remove('visible');
    }
    if (activeTermEl) {
      activeTermEl.classList.remove('active');
      activeTermEl = null;
    }
  }

  // ---- Vocab counter ----
  function createVocabCounter() {
    var counter = document.createElement('div');
    counter.className = 'g2g-vocab-counter';
    counter.innerHTML = '<span class="g2g-vocab-counter__number">0</span> terms learned';
    document.body.appendChild(counter);
    updateVocabCounter();
    return counter;
  }

  function updateVocabCounter() {
    var count = Object.keys(learnedTerms).length;
    var total = window.G2G_GLOSSARY_TERMS ? window.G2G_GLOSSARY_TERMS.length : 0;
    var el = document.querySelector('.g2g-vocab-counter__number');
    if (el) el.textContent = count;
    var counter = document.querySelector('.g2g-vocab-counter');
    if (counter) {
      counter.innerHTML = '<span class="g2g-vocab-counter__number">' + count + '</span>/' + total + ' terms';
    }
  }

  // ---- Event handlers ----
  function init() {
    loadLearned();
    scanAndWrap();
    createVocabCounter();

    // Delegate click on terms
    document.addEventListener('click', function(e) {
      var termEl = e.target.closest('.g2g-term');
      if (termEl) {
        e.preventDefault();
        e.stopPropagation();
        showCard(termEl);
      } else if (!e.target.closest('.g2g-glossary-card')) {
        hideCard();
      }
    });

    // Hide on scroll / beat change
    document.addEventListener('wheel', hideCard, { passive: true });
    document.addEventListener('touchstart', function(e) {
      if (!e.target.closest('.g2g-glossary-card') && !e.target.closest('.g2g-term')) {
        hideCard();
      }
    }, { passive: true });

    // Hide on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') hideCard();
    });
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
