// themes/salah-nomad-theme/assets/js/footer-quote-rotator.js
document.addEventListener('DOMContentLoaded', () => {
  const quoteContainer = document.getElementById('footer-quote-container');
  const quoteTextElement = document.getElementById('footer-quote-text');
  const quoteAuthorElement = document.getElementById('footer-quote-author');
  const quotesDataElement = document.getElementById('footer-quotes-data');

  // Quitter silencieusement si les éléments essentiels ne sont pas trouvés
  if (!quoteContainer || !quoteTextElement || !quoteAuthorElement || !quotesDataElement) {
    return;
  }

  let rawJsonText = quotesDataElement.textContent.trim();
  let quotes;

  try {
    let parsedData = JSON.parse(rawJsonText);
    // Gérer la possibilité d'une double stringification du JSON
    if (typeof parsedData === 'string' && (parsedData.startsWith('[') && parsedData.endsWith(']'))) {
      quotes = JSON.parse(parsedData); 
    } else {
      quotes = parsedData;
    }
  } catch (e) {
    console.error('Error parsing footer quotes JSON:', e); // Garder ce log d'erreur est utile
    return;
  }

  // Quitter si pas de citations valides
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return; 
  }

  let currentQuoteIndex = 0; 
  const intervalTime = 12000; // Temps en millisecondes entre les changements (12 secondes)
  const fadeDuration = 600;   // Durée du fondu en millisecondes (0.6 seconde)

  function displayNextFooterQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    const nextQuote = quotes[currentQuoteIndex];

    quoteContainer.style.opacity = '0'; // Démarre le fondu sortant

    setTimeout(() => {
      // Met à jour le contenu après le fondu sortant
      quoteTextElement.innerHTML = nextQuote.text; // innerHTML pour permettre le Markdown parsé par Hugo
      
      if (nextQuote.author && nextQuote.author.trim() !== "") {
        quoteAuthorElement.innerHTML = `— ${nextQuote.author}`;
        quoteAuthorElement.style.display = ''; // S'assurer qu'il est visible
      } else {
        quoteAuthorElement.innerHTML = '';
        quoteAuthorElement.style.display = 'none'; // Cacher si pas d'auteur
      }
      
      quoteContainer.style.opacity = '1'; // Démarre le fondu entrant
    }, fadeDuration);
  }

  // Démarrer la rotation seulement s'il y a plus d'une citation
  if (quotes.length > 1) {
    quoteContainer.style.transition = `opacity ${fadeDuration / 1000}s ease-in-out`;
    setInterval(displayNextFooterQuote, intervalTime);
    // console.log('Footer quote rotator initialized.'); // Log optionnel final
  } else {
    // S'il n'y a qu'une seule citation (ou aucune après la vérification),
    // s'assurer qu'elle est visible sans démarrer de transition.
    quoteContainer.style.opacity = '1';
  }
});