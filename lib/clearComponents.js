import { renderFooter, renderMain } from "./components/pageComponents";
import { ac, el, qs } from "./elements";
import { fetchMainIndexJson } from "./fetcher";

const body = qs(document, "body");

export async function resetMain() {
  const indexJson = await fetchMainIndexJson();
  const mainElement = qs(body, "main");
  mainElement.remove();
  const footerElement = qs(body, "footer");
  footerElement.remove();
  renderMain(body);
  renderFooter(body);
}

export function clearContents() {
  const main = qs(body, "main");

  try {
    const contentSection = qs(main, ".contentSection");
    contentSection.remove();
  } catch {}
}
