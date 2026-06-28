/* =============================================
   BIRTHDAY WEBSITE — script.js
   ============================================= */

/* ============ STARS CANVAS ============ */
(function initStars() {
  const canvas = document.getElementById('starCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    buildStars();
  }

  function buildStars() {
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.012 + 0.004,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function drawStars(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const alpha = (Math.sin(t * s.speed + s.phase) + 1) / 2 * 0.9 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(drawStars);
})();


/* ============ FINAL SECTION STARS ============ */
(function initFinalStars() {
  const canvas = document.getElementById('finalCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.01 + 0.003,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const alpha = (Math.sin(t * s.speed + s.phase) + 1) / 2 * 0.8 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();


/* ============ PETALS ============ */
(function spawnPetals() {
  const container = document.getElementById('petals');
  const PETAL_COUNT = 20;

  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const dur = 6 + Math.random() * 8;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${8 + Math.random() * 10}px;
      height: ${12 + Math.random() * 10}px;
      animation-duration: ${dur}s;
      animation-delay: ${-Math.random() * dur}s;
    `;
    container.appendChild(p);
  }
})();


/* ============ FLOATING HEARTS (hero) ============ */
(function spawnHearts() {
  const container = document.getElementById('hearts');
  const EMOJIS = ['❤️','💖','💗','💓','🌹','✨'];
  const HEART_COUNT = 15;

  for (let i = 0; i < HEART_COUNT; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const dur = 8 + Math.random() * 10;
    h.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -60px;
      font-size: ${0.8 + Math.random() * 1.2}rem;
      animation-duration: ${dur}s;
      animation-delay: ${-Math.random() * dur}s;
    `;
    container.appendChild(h);
  }
})();


/* ============ FINAL SECTION HEARTS ============ */
(function spawnFinalHearts() {
  const container = document.getElementById('finalHearts');
  const EMOJIS = ['❤️','💖','💗','✨','🌹'];

  for (let i = 0; i < 14; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const dur = 10 + Math.random() * 10;
    h.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -60px;
      font-size: ${0.7 + Math.random() * 1}rem;
      animation-duration: ${dur}s;
      animation-delay: ${-Math.random() * dur}s;
    `;
    container.appendChild(h);
  }
})();


/* ============ MUSIC PLAYER ============ */
const musicBtn  = document.getElementById('musicBtn');
const bgMusic   = document.getElementById('bgMusic');
let playing = false;

musicBtn.addEventListener('click', () => {
  if (playing) {
    bgMusic.pause();
    musicBtn.querySelector('.music-icon').textContent = '♪';
    musicBtn.style.animation = 'none';
  } else {
    bgMusic.play().catch(() => {});
    musicBtn.querySelector('.music-icon').textContent = '❚❚';
    musicBtn.style.animation = 'pulse 2s infinite';
  }
  playing = !playing;
});


/* ============ BEGIN BUTTON ============ */
document.getElementById('beginBtn').addEventListener('click', () => {
  document.getElementById('countdown').scrollIntoView({ behavior: 'smooth' });
  // Auto-play music on first interaction
  if (!playing) {
    bgMusic.play().catch(() => {});
    musicBtn.querySelector('.music-icon').textContent = '❚❚';
    playing = true;
  }
});


/* ============ COUNTDOWN ============ */
(function initCountdown() {
  // Set your target birthday here: YYYY, Month(0-indexed), Day
  const TARGET = new Date(new Date().getFullYear(), 11, 25); // Dec 25 — change this!
  const display = document.getElementById('countdownDisplay');
  const msg     = document.getElementById('birthdayMsg');
  let celebrated = false;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = TARGET - now;

    if (diff <= 0) {
      if (!celebrated) {
        celebrated = true;
        display.classList.add('hidden');
        msg.classList.remove('hidden');
        launchFireworks();
      }
      return;
    }

    const s = Math.floor(diff / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);

    document.getElementById('days').textContent    = pad(d);
    document.getElementById('hours').textContent   = pad(h % 24);
    document.getElementById('minutes').textContent = pad(m % 60);
    document.getElementById('seconds').textContent = pad(s % 60);
  }

  tick();
  setInterval(tick, 1000);
})();


/* ============ FIREWORKS ============ */
function launchFireworks(duration = 5000) {
  const canvas = document.getElementById('fireworksCanvas');
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const COLORS = ['#FF4D6D','#C3A6DC','#E8937C','#FFD6E7','#ffffff','#FFB347'];

  function explode(x, y) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 / 60) * i;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        r: 2 + Math.random() * 2
      });
    }
  }

  let lastBurst = 0;
  const startTime = Date.now();

  function animate(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (t - lastBurst > 400 && Date.now() - startTime < duration) {
      explode(
        80 + Math.random() * (canvas.width - 160),
        80 + Math.random() * (canvas.height * 0.6)
      );
      lastBurst = t;
    }

    particles.forEach((p, i) => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.07; // gravity
      p.alpha -= 0.018;
      if (p.alpha <= 0) { particles.splice(i, 1); return; }
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    if (Date.now() - startTime < duration + 2000) requestAnimationFrame(animate);
    else canvas.style.display = 'none';
  }
  requestAnimationFrame(animate);
}


/* ============ SCROLL REVEAL ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============ GALLERY ============ */
const photos = [
  { src: 'photo1.jpg', caption: 'The beginning of everything ❤️' },
  { src: 'assets/photo2.jpg', caption: 'Your smile lights up every room' },
  { src: 'assets/photo3.jpg', caption: 'Adventures are better with you' },
  { src: 'assets/photo4.jpg', caption: 'Every moment, a treasure' },
  { src: 'assets/photo5.jpg', caption: 'My favorite kind of magic' },
  { src: 'assets/photo6.jpg', caption: 'Here\'s to forever with you 🌹' },
];

const ROTATIONS = [-3, 2, -2, 3, -1.5, 2.5];

const grid = document.getElementById('polaroidGrid');
photos.forEach((ph, i) => {
  const card = document.createElement('div');
  card.className = 'polaroid reveal';
  card.style.setProperty('--rot', `${ROTATIONS[i % ROTATIONS.length]}deg`);
  card.innerHTML = `
    <img src="${ph.src}" alt="${ph.caption}" loading="lazy"
      onerror="this.style.background='linear-gradient(135deg,#c3a6dc44,#ff4d6d33)';this.style.height='180px'"/>
    <p class="pol-caption">${ph.caption}</p>`;
  card.addEventListener('click', () => openLightbox(i));
  grid.appendChild(card);
  revealObserver.observe(card);
});

let currentPhoto = 0;
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCaption= document.getElementById('lbCaption');

function openLightbox(i) {
  currentPhoto = i;
  lbImg.src = photos[i].src;
  lbCaption.textContent = photos[i].caption;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('lbPrev').addEventListener('click', () => {
  currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
  lbImg.src = photos[currentPhoto].src;
  lbCaption.textContent = photos[currentPhoto].caption;
});
document.getElementById('lbNext').addEventListener('click', () => {
  currentPhoto = (currentPhoto + 1) % photos.length;
  lbImg.src = photos[currentPhoto].src;
  lbCaption.textContent = photos[currentPhoto].caption;
});


/* ============ LOVE LETTER ============ */
const LETTER = `My love,

Words feel small for what I feel for you. But I'll try.

You make ordinary days extraordinary just by being in them. Your laugh is my favorite sound. Your heart, the most beautiful thing I've ever known.

On your birthday, I want you to know that every single day with you is a gift I don't take for granted. You make me better — kinder, braver, more alive.

Thank you for choosing me. Thank you for being you.

The world is so lucky you're in it — and I'm the luckiest of all.

Happy Birthday, my love. ❤️`;

const envelope   = document.getElementById('envelope');
const letterCard = document.getElementById('letterCard');
const letterText = document.getElementById('letterText');
let letterOpened = false;

envelope.addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;
  envelope.classList.add('opened');

  setTimeout(() => {
    envelope.style.opacity = '0';
    envelope.style.transform = 'scale(.9)';
    letterCard.classList.remove('hidden');
    typeWriter(LETTER, letterText, 28);
  }, 700);
});

function typeWriter(text, el, speed) {
  let i = 0;
  el.textContent = '';
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}


/* ============ GIFT BOX ============ */
const giftBox     = document.getElementById('giftBox');
const giftHint    = document.getElementById('giftHint');
const giftMessage = document.getElementById('giftMessage');
const confettiCanvas = document.getElementById('confettiCanvas');
let giftOpened = false;

giftBox.addEventListener('click', () => {
  if (giftOpened) return;
  giftOpened = true;
  giftBox.classList.add('opened');
  giftHint.classList.add('hidden');

  setTimeout(() => {
    giftMessage.classList.remove('hidden');
    launchConfetti();
  }, 800);
});

function launchConfetti() {
  confettiCanvas.classList.remove('hidden');
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -20,
    r: 4 + Math.random() * 6,
    color: ['#FF4D6D','#C3A6DC','#E8937C','#FFD6E7','#C9A08B','#6B3FA0'][Math.floor(Math.random()*6)],
    vx: (Math.random() - .5) * 4,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * 360,
    rotV: (Math.random() - .5) * 8
  }));

  const start = Date.now();
  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.rotV;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    });
    if (Date.now() - start < 4000) requestAnimationFrame(draw);
    else confettiCanvas.classList.add('hidden');
  }
  requestAnimationFrame(draw);
}


/* ============ BIRTHDAY CAKE ============ */
const candles    = document.querySelectorAll('.candle');
const cakeHint   = document.getElementById('cakeHint');
const wishMsg    = document.getElementById('wishMsg');
let litCount     = candles.length;

candles.forEach(c => {
  c.addEventListener('click', () => {
    if (c.dataset.lit === 'false') return;
    c.classList.add('out');
    c.dataset.lit = 'false';
    litCount--;

    if (litCount === 0) {
      cakeHint.classList.add('hidden');
      wishMsg.classList.remove('hidden');
      launchFireworks(3000);
    }
  });
});
