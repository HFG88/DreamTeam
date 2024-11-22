import { changeTitle } from './lib/changeTitle.js';
import { resetMain } from './lib/clearComponents.js';
import {
  renderFooter,
  renderHeader,
  renderMain,
} from './lib/components/pageComponents.js';
import { qs } from './lib/elements.js';
import { renderContentPage } from './lib/pages/contentPage.js';
import renderFlashcards from './lib/pages/flashcardsPage.js';
import { renderSubpageIndex } from './lib/pages/renderSubpage.js';

const body = qs(document, 'body');

window.addEventListener('popstate', () => {
  console.log('Popstate triggered');
  render(body, window.location.search);
});


/**
 * 
 * @param {Element} body 
 * @param {*} queryString 
 * @returns 
 */
export async function render(body, queryString) {
  console.log(`Render function- QueeryString: ${queryString}`);
  renderHeader(body);
  renderMain(body);
  renderFooter(body);

  const params = new URLSearchParams(queryString);
  const type = params.get('type');
  const content = params.get('content');

  if (!type && !content) {
    changeTitle('Dream Team');
    

    resetMain(body);
  }
  else if (!content) {
    renderFlashcards(type);
    renderSubpageIndex(body, type);
  }
  else if (content === 'flashcards') {
    await renderFlashcards(type); // Handle flashcards rendering
  }
  
  else{
    renderContentPage(body, type, content);
  }
}

render(body, window.location.search);
