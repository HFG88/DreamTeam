import { renderMain, renderFooter, renderHeader } from "../components/pageComponents";
import { fetchMainIndexJson } from "../fetcher";

export async function renderMainIndex(body) {
  console.log("Rendering main index");
  const indexJson = await fetchMainIndexJson();
  renderHeader(body, indexJson);
  renderMain(body, indexJson);
  renderFooter(body, indexJson);
}
