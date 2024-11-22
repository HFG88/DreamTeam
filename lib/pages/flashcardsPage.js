import { el } from '../elements';
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
    const flashcardsWrapper = el('div', { class: 'flashcards-wrapper' });

    // Loop through the keywords and create flashcards
    data.keywords.forEach((keyword) => {
      const flashcard = document.createElement('div');
      flashcard.className = 'flashcard';

      const front = document.createElement('div');
      front.className = 'front';
      front.textContent = keyword.title; // Show the title on the front

      const back = document.createElement('div');
      back.className = 'back hidden'; // Initially hidden
      back.textContent = keyword.content; // Show the definition on the back

      // Add event listener for toggling visibility
      flashcard.addEventListener('click', () => {
        back.classList.toggle('hidden'); // Toggle the hidden class
      });

      // Append front and back to the flashcard
      flashcard.appendChild(front);
      flashcard.appendChild(back);

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
