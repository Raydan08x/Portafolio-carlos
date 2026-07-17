// Clase para gestionar el tema claro/oscuro de la página
export class GestorTema {
    constructor() {
        this.temaGuardado = localStorage.getItem('theme') || 'dark';
    }

    // Inicializa el tema guardado en el documento
    iniciar() {
        if (this.temaGuardado === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
        this.actualizarIconos();
    }

    // Alterna entre tema claro y oscuro
    alternarTema() {
        const esClaro = document.documentElement.classList.contains('light');
        if (esClaro) {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
        this.actualizarIconos();
    }

    // Actualiza los íconos del botón de tema
    actualizarIconos() {
        const esClaro = document.documentElement.classList.contains('light');
        document.querySelectorAll('.theme-icon').forEach(icono => {
            icono.textContent = esClaro ? 'dark_mode' : 'light_mode';
        });
    }
}
