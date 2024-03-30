const quoteText = document.getElementById('quoteText');
const newQuoteBtn = document.getElementById('newQuoteBtn');

async function fetchQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    quoteText.textContent = data.content + ' - ' + data.author;
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteText.textContent = 'Failed to fetch quote. Please try again later.';
  }
}

newQuoteBtn.addEventListener('click', fetchQuote);

fetchQuote();
