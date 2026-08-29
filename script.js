// M-BEAUTY - парикмахерская студия
// Анимация фирменной "линии среза" при появлении в области видимости

document.addEventListener('DOMContentLoaded', () => {
  const paths = document.querySelectorAll('.cutline__path');

  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    paths.forEach((path) => { path.style.strokeDashoffset = 0; });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.strokeDashoffset = 0;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  paths.forEach((path) => observer.observe(path));
});
