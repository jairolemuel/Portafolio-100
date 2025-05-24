const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // Delay personalizado usando data-delay o por orden
      const delay = el.dataset.delay || index * 100;

      setTimeout(() => {
        el.classList.add('visible', 'animate__fadeInUp');
      }, delay);
    } else {
      // Si querés que desaparezcan al salir del viewport:
      el.classList.remove('visible', 'animate__fadeInUp');
    }
  });
}, {
  threshold: 0.1, // Cuánta parte del elemento tiene que estar visible
  rootMargin: "0px 0px -50px 0px" // Hace que se active un poco antes
});

// Aplicar a todos los proyectos
document.querySelectorAll('.proyecto').forEach((project, index) => {
  // Se puede definir delay individual si querés
  project.dataset.delay = index * 150;
  observer.observe(project);
});
