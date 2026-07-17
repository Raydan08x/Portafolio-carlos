// Archivo principal - Punto de entrada de la aplicación
import { inyectarNavbar, inyectarFooter } from './componentes.js';
import { iniciarEscrituraConsola, iniciarEscrituraExperiencia } from './escrituraConsola.js';
import { iniciarBrilloCursor } from './brilloCursor.js';
import { iniciarModoVistaPrevia } from './modoVistaPrevia.js';
import { GestorIdioma } from './gestorIdioma.js';
import { iniciarAnimacionesScroll } from './animacionesScroll.js';
import { GestorTema } from './gestorTema.js';
import { iniciarFiltroProyectos } from './filtroProyectos.js';

// Inyectar componentes compartidos (navbar, footer, modal)
// Se ejecuta antes de inicializar gestores para que los elementos existan en el DOM
inyectarNavbar();
inyectarFooter();

// Inicializar gestor de idioma
const gestorIdioma = new GestorIdioma();
gestorIdioma.iniciar();

// Inicializar gestor de tema
const gestorTema = new GestorTema();
gestorTema.iniciar();

// Cuando el DOM esté listo, inicializar todos los módulos
document.addEventListener('DOMContentLoaded', () => {
    // Botones de cambio de idioma
    const botonesIdioma = document.querySelectorAll('.toggle-lang-btn');
    botonesIdioma.forEach(btn => {
        btn.addEventListener('click', () => gestorIdioma.alternarIdioma());
    });

    // Botones de cambio de tema
    const botonesTema = document.querySelectorAll('.toggle-theme-btn');
    botonesTema.forEach(btn => {
        btn.addEventListener('click', () => gestorTema.alternarTema());
    });

    // Inicializar módulos de la página
    iniciarAnimacionesScroll();
    iniciarFiltroProyectos();
    iniciarModoVistaPrevia();
    iniciarBrilloCursor();
    iniciarEscrituraConsola();
});
