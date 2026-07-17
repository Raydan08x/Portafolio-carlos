// Inicializa el modal de vista previa para proyectos
export function iniciarModoVistaPrevia() {
    const modal = document.getElementById('preview-modal');
    if (!modal) return;
    
    const iframe = document.getElementById('preview-iframe');
    const btnCerrar = document.querySelector('.close-modal-btn');
    const cargador = document.getElementById('modal-loader');
    const enlaceExterno = document.getElementById('modal-external-link');

    // Vincular a todos los botones de vista rápida
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = btn.getAttribute('data-url');
            if (url) {
                // Mostrar modal
                modal.style.display = 'flex';
                // Forzar reflujo del DOM
                modal.offsetHeight;
                modal.classList.add('show');
                
                // Configurar iframe
                cargador.style.display = 'block';
                iframe.style.display = 'none';
                iframe.src = url;
                enlaceExterno.href = url;
                
                iframe.onload = () => {
                    cargador.style.display = 'none';
                    iframe.style.display = 'block';
                };
                
                // Evitar scroll en el fondo
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function cerrarModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // Limpiar iframe para detener reproducción/carga
            iframe.src = '';
            document.body.style.overflow = '';
        }, 300);
    }

    btnCerrar.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            cerrarModal();
        }
    });
}
