const flapTop = document.querySelector('.flap-top');
const flapBottom = document.querySelector('.flap-bottom');
const card = document.getElementById('card');
const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');

let isOpen = false;

openBtn.addEventListener('click', () => {
  if (!isOpen) {
    // Abrir cartinha
    startFireworks(); // Iniciar fogos de artifício

    // 💓 Vibração no celular ao abrir
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 150]); // vibra - pausa - vibra mais forte
    }

    flapTop.style.transform = 'rotateX(-180deg)';
    flapBottom.style.transform = 'rotateX(180deg)';
    
    setTimeout(() => {
      card.classList.add('show');
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }, 800);

    envelope.classList.add('open');
    openBtn.innerText = 'Fechar Cartinha 💌';
    isOpen = true;
  } else {
    // Fechar cartinha
    stopFireworks(); // Parar fogos de artifício
    flapTop.style.transform = 'rotateX(0deg)';
    flapBottom.style.transform = 'rotateX(0deg)';

    card.classList.remove('show');
    card.style.transform = 'translateY(100%)';
    card.style.opacity = '0';

    envelope.classList.remove('open');
    openBtn.innerText = 'Abrir Cartinha';
    isOpen = false;
  }
});

// Função de fogos
let fireworkInterval = null;
let fireworkAnimationFrame = null;
let particles = [];

function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework() {
    const x = random(0, w);
    const y = random(0, h / 2);
    const count = 150; // Mais partículas = mais intensidade
    for (let i = 0; i < count; i++) {
      particles.push({
        x,
        y,
        speed: random(2, 7),
        angle: random(0, Math.PI * 2),
        radius: random(2, 4),
        alpha: 1,
        decay: random(0.01, 0.02),
        color: `hsl(${random(0, 360)}, 100%, 60%)`
      });
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed + 1;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    fireworkAnimationFrame = requestAnimationFrame(updateParticles);
  }

  fireworkInterval = setInterval(createFirework, 200); // Intervalo mais rápido = mais fogos
  updateParticles();

  // Parar automaticamente após 3 segundos
  setTimeout(() => stopFireworks(), 3000);
}

function stopFireworks() {
  clearInterval(fireworkInterval);
  cancelAnimationFrame(fireworkAnimationFrame);
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
