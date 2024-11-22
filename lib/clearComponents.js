import { renderFooter, renderMain } from './components/pageComponents';
import { qs } from './elements';

/**
 *
 * @param {Element} body
 */
export async function resetMain(body) {
  try {
    const mainElement = qs(body, 'main');
    mainElement.remove();
  } catch {
    console.warn('Main element not found during resetMain.');
  }

  try {
    const footerElement = qs(body, 'footer');
    footerElement.remove();
  } catch {
    console.warn('Footer element not found during resetMain.');
  }

  renderMain(body);
  renderFooter(body);
}

/**
 *
 */
export function clearContents() {
  const body = qs(document, 'body');
  const main = qs(body, 'main');

  try {
    const contentSection = qs(main, '.contentSection');
    contentSection.remove();
  } catch {
    console.log('Content var clear');
  }
}
