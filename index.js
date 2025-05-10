import { getLocalStorage } from "./storage.js";

import {
  generateHabits,
  showDate,
  updateCounter,
  addListenersToFilterButtons,
} from "./habitTracker.js";

showDate();
const loadedHabits = getLocalStorage();
generateHabits(loadedHabits);
updateCounter(loadedHabits);
addListenersToFilterButtons(loadedHabits);
