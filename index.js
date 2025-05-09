import { addedHabits, stateOfElements } from "./storage.js";
import {
  getWeekDates,
  getTodayDate,
  generateID,
  filterHabits,
} from "./utils.js";
import {
  generateHabit,
  showDate,
  displayTotalHabits,
  displayStreakCount,
  displayCheckedCount,
  displayMissedCount,
  addInputListenerToChecked,
  addListenersToFilterButtons,
} from "./UI.js";

const filterState = stateOfElements();

// filterHabits(addedHabits.chores);
generateHabit(addedHabits, addInputListenerToChecked);
showDate(getTodayDate);
displayTotalHabits(addedHabits);
displayStreakCount(addedHabits);
displayCheckedCount(addedHabits);
displayMissedCount(addedHabits);
addListenersToFilterButtons(addedHabits, filterState);
