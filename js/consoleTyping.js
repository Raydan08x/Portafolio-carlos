export function initConsoleTyping() {
    const cards = document.querySelectorAll('.console-card');
    const THEMES = ['theme-mac', 'theme-ps', 'theme-cmd', 'theme-gitbash', 'theme-docker', 'theme-linux'];
    const filterBtns = document.querySelectorAll('.theme-filter-btn');

    // Filter Buttons logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTheme = btn.getAttribute('data-theme');
            
            // Update active state of buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Apply theme to all console cards
            cards.forEach(card => {
                THEMES.forEach(theme => card.classList.remove(theme));
                card.classList.add(targetTheme);
            });
        });
    });
    
    cards.forEach(card => {
        const advanceTheme = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            let currentThemeIndex = -1;
            for (let i = 0; i < THEMES.length; i++) {
                if (card.classList.contains(THEMES[i])) {
                    currentThemeIndex = i;
                    break;
                }
            }
            
            if (currentThemeIndex !== -1) {
                card.classList.remove(THEMES[currentThemeIndex]);
                const nextTheme = THEMES[(currentThemeIndex + 1) % THEMES.length];
                card.classList.add(nextTheme);
            } else {
                card.classList.add('theme-mac');
            }
        };

        const buttonsContainer = card.querySelector('.console-buttons');
        if (buttonsContainer) {
            buttonsContainer.addEventListener('click', advanceTheme);
        }
        
        const titleContainer = card.querySelector('.console-title');
        if (titleContainer) {
            titleContainer.style.cursor = 'pointer';
            titleContainer.addEventListener('click', advanceTheme);
        }
        
        const headerContainer = card.querySelector('.console-header');
        if (headerContainer) {
            // Add title attribute to let user know they can click
            headerContainer.title = "Cambiar vista de consola";
            headerContainer.style.cursor = 'pointer';
            headerContainer.addEventListener('click', advanceTheme);
        }

        const list = card.querySelector('.console-list');
        if (!list) return;

        const originalHTML = list.innerHTML;
        let isTyping = false;
        let timeouts = [];

        card.addEventListener('mouseenter', () => {
            if (isTyping) return;
            isTyping = true;
            
            const currentHeight = list.getBoundingClientRect().height;
            list.style.minHeight = `${currentHeight}px`;

            // Check current language
            const isEnglish = document.documentElement.lang === 'en';
            const itemsAttr = isEnglish ? 'data-items-en' : 'data-items-es';
            let items = [];
            
            try {
                items = JSON.parse(list.getAttribute(itemsAttr) || '[]');
            } catch (e) {
                console.error('Failed to parse data-items', e);
            }
            
            if (items.length === 0) {
                isTyping = false;
                return;
            }

            list.innerHTML = '';
            let currentItemIndex = 0;
            
            function typeNextItem() {
                if (currentItemIndex >= items.length) {
                    return; // Done
                }
                
                const itemText = items[currentItemIndex];
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.gap = '0.5rem';
                
                // Add the prompt
                const prompt = document.createElement('span');
                if (card.classList.contains('theme-linux')) {
                    prompt.innerHTML = '<span style="color: #8ae234;">cmmp@portfolio</span>:<span style="color: #729fcf;">~</span>$';
                } else if (card.classList.contains('theme-ps')) {
                    prompt.innerHTML = 'PS C:\\Users\\CMMP&gt;';
                    prompt.style.color = 'inherit';
                } else if (card.classList.contains('theme-cmd')) {
                    prompt.innerHTML = 'C:\\Users\\CMMP&gt;';
                    prompt.style.color = 'inherit';
                } else if (card.classList.contains('theme-gitbash')) {
                    prompt.innerHTML = '<span style="color: #8ae234;">cmmp@portfolio</span> <span style="color: #cc0000;">MINGW64</span> <span style="color: #c4a000;">~</span> $';
                } else if (card.classList.contains('theme-docker')) {
                    prompt.innerHTML = 'root@docker-desktop:/#';
                    prompt.style.color = 'inherit';
                } else {
                    prompt.style.color = 'var(--primary)';
                    prompt.textContent = '>';
                }
                
                li.appendChild(prompt);
                
                const textSpan = document.createElement('span');
                textSpan.classList.add('console-cursor');
                // Use inherit color for cursor in specific themes
                if (!card.classList.contains('theme-mac') && !card.classList.contains('theme-linux')) {
                    textSpan.style.color = 'inherit';
                }
                
                li.appendChild(textSpan);
                list.appendChild(li);
                
                let charIndex = 0;
                
                function typeChar() {
                    if (charIndex < itemText.length) {
                        textSpan.textContent += itemText.charAt(charIndex);
                        charIndex++;
                        timeouts.push(setTimeout(typeChar, 30));
                    } else {
                        textSpan.classList.remove('console-cursor');
                        currentItemIndex++;
                        timeouts.push(setTimeout(typeNextItem, 150));
                    }
                }
                
                typeChar();
            }
            
            typeNextItem();
        });

        card.addEventListener('mouseleave', () => {
            timeouts.forEach(clearTimeout);
            timeouts = [];
            isTyping = false;
            list.innerHTML = originalHTML;
            list.style.minHeight = '';
        });
    });
}

