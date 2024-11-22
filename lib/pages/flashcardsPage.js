import { fetchJson } from '../fetcher';

export default async function renderFlashcards(category) {
  const container = document.querySelector('footer'); // Assuming #app is your content area
  if (container) {
  container.innerHTML = ''; // Clear any existing content
  }

  try {
    // Fetch the keywords.json for the selected category
    const data = await fetchJson(`./data/${category}/keywords.json`);
    console.log(data);

    // Create a wrapper for flashcards
    const flashcardsWrapper = document.createElement('div');
    flashcardsWrapper.className = 'flashcards-wrapper';

    // Loop through the keywords and create flashcards
    data.keywords.forEach((keyword) => {
      const flashcard = document.createElement('div');
      flashcard.className = 'flashcard';

      const inner = document.createElement('div');
      inner.className = 'flashcard-inner';

      const front = document.createElement('div');
      front.className = 'front';
      front.textContent = keyword.title; // Show the title on the front

      const back = document.createElement('div');
      back.className = 'back';
      back.textContent = keyword.content; // Show the definition on the back

      // Append front and back to the inner container
      inner.appendChild(front);
      inner.appendChild(back);

      // Append the inner container to the flashcard
      flashcard.appendChild(inner);

      // Add event listener for flipping the card
      flashcard.addEventListener('click', () => {
        inner.classList.toggle('flipped');
      });

      // Append the flashcard to the wrapper
      flashcardsWrapper.appendChild(flashcard);
    });

    // Append the flashcardsWrapper to the container
    container?.appendChild(flashcardsWrapper);
  } catch (error) {
    console.error('Error loading flashcards:', error);
    if (container) {
        container.textContent = 'Unable to load flashcards.';
    }
    
  }
}
