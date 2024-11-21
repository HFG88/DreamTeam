import { empty, qs } from "./lib/elements.js";
import { renderContentPage } from "./lib/pages/contentPage.js";
import { renderMainIndex } from "./lib/pages/mainIndex.js";
import { renderSubpage } from "./lib/pages/renderSubpage.js";
const body = qs(document, "body");

/**
 * 
 * @param {string} queryString 
 * @returns 
 */
export async function render(body, queryString) {
  console.log(`Render function- QueeryString: ${queryString}`);
  const params = new URLSearchParams(queryString);
  const type = params.get("type");
  const content = params.get("content");
  if (!type) {
    console.log('Render function: mainIndex');
    return renderMainIndex(body);
  }
  if (!content) {
    console.log('Render function: subPage');

    return renderSubpage(body, type);
  }
  console.log('Render function: contentPage');

  return renderContentPage(body, content);
}
render(body, window.location.search);
