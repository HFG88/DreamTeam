import { render } from '../../main';
import { ac, el } from '../Helpers/elements';

/**
 *
 * @param {Array<Object>} navArray
 * @param {Element} body
 * @returns
 */
export function renderNav(navArray, body) {
  console.log('renderingNav');
  const navElement = el('ul', { class: 'navigation__list' });

  for (const li of navArray) {
    const slug = li.type === 'flashcards' 
    ? `/?type=${li.slug}&content=flashcards` 
    : `/?type=${li.slug}`;  

    const listItem = el('li', { class: 'navigation__item' });
    const link = el('a', { href: slug, class: 'nav__link' }, li.title);

    link.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('Link event listener', link);
      await window.history.pushState({}, '', slug);
      await render(body, window.location.search);
    });

    ac(listItem, link);
    ac(navElement, listItem);
  }

  return el('nav', { class: 'navigation' }, navElement);
}
