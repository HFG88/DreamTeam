import { qs } from './elements';

export function changeTitle(title){
    const head = qs(document, 'head');
    const titleElement = qs(head, 'title');
    titleElement.textContent = title;    
}