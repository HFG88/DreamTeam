import { ac, el } from "../elements";
import { fetchIndexJson, fetchJson } from "../fetcher";

export async function renderSubpage(root, type) {
    console.log('Rendering sub page: ', type);
    const path = `./data/${type}/index.json`;
    console.log(path);
    const indexJson = await fetchIndexJson();

    const subIndexJson = await fetchJson(path);
    console.log('Sub json', subIndexJson);

  
    let contentString = "EFNI ER EKKI GILT";
    if (indexJson.navigation.find((i) => i.slug === type)) {
        //TODO Breyta content string í content og setja content úr subindexjson inn sem eitthvað flipp. Gera það að sér module sem heitir render subPageContent eða eitthvað svo þetta gerist allt automatic
      contentString = type;
    }
    const mainElement = el("main", {}, el("p", {}, contentString));
    ac(root, mainElement);
  }
  