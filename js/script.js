/* ============================================
   IT Partner Enterprise SaaS — script.js
   ============================================ */

'use strict';

/* ─── Navbar Scroll ─── */
function initNavbar() {
  const nav = document.querySelector('.navbar-custom');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── Active Nav Link ─── */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-custom').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && (href === page || (page === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
}

/* ─── Scroll Reveal ─── */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => obs.observe(el));
}

/* ─── Back to Top ─── */
function initBackTop() {
  const btn = document.querySelector('.back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 380);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── Counter Animation ─── */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString() + (suffix || '');
  }, step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const val = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, val, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

/* ─── Contact Form ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    // Show loading
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending…';
    btn.disabled = true;

    // Simulate submission
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();
      showToast('✓ Message sent! We\'ll be in touch within 24 hours.');
    }, 1600);
  });

  // Real-time validation
  form.querySelectorAll('.form-control-custom, .form-select-custom').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#ef4444';
      } else {
        input.style.borderColor = '';
      }
    });
    input.addEventListener('input', () => {
      if (input.value.trim()) input.style.borderColor = '';
    });
  });
}

function showToast(msg) {
  let toast = document.querySelector('.toast-success');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-success';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ─── Smooth Page Transitions ─── */
function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') ||
        href.startsWith('tel') || href.startsWith('http')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity .25s ease';
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity .35s ease';
}

/* ─── Hero Parallax (subtle) ─── */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.3;
    hero.style.backgroundPositionY = `${y}px`;
  }, { passive: true });
}

/* ─── Mobile Menu Close on Link ─── */
function initMobileMenu() {
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.querySelector('.navbar-collapse');
  if (!toggler || !collapse) return;
  collapse.querySelectorAll('.nav-link-custom').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ─── Service Card Links ─── */
function initServiceLinks() {
  document.querySelectorAll('[data-service-link]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a, button')) {
        window.location.href = card.dataset.serviceLink;
      }
    });
  });
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActiveNav();
  initReveal();
  initBackTop();
  initCounters();
  initContactForm();
  initMobileMenu();
  initServiceLinks();

  // Fade in page
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity .35s ease';
  }, 50);
});
