import { ac, el } from "../elements";
import { fetchIndexJson } from "../fetcher";
import { constructNav } from "./navigation";

export async function renderHeader(root) {
    const indexJson = await fetchIndexJson();
  
    const headerElement = el(
      "header",
      {},
      el("h1", {}, indexJson.title),
      constructNav(indexJson.navigation)
    );
    
  ac(root, headerElement);
}