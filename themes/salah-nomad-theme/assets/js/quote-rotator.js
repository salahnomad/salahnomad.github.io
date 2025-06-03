// themes/salah-nomad-theme/assets/js/quote-rotator.js
document.addEventListener('DOMContentLoaded', () => {
  const quoteContainer = document.getElementById('sidebar-quote-container');
  const quoteTextElement = document.getElementById('sidebar-quote-text');
  const quoteAuthorElement = document.getElementById('sidebar-quote-author');
  const quotesDataElement = document.getElementById('quotes-data');

  if (!quoteContainer || !quoteTextElement || !quoteAuthorElement || !quotesDataElement) {
    return; // Quitte silencieusement si les éléments ne sont pas là
  }

  let rawJsonText = quotesDataElement.textContent.trim();
  let quotes;

  try {
    let parsedData = JSON.parse(rawJsonText);
    if (typeof parsedData === 'string') {
      // Le premier parse a retourné une chaîne, essayons de la parser à nouveau
      quotes = JSON.parse(parsedData);
    } else {
      quotes = parsedData;
    }
  } catch (e) {
    console.error('Error parsing quotes JSON for rotator:', e);
    return;
  }

  if (!Array.isArray(quotes) || quotes.length === 0) {
    return; // Pas de citations ou données invalides
  }

  let currentQuoteIndex = 0; 
  const intervalTime = 10000; // 10 secondes
  const fadeDuration = 500;   // 0.5 seconde

  function displayNextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    const nextQuote = quotes[currentQuoteIndex];

    quoteContainer.style.opacity = '0';

    setTimeout(() => {
      quoteTextElement.innerHTML = nextQuote.text; 
      
      if (nextQuote.author && nextQuote.author.trim() !== "") {
        quoteAuthorElement.innerHTML = `— ${nextQuote.author}`;
        quoteAuthorElement.style.display = ''; 
      } else {
        quoteAuthorElement.innerHTML = '';
        quoteAuthorElement.style.display = 'none'; 
      }
      
      quoteContainer.style.opacity = '1';
    }, fadeDuration);
  }

  if (quotes.length > 1) {
    quoteContainer.style.transition = `opacity ${fadeDuration / 1000}s ease-in-out`;
    setInterval(displayNextQuote, intervalTime);
  } else {
    // S'assurer que la citation unique est visible si pas de rotation
    quoteContainer.style.opacity = '1';
  }
});