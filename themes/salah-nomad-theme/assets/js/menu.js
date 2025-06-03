// assets/js/menu.js
import HighlightActiveMenuItems from './active-menu-highlighter.js';

export default function MobileMenu() {
  const siteBody = document.body;
  const menuToggleButton = document.querySelector('.mobile-menu-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const menuCloseButton = mobileNavPanel ? mobileNavPanel.querySelector('.mobile-menu-close') : null;

  if (!menuToggleButton || !mobileNavPanel || !menuCloseButton) {
    console.error('Mobile menu toggle button, panel, or close button not found.');
    if (!menuToggleButton) console.error('Mobile menu toggle button missing.');
    if (!mobileNavPanel) console.error('Mobile nav panel missing.');
    if (!menuCloseButton) console.error('Mobile menu close button missing.');
    return;
  }

  function openMobileMenu() {
    siteBody.classList.add('mobile-menu-active');
    mobileNavPanel.classList.add('is-visible');
    mobileNavPanel.hidden = false;
    mobileNavPanel.setAttribute('aria-hidden', 'false');
    menuToggleButton.setAttribute('aria-expanded', 'true');
    if (menuCloseButton) {
        menuCloseButton.focus(); 
    }
    // Initialiser/mettre à jour le surlignage des items actifs à l'ouverture
    if (typeof HighlightActiveMenuItems === 'function') {
        setTimeout(() => HighlightActiveMenuItems(), 50); // Petit délai pour s'assurer que le menu est visible
    }
  }

  function closeMobileMenu() {
    siteBody.classList.remove('mobile-menu-active');
    mobileNavPanel.classList.remove('is-visible');
    
    if (document.activeElement && mobileNavPanel.contains(document.activeElement)) {
      // No action needed here if focus is moved below
    }
    if (menuToggleButton) {
        menuToggleButton.focus(); 
    }

    mobileNavPanel.setAttribute('aria-hidden', 'true'); 
    setTimeout(() => {
        if (!mobileNavPanel.classList.contains('is-visible')) {
            mobileNavPanel.hidden = true; 
        }
    }, 300); 
    
    menuToggleButton.setAttribute('aria-expanded', 'false');
  }

  menuToggleButton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (mobileNavPanel.classList.contains('is-visible')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (menuCloseButton) {
    menuCloseButton.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

   document.addEventListener('keydown', function(e) {
       if (e.key === "Escape" && mobileNavPanel.classList.contains('is-visible')) {
           closeMobileMenu();
       }
   });

  // MODIFIÉ : Cibler les nouveaux boutons .submenu-toggle-mobile
  if (mobileNavPanel) {
    const mobileSubmenuTogglers = mobileNavPanel.querySelectorAll('button.submenu-toggle-mobile'); 
    
    mobileSubmenuTogglers.forEach(toggler => {
      toggler.addEventListener('click', function(e) {
        // Pour un bouton, preventDefault() n'est généralement pas nécessaire pour une action de bascule.
        // e.preventDefault(); 

        const parentLi = this.closest('.menu-item.has-children');
        if (parentLi) {
          parentLi.classList.toggle('submenu-open');
          this.setAttribute('aria-expanded', parentLi.classList.contains('submenu-open').toString());
          
          const submenuId = this.getAttribute('aria-controls');
          const submenu = document.getElementById(submenuId);

          if (submenu) {
            submenu.classList.toggle('is-open');
            // Gérer l'attribut hidden pour l'accessibilité basé sur la classe 'is-open'
            if (submenu.classList.contains('is-open')) {
              submenu.hidden = false;
            } else {
              // Laisser le CSS gérer le display: none via .sub-menu et non .sub-menu.is-open
              // ou ajouter un délai si transition de hauteur/opacité.
              // Pour l'instant, on se fie au CSS qui gère display: none / block via .is-open
              submenu.hidden = !submenu.classList.contains('is-open'); 
            }
          }
        }
      });
    });
  }
}