// Inicializa el efecto de escritura tipo consola en las tarjetas de consola
export function iniciarEscrituraConsola() {
    const tarjetas = document.querySelectorAll('.console-card');
    const TEMAS = ['theme-mac', 'theme-ps', 'theme-cmd', 'theme-gitbash', 'theme-docker', 'theme-linux'];
    const botonesFiltroo = document.querySelectorAll('.theme-filter-btn');

    // Lógica de botones de filtro
    botonesFiltroo.forEach(btn => {
        btn.addEventListener('click', () => {
            const temaObjetivo = btn.getAttribute('data-theme');
            
            // Actualizar estado activo de los botones
            botonesFiltroo.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Aplicar tema a todas las tarjetas de consola
            tarjetas.forEach(tarjeta => {
                TEMAS.forEach(tema => tarjeta.classList.remove(tema));
                tarjeta.classList.add(temaObjetivo);
            });
        });
    });
    
    tarjetas.forEach(tarjeta => {
        const avanzarTema = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            let indiceTemaActual = -1;
            for (let i = 0; i < TEMAS.length; i++) {
                if (tarjeta.classList.contains(TEMAS[i])) {
                    indiceTemaActual = i;
                    break;
                }
            }
            
            if (indiceTemaActual !== -1) {
                tarjeta.classList.remove(TEMAS[indiceTemaActual]);
                const siguienteTema = TEMAS[(indiceTemaActual + 1) % TEMAS.length];
                tarjeta.classList.add(siguienteTema);
            } else {
                tarjeta.classList.add('theme-mac');
            }
        };

        const contenedorBotones = tarjeta.querySelector('.console-buttons');
        if (contenedorBotones) {
            contenedorBotones.addEventListener('click', avanzarTema);
        }
        
        const contenedorTitulo = tarjeta.querySelector('.console-title');
        if (contenedorTitulo) {
            contenedorTitulo.style.cursor = 'pointer';
            contenedorTitulo.addEventListener('click', avanzarTema);
        }
        
        const contenedorEncabezado = tarjeta.querySelector('.console-header');
        if (contenedorEncabezado) {
            // Atributo title para indicar al usuario que puede hacer clic
            contenedorEncabezado.title = "Cambiar vista de consola";
            contenedorEncabezado.style.cursor = 'pointer';
            contenedorEncabezado.addEventListener('click', avanzarTema);
        }

        const lista = tarjeta.querySelector('.console-list');
        if (!lista) return;

        const htmlOriginal = lista.innerHTML;
        let estaEscribiendo = false;
        let temporizadores = [];

        tarjeta.addEventListener('mouseenter', () => {
            if (estaEscribiendo) return;
            estaEscribiendo = true;
            
            const alturaActual = lista.getBoundingClientRect().height;
            lista.style.minHeight = `${alturaActual}px`;

            // Verificar idioma actual
            const esIngles = document.documentElement.lang === 'en';
            const attrItems = esIngles ? 'data-items-en' : 'data-items-es';
            let elementos = [];
            
            try {
                elementos = JSON.parse(lista.getAttribute(attrItems) || '[]');
            } catch (e) {
                console.error('Error al parsear data-items', e);
            }
            
            if (elementos.length === 0) {
                estaEscribiendo = false;
                return;
            }

            lista.innerHTML = '';
            let indiceElementoActual = 0;
            
            function escribirSiguienteElemento() {
                if (indiceElementoActual >= elementos.length) {
                    return; // Terminado
                }
                
                const textoElemento = elementos[indiceElementoActual];
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.gap = '0.5rem';
                
                // Agregar el prompt según el tema activo
                const prompt = document.createElement('span');
                if (tarjeta.classList.contains('theme-linux')) {
                    prompt.innerHTML = '<span style="color: #8ae234;">carlos@portafolio</span>:<span style="color: #729fcf;">~</span>$';
                } else if (tarjeta.classList.contains('theme-ps')) {
                    prompt.innerHTML = 'PS C:\\Users\\Carlos&gt;';
                    prompt.style.color = 'inherit';
                } else if (tarjeta.classList.contains('theme-cmd')) {
                    prompt.innerHTML = 'C:\\Users\\Carlos&gt;';
                    prompt.style.color = 'inherit';
                } else if (tarjeta.classList.contains('theme-gitbash')) {
                    prompt.innerHTML = '<span style="color: #8ae234;">carlos@portafolio</span> <span style="color: #cc0000;">MINGW64</span> <span style="color: #c4a000;">~</span> $';
                } else if (tarjeta.classList.contains('theme-docker')) {
                    prompt.innerHTML = 'root@docker-desktop:/#';
                    prompt.style.color = 'inherit';
                } else {
                    prompt.style.color = 'var(--primary)';
                    prompt.textContent = '>';
                }
                
                li.appendChild(prompt);
                
                const spanTexto = document.createElement('span');
                spanTexto.classList.add('console-cursor');
                // Usar color heredado para el cursor en temas específicos
                if (!tarjeta.classList.contains('theme-mac') && !tarjeta.classList.contains('theme-linux')) {
                    spanTexto.style.color = 'inherit';
                }
                
                li.appendChild(spanTexto);
                lista.appendChild(li);
                
                let indiceCaracter = 0;
                
                function escribirCaracter() {
                    if (indiceCaracter < textoElemento.length) {
                        spanTexto.textContent += textoElemento.charAt(indiceCaracter);
                        indiceCaracter++;
                        temporizadores.push(setTimeout(escribirCaracter, 30));
                    } else {
                        spanTexto.classList.remove('console-cursor');
                        indiceElementoActual++;
                        temporizadores.push(setTimeout(escribirSiguienteElemento, 150));
                    }
                }
                
                escribirCaracter();
            }
            
            escribirSiguienteElemento();
        });

        tarjeta.addEventListener('mouseleave', () => {
            temporizadores.forEach(clearTimeout);
            temporizadores = [];
            estaEscribiendo = false;
            lista.innerHTML = htmlOriginal;
            lista.style.minHeight = '';
        });
    });
}

