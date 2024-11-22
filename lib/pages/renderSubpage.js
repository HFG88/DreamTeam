import { ac, el, qs } from '../elements';
import { fetchMainIndexJson, fetchJson } from '../fetcher';
import { renderSubpageNav } from '../components/subPageNav.js';
import { clearContents } from '../clearComponents.js';
import { render } from '../../main.js';
import { changeTitle } from '../changeTitle.js';

// ********************* Rúlla smá í gegnum þetta

/**
 * 
 * @param {Element} body
 * @param {String | null} type
 */
export async function renderSubpageIndex(body, type) {
  console.log('Rendering sub page: ', type);

  const indexJson = await fetchMainIndexJson();
  const path = `./data/${type}/index.json`;
  const mainElement = qs(body, 'main');

  let subNav;

  try {
    try {
      const fallBack = qs(mainElement, 'p');
      if (fallBack && fallBack.textContent === 'Efnið er ekki rétt') {
        fallBack.remove();
      }
    } catch {
      console.log('No fallback message to remove.');
    }

    // Attempt to fetch the JSON file
    const subIndexJson = await fetchJson(path);
    changeTitle(subIndexJson.title);
    // Check if the type exists in navigation
    if (indexJson.navigation.find((i) => i.slug === type)) {
      subNav = renderSubpageNav(type, subIndexJson, render);
    } else {
      subNav = el('p', {}, 'Efnið er ekki til'); // Type not in navigation
    }
  } catch (error) {
    // Handle missing file or fetch errors
    console.warn(`Error fetching JSON for type "${type}":`, error.message);

    // Clear any old navigation and set fallback message
    try {
      const oldNav = qs(mainElement, 'form');
      oldNav.remove();
    } catch {
      console.log('No previous navigation to remove.');
    }

    subNav = el('p', {}, 'Efnið er ekki til'); // Fallback message
  }

  // Clear existing content before appending new content
  try {
    const oldNav = qs(mainElement, 'form');
    oldNav.remove();
  } catch {
    console.log('No previous navigation to remove.');
  }

  ac(mainElement, subNav);
  clearContents();
}
