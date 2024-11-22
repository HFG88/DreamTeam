import { fetchJson } from './fetcher';

export async function fileIn(path){
    try {
        const file = await fetchJson(path);
        return { exists: true, file }; // Return both existence and the file content
      } catch {
        return { exists: false, file: null }; // File doesn't exist or fetch failed
      }
}

export function keyValueIn(array, key, value) {
    const foundObject = array.find((item) => item[key] === value);
  
    if (foundObject) {
      return { exists: true, object: foundObject };
    }
  
    return { exists: false, object: null };
  }