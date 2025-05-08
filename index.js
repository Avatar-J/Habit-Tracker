import { addedHabits } from "./storage.js";
import { getWeekDates, getTodayDate, generateID } from "./utils.js";
import {
  generateHabit,
  showDate,
  displayTotalHabits,
  displayStreakCount,
  displayCheckedCount,
  displayMissedCount,
} from "./UI.js";

const tableHead = document.getElementById("table-header");

// generateTableHead();

// generateTableBody();
generateHabit(addedHabits);
showDate(getTodayDate);
displayTotalHabits(addedHabits);
displayStreakCount();
displayCheckedCount();
displayMissedCount();
