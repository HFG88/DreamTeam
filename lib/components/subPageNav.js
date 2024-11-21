import { render } from "../../main";
import { ac, el, qs } from "../elements";

export function renderSubpageNav(type, subIndexJson){
    console.log('Rendering subpage content');

    const form = el('form', {});
    
    for(const Object of subIndexJson.content){
        const button = renderButton(Object, type);
        ac(form, button);
    }
    form.addEventListener('submit', submitHandler)
    return form;
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


    const body = qs(document, "body");
    render(body, window.location.search);

}
  