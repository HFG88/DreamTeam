import { ac, el, qs } from '../elements';
import { fetchMainIndexJson } from '../fetcher';
import { renderNav } from './navigation';

/**
 *
 * @param {Element} body
 *
 */
export async function renderHeader(body) {
  const mainIndexJson = await fetchMainIndexJson();
  try {
    qs(body, 'header');
  } catch {
    console.log('Rendering header');
    const headerElement = el(
      'header',
      {},
      el('h1', {}, mainIndexJson.title),
      renderNav(mainIndexJson.navigation, body)
    );

    ac(body, headerElement);
  }
}
/**
 * 
 * @param {Element} body 
 */
export async function renderMain(body) {
  const mainIndexJson = await fetchMainIndexJson();

  try {
    qs(body, 'main');
  } catch {
    console.log('Rendering main');
    const mainElement = el(
      'main',
      {},
      el('section', {}, mainIndexJson.description)
    );
    ac(body, mainElement);
  }
}

/**
 * 
 * @param {Element} body 
 */
export async function renderFooter(body) {
  const mainIndexJson = await fetchMainIndexJson();

  try {
    qs(body, 'footer');
  } catch {
    console.log('Rendering footer');
    const footerElement = el('footer', {}, mainIndexJson.footer);
    ac(body, footerElement);
  }
}
