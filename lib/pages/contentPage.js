import { ac, el, qs } from '../Helpers/elements';
import { fileIn } from '../Helpers/fileExists';
import { renderSubpageIndex } from './renderSubpage';

export async function renderContentPage(body, type, content) {
console.trace('Tracing content page ', type, content);
  await renderSubpageIndex(body, type);

  const path = `./data/${type}/${content}.json`;
  const subPath = `./data/${type}/index.json`;

  const subIndexJson = await fileIn(subPath);
  const contentJson = await fileIn(path);

  let newContent = el('p', {class: 'fallback'}, 'Content er ekki til');
  
  if(contentJson.exists){
    console.log('ContentJson í content: ', contentJson.file);
    if(subIndexJson.exists){
      console.log('SubIndexJson í content: ', subIndexJson.file);
    }

  }


  const main = qs(body, 'main');
  ac(main, newContent);
}