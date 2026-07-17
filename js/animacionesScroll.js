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
