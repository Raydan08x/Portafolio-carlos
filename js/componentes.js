// Módulo de componentes reutilizables (navbar, footer, modal de vista previa)
// Se inyectan dinámicamente para evitar repetir HTML en cada página

/**
 * Detecta si la página actual está en la subcarpeta /pages/
 */
function estaEnSubcarpeta() {
    return window.location.pathname.includes('/pages/');
}

/**
 * Obtiene el nombre del archivo de la página actual
 */
function obtenerPaginaActual() {
    const ruta = window.location.pathname;
    const archivo = ruta.split('/').pop();
    return archivo || 'index.html';
}

/**
 * Genera la ruta correcta a un archivo según la ubicación actual
 */
function generarEnlace(archivo) {
    const enSub = estaEnSubcarpeta();
    if (archivo === 'index.html') return enSub ? '../index.html' : 'index.html';
    return enSub ? archivo : 'pages/' + archivo;
}

/**
 * Devuelve 'active' si la página actual coincide con el archivo dado
 */
function claseActiva(nombreArchivo) {
    const pagina = obtenerPaginaActual();
    if (nombreArchivo === 'index.html') {
        return (pagina === 'index.html' || pagina === '') ? 'active' : '';
    }
    return pagina === nombreArchivo ? 'active' : '';
}

/**
 * Genera e inyecta el overlay, navbar de escritorio y navegación móvil
 * Se inserta justo antes del elemento <main>
 */
export function inyectarNavbar() {
    const prefijo = estaEnSubcarpeta() ? '../' : '';

    const html = `
    <div class="grid-glow-overlay"></div>

    <!-- Barra de Navegación -->
    <nav class="navbar">
        <a href="${generarEnlace('index.html')}" class="nav-brand" style="display: flex; align-items: center; gap: 0.5rem;"><img src="${prefijo}assets/img/logo_cm.png" alt="Logo Carlos Madero" style="height: 48px; width: 48px; object-fit: contain;">Carlos Madero</a>
        <ul class="nav-links">
            <li><a href="${generarEnlace('index.html')}" class="${claseActiva('index.html')}"><span class="lang-es">Perfil</span><span class="lang-en">Profile</span></a></li>
            <li><a href="${generarEnlace('stack.html')}" class="${claseActiva('stack.html')}">Stack</a></li>
            <li><a href="${generarEnlace('proyectos.html')}" class="${claseActiva('proyectos.html')}"><span class="lang-es">Proyectos</span><span class="lang-en">Projects</span></a></li>
            <li><a href="${generarEnlace('experiencia.html')}" class="${claseActiva('experiencia.html')}"><span class="lang-es">Experiencia</span><span class="lang-en">Experience</span></a></li>
            <li><a href="${generarEnlace('blog.html')}" class="${claseActiva('blog.html')}">Blog</a></li>
            <li><a href="${generarEnlace('contacto.html')}" class="${claseActiva('contacto.html')}"><span class="lang-es">Contacto</span><span class="lang-en">Contact</span></a></li>
        </ul>
        <div class="nav-actions">
            <button class="btn-lang toggle-theme-btn" title="Cambiar tema" style="margin-right: 0.5rem;">
                <span class="material-symbols-outlined theme-icon">dark_mode</span>
            </button>
            <button class="btn-lang toggle-lang-btn">
                <span class="material-symbols-outlined">language</span>
                <span class="lang-es">EN</span><span class="lang-en">ES</span>
            </button>
            <a href="${generarEnlace('contacto.html')}" class="btn-primary"><span class="lang-es">Contacto</span><span class="lang-en">Contact</span></a>
        </div>
    </nav>

    <!-- Navegación Móvil -->
    <nav class="mobile-nav">
        <a href="${generarEnlace('index.html')}" class="${claseActiva('index.html')}">
            <span class="material-symbols-outlined">person</span>
            <span class="lang-es">Perfil</span><span class="lang-en">Profile</span>
        </a>
        <a href="${generarEnlace('proyectos.html')}" class="${claseActiva('proyectos.html')}">
            <span class="material-symbols-outlined">code</span>
            <span class="lang-es">Proy.</span><span class="lang-en">Proj.</span>
        </a>
        <a href="${generarEnlace('experiencia.html')}" class="${claseActiva('experiencia.html')}">
            <span class="material-symbols-outlined">work</span>
            <span class="lang-es">Exp.</span><span class="lang-en">Exp.</span>
        </a>
        <a href="${generarEnlace('blog.html')}" class="${claseActiva('blog.html')}">
            <span class="material-symbols-outlined">article</span>
            Blog
        </a>
        <a href="${generarEnlace('contacto.html')}" class="${claseActiva('contacto.html')}">
            <span class="material-symbols-outlined">mail</span>
            <span class="lang-es">Contacto</span><span class="lang-en">Contact</span>
        </a>
        <button class="toggle-lang-btn">
            <span class="material-symbols-outlined">language</span>
            <span class="lang-es">EN</span><span class="lang-en">ES</span>
        </button>
    </nav>`;

    const main = document.querySelector('.main-content');
    if (main) {
        main.insertAdjacentHTML('beforebegin', html);
    }
}

/**
 * Genera e inyecta el pie de página y el modal de vista previa
 * Se inserta justo después del elemento <main>
 */
export function inyectarFooter() {
    const html = `
    <!-- Pie de Página -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-brand animate-on-scroll">
                <h2>Carlos Madero Perea</h2>
                <p>
                    <span class="lang-es">AUTOMATIZAMOS HOY, MEJORAMOS SIEMPRE.</span>
                    <span class="lang-en">AUTOMATING TODAY, IMPROVING ALWAYS.</span>
                </p>
            </div>
            
            <div class="footer-links animate-on-scroll">
                <a href="mailto:cmadero08x@gmail.com"><span class="material-symbols-outlined">mail</span> Email</a>
                <a href="https://www.linkedin.com/in/carlos-madero-perea-data-scientist/" target="_blank"><span class="material-symbols-outlined">link</span> LinkedIn</a>
                <a href="https://github.com/Raydan08x" target="_blank"><span class="material-symbols-outlined">code</span> GitHub</a>
                <a href="tel:+573138718154"><span class="material-symbols-outlined">call</span> <span class="lang-es">Teléfono</span><span class="lang-en">Phone</span></a>
            </div>
        </div>
        
        <div class="footer-bottom">
            &copy; 2026 CARLOS MANUEL MADERO PEREA.
        </div>
    </footer>

    <!-- Modal de Vista Previa -->
    <div id="preview-modal" class="modal-overlay" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-title text-primary font-bold"><span class="lang-es">Vista Previa</span><span class="lang-en">Preview</span></span>
                <div class="modal-actions">
                    <a id="modal-external-link" href="#" target="_blank" class="btn-lang" title="Abrir en nueva pestaña" style="margin-right: 0.5rem;">
                        <span class="material-symbols-outlined">open_in_new</span>
                    </a>
                    <button class="close-modal-btn btn-lang" title="Cerrar">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <div class="loader" id="modal-loader"></div>
                <iframe id="preview-iframe" src="" frameborder="0" width="100%" height="100%" style="display: none;"></iframe>
            </div>
        </div>
    </div>`;

    const main = document.querySelector('.main-content');
    if (main) {
        main.insertAdjacentHTML('afterend', html);
    }
}
