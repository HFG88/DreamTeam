import { ac, el, qs } from '../Helpers/elements';

/**
 *
 * @param {*} type
 * @param {*} subIndexJson
 * @returns
 */
export function renderSubpageNav(type, subIndexJson, render) {
  console.log('Rendering subpage content');

  const form = el('form', {});

  for (const Object of subIndexJson.content) {
    const button = renderButton(Object, type);
    ac(form, button);
  }
  form.addEventListener('submit', (event) => submitHandler(event, render));
  return form;
}

function renderButton(object, subType) {
  const { slug, text, title, type, url } = object;
  const button = el(
    'button',
    { type, data_url: url, data_slug: slug, data_subType: subType },
    title
  );
  // Birta texta
  console.log('Birta ', text);
  return button;
}

async function submitHandler(event, render) {
  console.log('Ýtti á ', event.submitter);
  event.preventDefault();
  const button = event.submitter;
  const type = button.getAttribute('data_subType');
  const content = button.getAttribute('data_slug');

  const params = `/?type=${type}&content=${content}`;
  window.history.pushState({}, '', params);

  const body = qs(document, 'body');
  render(body, window.location.search);
}
