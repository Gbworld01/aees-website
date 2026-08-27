// ============================================================
// AEES — main.js
// Nav behaviour, scroll reveal, mobile menu, appointment form
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initScrollReveal();
  initActiveLink();
  initAppointmentForm();
});

/* Shrink / darken nav on scroll */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile hamburger menu */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* Fade/slide sections in as they enter the viewport */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* Highlight the current section link in the nav (home page only) */
function initActiveLink() {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!links.length) return;
  const sections = Array.from(links)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

/* ------------------------------------------------------------
   Appointment form
   ------------------------------------------------------------
   This posts to Formspree (https://formspree.io) — a free
   service that emails form submissions straight to your inbox
   with zero backend code. See README.md for the 2-minute setup.
   Until you plug in your own endpoint below, the form will show
   a friendly "not yet connected" message instead of failing
   silently.
------------------------------------------------------------ */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaewrdre'; // <-- replace with your real endpoint

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  const showStatus = (type, message) => {
    status.textContent = message;
    status.className = `form-status show ${type}`;
  };

  const validators = {
    companyName: v => v.trim().length > 0 || 'Please enter your company or organisation name.',
    fullName: v => v.trim().length > 1 || 'Please enter your full name.',
    message: v => v.trim().length > 5 || 'Tell us a little about what you need — a sentence is fine.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
    phone: v => /^[0-9+\-\s()]{7,20}$/.test(v) || 'Enter a valid phone number.'
  };

  const validateField = (field) => {
    const row = field.closest('.form-row');
    const validate = validators[field.name];
    if (!validate) return true;
    const result = validate(field.value);
    if (result === true) {
      row.classList.remove('has-error');
      return true;
    }
    row.classList.add('has-error');
    row.querySelector('.field-error').textContent = result;
    return false;
  };

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-row').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.classList.remove('show');

    const fields = Array.from(form.querySelectorAll('input[required], textarea[required]'));
    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) {
      showStatus('error', 'Please fix the highlighted fields and try again.');
      return;
    }

    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      // No live endpoint configured yet — tell the site owner exactly what to do.
      showStatus(
        'error',
        "This form isn't connected to an inbox yet. Open js/main.js and set FORMSPREE_ENDPOINT " +
        "to your Formspree URL (see README.md — it takes about two minutes)."
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        form.reset();
        showStatus('success', "Thanks — your request is in. We'll reach out shortly to confirm your appointment.");
      } else {
        showStatus('error', 'Something went wrong sending your request. Please try again or call us directly.');
      }
    } catch (err) {
      showStatus('error', 'Network error — please check your connection and try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Book Appointment';
    }
  });
}
