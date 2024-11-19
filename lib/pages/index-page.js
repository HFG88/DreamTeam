import { ac, el } from "../elements";
import { fetchIndexJson } from "../fetcher";

export async function renderIndexPage(root) {
    console.log('Rendering main index');
  const indexJson = await fetchIndexJson();

  const mainElement = el("main", {}, el("section", {}, indexJson.description));

  const footerElement = el("footer", {}, indexJson.footer);

  ac(root, mainElement);
  ac(root, footerElement);
}



