// Inicializa el efecto de brillo que sigue al cursor del mouse
export function iniciarBrilloCursor() {
    const overlay = document.querySelector('.grid-glow-overlay');
    if (!overlay) return;

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Actualizar posición de la máscara para seguir al mouse
        overlay.style.webkitMaskImage = `radial-gradient(circle 200px at ${x}px ${y}px, black, transparent)`;
        overlay.style.maskImage = `radial-gradient(circle 200px at ${x}px ${y}px, black, transparent)`;
    });
}
