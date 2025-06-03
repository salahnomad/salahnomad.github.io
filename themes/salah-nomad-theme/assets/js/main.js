// H:\Salah-Nomad\NewBlog\themes\salah-nomad-theme\assets\js\main.js

import MobileMenu from './menu.js';
import BackToTop from './backtotop.js';
import DarkModeToggle from './dark-mode-toggle.js';
import HighlightActiveMenuItems from './active-menu-highlighter.js';
import WeatherWidget from './weather-widget.js'; // <<< IMPORTER LA FONCTION MÉTÉO
import './quote-rotator.js';                   // L'import du rotateur de citations
import './footer-quote-rotator.js'; // Assurez-vous que cette ligne est présente

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.mobile-menu-toggle') && document.getElementById('mobile-nav-panel')) {
    MobileMenu();
  }

  const backToTopElement = document.querySelector('.back-to-top') || document.querySelector('[data-back-to-top]');
  if (backToTopElement) {
    BackToTop();
  }

  if (document.querySelector('.theme-toggle')) {
    DarkModeToggle();
  }

  if (document.getElementById('mobile-nav-panel')) { 
    if (typeof HighlightActiveMenuItems === 'function') {
      HighlightActiveMenuItems(); 
    } else {
      console.error("HighlightActiveMenuItems n'est pas une fonction.");
    }
  }

  // <<< APPELER LA FONCTION DU WIDGET MÉTÉO >>>
  if (document.getElementById('weather-widget-container')) {
    WeatherWidget(); // Appel de la fonction exportée par weather-widget.js
  }
  
  // Le rotateur de citations s'auto-exécute via son propre DOMContentLoaded.
  console.log("Main JS Initialisé - v2.2 (Weather Widget Call Added, Quote Rotator Imported)");
});