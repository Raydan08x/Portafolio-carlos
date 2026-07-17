// Inicializa las animaciones al hacer scroll usando IntersectionObserver
export function iniciarAnimacionesScroll() {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observador.observe(el);
    });
}
// Revela cada ventana de experiencia al entrar en el viewport.
export function iniciarAparicionConsolasExperiencia() {
    const consolas = document.querySelectorAll('.experience-console-card');
    if (!consolas.length) return;

    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    consolas.forEach((consola, indice) => {
        consola.classList.add('console-scroll-reveal');
        consola.style.setProperty('--console-delay', `${indice * 90}ms`);
    });

    if (movimientoReducido || !('IntersectionObserver' in window)) {
        consolas.forEach(consola => consola.classList.add('console-scroll-visible'));
        return;
    }

    const observadorConsolas = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            entrada.target.classList.toggle('console-scroll-visible', entrada.isIntersecting);
        });
    }, { threshold: 0, rootMargin: '0px' });

    consolas.forEach(consola => observadorConsolas.observe(consola));
}

// Conecta cada tarjeta educativa con su nodo en la línea de tiempo.
export function iniciarInteraccionEducacion() {
    const seccion = document.querySelector('.education-section');
    if (!seccion) return;

    const tarjetas = Array.from(seccion.querySelectorAll('.grid-3 > .card'));
    const hitos = Array.from(seccion.querySelectorAll('.education-milestone'));
    let indiceSeleccionado = -1;

    const activar = indice => {
        tarjetas.forEach((tarjeta, posicion) => tarjeta.classList.toggle('education-card-active', posicion === indice));
        hitos.forEach((hito, posicion) => hito.classList.toggle('is-active', posicion === indice));
    };

    tarjetas.forEach((tarjeta, indice) => {
        tarjeta.tabIndex = 0;
        tarjeta.setAttribute('role', 'button');

        tarjeta.addEventListener('mouseenter', () => activar(indice));
        tarjeta.addEventListener('mouseleave', () => activar(indiceSeleccionado));
        tarjeta.addEventListener('focus', () => activar(indice));
        tarjeta.addEventListener('blur', () => activar(indiceSeleccionado));
        tarjeta.addEventListener('click', () => {
            indiceSeleccionado = indiceSeleccionado === indice ? -1 : indice;
            activar(indiceSeleccionado);
        });
        tarjeta.addEventListener('keydown', evento => {
            if (evento.key !== 'Enter' && evento.key !== ' ') return;
            evento.preventDefault();
            tarjeta.click();
        });
    });
}
// Corrige los enlaces internos para que el navbar fijo no cubra el título.
export function iniciarAjusteEnlacesInternos() {
    const desplazarAlDestino = () => {
        if (!window.location.hash) return;

        const id = decodeURIComponent(window.location.hash.slice(1));
        const destino = document.getElementById(id);
        if (!destino) return;

        const navbar = document.querySelector('.navbar');
        const navbarVisible = navbar && window.getComputedStyle(navbar).display !== 'none';
        const alturaNavbar = navbarVisible ? navbar.getBoundingClientRect().height : 0;
        const margenVisual = 28;
        const posicion = destino.getBoundingClientRect().top + window.scrollY - alturaNavbar - margenVisual;

        window.scrollTo({ top: Math.max(0, posicion), behavior: 'auto' });
    };

    // Espera a que el navbar inyectado y las fuentes terminen de definir el layout.
    requestAnimationFrame(() => requestAnimationFrame(desplazarAlDestino));
    window.addEventListener('load', desplazarAlDestino, { once: true });
    window.addEventListener('hashchange', desplazarAlDestino);
}
