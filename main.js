import { resetMain } from "./lib/clearComponents.js";
import {
  renderFooter,
  renderHeader,
  renderMain,
} from "./lib/components/pageComponents.js";
import { empty, qs } from "./lib/elements.js";
import { renderContentPage } from "./lib/pages/contentPage.js";
import { renderSubpageIndex } from "./lib/pages/renderSubpage.js";
const body = qs(document, "body");

/**
 *
 * @param {string} queryString
 * @returns
 */
export async function render(body, queryString) {
  console.log(`Render function- QueeryString: ${queryString}`);
  renderHeader(body);
  renderMain(body);
  renderFooter(body);

  const params = new URLSearchParams(queryString);
  const type = params.get("type");
  const content = params.get("content");
  if (!type && !content) {
    resetMain();
    return;
  }
  if (!content) {
    renderSubpageIndex(body, type);
    return;
  }
  renderContentPage(body, type, content);
  return;
}
render(body, window.location.search);
