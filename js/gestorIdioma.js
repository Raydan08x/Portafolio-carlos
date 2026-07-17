// Clase para gestionar el cambio de idioma (español/inglés)
export class GestorIdioma {
    constructor() {
        this.idiomaGuardado = localStorage.getItem('lang') || 'es';
    }

    // Inicializa el idioma guardado en el documento
    iniciar() {
        document.documentElement.lang = this.idiomaGuardado;
    }

    // Alterna entre español e inglés
    alternarIdioma() {
        const idiomaActual = document.documentElement.lang;
        const nuevoIdioma = idiomaActual === 'es' ? 'en' : 'es';
        document.documentElement.lang = nuevoIdioma;
        localStorage.setItem('lang', nuevoIdioma);
    }
}
