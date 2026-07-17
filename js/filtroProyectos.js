// Inicializa el filtro de proyectos por categoría
export function iniciarFiltroProyectos() {
    const botonesFiltroo = document.querySelectorAll('.filter-btn');
    const tarjetasProyecto = document.querySelectorAll('.project-card');

    if (!botonesFiltroo.length || !tarjetasProyecto.length) return;

    botonesFiltroo.forEach(boton => {
        boton.addEventListener('click', () => {
            // Quitar estado activo de todos los botones
            botonesFiltroo.forEach(btn => btn.classList.remove('active'));
            // Agregar estado activo al botón clickeado
            boton.classList.add('active');

            const valorFiltro = boton.getAttribute('data-filter');

            tarjetasProyecto.forEach(tarjeta => {
                if (valorFiltro === 'all' || tarjeta.getAttribute('data-category').includes(valorFiltro)) {
                    tarjeta.style.display = 'flex';
                    // Forzar reflujo para reiniciar animación
                    tarjeta.style.animation = 'none';
                    tarjeta.offsetHeight;
                    tarjeta.style.animation = null;
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    });
}
