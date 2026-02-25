/* ══════════════════════════════════════════
   mipagina.top — JavaScript
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile hamburger menu toggle ── */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks = document.querySelector('.navbar__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('navbar__links--open');
      hamburger.classList.toggle('navbar__hamburger--active', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('navbar__links--open');
        hamburger.classList.remove('navbar__hamburger--active');
      });
    });
  }

  /* ── Navbar hide/show on scroll direction ── */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      // Add scrolled state for background
      if (currentScrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }

      // Hide/show based on scroll direction (only after 80px)
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY + 5) {
          // Scrolling down — hide (only if mobile menu is closed)
          if (!navLinks || !navLinks.classList.contains('navbar__links--open')) {
            navbar.classList.add('navbar--hidden');
          }
        } else if (currentScrollY < lastScrollY - 5) {
          // Scrolling up — show
          navbar.classList.remove('navbar--hidden');
        }
      } else {
        navbar.classList.remove('navbar--hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
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
