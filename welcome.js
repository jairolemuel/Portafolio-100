document.addEventListener('DOMContentLoaded', () => {
  const welcomeText = document.querySelector('.holo-text');
  const overlay = document.getElementById('welcomeOverlay');
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  // Redimensionar canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Configuración de partículas
  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.6 - 0.3,
      speedY: Math.random() * 0.6 - 0.3
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(173, 216, 230, 0.6)';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Preparar texto para dispersión pixelada
  const originalText = welcomeText.textContent;
  welcomeText.textContent = '';

  originalText.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('pixel-char');
    span.style.setProperty('--i', i);
    welcomeText.appendChild(span);
  });

  // Iniciar animación de dispersión
  setTimeout(() => {
    welcomeText.classList.add('disperse');
  }, 1000);

  // Quitar pantalla de bienvenida
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }, 3000);

  // Sonido opcional
  const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.wav');
  sound.volume = 0.3;
  sound.play();
});
