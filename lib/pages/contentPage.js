import { ac, el, qs } from '../Helpers/elements';
import { fileIn } from '../Helpers/fileExists';
import renderFlashcards from './flashcardsPage';
import { renderSubpageIndex } from './renderSubpage';

export async function renderContentPage(body, type, content) {
  console.trace('Tracing content page ', type, content);
  await renderSubpageIndex(body, type);

  const contentSection = el('section', { class: 'contentSection' });
  const main = qs(body, 'main');


  let contentJson;
  let newContent;
  let path;
  if (content === 'flashcards') {
    path = `./data/${type}/keywords.json`;
    contentJson = await fileIn(path);
    newContent = await renderFlashcards(contentJson.file);
    ac(contentSection, newContent);
    ac(main, contentSection);
  } else {
    path = `./data/${type}/${content}.json`;
    contentJson = await fileIn(path);
    console.log(
      'Content json: -Exists: ' +
        contentJson.exists +
        ' -File: ' +
        contentJson.file
    );
    if (contentJson.exists) {
      newContent = renderContentSection();
     
        } else {
      newContent = el('p', {}, 'Content not available');
    }
    ac(contentSection, newContent);
    ac(main, contentSection);
  }
}

function renderContentSection(){
  return el('p', {}, 'Þetta content er til');
}
