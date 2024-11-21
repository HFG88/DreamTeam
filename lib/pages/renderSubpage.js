import { ac, el, qs } from "../elements";
import { fetchMainIndexJson, fetchJson } from "../fetcher";
import { renderSubpageContent } from "../components/subPageContent.js";
import { renderHeader, renderMain } from "../components/pageComponents.js";

export async function renderSubpage(body, type) {
  console.log("Rendering sub page: ", type);
  const indexJson = await fetchMainIndexJson();
  renderHeader(body, indexJson);


  const path = `./data/${type}/index.json`;
  console.log('Path: ', path);

  const subIndexJson = await fetchJson(path);
  console.log("Sub json", subIndexJson);

  renderMain(body);
  const mainElement = qs(body, 'main');
 

  let subContent =  el('p', {}, 'Efni er ekki til');

  if (indexJson.navigation.find((i) => i.slug === type)) {
    subContent = renderSubpageContent(type, subIndexJson);
  }
  try{
    const formElement = qs(mainElement, 'form');
    formElement.remove();
    ac(mainElement, subContent);
  }
  catch{
    ac(mainElement, subContent);
  }
}
