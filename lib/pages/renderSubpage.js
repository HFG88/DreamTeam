import { ac, el, qs } from "../elements";
import { fetchMainIndexJson, fetchJson } from "../fetcher";
import { renderSubpageNav } from "../components/subPageNav.js";
import { clearContents } from "../clearComponents.js";

export async function renderSubpageIndex(body, type) {
  console.log("Rendering sub page: ", type);

  const indexJson = await fetchMainIndexJson();
  const path = `./data/${type}/index.json`;
  const subIndexJson = await fetchJson(path);
  const mainElement = qs(body, "main");
  console.log("Path: ", path);
  console.log("Sub json", subIndexJson);

  let subNav = el("p", {}, "Efni er ekki til");
  if (indexJson.navigation.find((i) => i.slug === type)) {
    subNav = renderSubpageNav(type, subIndexJson);
  }

  try {
    const oldNav = qs(mainElement, "form");
    oldNav.remove();
    ac(mainElement, subNav);
  } catch {
    ac(mainElement, subNav);
  }

  clearContents();
}
