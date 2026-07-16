export class ThemeManager {
    constructor() {
        this.savedTheme = localStorage.getItem('theme') || 'dark';
    }

    init() {
        if (this.savedTheme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
        this.updateIcons();
    }

    toggleTheme() {
        const isLight = document.documentElement.classList.contains('light');
        if (isLight) {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
        this.updateIcons();
    }

    updateIcons() {
        const isLight = document.documentElement.classList.contains('light');
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.textContent = isLight ? 'dark_mode' : 'light_mode';
        });
    }
}
