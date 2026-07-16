export class LanguageManager {
    constructor() {
        this.savedLang = localStorage.getItem('lang') || 'es';
    }

    init() {
        document.documentElement.lang = this.savedLang;
    }

    toggleLanguage() {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'es' ? 'en' : 'es';
        document.documentElement.lang = newLang;
        localStorage.setItem('lang', newLang);
    }
}
