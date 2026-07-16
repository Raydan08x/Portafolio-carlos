import { initConsoleTyping, initExperienceTyping } from './consoleTyping.js';
import { initCursorGlow } from './cursorGlow.js';
import { initPreviewMode } from './previewMode.js';
import { LanguageManager } from './languageManager.js';
import { initScrollAnimations } from './scrollAnimations.js';
import { ThemeManager } from './themeManager.js';
import { initProjectFilter } from './projectFilter.js';

const langManager = new LanguageManager();
langManager.init();

const themeManager = new ThemeManager();
themeManager.init();

document.addEventListener('DOMContentLoaded', () => {
    const toggleLangButtons = document.querySelectorAll('.toggle-lang-btn');
    toggleLangButtons.forEach(btn => {
        btn.addEventListener('click', () => langManager.toggleLanguage());
    });

    const toggleThemeButtons = document.querySelectorAll('.toggle-theme-btn');
    toggleThemeButtons.forEach(btn => {
        btn.addEventListener('click', () => themeManager.toggleTheme());
    });

    initScrollAnimations();
    initProjectFilter();
    initPreviewMode();
    initCursorGlow();
    initConsoleTyping();



});
