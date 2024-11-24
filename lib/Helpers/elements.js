/**
 * Býr til element með nafni og bætir við öðrum elementum eða texta nóðum.
 * @param {string} name Nafn á elementi
 * @param {object} attributes Eiginleikar á elementi, strengir eða föll.
 * @param  {...string | HTMLElement} children Hugsanleg börn: önnur element eða strengir
 * @returns {HTMLElement} Elementi með gefnum börnum
 */
export function el(name, attributes = {}, ...children) {
  const e = document.createElement(name);

  for (const key of Object.keys(attributes)) {
    if (typeof attributes[key] === 'function') {
      e.addEventListener(key, attributes[key]);
      continue;
    }
    e.setAttribute(key, attributes[key]);
  }

  for (const child of children) {
    if (!child && child != '') {
      console.warn('Child is null', name, attributes);

      continue;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      e.appendChild(document.createTextNode(child.toString()));
    } else {
      e.appendChild(child);
    }
  }

  return e;
}

/**
 * Fjarlægir öll börn `element`.
 * @param {Element} element Element sem á að tæma
 */
export function empty(element) {
  if (!element || !element.firstChild) {
    return;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Finnur element
 * @param {string} ID ID af element sem leitað er að
 * @returns {Element}
 * @throws {Error}
 */
export function getEl(ID) {
  if (typeof ID !== 'string') {
    throw new Error(`getEl bjóst við streng en '${ID}' er ${typeof ID}`);
  }
  const result = document.getElementById(ID);
  if (result) {
    return result;
  }
  throw new Error(`Element '${ID}' finnst ekki.`);
}

/**
 * Leitar að child element í parent element
 * @param {Element | Document} parentElement parent element sem leitað er í
 * @param {string} childElement child element sem leitað er að (Class eða Id eða tag)
 * @returns child element
 * @throws {Error}
 */
export function qs(parentElement, childElement) {
  if (
    !(parentElement instanceof Element) &&
    !(parentElement instanceof Document)
  ) {
    throw new Error(
      `qs, parentElement: bjóst við Element eða Document en '${parentElement}' er ${typeof parentElement}`
    );
  }
  if (typeof childElement !== 'string') {
    throw new Error(
      `qs, childElement: bjóst við streng en '${childElement}' er ${typeof childElement}`
    );
  }

  const result = parentElement.querySelector(childElement);
  if (result) {
    return result;
  }
  throw new Error(
    `Child element '${childElement}' af parent element '${parentElement}' finnst ekki.`
  );
}

export function hide(element) {
  getEl(element).classList.add('hidden');
}

export function show(element) {
  getEl(element).classList.remove('hidden');
}

export function toggleHidden(element) {
  getEl(element).classList.toggle('hidden');
}

/**
 * Bætir child element í parent element
 * @param {Element} parentElement
 * @param {HTMLElement} childElement
 */
export function ac(parentElement, childElement) {
  parentElement.appendChild(childElement);
}
