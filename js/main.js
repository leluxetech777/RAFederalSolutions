/* ============================================================
   RA FEDERAL SOLUTIONS — Main JavaScript
   Government-Grade Professional Services
   ============================================================ */

// ─── JS-ENABLED FLAG ───
// Signals the CSS that JS is running, so entrance/reveal animations engage.
// Without this (JS blocked/failed), all content stays visible by default.
document.documentElement.classList.add('js');

// ─── PRELOADER ───
const preloader = document.getElementById('preloader');
if (preloader) {
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      document.body.style.overflow = '';
      initHeroAnimations();
    }, 1600);
  });
  // Fallback if load is slow
  setTimeout(() => {
    if (!preloader.classList.contains('is-hidden')) {
      preloader.classList.add('is-hidden');
      document.body.style.overflow = '';
      initHeroAnimations();
    }
  }, 3500);
}

// ─── HERO ENTRANCE ───
function initHeroAnimations() {
  const eyebrow = document.querySelector('.hero__eyebrow');
  const titleTexts = document.querySelectorAll('.hero__title-text');
  const subtitle = document.querySelector('.hero__subtitle');
  const ctas = document.querySelector('.hero__ctas');
  const trust = document.querySelector('.hero__trust');

  const show = (el, transform = 'translateY(0)') => {
    if (!el) return;
    el.style.transition = 'opacity 0.9s var(--ease-out-expo), transform 0.9s var(--ease-out-expo)';
    el.style.opacity = '1';
    el.style.transform = transform;
  };

  setTimeout(() => show(eyebrow), 100);
  titleTexts.forEach((t, i) => setTimeout(() => show(t), 300 + i * 140));
  setTimeout(() => show(subtitle), 700);
  setTimeout(() => show(ctas), 880);
  setTimeout(() => show(trust), 1040);
}
// If no preloader on this page, run hero anim immediately
if (!preloader) document.addEventListener('DOMContentLoaded', initHeroAnimations);

// ─── HEADER SCROLL BEHAVIOR ───
const header = document.getElementById('header');
let lastScrollY = 0, headerHidden = false;
function updateHeader() {
  if (!header) return;
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 20);
  if (y > 400) {
    if (y > lastScrollY && !headerHidden) { header.style.transform = 'translateY(-100%)'; headerHidden = true; }
    else if (y < lastScrollY && headerHidden) { header.style.transform = 'translateY(0)'; headerHidden = false; }
  } else { header.style.transform = 'translateY(0)'; headerHidden = false; }
  lastScrollY = y;
}
window.addEventListener('scroll', updateHeader, { passive: true });

// ─── MOBILE MENU ───
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuToggle && mobileNav) {
  const closeNav = () => {
    mobileNav.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.contains('is-open');
    if (open) { closeNav(); }
    else {
      mobileNav.classList.add('is-open');
      menuToggle.classList.add('is-active');
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
}

// ─── SCROLL REVEAL ───
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-image, .line-draw');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initScrollReveal);

// ─── COUNTERS ───
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800, start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = eased * target;
    el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
document.addEventListener('DOMContentLoaded', initCounters);

// ─── SCROLL PROGRESS ───
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (!scrollProgress) return;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (window.scrollY / docHeight) * 100 + '%';
}, { passive: true });

// ─── PROCESS TIMELINE ───
function initProcessTimeline() {
  const steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  steps.forEach(step => { step.classList.add('reveal'); observer.observe(step); });
}
document.addEventListener('DOMContentLoaded', initProcessTimeline);

// ─── ACTIVE NAV LINK ───
function setActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav-link').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('is-active');
  });
}
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ─── MAGNETIC BUTTONS ───
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.btn--primary, .btn--white, .btn--navy, .header__cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}
document.addEventListener('DOMContentLoaded', initMagneticButtons);

// ─── SMOOTH ANCHOR SCROLL ───
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const id = anchor.getAttribute('href');
  if (id === '#') return;
  const target = document.querySelector(id);
  if (!target) return;
  e.preventDefault();
  const offset = (header ? header.offsetHeight : 72) + 20;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
});

// ─── PORTFOLIO FILTER ───
function initPortfolioFilter() {
  const btns = document.querySelectorAll('.gallery-filter__btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) { item.style.display = ''; requestAnimationFrame(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }); }
        else { item.style.opacity = '0'; item.style.transform = 'scale(0.96)'; setTimeout(() => { item.style.display = 'none'; }, 350); }
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

// ─── RFQ / CONTACT FORM ───
function initForm() {
  const form = document.getElementById('rfqForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form__submit');
    const original = btn.textContent;
    btn.textContent = 'Transmitting…';
    btn.style.opacity = '0.65';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = '✓ Inquiry Received';
      btn.style.opacity = '1';
      const status = form.querySelector('.form__status');
      if (status) status.textContent = 'Thank you. Your inquiry has been logged and a member of our team will respond within one business day.';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.pointerEvents = '';
        form.reset();
        if (status) status.textContent = '';
      }, 5000);
    }, 1400);
  });
}
document.addEventListener('DOMContentLoaded', initForm);

// ─── PRINT CAPABILITY STATEMENT ───
function initPrint() {
  document.querySelectorAll('[data-print]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); window.print(); });
  });
}
document.addEventListener('DOMContentLoaded', initPrint);

// ─── YEAR STAMP ───
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = '2026'; });
