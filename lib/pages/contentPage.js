import { ac, el, qs } from '../Helpers/elements';
import { fileIn } from '../Helpers/fileExists';
import renderFlashcards from './flashcardsPage';
import { renderSubpageIndex } from './renderSubpage';

export async function renderContentPage(body, type, content) {
  console.trace('Tracing content page ', type, content);
  await renderSubpageIndex(body, type);

  const contentSection = el('section', { class: 'contentSection' });
  const main = qs(body, 'main');
  let newContent = el('p', {}, 'Content not available');

  let contentJson;
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
      newContent = renderContentSection(content, contentJson.file);
    } 
      ac(contentSection, /** @type {HTMLElement} */ (newContent));
      ac(main, contentSection);
    
  }
}

/**
 * 
 * @param {*} content 
 * @param {*} json 
 * @returns 
 */
function renderContentSection(content, json) {
  let contentContent;
  switch (content) {
    case 'lectures':
      contentContent = el('div', {}, `Þetta er ${content} section`);
      break;
      case 'keywords':
      contentContent = el('div', {}, renderKeywords(json));
      break;
      case 'questions':
      contentContent = el('div', {}, `Þetta er ${content} section`);
      break;
  }

  return /** @type {HTMLElement} */ (contentContent);
}



function renderKeywords(json){
  const keywords = json.keywords;
  const keyWords = el('div', {class: 'keywords'});
  for(const keyword of keywords){
    const keyWord = el('div', {class: 'keyword'}, el('h3', {class: 'title'}, keyword.title), el('p', {class: 'keyword-content'}, keyword.content));
    ac(keyWords, keyWord);
  }
  return keyWords;
}