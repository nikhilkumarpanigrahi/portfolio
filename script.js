/* ════════════════════════════════════════════════════════════
   PORTFOLIO MOTION ENGINE — NIKHIL KUMAR PANIGRAHI
   
   Principles:
   — Motion serves meaning, not decoration
   — Spring physics > CSS transitions alone
   — Every interaction has a clear physical metaphor
   — Less elements animated = more impact per animation
════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════════
     0. STUDIO SHUTTER PRELOADER
     Mathematical precision counter + high-fashion shutter lift
  ══════════════════════════════════════════════════════════ */
  const loader       = document.getElementById('loader');
  const loaderNum    = document.getElementById('loaderNum');
  const loaderBar    = document.getElementById('loaderProgress');
  const loaderStatus = document.getElementById('loaderStatus');
  const loaderTag    = document.getElementById('loaderTag');

  const triggerHeroEntrance = () => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('loaded');

    // Stagger headline line reveal
    const headline = document.querySelector('.hero-headline');
    if (headline) {
      const lines = headline.querySelectorAll('.line-inner');
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.style.transform = 'translateY(0)';
          line.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        }, 120 + i * 130);
      });
    }
  };

  if (loader && loaderNum && loaderBar) {
    let currentPct = 0;
    const targetPct = 100;
    const duration = 1100; // 1.1s total smooth build
    const startTime = performance.now();

    const statusMap = [
      { at: 0,  text: "INITIALIZING CORE PIPELINE..." },
      { at: 28, text: "COMPILING DISTRIBUTED STATE..." },
      { at: 62, text: "CALIBRATING MOTION ENGINE..." },
      { at: 92, text: "SYSTEM OPERATIONAL" }
    ];

    const updateLoader = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quad ease-out for snappy start, smooth landing
      const ease = 1 - Math.pow(1 - progress, 3);
      currentPct = Math.floor(ease * targetPct);

      loaderNum.textContent = currentPct < 10 ? '0' + currentPct : currentPct;
      loaderBar.style.width = currentPct + '%';

      // Update status message
      for (let i = statusMap.length - 1; i >= 0; i--) {
        if (currentPct >= statusMap[i].at) {
          if (loaderStatus && loaderStatus.textContent !== statusMap[i].text) {
            loaderStatus.textContent = statusMap[i].text;
          }
          break;
        }
      }

      if (progress < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        loaderNum.textContent = '100';
        loaderBar.style.width = '100%';
        if (loaderTag) loaderTag.textContent = '[ READY ]';

        // Step 1: Content fade out
        setTimeout(() => {
          loader.classList.add('fade-content');
        }, 120);

        // Step 2: Shutter slides upward, triggering hero entrance
        setTimeout(() => {
          loader.classList.add('shutter-exit');
          triggerHeroEntrance();
        }, 260);

        // Step 3: Remove from DOM tree
        setTimeout(() => {
          loader.style.display = 'none';
        }, 1150);
      }
    };

    requestAnimationFrame(updateLoader);
  } else {
    triggerHeroEntrance();
  }


  /* ══════════════════════════════════════════════════════════
     1. THEME
  ══════════════════════════════════════════════════════════ */
  const html       = document.documentElement;
  const themeBtn   = document.getElementById('themeToggle');
  const saved      = localStorage.getItem('nk-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  themeBtn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('nk-theme', next);
  });


  /* ══════════════════════════════════════════════════════════
     2. CUSTOM CURSOR — dot with mix-blend-mode:difference
     (Only track position, CSS handles appearance)
  ══════════════════════════════════════════════════════════ */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let cx = -100, cy = -100;

    const move = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
    };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));

    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup',   () => cursor.classList.remove('click'));

    document.querySelectorAll('a, button, .btn, .project-item, .tech-tag, .skill-pill, input, textarea, .cred-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }


  /* ══════════════════════════════════════════════════════════
     3. SCROLL PROGRESS BAR
  ══════════════════════════════════════════════════════════ */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }


  /* ══════════════════════════════════════════════════════════
     4. STICKY HEADER
  ══════════════════════════════════════════════════════════ */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }


  /* ══════════════════════════════════════════════════════════
     5. MOBILE MENU
  ══════════════════════════════════════════════════════════ */
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle?.addEventListener('click', () => mobileMenu?.classList.toggle('open'));
  document.querySelectorAll('.mobile-nav-link').forEach(l =>
    l.addEventListener('click', () => mobileMenu?.classList.remove('open'))
  );


  /* ══════════════════════════════════════════════════════════
     6. SMOOTH SCROLL
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 70,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ══════════════════════════════════════════════════════════
     7. SCROLL SPY
  ══════════════════════════════════════════════════════════ */
  const sections  = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    sections.forEach(s => {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        navItems.forEach(n => {
          n.classList.remove('active');
          if (n.getAttribute('href') === `#${s.id}`) n.classList.add('active');
        });
      }
    });
  }, { passive: true });


  /* ══════════════════════════════════════════════════════════
     8. HERO HEADLINE
     Line reveal is orchestrated by triggerHeroEntrance() 
     synchronized with shutter lift
  ══════════════════════════════════════════════════════════ */


  /* ══════════════════════════════════════════════════════════
     9. COUNTER ANIMATION — smooth count-up for hero metrics
  ══════════════════════════════════════════════════════════ */
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  const countUp = () => {
    if (counted) return;
    counted = true;

    counters.forEach(el => {
      const end      = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0');
      const dur      = 1800;
      const start    = performance.now();

      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        // Ease-out quart
        const ease = 1 - Math.pow(1 - t, 4);
        el.textContent = decimals ? (end * ease).toFixed(decimals) : Math.floor(end * ease);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = decimals ? end.toFixed(decimals) : end;
      };

      requestAnimationFrame(step);
    });
  };

  const dock = document.querySelector('.metrics-dock');
  if (dock && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) { countUp(); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(dock);
  } else {
    countUp();
  }


  /* ══════════════════════════════════════════════════════════
     10. SCROLL REVEAL — IntersectionObserver
  ══════════════════════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          reveal.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal], [data-stagger]').forEach(el => reveal.observe(el));
  } else {
    document.querySelectorAll('[data-reveal], [data-stagger]').forEach(el => el.classList.add('revealed'));
  }


  /* ══════════════════════════════════════════════════════════
     11. 3D TILT ON PROJECT ITEMS
     Subtle perspective tilt — feels physical and analog.
     Max 4 degrees rotation. Applied only on desktop.
  ══════════════════════════════════════════════════════════ */
  if (window.matchMedia('(hover: hover) and (min-width: 769px)').matches) {
    document.querySelectorAll('.project-item').forEach(card => {
      const MAX = 4; // max degrees

      card.addEventListener('mousemove', (e) => {
        const r  = card.getBoundingClientRect();
        const x  = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        const y  = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const rx = -(x * MAX);
        const ry =   y * MAX;
        card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
        card.style.transform  = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        setTimeout(() => card.style.transition = '', 600);
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }


  /* ══════════════════════════════════════════════════════════
     12. MAGNETIC BUTTONS — Primary CTA only
     Buttons are attracted toward the cursor — physical feel.
  ══════════════════════════════════════════════════════════ */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      const PULL = 0.3;

      btn.addEventListener('mousemove', (e) => {
        const r  = btn.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = (e.clientX - cx) * PULL;
        const dy = (e.clientY - cy) * PULL;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        btn.style.transform  = '';
        setTimeout(() => btn.style.transition = '', 500);
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'none';
      });
    });
  }


  /* ══════════════════════════════════════════════════════════
     13. PR ROWS — Staggered slide-in from left
  ══════════════════════════════════════════════════════════ */
  const prContainer = document.querySelector('.pr-ledger');
  if (prContainer && 'IntersectionObserver' in window) {
    const prRows = prContainer.querySelectorAll('.pr-ledger-row');

    // Set initial state
    prRows.forEach(row => {
      row.style.opacity   = '0';
      row.style.transform = 'translateX(-12px)';
    });

    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) {
        prRows.forEach((row, i) => {
          setTimeout(() => {
            row.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
            row.style.opacity   = '1';
            row.style.transform = 'translateX(0)';
          }, i * 60);
        });
        obs.disconnect();
      }
    }, { threshold: 0.1 }).observe(prContainer);
  }


  /* ══════════════════════════════════════════════════════════
     14. SKILLS TABLE ROWS — Animate in
  ══════════════════════════════════════════════════════════ */
  const skillsTable = document.querySelector('.skills-table');
  if (skillsTable && 'IntersectionObserver' in window) {
    const rows = skillsTable.querySelectorAll('.skills-row');
    rows.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(8px)'; });

    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) {
        rows.forEach((r, i) => {
          setTimeout(() => {
            r.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            r.style.opacity    = '1';
            r.style.transform  = 'translateY(0)';
          }, i * 50);
        });
        obs.disconnect();
      }
    }, { threshold: 0.1 }).observe(skillsTable);
  }


  /* ══════════════════════════════════════════════════════════
     15. MARQUEE DUPLICATE for seamless loop
  ══════════════════════════════════════════════════════════ */
  const track = document.querySelector('.affiliations-track');
  if (track) {
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentNode.appendChild(clone);
  }


  /* ══════════════════════════════════════════════════════════
     16. EMAIL COPY + TOAST
  ══════════════════════════════════════════════════════════ */
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let   toastTimer;

  const showToast = (msg) => {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.dataset.copy || 'nikhilkumarpanigrahi29@gmail.com';
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
          .then(() => showToast('Email copied → ' + email))
          .catch(() => showToast(email));
      } else {
        const el = Object.assign(document.createElement('textarea'), {
          value: email, style: 'position:fixed;opacity:0'
        });
        document.body.appendChild(el);
        el.select();
        try { document.execCommand('copy'); showToast('Copied: ' + email); }
        catch { showToast(email); }
        document.body.removeChild(el);
      }
    });
  });


  /* ══════════════════════════════════════════════════════════
     17. BACK TO TOP
  ══════════════════════════════════════════════════════════ */
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ══════════════════════════════════════════════════════════
     18. CONTACT FORM
  ══════════════════════════════════════════════════════════ */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn  = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

      const nameVal    = form.querySelector('#name')?.value.trim() || '';
      const emailVal   = form.querySelector('#email')?.value.trim() || '';
      const subjectVal = form.querySelector('#subject')?.value.trim() || '';
      const messageVal = form.querySelector('#message')?.value.trim() || '';

      const fallbackToMailto = () => {
        showToast('Opening default email client...');
        const mailtoUrl = `mailto:nikhilkumarpanigrahi29@gmail.com?subject=${encodeURIComponent(subjectVal || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Nikhil,\n\n${messageVal}\n\nFrom: ${nameVal} (${emailVal})`)}`;
        setTimeout(() => { window.location.href = mailtoUrl; }, 600);
      };

      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 
            'Accept': 'application/json' 
          }
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && (data.success === 'true' || data.success === true)) {
          showToast('Message sent! I\'ll get back to you shortly.');
          form.reset();
        } else if (data.message && data.message.includes('Activation')) {
          showToast('Form verification sent to Gmail. Click once to activate!');
          form.reset();
        } else {
          fallbackToMailto();
        }
      } catch {
        fallbackToMailto();
      } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
      }
    });
  }


  /* ══════════════════════════════════════════════════════════
     19. PARALLAX HERO — subtle movement on scroll (orbs removed)
     Instead, shift the headline slightly on scroll for depth.
  ══════════════════════════════════════════════════════════ */
  const heroContent = document.querySelector('.hero-content');
  const heroSidebar = document.querySelector('.hero-sidebar');

  if (heroContent && heroSidebar && window.matchMedia('(min-width: 1025px)').matches) {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 600) return; // Stop after hero
      const dy = y * 0.06;
      heroContent.style.transform = `translateY(${dy}px)`;
      heroSidebar.style.transform = `translateY(${dy * 0.5}px)`;
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* ══════════════════════════════════════════════════════════
     20. TECH TAGS — Sequential color on hover (subtle)
  ══════════════════════════════════════════════════════════ */
  // Already handled in CSS with :hover selectors — no JS needed.
  // The .tech-tag:hover changes color in CSS.
  // Here we add a subtle ripple on click.
  document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.transform = 'scale(0.92)';
      setTimeout(() => tag.style.transform = '', 150);
    });
  });

}); // end DOMContentLoaded
