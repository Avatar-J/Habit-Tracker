import { habits } from "./storage.js";
import { getWeekDates } from "./utils.js";
import { generateTableHead, generateTableBody } from "./UI.js";

const tableHead = document.getElementById("table-header");

generateTableHead();

generateTableBody();
