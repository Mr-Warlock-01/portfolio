  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Copy email
  var copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async function () {
      var original = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText('shaminbd01@gmail.com');
        copyBtn.textContent = 'Copied!';
      } catch (err) {
        copyBtn.textContent = 'shaminbd01@gmail.com';
      }
      setTimeout(function () { copyBtn.textContent = original; }, 1600);
    });
  }

  // Active nav link on scroll
  (function () {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.main-nav a'));
    var sections = navLinks
      .map(function (link) { return document.querySelector(link.getAttribute('href')); })
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var id = '#' + entry.target.id;
          var link = navLinks.find(function (l) { return l.getAttribute('href') === id; });
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

      sections.forEach(function (s) { observer.observe(s); });
    }
  })();

  // // Draw-in animation for the hero rating line
  // (function () {
  //   var path = document.getElementById('ratingPath');
  //   if (!path) return;
  //   var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  //   if (reduceMotion) return;
  //   try {
  //     var length = path.getTotalLength();
  //     path.style.strokeDasharray = length;
  //     path.style.strokeDashoffset = length;
  //     path.getBoundingClientRect(); // force reflow
  //     path.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.25,.1,.25,1)';
  //     requestAnimationFrame(function () {
  //       path.style.strokeDashoffset = '0';
  //     });
  //   } catch (err) { /* no-op */ }
  // })();
  
  // Draw-in animation for the hero rating line — loops until the page is closed
(function () {
  var path = document.getElementById('ratingPath');
  if (!path) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var DRAW_MS = 1400;  // draw-in duration, same as before
  var PAUSE_MS = 700;  // how long it holds fully-drawn before resetting
  var length;

  function cycle() {
    try {
      // Snap back to "undrawn" instantly, no transition
      path.style.transition = 'none';
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect(); // force reflow

      // Draw it in
      path.style.transition = 'stroke-dashoffset ' + DRAW_MS + 'ms cubic-bezier(.25,.1,.25,1)';
      requestAnimationFrame(function () {
        path.style.strokeDashoffset = '0';
      });
    } catch (err) {
      return; // stop the loop if something goes wrong
    }

    setTimeout(function () {
      if (path.isConnected) cycle(); // stop if the element ever leaves the page
    }, DRAW_MS + PAUSE_MS);
  }

  try {
    length = path.getTotalLength();
    path.style.strokeDasharray = length;
  } catch (err) {
    return;
  }

  cycle();
})();

  // Dark / light theme toggle
  (function () {
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    function updateLabel() {
      var isDark = root.getAttribute('data-theme') === 'dark';
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    updateLabel();

    toggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (err) {}
      updateLabel();
    });
  })();
