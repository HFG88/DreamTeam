import { clearContents } from "../clearComponents";
import { ac, el, qs } from "../elements";
import { fetchJson, fetchMainIndexJson } from "../fetcher";
import { renderSubpageIndex } from "./renderSubpage";

export async function renderContentPage(body, type, content) {
  console.log("Rendering content page: ", content);
  await renderSubpageIndex(body, type);
  const path = `./data/${type}/${content}.json`;
  console.log("Content path: ", path);
  const contentJson = await fetchJson(path);
  console.log(`Render content page ${content} json: `, contentJson);
  const subPath = `./data/${type}/index.json`;
  const subIndexJson = await fetchJson(subPath);
  const main = qs(body, 'main');

  let newContent = el('p', {}, 'Content er ekki til');
  if (subIndexJson.content.find((i) => i.type === content)) {
    newContent = el(
      "section",
      { class: "contentSection" },
      "Þetta content section er " + content
    );
  }

  
  
  ac(main, newContent);

 
} 
