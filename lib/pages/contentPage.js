import { ac, el, qs } from '../elements';
import { fetchJson } from '../fetcher';
import { renderSubpageIndex } from './renderSubpage';

export async function renderContentPage(body, type, content) {
  console.trace('Tracing renderContentPage');
  console.log('Rendering content page: ', content);

  await renderSubpageIndex(body, type);

  const path = `./data/${type}/${content}.json`;
  console.log('Content path: ', path);

  let newContent;

  try {
    const contentJson = await fetchJson(path);
    console.log(`Render content page ${content} json: `, contentJson);

    // Fetch the sub-index JSON to verify content type
    const subPath = `./data/${type}/index.json`;
    const subIndexJson = await fetchJson(subPath);
    console.log('Sub index json: ', subIndexJson);

    // Check if the content type exists in the sub-index JSON
    if (subIndexJson.content.find((i) => i.type === content)) {
      //Breyta þessu í subIndexContent textann
      newContent = el(
        'section',
        { class: 'contentSection' },
        'Þetta content section er ' + content
      );
    } else {
      console.warn('Content type not found in subIndexJson.');
      newContent = el('p', {}, 'Content er ekki rétt');
    }
  } catch (error) {
    console.warn(`Error fetching data for content "${content}":`, error.message);
    newContent = el('p', {}, 'Content er ekki rétt');
  }

  // Append the new content
  const main = qs(body, 'main');
  ac(main, newContent);
}
