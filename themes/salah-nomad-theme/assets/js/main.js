// H:\Salah-Nomad\NewBlog\themes\salah-nomad-theme\assets\js\main.js
// VERSION FINALE ET PROPRE

import MobileMenu from './menu.js';
import BackToTop from './backtotop.js';
import DarkModeToggle from './dark-mode-toggle.js';
import HighlightActiveMenuItems from './active-menu-highlighter.js';
import WeatherWidget from './weather-widget.js';
import GlobalQuoteRotator from './widget-quote-rotator.js'; // Importe notre script unifié

document.addEventListener('DOMContentLoaded', () => {
  // ... (code de MobileMenu, BackToTop, DarkMode, etc. reste identique)
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
  if (document.getElementById('weather-widget-container')) {
    WeatherWidget();
  }
  
  // Appel de notre système de rotation global
  GlobalQuoteRotator();

  console.log("Main JS Initialisé - v5.0 (Final Global Rotator System)");
});