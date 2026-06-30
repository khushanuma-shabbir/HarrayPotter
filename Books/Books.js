// Initialize lucide icons
lucide.createIcons();

// Particles
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;animation-delay:${Math.random()*5}s;animation-duration:${3+Math.random()*4}s;`;
    particlesEl.appendChild(p);
}

// Cursor sparkle trail
document.addEventListener('mousemove', (e) => {
    const s = document.createElement('div');
    s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;background:#f0d77b;border-radius:50%;pointer-events:none;z-index:9999;opacity:1;transition:all 0.6s;`;
    document.body.appendChild(s);
    requestAnimationFrame(() => { s.style.opacity = '0'; s.style.transform = 'scale(0) translateY(-20px)'; });
    setTimeout(() => s.remove(), 600);
});

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.count;
            let current = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(interval); }
                el.textContent = current + '+';
            }, 40);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => observer.observe(c));

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.glass-card');
const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in'); fadeObs.unobserve(e.target); } });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObs.observe(el));
