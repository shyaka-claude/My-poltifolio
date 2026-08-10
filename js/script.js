// Scroll-reveal: fade/rise elements into view as the user scrolls.
// Add data-animate to any element; add data-animate-group to a parent whose
// direct children should stagger in one after another.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-animate-group]').forEach(function (group) {
    Array.from(group.children).forEach(function (child, i) {
      child.setAttribute('data-animate', child.getAttribute('data-animate') || 'rise');
      child.style.setProperty('--i', i);
    });
  });

  var targets = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && targets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { observer.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in-view'); });
  }
});

// Email protection: the address is stored base64-encoded so it never appears
// as plain text in the page source or JS file, where spam bots scan for it.
// It's decoded in the visitor's browser only, after the page has loaded.
var _mEnc = 'bXVyd2FjbGF1ZGUxM0BnbWFpbC5jb20=';
function getProtectedEmail() { return atob(_mEnc); }

document.addEventListener('DOMContentLoaded', function () {
  var email = getProtectedEmail();
  document.querySelectorAll('[data-mail-link]').forEach(function (el) {
    el.setAttribute('href', 'mailto:' + email);
  });
  document.querySelectorAll('[data-mail-text]').forEach(function (el) {
    el.textContent = email;
  });
});

// Hero image carousel — auto-advances through slides
document.addEventListener('DOMContentLoaded', function () {
  var slides = document.querySelectorAll('.hero-carousel .slide');
  var dots = document.querySelectorAll('.hero-carousel .dots span');
  if (!slides.length) return;
  var i = 0;
  setInterval(function () {
    slides[i].classList.remove('active');
    if (dots[i]) dots[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
    if (dots[i]) dots[i].classList.add('active');
  }, 3000);
});

// Rotating role titles under the name (Frontend Web Developer / Web Design / etc.)
document.addEventListener('DOMContentLoaded', function () {
  var el = document.querySelector('.rotator-text');
  if (!el) return;
  var roles = ['Frontend Web Developer', 'Web Design', 'UI Designer', 'Mechanical Engineer'];
  var i = 0;
  function show(index) {
    el.innerHTML = '<span>' + roles[index] + '</span>';
  }
  show(0);
  setInterval(function () {
    i = (i + 1) % roles.length;
    show(i);
  }, 3200);
});

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Contact form -> opens the visitor's email client with a pre-filled message.
  // NOTE: this is a no-backend fallback. For a real working form (submissions
  // land in your inbox without opening the visitor's mail app), connect this
  // form to a free service like Formspree (https://formspree.io) instead —
  // swap the form's "action" to your Formspree endpoint and remove the JS below.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var service = document.getElementById('cf-service').value;
      var message = document.getElementById('cf-message').value.trim();

      var subject = encodeURIComponent('Website inquiry from ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Interested in: ' + service + '\n\n' +
        message
      );
      window.location.href = 'mailto:' + getProtectedEmail() + '?subject=' + subject + '&body=' + body;
    });
  }
});
