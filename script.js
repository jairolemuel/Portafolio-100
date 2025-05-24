// ---- Bienvenida con glitch ----
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('welcomeOverlay').classList.add('glitch-out');
  }, 3000); // Tiempo de espera para desaparecer
});

// ---- Animaciones por scroll (Observer) ----
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // Colores personalizados por clase
      if (el.classList.contains('fondo-finanzas')) {
        el.style.setProperty('--holo-color-1', '#00cfff'); // Azul celeste
        el.style.setProperty('--holo-color-2', '#0044aa'); // Azul oscuro
      } else if (el.classList.contains('fondo-cosmetica')) {
        el.style.setProperty('--holo-color-1', '#ffb6c1'); // Rosado claro
        el.style.setProperty('--holo-color-2', '#ff69b4'); // Rosa fuerte
      } else if (el.classList.contains('fondo-turismo')) {
        el.style.setProperty('--holo-color-1', '#fddb3a'); // Amarillo claro
        el.style.setProperty('--holo-color-2', '#faaa1d'); // Amarillo oscuro
      }

      // Animación con delay
      const delay = el.dataset.delay || index * 100;
      setTimeout(() => {
        el.classList.add('visible', 'animate__fadeInUp');
      }, delay);
    } else {
      el.classList.remove('visible', 'animate__fadeInUp');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

// Aplicar a todos los proyectos
document.querySelectorAll('.proyecto').forEach((project, index) => {
  project.dataset.delay = index * 150;
  observer.observe(project);
});
