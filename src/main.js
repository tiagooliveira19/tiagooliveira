import './styles/main.css';
import { initTheme, toggleTheme } from './js/theme.js';
import { applyTranslations, getInitialLocale, setLocale } from './js/i18n.js';
import { initScrollProfile } from './js/scroll-profile.js';

function boot() {
  initTheme();
  initScrollProfile();

  let locale = setLocale(getInitialLocale());
  applyTranslations(locale);

  document.querySelector('[data-action="toggle-theme"]')?.addEventListener('click', () => {
    toggleTheme();
  });

  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextLocale = button.getAttribute('data-lang');
      locale = setLocale(nextLocale);
      applyTranslations(locale);
    });
  });
}

boot();
