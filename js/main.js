// Menú mobile y sección actual en la navegación. El contenido se lee sin JavaScript.
const boton = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
const escritorio = window.matchMedia('(min-width: 75em)');

function cerrarMenu(devolverFoco) {
  boton.setAttribute('aria-expanded', 'false');
  if (devolverFoco) boton.focus();
}

if (boton && menu) {
  boton.addEventListener('click', () => {
    const abierto = boton.getAttribute('aria-expanded') === 'true';
    boton.setAttribute('aria-expanded', String(!abierto));
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a') && !escritorio.matches) cerrarMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') cerrarMenu(true);
  });
  escritorio.addEventListener('change', () => cerrarMenu(false));
}

// Marca en el menú la sección que se está leyendo
const links = new Map();
document.querySelectorAll('.nav__link').forEach((a) => {
  const id = a.getAttribute('href').slice(1);
  const seccion = document.getElementById(id);
  if (seccion) links.set(seccion, a);
});
if ('IntersectionObserver' in window && links.size) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      links.get(entrada.target).setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, seccion) => observador.observe(seccion));
}
