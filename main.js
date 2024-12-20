import { changeTitle } from './lib/Helpers/changeTitle.js';
import { resetMain } from './lib/Helpers/clearComponents.js';
import {
  renderFooter,
  renderHeader,
  renderMain,
} from './lib/components/pageComponents.js';
import { qs } from './lib/Helpers/elements.js';
import { renderContentPage } from './lib/pages/contentPage.js';
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
  await renderHeader(body);
  await renderMain(body);
  await renderFooter(body);

  const params = new URLSearchParams(queryString);
  const type = params.get('type');
  const content = params.get('content');

  if (!type && !content) {
    changeTitle('Dream Team');
    resetMain(body);
  } 
  else if (!content) {
    console.log('Rendering subpage index');
    renderSubpageIndex(body, type); 
  } 
  else {
    console.log('Rendering content page');
    renderContentPage(body, type, content);
  }
}

render(body, window.location.search);