export function initExperienceTyping() {
    const cards = document.querySelectorAll('.timeline-content .card');
    
    cards.forEach(card => {
        const list = card.querySelector('ul');
        if (!list) return;

        const originalHTML = list.innerHTML;
        let isTyping = false;
        let timeouts = [];

        card.addEventListener('mouseenter', () => {
            if (isTyping) return;
            isTyping = true;
            
            // Lock the height of the list to prevent layout shifts
            const currentHeight = list.getBoundingClientRect().height;
            list.style.minHeight = `${currentHeight}px`;

            // Extract items from li spans directly to keep translations intact from li spans directly to keep translations intact
            const listItems = Array.from(list.querySelectorAll('li'));
            if (listItems.length === 0) {
                isTyping = false;
                return;
            }

            // We need to type the content, keeping the HTML structure for span.lang-es and span.lang-en if present.
            // Or we can just get the visible text, but since we toggle languages, it's safer to reconstruct.
            // Wait, if we just type textContent of visible lang, when language changes during hover, it breaks.
            // But hover is short. Let's just get the visible text content!

            const isEnglish = document.documentElement.lang === 'en';
            
            const items = listItems.map(li => {
                const enSpan = li.querySelector('.lang-en');
                const esSpan = li.querySelector('.lang-es');
                if (enSpan && esSpan) {
                    return isEnglish ? enSpan.textContent : esSpan.textContent;
                }
                return li.textContent;
            });

            list.innerHTML = '';
            let currentItemIndex = 0;
            
            function typeNextItem() {
                if (currentItemIndex >= items.length) {
                    return; // Done
                }
                
                const itemText = items[currentItemIndex];
                const li = document.createElement('li');
                
                // Keep the styling from original ul
                
                const textSpan = document.createElement('span');
                textSpan.classList.add('console-cursor');
                textSpan.style.color = 'inherit';
                
                li.appendChild(textSpan);
                list.appendChild(li);
                
                let charIndex = 0;
                
                function typeChar() {
                    if (charIndex < itemText.length) {
                        textSpan.textContent += itemText.charAt(charIndex);
                        charIndex++;
                        timeouts.push(setTimeout(typeChar, 10)); // Faster for long text
                    } else {
                        textSpan.classList.remove('console-cursor');
                        currentItemIndex++;
                        timeouts.push(setTimeout(typeNextItem, 50));
                    }
                }
                
                typeChar();
            }
            
            typeNextItem();
        });

        card.addEventListener('mouseleave', () => {
            timeouts.forEach(clearTimeout);
            timeouts = [];
            isTyping = false;
            list.innerHTML = originalHTML;
            list.style.minHeight = '';
        });
    });
}
