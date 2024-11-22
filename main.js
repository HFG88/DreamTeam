// Add to the top of main.js and key modules
if (import.meta.hot) {
  console.log('HMR is enabled for this module.');
}


console.log('main.js initialized');
console.trace('Tracing main');

import { resetMain } from './lib/clearComponents.js';
import {
  renderFooter,
  renderHeader,
  renderMain,
} from './lib/components/pageComponents.js';
import { qs } from './lib/elements.js';
import { renderContentPage } from './lib/pages/contentPage.js';
import { renderSubpageIndex } from './lib/pages/renderSubpage.js';

const body = qs(document, 'body');

if (!window.__hasRegisteredDOMContentLoaded__) {
  window.__hasRegisteredDOMContentLoaded__ = true;

  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded triggered');
    render(body, window.location.search);
  });
}

window.addEventListener('popstate', () => {
  console.log('Popstate triggered');
  render(body, window.location.search);
});

let isRendering = false;

/**
 * Main render function
 */
export async function render(body, queryString) {
  if (isRendering) {
    console.warn('Render function already running. Skipping.');
    return;
  }

  isRendering = true;

  console.log(`Render function- QueeryString: ${queryString}`);
  console.trace('Tracing render');
  renderHeader(body);
  renderMain(body);
  renderFooter(body);

  const params = new URLSearchParams(queryString);
  const type = params.get('type');
  const content = params.get('content');

  if (!type && !content) {
    resetMain(body);
    isRendering = false;
    return;
  }

  if (!content) {
    renderSubpageIndex(body, type);
    isRendering = false;
    return;
  }

  renderContentPage(body, type, content);
  isRendering = false;
}
