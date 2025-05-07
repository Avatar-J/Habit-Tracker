import { getWeekDates } from "./utils.js";
import { habits } from "./storage.js";
import { stateOfElements } from "./storage.js";

//generate table head
function generateTableHead() {
  const weekDates = getWeekDates();
  let th_row = ``;
  weekDates.forEach((dayObj) => {
    const [day, dateNum] = Object.entries(dayObj)[0];
    th_row += `<th><div>${dateNum}</div><div>${day}</div></th>`;
  });

  const tableHeadHTML = `
         <th class="habit-col">Habits</th>${th_row}  
      `;
  const tableHeaderRow = document.getElementById("table-header-row");
  tableHeaderRow.innerHTML = tableHeadHTML;
}

function generateTableBody() {
  let habit_row = ``;
  habits.forEach((item) => {
    item.habit.forEach((habit) => {
      habit_row += `
         <tr>
          <td class="habit-col">${habit}</td>
          <td><input type="checkbox"/></td>
          <td><input type="checkbox"/></td>
          <td><input type="checkbox"/></td>
          <td><input type="checkbox"/></td>
          <td><input type="checkbox"/></td>
          <td><input type="checkbox"/></td>
          <td><input type="checkbox"/></td>
         </tr>
        `;
    });
    document.getElementById("table-body").innerHTML = habit_row;
  });
}

export { generateTableHead, generateTableBody };
