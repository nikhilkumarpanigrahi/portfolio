/* ============================================================
   NIKHIL KUMAR PANIGRAHI — PORTFOLIO SCRIPT
   ============================================================ */


/* ── PRELOADER TERMINAL ──────────────────────────────────── */
(function() {
  const completedLines = [
    { prompt:'$',  cls:'out-txt', text:'sudo apt-get install motivation' },
    { prompt:'✘',  cls:'out-err', text:'E: Package \'motivation\' has no installation candidate 💀' },
    { prompt:'$',  cls:'out-txt', text:'google "how to center a div" (again)' },
    { prompt:'✔',  cls:'out-ok',  text:'Found 4,820,000 results. Still confused.' },
    { prompt:'$',  cls:'out-txt', text:'git commit -m "fix: fixed the fix I fixed yesterday"' },
    { prompt:'✔',  cls:'out-ok',  text:'1 file changed, ∞ bugs introduced' },
    { prompt:'$',  cls:'out-txt', text:'rm -rf node_modules && npm install' },
    { prompt:'⚡',  cls:'out-val', text:'Downloaded 847 MB. You\'re welcome, planet Earth.' },
  ];
  const finalCmd = 'python manage.py start portfolio  # fingers crossed 🤞';

  const plLines  = document.getElementById('plLines');
  const plTyping = document.getElementById('plTyping');

  function addLine(cfg) {
    const div = document.createElement('div');
    div.className = 'pl-line';
    div.innerHTML = `<span class="prompt">${cfg.prompt}</span><span class="${cfg.cls}">${cfg.text}</span>`;
    plLines.appendChild(div);
    plLines.scrollTop = plLines.scrollHeight;
  }

  completedLines.forEach((l, i) => setTimeout(() => addLine(l), i * 160));

  // Type the final command
  const startType = completedLines.length * 160;
  let ci = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      plTyping.textContent = finalCmd.slice(0, ++ci);
      if (ci >= finalCmd.length) clearInterval(iv);
    }, 38);
  }, startType);

  window.addEventListener('load', () => {
    const total = startType + finalCmd.length * 38 + 400;
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden');
      initHeroCanvas();
    }, Math.min(total, 3200));
  });
})();

/* ── SCROLL PROGRESS ─────────────────────────────────────── */
const scrollBar = document.getElementById('scrollBar');
function updateScrollBar() {
  const scrolled = window.scrollY;
  const max      = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateScrollBar, { passive: true });

/* ── BACK TO TOP ─────────────────────────────────────────── */
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  btt.classList.toggle('show', window.scrollY > 500);
}, { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── CUSTOM CURSOR ───────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a, button, .stag, .proj-card, .oss-card, .ac, .ccard').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

/* ── HERO PARTICLE CANVAS ────────────────────────────────── */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  let mouseX = -9999, mouseY = -9999;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

  const COLORS = ['#7C3AED', '#F43F5E', '#D97706', '#0D9488', '#059669'];
  const COUNT  = 70;

  function mkParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .6,
      vy: (Math.random() - .5) * .6,
      r:  Math.random() * 2.5 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }
  particles = Array.from({ length: COUNT }, mkParticle);

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update & draw particles
    particles.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * 0.4;
        p.vy += (dy / dist) * force * 0.4;
      }
      // Damping
      p.vx *= 0.98; p.vy *= 0.98;
      p.x += p.vx; p.y += p.vy;
      // Wrap
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.45;
      ctx.fill();
    });

    // Draw connecting lines
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = a.color;
          ctx.globalAlpha = (1 - d / 130) * 0.18;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── NAVBAR ──────────────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
}, { passive: true });

function toggleNav(open) {
  navToggle.classList.toggle('open', open);
  navLinks.classList.toggle('open', open);
  navOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

navToggle.addEventListener('click', () => toggleNav(!navLinks.classList.contains('open')));
navOverlay.addEventListener('click', () => toggleNav(false));
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => toggleNav(false));
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

/* ── TYPEWRITER ──────────────────────────────────────────── */
const roles = [
  'Backend Developer',
  'Python Engineer',
  'Django / FastAPI Dev',
  'AI/ML Enthusiast',
  'Open Source Contributor',
  'Full-Stack Builder',
];
let rIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  if (!tw) return;
  const word = roles[rIdx];
  if (deleting) {
    tw.textContent = word.substring(0, cIdx--);
    if (cIdx < 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 55);
  } else {
    tw.textContent = word.substring(0, cIdx++);
    if (cIdx > word.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
    setTimeout(typeLoop, 95);
  }
}
setTimeout(typeLoop, 1800);

/* ── COUNTER ANIMATION ───────────────────────────────────── */
function animateCounter(el) {
  const target   = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimal || '0');
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    const v = e * target;
    el.textContent = (decimals > 0 ? v.toFixed(decimals) : Math.floor(v)) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── SQUIGGLE ANIMATIONS ─────────────────────────────────── */
const squiggleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sqp').forEach(p => p.classList.add('animated'));
      squiggleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });
document.querySelectorAll('.section-top').forEach(el => squiggleObserver.observe(el));