// Inicializa el efecto de escritura en las tarjetas de experiencia (línea de tiempo)
export function iniciarEscrituraExperiencia() {
    const tarjetas = document.querySelectorAll('.timeline-content .card');
    
    tarjetas.forEach(tarjeta => {
        const lista = tarjeta.querySelector('ul');
        if (!lista) return;

        const htmlOriginal = lista.innerHTML;
        let estaEscribiendo = false;
        let temporizadores = [];

        tarjeta.addEventListener('mouseenter', () => {
            if (estaEscribiendo) return;
            estaEscribiendo = true;
            
            // Fijar la altura de la lista para evitar saltos de layout
            const alturaActual = lista.getBoundingClientRect().height;
            lista.style.minHeight = `${alturaActual}px`;

            // Extraer elementos de los li para mantener las traducciones intactas
            const elementosLista = Array.from(lista.querySelectorAll('li'));
            if (elementosLista.length === 0) {
                estaEscribiendo = false;
                return;
            }

            // Obtener el texto visible según el idioma activo
            const esIngles = document.documentElement.lang === 'en';
            
            const elementos = elementosLista.map(li => {
                const spanEn = li.querySelector('.lang-en');
                const spanEs = li.querySelector('.lang-es');
                if (spanEn && spanEs) {
                    return esIngles ? spanEn.textContent : spanEs.textContent;
                }
                return li.textContent;
            });

            lista.innerHTML = '';
            let indiceElementoActual = 0;
            
            function escribirSiguienteElemento() {
                if (indiceElementoActual >= elementos.length) {
                    return; // Terminado
                }
                
                const textoElemento = elementos[indiceElementoActual];
                const li = document.createElement('li');
                
                const spanTexto = document.createElement('span');
                spanTexto.classList.add('console-cursor');
                spanTexto.style.color = 'inherit';
                
                li.appendChild(spanTexto);
                lista.appendChild(li);
                
                let indiceCaracter = 0;
                
                function escribirCaracter() {
                    if (indiceCaracter < textoElemento.length) {
                        spanTexto.textContent += textoElemento.charAt(indiceCaracter);
                        indiceCaracter++;
                        temporizadores.push(setTimeout(escribirCaracter, 10)); // Más rápido para texto largo
                    } else {
                        spanTexto.classList.remove('console-cursor');
                        indiceElementoActual++;
                        temporizadores.push(setTimeout(escribirSiguienteElemento, 50));
                    }
                }
                
                escribirCaracter();
            }
            
            escribirSiguienteElemento();
        });

        tarjeta.addEventListener('mouseleave', () => {
            temporizadores.forEach(clearTimeout);
            temporizadores = [];
            estaEscribiendo = false;
            lista.innerHTML = htmlOriginal;
            lista.style.minHeight = '';
        });
    });
}
