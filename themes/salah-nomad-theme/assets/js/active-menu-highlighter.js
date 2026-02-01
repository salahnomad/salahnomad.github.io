// assets/js/active-menu-highlighter.js
export default function HighlightActiveMenuItems() {
  const menuItems = document.querySelectorAll('.mobile-nav-panel .menu-item');

  // First, remove the class to reset the state
  menuItems.forEach(item => {
    const link = item.querySelector('a');
    link?.classList.remove('menu-item--active');
  });

  // Then, find and highlight the active item
  menuItems.forEach(item => {
    const link = item.querySelector('a');
    
    const isActive = item.classList.contains('active') || 
                     item.classList.contains('active-parent') || 
                     item.classList.contains('current-menu-ancestor');

    if (isActive) {
      if (link && !link.classList.contains('menu-item--active')) {
        link.classList.add('menu-item--active');
      }
    }
  });
}