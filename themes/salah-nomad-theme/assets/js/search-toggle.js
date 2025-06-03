// assets/js/search-toggle.js
export default function SearchToggle() {
  const searchToggleButtons = document.querySelectorAll('.search-toggle');
  const searchContainers = document.querySelectorAll('.header-search-form-wrap');

  if (!searchToggleButtons.length || !searchContainers.length) {
    return;
  }

  searchToggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      console.log("Search Toggle Clicked!"); // Gardons ce log pour l'instant
      e.stopPropagation();

      const targetId = this.getAttribute('aria-controls');
      const targetContainer = document.getElementById(targetId);

      if (targetContainer) { // Conteneur trouvé
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Cacher les autres conteneurs en retirant la classe active
        searchContainers.forEach(container => {
          if (container !== targetContainer) {
            container.classList.remove('is-active'); // <<< Utiliser classe
             const otherButton = document.querySelector(`[aria-controls="${container.id}"]`);
             if (otherButton) { otherButton.setAttribute('aria-expanded', 'false'); }
          }
        });

        // --- MODIFICATION : Utiliser classList.toggle ---
        targetContainer.classList.toggle('is-active');
        // targetContainer.hidden = !targetContainer.hidden; // Ancienne méthode commentée
        // --- FIN MODIFICATION ---

        // Mettre à jour ARIA
        this.setAttribute('aria-expanded', !isExpanded);

        // --- MODIFICATION : Vérifier la classe pour le focus ---
        if (targetContainer.classList.contains('is-active')) { // <<< Vérifier si la classe est présente
          const searchField = targetContainer.querySelector('.search-field');
          if (searchField) {
            searchField.focus();
          }
        }
      } else { // <<< AJOUT : Log si conteneur non trouvé
          console.error(`Search target container with ID '${targetId}' not found! Check aria-controls on button and ID on container.`);
      }
    });
  });

  // --- MODIFICATION : Fermer en dehors via classe ---
  document.addEventListener('click', function(e) {
    searchContainers.forEach(container => {
      const button = document.querySelector(`[aria-controls="${container.id}"]`);
      // Si le conteneur est actif ET qu'on n'a pas cliqué dedans OU sur son bouton toggle
      if (container.classList.contains('is-active') && !container.contains(e.target) && button && !button.contains(e.target)) {
        container.classList.remove('is-active'); // <<< Utiliser classe
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });

   // --- MODIFICATION : Fermer avec Echap via classe ---
   document.addEventListener('keydown', function(e) {
       if (e.key === "Escape") {
           searchContainers.forEach(container => {
               if (container.classList.contains('is-active')) { // <<< Vérifier classe
                   const button = document.querySelector(`[aria-controls="${container.id}"]`);
                   container.classList.remove('is-active'); // <<< Utiliser classe
                   if (button) { button.setAttribute('aria-expanded', 'false'); }
               }
           });
       }
   });

} // Fin SearchToggle