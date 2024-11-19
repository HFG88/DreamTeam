export async function fetchJson(file) {
  const response = await fetch(file);
  const json = await response.json();
  return json;
}

/**
 * 
 * @returns {Promise<Object>}
 */
export async function fetchIndexJson() {
  const response = await fetch('./data/index.json');
  const indexJson = await response.json();
  return indexJson;
}
