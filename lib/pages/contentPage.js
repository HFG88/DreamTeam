import { ac, el } from "../elements";

export function renderContentPage(root, contentJson) {
    console.log('Rendering content page');
  const mainElement = el(
    "main",
    {},
    el(
      "section",
      {},
      el(
        "p",
        {}, "Ég er content page, þetta er contentið mitt" +
          JSON.stringify(contentJson)
      )
    )
  );
  ac(root, mainElement);
}
