/* ══════════════════════════════════════════
   mipagina.top — JavaScript
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile hamburger menu toggle ── */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks = document.querySelector('.navbar__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('navbar__links--open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('navbar__links--open');
      });
    });
  }

  /* ── Navbar background on scroll ── */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(3, 7, 18, .95)';
      } else {
        navbar.style.background = 'rgba(3, 7, 18, .75)';
      }
    }, { passive: true });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Smooth FAQ accordion ── */
  document.querySelectorAll('.faq__item').forEach(details => {
    const summary = details.querySelector('summary');
    const wrapper = details.querySelector('.faq__answer-wrapper');

    if (!summary || !wrapper) return;

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (details.open) {
        // Closing: animate 1fr → 0fr, then remove [open]
        wrapper.style.gridTemplateRows = '0fr';
        wrapper.addEventListener('transitionend', function handler() {
          details.open = false;
          wrapper.removeEventListener('transitionend', handler);
        }, { once: true });
      } else {
        // Opening: add [open] with 0fr, then animate to 1fr
        wrapper.style.gridTemplateRows = '0fr';
        details.open = true;
        // Double rAF ensures the browser paints the 0fr state first
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            wrapper.style.gridTemplateRows = '1fr';
          });
        });
      }
    });
  });

});
