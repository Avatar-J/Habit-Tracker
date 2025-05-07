import { habits } from "./storage.js";
import { getWeekDates, getTodayDate } from "./utils.js";
import { generateHabit, showDate } from "./UI.js";

const tableHead = document.getElementById("table-header");

// generateTableHead();

// generateTableBody();
generateHabit(habits);
showDate(getTodayDate);
