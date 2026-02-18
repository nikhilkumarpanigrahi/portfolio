/* ═══════════════════════════════════════════════ */
/*  NIKHIL KUMAR PANIGRAHI — PORTFOLIO SCRIPTS    */
/* ═══════════════════════════════════════════════ */

// ============================================
// Preloader
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAnimations();
    }, 2200);
});
document.body.style.overflow = 'hidden';

// ============================================
// Custom Cursor
// ============================================
const cursorGlow = document.getElementById('cursorGlow');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }
});

function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactives = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .achievement-card, .aspiration-card, .contact-item');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot && cursorDot.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorDot && cursorDot.classList.remove('hovered'));
    });
});

// ============================================
// Particle System
// ============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '108, 99, 255' : '0, 212, 255';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================
// Navbar
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightNavLink();
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Highlight active section
function highlightNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
        }
    });
}

// ============================================
// Typewriter Effect
// ============================================
const typewriterEl = document.getElementById('typewriter');
const roles = [
    'Aspiring Software Engineer',
    'Backend Developer',
    'AI / ML Enthusiast',
    'Open Source Contributor',
    'Problem Solver',
    'Competitive Programmer'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2200;
        isDeleting = true;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }
    setTimeout(typeWriter, speed);
}

// ============================================
// Scroll Animations
// ============================================
function initAnimations() {
    typeWriter();
    observeAnimations();
    observeTitleWords();
    observeTextAnimations();
    animateNameLetters();
}

// General scroll-triggered animations
function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Word-by-word title animation
function observeTitleWords() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const words = entry.target.querySelectorAll('.title-word');
                words.forEach((word, i) => {
                    setTimeout(() => word.classList.add('visible'), i * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
}

// Text reveal, split-text, and fade-in-text animations
function observeTextAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.text-reveal, .split-text, .fade-in-text').forEach(el => observer.observe(el));
}

// Animated name letters on load
function animateNameLetters() {
    const letters = document.querySelectorAll('.name-letter');
    letters.forEach((letter, i) => {
        letter.style.opacity = '0';
        letter.style.transform = 'translateY(30px)';
        letter.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 300);
    });
}

// ============================================
// Skill Bars Animation
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach((bar, i) => {
                setTimeout(() => bar.classList.add('animated'), i * 150);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// ============================================
// Aspiration Status Bars
// ============================================
const aspirationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.status-fill');
            if (fill) {
                setTimeout(() => fill.classList.add('animated'), 300);
            }
            aspirationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.aspiration-card').forEach(card => aspirationObserver.observe(card));

// ============================================
// Count Up Animation
// ============================================
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * target;
                el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => countObserver.observe(el));

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const mailtoBody = `Hi Nikhil,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}`;
    const mailtoLink = `mailto:nikhilkumarpanigrahi29@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
    window.open(mailtoLink, '_self');

    const btn = contactForm.querySelector('.btn-primary');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span>Opening Email Client...</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    btn.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.background = '';
        btn.style.boxShadow = '';
    }, 3000);
});

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length <= 1) return; // skip bare '#' links
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// ============================================
// Tilt Effect on Cards
// ============================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .aspiration-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
document.addEventListener('DOMContentLoaded', initTiltEffect);

// ============================================
// Magnetic Buttons
// ============================================
function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}
document.addEventListener('DOMContentLoaded', initMagneticButtons);
