// --- Fichier : assets/js/dark-mode-toggle.js ---

const DarkModeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement; // Cible <html>

  // Quitter si les éléments essentiels ne sont pas trouvés
  if (!themeToggle || !htmlElement) {
    console.warn("Theme toggle button (#theme-toggle) or HTML element not found. Dark mode functionality disabled.");
    return;
  }

  // Fonction pour appliquer le thème (classe + stockage)
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }
    // Mettre à jour le localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn("Could not access localStorage:", e);
    }
    console.log(`Theme applied: ${theme}`); // Log pour débogage
  };

  // Fonction pour obtenir le thème préféré
  const getPreferredTheme = () => {
    let storedTheme = null;
    try {
       storedTheme = localStorage.getItem('theme');
    } catch (e) {
       console.warn("Could not access localStorage:", e);
    }

    if (storedTheme && (storedTheme === 'dark' || storedTheme === 'light')) {
      return storedTheme; // 1. Préférence stockée
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'; // 2. Préférence système (Dark)
    } else {
      return 'light'; // 3. Par défaut (Light)
    }
  };

  // Appliquer le thème initial au chargement (sans re-stocker)
  const initialTheme = getPreferredTheme();
  if (initialTheme === 'dark') {
      htmlElement.classList.add('dark-mode');
  } else {
      htmlElement.classList.remove('dark-mode');
  }
  console.log(`Initial theme check complete. Current theme class: ${htmlElement.classList.contains('dark-mode') ? 'dark-mode' : 'light'}`);

  // Gérer le clic sur le bouton
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    console.log(`Toggle clicked. Current: ${currentTheme}, New: ${newTheme}`);
    applyTheme(newTheme); // Applique la classe et met à jour le localStorage
  });

  // Optionnel : Écouter les changements de préférence système en temps réel
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        let storedTheme = null;
        try {
            storedTheme = localStorage.getItem('theme');
        } catch (e) { /* ignore */ }

        if (!storedTheme) { // Si aucune préférence manuelle n'est stockée
            const newColorScheme = event.matches ? 'dark' : 'light';
            applyTheme(newColorScheme);
            console.log(`System preference changed to ${newColorScheme}, theme applied.`);
        } else {
            console.log("System preference changed, but a manual preference exists.");
        }
    });
  } catch (e) {
      console.warn("Error listening for prefers-color-scheme changes:", e);
  }

  console.log("Dark Mode Toggle Initialized."); // Log final d'initialisation
};

// Exporter la fonction pour pouvoir l'importer dans main.js
export default DarkModeToggle;