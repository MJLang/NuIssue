import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
export function initializeIcons() {
  library.add(faAngleDown);
  library.add(faTimesCircle);
  library.add(faCheckCircle);
}
