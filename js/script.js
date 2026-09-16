// ============================================================
// MURWANASHYAKA CLAUDE — MAIN JAVASCRIPT
// ============================================================


// ============================================================
// SCROLL REVEAL
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('[data-animate-group]').forEach(function (group) {

    Array.from(group.children).forEach(function (child, i) {

      child.setAttribute(
        'data-animate',
        child.getAttribute('data-animate') || 'rise'
      );

      child.style.setProperty('--i', i);

    });

  });


  var targets = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && targets.length) {

    var observer = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add('in-view');

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );


    targets.forEach(function (el) {

      observer.observe(el);

    });

  } else {

    targets.forEach(function (el) {

      el.classList.add('in-view');

    });

  }

});



// ============================================================
// PROTECTED EMAIL
// ============================================================

var _mEnc = 'bXVyd2FjbGF1ZGUxM0BnbWFpbC5jb20=';

function getProtectedEmail() {

  return atob(_mEnc);

}


document.addEventListener('DOMContentLoaded', function () {

  var email = getProtectedEmail();


  document.querySelectorAll('[data-mail-link]').forEach(function (el) {

    el.setAttribute('href', 'mailto:' + email);

  });


  document.querySelectorAll('[data-mail-text]').forEach(function (el) {

    el.textContent = email;

  });

});



// ============================================================
// HERO IMAGE CAROUSEL
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  var slides = document.querySelectorAll(
    '.hero-carousel .slide'
  );

  var dots = document.querySelectorAll(
    '.hero-carousel .dots span'
  );


  if (!slides.length) return;


  var i = 0;


  setInterval(function () {

    slides[i].classList.remove('active');

    if (dots[i]) {
      dots[i].classList.remove('active');
    }


    i = (i + 1) % slides.length;


    slides[i].classList.add('active');

    if (dots[i]) {
      dots[i].classList.add('active');
    }

  }, 3000);

});



// ============================================================
// ROTATING ROLE TITLES
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  var el = document.querySelector('.rotator-text');

  if (!el) return;


  var roles = [
    'Mechanical Engineer',
    'Front-end Web Developer',
    'Graphics Designer',
    'UI & UX Designer'
  ];


  var i = 0;


  function show(index) {

    el.innerHTML =
      '<span>' + roles[index] + '</span>';

  }


  show(0);


  setInterval(function () {

    i = (i + 1) % roles.length;

    show(i);

  }, 3200);

});



// ============================================================
// MOBILE NAVIGATION
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  var toggle = document.querySelector('.nav-toggle');

  var links = document.querySelector('.nav-links');


  if (toggle && links) {

    toggle.addEventListener('click', function () {

      var open =
        links.classList.toggle('open');


      toggle.setAttribute(
        'aria-expanded',
        open ? 'true' : 'false'
      );

    });


    links.querySelectorAll('a').forEach(function (a) {

      a.addEventListener('click', function () {

        links.classList.remove('open');

        toggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });

  }

});



// ============================================================
// EMAILJS CONTACT FORM
// ============================================================
//
// Visitor submits the form:
//
// 1. Notification template
//    → sends the inquiry to your Gmail
//
// 2. Auto-reply template
//    → sends confirmation to the visitor
//
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('contact-form');


  // If this page doesn't contain the contact form,
  // stop here.
  if (!form) return;


  form.addEventListener('submit', function (e) {

    e.preventDefault();


    var submitButton =
      form.querySelector('button[type="submit"]');


    var originalText =
      submitButton.textContent;


    // Disable button while sending
    submitButton.disabled = true;

    submitButton.textContent = 'Sending...';


    // --------------------------------------------------------
    // SEND MESSAGE TO YOUR GMAIL
    // --------------------------------------------------------

    emailjs.sendForm(
      'service_ssnkaa9',
      'template_0vrj396',
      form
    )

    .then(function () {

      // ------------------------------------------------------
      // SEND AUTO-REPLY TO THE VISITOR
      // ------------------------------------------------------

      return emailjs.sendForm(
        'service_ssnkaa9',
        'template_p2pjb4i',
        form
      );

    })

    .then(function () {

      // ------------------------------------------------------
      // SUCCESS
      // ------------------------------------------------------

      submitButton.textContent =
        'Message Sent ✓';


      // Clear the form
      form.reset();


      // Restore button after 3 seconds
      setTimeout(function () {

        submitButton.textContent =
          originalText;

        submitButton.disabled =
          false;

      }, 3000);

    })

    .catch(function (error) {

      // ------------------------------------------------------
      // ERROR
      // ------------------------------------------------------

      console.error(
        'EmailJS Error:',
        error
      );


      submitButton.textContent =
        'Failed — Try Again';


      submitButton.disabled =
        false;


      setTimeout(function () {

        submitButton.textContent =
          originalText;

      }, 3000);

    });

  });

});
