/* ── PRELOADER ───────────────────────────────────────────── */
(function() {
  const lines = [
    { p:'$', cls:'txt', t:'sudo apt-get install motivation' },
    { p:'✘', cls:'err', t:"E: Package 'motivation' not found 💀" },
    { p:'$', cls:'txt', t:'google "how to center a div"' },
    { p:'✔', cls:'ok',  t:'4,820,000 results. Still confused.' },
    { p:'$', cls:'txt', t:'git commit -m "fix: fixed the fix I fixed"' },
    { p:'✔', cls:'ok',  t:'1 file changed, ∞ bugs introduced' },
    { p:'$', cls:'txt', t:'rm -rf node_modules && npm install' },
    { p:'⚡', cls:'val', t:'847 MB downloaded. Planet Earth: 🙂' },
  ];
  const cmd    = 'python manage.py runserver  # 🤞';
  const linesEl = document.getElementById('plLines');
  const typingEl = document.getElementById('plTyping');

  lines.forEach((l, i) => {
    setTimeout(() => {
      const d = document.createElement('div');
      d.className = 'pl-line';
      d.innerHTML = `<span class="p">${l.p}</span><span class="${l.cls}">${l.t}</span>`;
      linesEl.appendChild(d);
      linesEl.scrollTop = linesEl.scrollHeight;
    }, i * 170);
  });

  let ci = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      typingEl.textContent = cmd.slice(0, ++ci);
      if (ci >= cmd.length) clearInterval(iv);
    }, 40);
  }, lines.length * 170);

  window.addEventListener('load', () => {
    const total = lines.length * 170 + cmd.length * 40 + 500;
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), Math.min(total, 3000));
  });
})();

/* ── CURSOR ──────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .proj-card, .oss-card, .ach-card, .tl-card, .sg, .pf-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

/* ── SCROLL PROGRESS ─────────────────────────────────────── */
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  scrollBar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
}, { passive: true });

/* ── BACK TO TOP ─────────────────────────────────────────── */
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => btt.classList.toggle('show', scrollY > 500), { passive: true });
btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ── NAVBAR ──────────────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', scrollY > 40);
  updateActive();
}, { passive: true });

function openNav(state) {
  navToggle.classList.toggle('open', state);
  navLinks.classList.toggle('open', state);
  navOverlay.classList.toggle('open', state);
  document.body.style.overflow = state ? 'hidden' : '';
}
navToggle.addEventListener('click', () => openNav(!navLinks.classList.contains('open')));
navOverlay.addEventListener('click', () => openNav(false));
navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => openNav(false)));

function updateActive() {
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (scrollY >= s.offsetTop - 150) cur = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(l =>
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur)
  );
}

/* ── TYPEWRITER ──────────────────────────────────────────── */
const roles = ['Backend Developer','Python Engineer','Django / FastAPI Dev','AI/ML Enthusiast','Open Source Contributor'];
let ri = 0, ci = 0, del = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const w = roles[ri];
  if (del) {
    tw.textContent = w.slice(0, ci--);
    if (ci < 0) { del = false; ri = (ri + 1) % roles.length; return setTimeout(typeLoop, 400); }
    return setTimeout(typeLoop, 55);
  }
  tw.textContent = w.slice(0, ci++);
  if (ci > w.length) { del = true; return setTimeout(typeLoop, 2000); }
  setTimeout(typeLoop, 95);
}
setTimeout(typeLoop, 1800);

/* ── COUNTER ─────────────────────────────────────────────── */
function animCount(el) {
  const target = parseFloat(el.dataset.count);
  const dec    = parseInt(el.dataset.decimal || '0');
  const suf    = el.dataset.suffix || '';
  const dur    = 1600;
  const t0     = performance.now();
  function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (dec ? (e * target).toFixed(dec) : Math.floor(e * target)) + suf;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = (dec ? target.toFixed(dec) : target) + suf;
  }
  requestAnimationFrame(step);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revObs.observe(el));

/* ── TOAST ───────────────────────────────────────────────── */
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastMsg.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── COPY EMAIL ──────────────────────────────────────────── */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const i = btn.querySelector('i');
      if (i) { i.className = 'fas fa-check'; setTimeout(() => i.className = 'fas fa-copy', 2000); }
      showToast('Email copied!');
    });
  });
});

/* ── CONTACT FORM ────────────────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  const fields = [
    { id:'cf-name',    err:'err-name',    label:'Name',    min:2 },
    { id:'cf-email',   err:'err-email',   label:'Email',   email:true },
    { id:'cf-subject', err:'err-subject', label:'Subject', min:3 },
    { id:'cf-message', err:'err-message', label:'Message', min:10 },
  ];
  function validate(f) {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.err);
    const val = el.value.trim();
    let msg = '';
    if (!val) msg = `${f.label} is required.`;
    else if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Enter a valid email.';
    else if (f.min && val.length < f.min) msg = `${f.label} must be at least ${f.min} chars.`;
    err.textContent = msg;
    el.closest('.fld').classList.toggle('has-error', !!msg);
    el.closest('.fld').classList.toggle('is-valid', !msg);
    return !msg;
  }
  fields.forEach(f => document.getElementById(f.id)?.addEventListener('blur', () => validate(f)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!fields.every(validate)) return showToast('Please fix the errors first.');
    const n = document.getElementById('cf-name').value.trim();
    const em = document.getElementById('cf-email').value.trim();
    const s = document.getElementById('cf-subject').value.trim();
    const m = document.getElementById('cf-message').value.trim();
    const btn = document.getElementById('submitBtn');
    btn.querySelector('.btn-txt').textContent = 'Opening mail…';
    setTimeout(() => {
      window.location.href = `mailto:nikhilkumarpanigrahi29@gmail.com?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(`From: ${n} (${em})\n\n${m}`)}`;
      btn.querySelector('.btn-txt').textContent = 'Send Message';
      showToast('Mail client opened!');
      form.reset();
      fields.forEach(f => {
        document.getElementById(f.id)?.closest('.fld')?.classList.remove('has-error','is-valid');
        document.getElementById(f.err && f.err).textContent = '';
      });
    }, 600);
  });
}

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});
