import { ac, el } from '../Helpers/elements.js';
export default async function renderFlashcards(json) {
    const flashcardsWrapper = el('section', { class: 'flashcards-wrapper' });
    const keywords = json.keywords;
    for(const keyword of keywords){
      const flashcard = el('div', { class: 'flashcard' });
      const flashcardInner = el('div', {class: 'flashcard-inner'});

      const front = el('div', { class: 'front' }, keyword.title);
      const back = el('div', { class: 'back hidden' }, keyword.content);
      const backFront = el('div', { class: 'back-front hidden' }, keyword.title);

      flashcard.addEventListener('click', () => {
        flashcardInner.classList.toggle('flipped');
        front.classList.toggle('hidden');
        back.classList.toggle('hidden');
        backFront.classList.toggle('hidden');
      });

      ac(flashcardInner, front);
      ac(flashcardInner, backFront);
      ac(flashcardInner, back);
      ac(flashcard, flashcardInner);
      ac(flashcardsWrapper, flashcard);
    }
     
      return flashcardsWrapper;
    
}
