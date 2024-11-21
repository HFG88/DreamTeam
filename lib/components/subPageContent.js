import { ac, el } from "../elements";

export function renderSubpageContent(type, subIndexJson){
    console.log('Rendering subpage content');

    const buttonForm = el('form', {});
    
    for(const Object of subIndexJson.content){
        const button = renderButton(Object, type);
        ac(buttonForm, button);
    }
    buttonForm.addEventListener('submit', submitHandler)
    return buttonForm;
}

function renderButton(object, subType){
    const {slug, text, title, type, url} = object;
    const button = el('button', {type, data_url: url, data_slug: slug, data_subType: subType}, title);
    return button;
}

async function submitHandler(event){
    console.log('Ýtti á ', event.submitter);
    event.preventDefault();
    const button = event.submitter;
    const type = button.getAttribute('data_subType');
    const content = button.getAttribute('data_slug');
    const params = `/?type=${type}&content=${content}`
    window.history.pushState({}, '', params);
}
  