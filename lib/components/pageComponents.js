import { ac, el, qs } from "../elements";
import { renderNav } from "./navigation";

export async function renderHeader(body, indexJson) {
  try {
    qs(body, "header");
  } catch {
    console.log("Rendering header");
    const headerElement = el(
      "header",
      {},
      el("h1", {}, indexJson.title),
      renderNav(indexJson.navigation, body)
    );

    ac(body, headerElement);
  }
}


export function renderMain(body, indexJson) {
  try{
    qs(body, 'main');
  }
  catch{
    console.log('Rendering main');
    const mainElement = el("main", {}, el("section", {}, indexJson.description));
    ac(body, mainElement);
  } 
}

export function renderFooter(body, indexJson){
  try{
    qs(body, 'footer');
  }
  catch{
    console.log('Rendering footer');
    const footerElement = el("footer", {}, indexJson.footer);
    ac(body, footerElement);
  }
}