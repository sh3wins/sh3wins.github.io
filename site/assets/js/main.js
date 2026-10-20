(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  /* ---- scroll reveal ---- */
  var items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(items, function (el, i) {
      el.style.transitionDelay = (Math.min(i, 5) * 60) + 'ms';
      io.observe(el);
    });
  }

  /* ---- project filters ---- */
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('[data-cats]');
  if (filters.length && projects.length) {
    Array.prototype.forEach.call(filters, function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.dataset.filter;

        Array.prototype.forEach.call(filters, function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });

        Array.prototype.forEach.call(projects, function (card) {
          var cats = (card.dataset.cats || '').split(' ');
          var show = want === 'all' || cats.indexOf(want) !== -1;
          card.hidden = !show;
        });
      });
    });
  }

  /* ---- contact form: no backend yet, hand off to the mail client ---- */
  var form = document.querySelector('[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var subject = 'Project enquiry from ' + (data.get('name') || 'your site');
      var body =
        'Name: ' + (data.get('name') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Project type: ' + (data.get('type') || '') + '\n\n' +
        (data.get('message') || '');
      window.location.href =
        'mailto:' + form.dataset.mailto +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* ---- footer year ---- */
  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
