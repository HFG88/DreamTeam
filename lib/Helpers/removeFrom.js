import { qs } from './elements';

/**
 * Ef child finnst innan container er það fjarlægt
 * @param {Element} container 
 * @param {String} child 
 */
export function removeFrom(container, child){
    try {
        const remove = qs(container, child);
        if (remove) {
          remove.remove();
          console.log(`Removed ${child} from ${container}`)
        }
      } catch {
        console.log(`No ${child} to remove from ${container}`);
      }
}