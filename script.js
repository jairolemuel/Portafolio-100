document.addEventListener('DOMContentLoaded', () => {
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const holoText = document.querySelector('.holo-text');

  // ⏳ 1. Espera breve antes de comenzar las animaciones
  setTimeout(() => {
    // 🎆 2. Dispersar el texto holográfico (efecto "desintegración de píxeles")
    holoText.classList.add('disperse');
  }, 500); // Inicia a los 0.5 segundos

  setTimeout(() => {
    // ⚡ 3. Activar animación glitch del overlay
    welcomeOverlay.classList.add('glitch-out');
  }, 2000); // Inicia a los 2 segundos (después de que el texto empieza a desaparecer)

  setTimeout(() => {
    // 🚪 4. Ocultar completamente el overlay
    welcomeOverlay.style.display = 'none';
  }, 5500); // Suficiente tiempo para que ambas animaciones terminen sin cortes
});


// 👁️‍🗨️ INTERSECTION OBSERVER para animar los proyectos al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // 🎨 Asignar colores personalizados según la clase temática
      if (el.classList.contains('fondo-finanzas')) {
        el.style.setProperty('--holo-color-1', '#00cfff');
        el.style.setProperty('--holo-color-2', '#0044aa');
      } else if (el.classList.contains('fondo-cosmetica')) {
        el.style.setProperty('--holo-color-1', '#ffb6c1');
        el.style.setProperty('--holo-color-2', '#ff69b4');
      } else if (el.classList.contains('fondo-turismo')) {
        el.style.setProperty('--holo-color-1', '#fddb3a');
        el.style.setProperty('--holo-color-2', '#faaa1d');
      }

      // 🕒 Animación con retraso progresivo
      const delay = el.dataset.delay || index * 100;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
    } else {
      // 🔄 Si sale de vista, quitar clase
      el.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

// 🧩 Aplicar el observer a todos los elementos .proyecto
document.querySelectorAll('.proyecto').forEach((project, index) => {
  project.dataset.delay = index * 150; // Delay progresivo en ms
  observer.observe(project);
});
