// ── Particles ──────────────────────────────────────────────────────────────────
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 40; i++) {
    particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -Math.random() * 0.5 - 0.1,
        o:  Math.random() * 0.5 + 0.2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,67,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();


// ── Lightning ───────────────────────────────────────────────────────────────────
setInterval(() => {
    if (Math.random() > 0.7) {
        const el = document.getElementById('lightning');
        el.classList.add('flash');
        setTimeout(() => el.classList.remove('flash'), 300);
    }
}, 4000);


// ── Selection logic ─────────────────────────────────────────────────────────────
let selectedHouse    = '';
let selectedWand     = '';
let selectedPatronus = '';

document.getElementById('house-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-house]');
    if (!btn) return;
    document.querySelectorAll('[data-house]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedHouse = btn.dataset.house;
});

document.getElementById('wand-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-wand]');
    if (!btn) return;
    document.querySelectorAll('[data-wand]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedWand = btn.dataset.wand;
});

document.getElementById('patronus-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-patronus]');
    if (!btn) return;
    document.querySelectorAll('[data-patronus]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedPatronus = btn.dataset.patronus;
});


// ── Form submit ─────────────────────────────────────────────────────────────────
document.getElementById('admission-form').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('fname').value.trim();
    if (!name) return;

    const houses    = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
    const wands     = ['Phoenix Feather', 'Dragon Heartstring', 'Unicorn Hair'];
    const patronuses = ['Wolf', 'Eagle', 'Otter', 'Horse', 'Fox', 'Phoenix'];
    const levels    = ['Outstanding', 'Exceeds Expectations', 'Remarkable', 'Extraordinary'];

    const house    = houses[Math.floor(Math.random() * houses.length)];
    const wand     = wands[Math.floor(Math.random() * wands.length)];
    const patronus = patronuses[Math.floor(Math.random() * patronuses.length)];
    const level    = levels[Math.floor(Math.random() * levels.length)];

    // Show sorting screen
    document.getElementById('main-content').style.display = 'none';
    const sortingScreen = document.getElementById('sorting-screen');
    sortingScreen.classList.remove('hidden');
    sortingScreen.classList.add('flex');
   

    setTimeout(() => {
        // Hide sorting screen
        sortingScreen.classList.add('hidden');
        sortingScreen.classList.remove('flex');

        // Populate result
        document.getElementById('res-name').textContent    = name;
        document.getElementById('res-house').textContent   = house;
        document.getElementById('res-wand').textContent    = wand;
        document.getElementById('res-patronus').textContent = patronus;
        document.getElementById('res-level').textContent   = level;

        const houseColors = {
            Gryffindor: '#ae0001',
            Slytherin:  '#2a623d',
            Ravenclaw:  '#222f5b',
            Hufflepuff: '#f0c75e'
        };
        document.getElementById('res-house').style.color = houseColors[house] || '#d4a843';

        // Show success screen
        const successScreen = document.getElementById('success-screen');
        successScreen.classList.remove('hidden');
        successScreen.classList.add('flex');
    }, 4000);
});



