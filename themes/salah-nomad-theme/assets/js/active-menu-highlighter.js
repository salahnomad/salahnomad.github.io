// assets/js/active-menu-highlighter.js
export default function HighlightActiveMenuItems() {
  const menuItems = document.querySelectorAll('.mobile-nav-panel .menu-item');

  console.log('--- HighlightActiveMenuItems FUNCTION CALLED ---');
  console.log('Found menuItems:', menuItems.length); // Juste le nombre pour concision

  // Retirer d'abord la classe pour reset
  menuItems.forEach(item => {
    const link = item.querySelector('a');
    link?.classList.remove('menu-item--active');
  });

  let foundActiveItem = false; // Drapeau pour voir si on trouve au moins un item actif

  menuItems.forEach((item, index) => {
    const link = item.querySelector('a');
    const linkText = link ? link.textContent.trim() : 'NO LINK';

    // Log des classes de chaque item pour débogage
    console.log(`Item ${index} (${linkText}): Classes -> [${item.className}]`);

    const hasActiveClass = item.classList.contains('active');
    const hasActiveParentClass = item.classList.contains('active-parent');
    const hasCurrentMenuAncestorClass = item.classList.contains('current-menu-ancestor');

    if (hasActiveClass) console.log(` -> Item ${index} (${linkText}) HAS 'active' class!`);
    if (hasActiveParentClass) console.log(` -> Item ${index} (${linkText}) HAS 'active-parent' class!`);
    if (hasCurrentMenuAncestorClass) console.log(` -> Item ${index} (${linkText}) HAS 'current-menu-ancestor' class!`);

    const isActive = hasActiveClass || hasActiveParentClass || hasCurrentMenuAncestorClass;

    if (isActive) {
      foundActiveItem = true; // On a trouvé au moins un item qui devrait être stylé
      if (link && !link.classList.contains('menu-item--active')) {
        link.classList.add('menu-item--active');
        console.log(`✅ Highlight: Added .menu-item--active to: ${linkText}`);
      } else if (link) {
        console.warn(`⚠️ Link already has .menu-item--active: ${linkText}`);
      } else {
        console.warn('⚠️ Found active <li> but no <a> inside:', item);
      }
    }
  });

  if (!foundActiveItem) {
    console.warn("⚠️ No menu items found with 'active', 'active-parent', or 'current-menu-ancestor' classes during this call.");
  }
  console.log('--- HighlightActiveMenuItems FUNCTION FINISHED ---');
}