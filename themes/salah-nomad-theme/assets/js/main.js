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

/**
 * Salah Nomad YouTube Handler - Golden Master
 * Léger, sans dépendances, compatible GSC.
 */

const salahNomadYouTube = {
  
  // Fonction principale : Lance la vidéo
  loadVideo(videoId) {
    const wrapper = document.getElementById(`yt-${videoId}`);
    if (!wrapper) return;
    
    const iframe = wrapper.querySelector('iframe');
    const overlay = wrapper.querySelector('.video-play-overlay');
    
    if (!iframe || !overlay) return;

    // Ajoute classe loading pour le feedback CSS
    wrapper.classList.add('loading');
    
    // Force l'autoplay dans l'URL
    const currentSrc = iframe.getAttribute('src');
    if (!currentSrc.includes('autoplay=1')) {
      const separator = currentSrc.includes('?') ? '&' : '?';
      // mute=0 est important pour certaines politiques de navigateur
      iframe.setAttribute('src', `${currentSrc}${separator}autoplay=1`);
    }

    // Une fois l'iframe chargée (ou petit délai), on affiche
    iframe.onload = () => {
      wrapper.classList.remove('loading');
      wrapper.classList.add('playing');
    };
    
    // Fallback de sécurité si onload ne déclenche pas
    setTimeout(() => {
        wrapper.classList.remove('loading');
        wrapper.classList.add('playing');
    }, 1000);
  },
  
  // Accessibilité : Support Entrée/Espace
  handleKeyPress(event, videoId) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.loadVideo(videoId);
    }
  }
};

// Rend l'objet disponible globalement pour le shortcode HTML
window.salahNomadYouTube = salahNomadYouTube;