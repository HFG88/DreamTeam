import { renderHeader } from "./lib/components/header.js";
import { qs } from "./lib/elements.js";
import { renderContentPage } from "./lib/pages/contentPage.js";
import { renderIndexPage } from "./lib/pages/index-page.js";
import { renderSubpage } from "./lib/pages/renderSubpage.js";


async function render(root, queryString) {
  await renderHeader(root);

  const params = new URLSearchParams(queryString);
  const type = params.get("type");
  const content = params.get('content');
  console.log('Type: ', type, ' Content: ', content);
  if (!type) {
    return renderIndexPage(root);
  } else {
    if(content) {
      return renderContentPage(root, content);
    }
    renderSubpage(root, type);
  }
}

const root = qs(document, "body");
render(root, window.location.search);