/* ── TIMELINE FILL ───────────────────────────────────────── */
const tlFill = document.getElementById('tlFill');
if (tlFill) {
  const tlWrap = tlFill.closest('.tl-wrap');
  const tlTrack = document.querySelector('.tl-track');

  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rect  = tlWrap.getBoundingClientRect();
        const vH    = window.innerHeight;
        const ratio = Math.min(1, Math.max(0, (vH - rect.top) / rect.height));
        tlFill.style.height = (ratio * 100) + '%';
      }
    });
  }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) });

  function updateTlFill() {
    if (!tlWrap) return;
    const rect  = tlWrap.getBoundingClientRect();
    const vH    = window.innerHeight;
    const ratio = Math.min(1, Math.max(0, (vH - rect.top) / (rect.height + rect.top - vH * 0.2)));
    tlFill.style.height = Math.min(100, Math.max(0, ratio * 120)) + '%';
  }
  window.addEventListener('scroll', updateTlFill, { passive: true });
}

/* ── SKILL STAGGER ───────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.stag');
      tags.forEach((tag, i) => {
        tag.style.opacity    = '0';
        tag.style.transform  = 'scale(0.7) rotate(-5deg)';
        tag.style.transition = `opacity 0.4s ${i * 0.07}s cubic-bezier(.34,1.56,.64,1), transform 0.4s ${i * 0.07}s cubic-bezier(.34,1.56,.64,1)`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          tag.style.opacity   = '1';
          tag.style.transform = 'scale(1) rotate(0deg)';
        }));
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sg').forEach(g => skillObserver.observe(g));

/* ── 3D CARD TILT ────────────────────────────────────────── */
document.querySelectorAll('.proj-card, .oss-card, .ac, .tl-card, .sg').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const dx   = (e.clientX - rect.left) / rect.width  - .5;
    const dy   = (e.clientY - rect.top)  / rect.height - .5;
    card.style.transform = `translate(-2px,-2px) perspective(600px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── MAGNETIC BUTTONS ────────────────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.22;
    const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.22;
    btn.style.transform = `translate(calc(-2px + ${dx}px), calc(-2px + ${dy}px))`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ── TOAST ───────────────────────────────────────────────── */
const toast    = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
let toastTimer = null;

function showToast(msg, isError = false) {
  if (toastTimer) clearTimeout(toastTimer);
  toastMsg.textContent = msg;
  toast.classList.toggle('toast-error', isError);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── COPY TO CLIPBOARD ───────────────────────────────────── */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Email copied to clipboard!');
      const icon = btn.querySelector('i');
      if (icon) { icon.className = 'fas fa-check'; setTimeout(() => { icon.className = 'fas fa-copy'; }, 2000); }
    }).catch(() => showToast('Could not copy — please copy manually.', true));
  });
});

/* ── CONTACT FORM VALIDATION ─────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const fields = [
    { id: 'cf-name',    errId: 'err-name',    label: 'Name',    min: 2 },
    { id: 'cf-email',   errId: 'err-email',   label: 'Email',   isEmail: true },
    { id: 'cf-subject', errId: 'err-subject', label: 'Subject', min: 3 },
    { id: 'cf-message', errId: 'err-message', label: 'Message', min: 10 },
  ];

  function validateField(cfg) {
    const input = document.getElementById(cfg.id);
    const err   = document.getElementById(cfg.errId);
    const wrap  = input.closest('.fld');
    const val   = input.value.trim();
    let msg = '';
    if (!val) {
      msg = `${cfg.label} is required.`;
    } else if (cfg.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      msg = 'Please enter a valid email address.';
    } else if (cfg.min && val.length < cfg.min) {
      msg = `${cfg.label} must be at least ${cfg.min} characters.`;
    }
    err.textContent = msg;
    wrap.classList.toggle('has-error', !!msg);
    wrap.classList.toggle('is-valid', !msg);
    return !msg;
  }

  // Live validation on blur
  fields.forEach(cfg => {
    const input = document.getElementById(cfg.id);
    if (input) input.addEventListener('blur', () => validateField(cfg));
  });

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const allValid = fields.every(cfg => validateField(cfg));
    if (!allValid) { showToast('Please fix the errors before submitting.', true); return; }

    const submitBtn = document.getElementById('submitBtn');
    const btnTxt    = submitBtn.querySelector('.btn-txt');
    submitBtn.classList.add('loading');
    btnTxt.textContent = 'Sending…';

    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const mailto  = `mailto:nikhilkumarpanigrahi29@gmail.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

    setTimeout(() => {
      window.location.href = mailto;
      submitBtn.classList.remove('loading');
      btnTxt.textContent = 'Send Message';
      showToast('Message client opened! Talk soon 🤝');
      contactForm.reset();
      fields.forEach(cfg => {
        const wrap = document.getElementById(cfg.id)?.closest('.fld');
        if (wrap) { wrap.classList.remove('has-error', 'is-valid'); }
        const err = document.getElementById(cfg.errId);
        if (err) err.textContent = '';
      });
    }, 800);
  });
}

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── FEATURED PROJECT PARALLAX ───────────────────────────── */
const featProj = document.querySelector('.proj-featured');
if (featProj) {
  window.addEventListener('scroll', () => {
    const rect = featProj.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.innerHeight - rect.top) * 0.03;
      const inner  = featProj.querySelector('.pf-inner');
      if (inner) inner.style.transform = `translateY(${-offset}px)`;
    }
  }, { passive: true });
}
