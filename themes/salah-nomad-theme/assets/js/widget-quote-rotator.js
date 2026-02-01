// assets/js/widget-quote-rotator.js
// VERSION FINALE - Gère TOUS les rotateurs du site, y compris 'linktree'.

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

    if (!Array.isArray(quotes) || quotes.length <= 1) {
      container.style.opacity = '1';
      return;
    }

    let currentIndex = 0;
    const FADE_TIME = 500; // ms
    const DISPLAY_TIME = 8000; // 8 secondes

    container.style.transition = `opacity ${FADE_TIME / 1000}s ease-in-out`;
    container.style.opacity = '1';

    const rotateQuote = () => {
      currentIndex = (currentIndex + 1) % quotes.length;
      const nextQuote = quotes[currentIndex];

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
        container.style.opacity = '1';
      }, FADE_TIME);
    };

    setInterval(rotateQuote, DISPLAY_TIME);
  };

  // --- MODIFICATION ICI ---
  // On ajoute 'linktree' à la liste des rotateurs à initialiser.
  const rotatorIds = ['roots', 'sidebar', 'footer', 'linktree']; 
  
  rotatorIds.forEach(id => initRotatorInstance(id));
};

export default GlobalQuoteRotator;