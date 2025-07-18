// assets/js/widget-quote-rotator.js
// VERSION FINALE - Fusionne la logique fiable des anciens scripts avec la nouvelle architecture.

const GlobalQuoteRotator = () => {
  
  const initRotatorInstance = (instanceId) => {
    const container = document.getElementById(`rotator-container-${instanceId}`);
    const textElement = document.getElementById(`rotator-text-${instanceId}`);
    const authorElement = document.getElementById(`rotator-author-${instanceId}`);
    const dataElement = document.getElementById(`rotator-data-${instanceId}`);

    if (!container || !textElement || !dataElement) {
      return; // Instance non trouvée, on arrête.
    }

    let quotes;
    try {
      // Réplique de la logique de double parsing fiable de l'ancien script
      let parsedData = JSON.parse(dataElement.textContent.trim());
      if (typeof parsedData === 'string') {
        quotes = JSON.parse(parsedData);
      } else {
        quotes = parsedData;
      }
    } catch (e) {
      console.error(`Error parsing JSON for rotator '${instanceId}':`, e);
      return;
    }

    if (!Array.isArray(quotes) || quotes.length === 0) {
      return; // Pas de données valides.
    }

    // S'il n'y a qu'une seule citation, on s'assure qu'elle est visible et on arrête.
    if (quotes.length <= 1) {
      container.style.opacity = '1';
      return;
    }

    let currentIndex = 0;
    const FADE_TIME = 500; // ms
    const DISPLAY_TIME = 8000; // 8 secondes

    // Applique la transition CSS au conteneur, comme dans l'ancien script
    container.style.transition = `opacity ${FADE_TIME / 1000}s ease-in-out`;
    container.style.opacity = '1'; // S'assurer que l'état initial est visible

    const rotateQuote = () => {
      currentIndex = (currentIndex + 1) % quotes.length;
      const nextQuote = quotes[currentIndex];

      // Appliquer le fondu sortant sur le conteneur
      container.style.opacity = '0';

      setTimeout(() => {
        textElement.innerHTML = nextQuote.text;
        
        if (authorElement) {
          if (nextQuote.author && nextQuote.author.trim() !== "") {
            authorElement.textContent = `— ${nextQuote.author}`;
            authorElement.style.display = 'block';
          } else {
            authorElement.style.display = 'none';
          }
        }
        // Appliquer le fondu entrant
        container.style.opacity = '1';
      }, FADE_TIME);
    };

    setInterval(rotateQuote, DISPLAY_TIME);
  };

  // Liste de tous les rotateurs possibles sur le site.
  const rotatorIds = ['roots', 'sidebar', 'footer']; 
  rotatorIds.forEach(id => initRotatorInstance(id));
};

export default GlobalQuoteRotator;