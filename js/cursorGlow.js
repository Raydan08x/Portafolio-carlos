export function initCursorGlow() {
    const overlay = document.querySelector('.grid-glow-overlay');
    if (!overlay) return;

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update mask position to follow the mouse
        overlay.style.webkitMaskImage = `radial-gradient(circle 200px at ${x}px ${y}px, black, transparent)`;
        overlay.style.maskImage = `radial-gradient(circle 200px at ${x}px ${y}px, black, transparent)`;
    });
}
