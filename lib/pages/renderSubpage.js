// Add to the top of main.js and key modules
if (import.meta.hot) {
  console.log('HMR is enabled for this module.');
}

import { ac, el, qs } from '../elements';
import { fetchMainIndexJson, fetchJson } from '../fetcher';
import { renderSubpageNav } from '../components/subPageNav.js';
import { clearContents } from '../clearComponents.js';
import { render } from '../../main.js';
/**
 * 
 * @param {Element} body 
 * @param {String} type 
 */
export async function renderSubpageIndex(body, type) {
  console.log('Rendering sub page: ', type);
  console.trace('Tracing renderSubpageIndex');

  const indexJson = await fetchMainIndexJson();
  const path = `./data/${type}/index.json`;
  const subIndexJson = await fetchJson(path);
  const mainElement = qs(body, 'main');
  console.log('Path: ', path);
  console.log('Sub json', subIndexJson);

  let subNav = el('p', {}, 'Efni er ekki til');
  if (indexJson.navigation.find((i) => i.slug === type)) {
    subNav = renderSubpageNav(type, subIndexJson, render);
  }
  
  try{
    const oldNav = qs(mainElement, 'form');
    oldNav.remove();
    ac(mainElement, subNav);
  }
  catch{
    ac(mainElement, subNav);
  }
    

  clearContents();
}
