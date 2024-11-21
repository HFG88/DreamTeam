/**
 * Sækir json file
 * @param {string} file Slóðin á json file-ið
 * @returns {Promise<Object>} Skilar json file-inu
 * @throws {Error} Ef json finnst ekki
 */
export async function fetchJson(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Gat ekki sótt ${file}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching JSON file "${file}":`, error.message);
    throw error; 
  }
}

/**
 * Fetches the main index JSON file.
 * @returns {Promise<Object>} Parsed JSON object for the main index.
 * @throws {Error} If the file cannot be fetched or parsed.
 */
export async function fetchMainIndexJson() {
  try {
    return await fetchJson('./data/index.json');
  } catch (error) {
    console.error('Error fetching main index JSON:', error.message);
    throw error;
  }
}
