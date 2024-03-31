const quoteText = document.getElementById('quoteText');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const CopyQuoteBtn = document.getElementById('CopyQuoteBtn');
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


function copyTextFromElement(elementId) {
  // Get the HTML element by its ID
  const element = document.getElementById(elementId);
  
  // Check if the element exists
  if (!element) {
    console.error('Element with ID ' + elementId + ' not found');
    return;
  }
  
  // Get the text content of the element
  const text = element.textContent;
  
  // Copy the text to the clipboard
  copyToClipboard(text);
}

function copyToClipboard(text) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Make the textarea invisible
  textarea.style.position = 'fixed';
  textarea.style.opacity = 0;

  // Append the textarea to the document body
  document.body.appendChild(textarea);

  // Select the text within the textarea
  textarea.select();

  try {
    // Copy the selected text to the clipboard
    const success = document.execCommand('copy');
    if (!success) {
      console.error('Failed to copy text to clipboard');
    } else {
      console.log('Text copied to clipboard:', text);
      quoteText.style.color = "green"
      quoteText.textContent = "Text copied to clipboard!"
    }
  } catch (err) {
    console.error('Unable to copy text:', err);
  } finally {
    // Remove the textarea from the document body
    document.body.removeChild(textarea);
  }
}

CopyQuoteBtn.addEventListener('click', ()=> {
  if(quoteText.textContent != "") {
    copyTextFromElement("quoteText")
  }
})

newQuoteBtn.addEventListener('click', fetchQuote);

fetchQuote();
