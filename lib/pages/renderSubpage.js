import { ac, el, empty, qs } from '../Helpers/elements.js';
import { fileIn } from '../Helpers/fileExists.js';
import {render} from '../../main.js'
import { renderSubpageNav} from '../components/subPageNav.js'


// ********************* Rúlla smá í gegnum þetta

/**
 *
 * @param {Element} body
 * @param {String | null} type
 */
export async function renderSubpageIndex(body, type) {
  console.trace('Tracing sub page ', type);

  const path = `./data/${type}/index.json`;
  const mainElement = qs(body, 'main');

  empty(mainElement);

  let subSection = el('section', {class: 'subSection'});

  const subIndex = await fileIn(path);
  console.log(subIndex.exists, subIndex.file);

  if (subIndex.exists) {
    const subIndexJson = subIndex.file;
    const textEl = el('h2', {class: 'sub-header'}, subIndexJson.text);
    ac(subSection, textEl);

    const nav = renderSubpageNav(type, subIndexJson, render);
    ac(subSection, nav);
    
  }
  else{
    subSection = el('p', {}, 'Type file ekki til');
  }
  ac(mainElement, subSection);
}
