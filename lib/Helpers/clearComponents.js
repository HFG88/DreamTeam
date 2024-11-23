import { renderFooter, renderMain } from '../components/pageComponents';
import { qs } from './elements';
import { removeFrom } from './removeFrom';

/**
 *
 * @param {Element} body
 */
export async function resetMain(body) {
 removeFrom(body, 'main');
 removeFrom(body, 'footer');

  renderMain(body);
  renderFooter(body);
}

/**
 *
 */
export function clearContents() {
  const body = qs(document, 'body');
  const main = qs(body, 'main');
  removeFrom(main, '.contentSection');
}
