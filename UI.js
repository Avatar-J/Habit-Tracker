import { getWeekDates, getTodayDate } from "./utils.js";
import { habits } from "./storage.js";
import { stateOfElements } from "./storage.js";

function generateHabit(habits) {
  let habit_card = ``;
  habits.forEach((item) => {
    item.habit.forEach((habit) => {
      habit_card += `
         <div class="habit-container">
          <div class="left-card">
            <input type="checkbox" id="check-habit" />
            <div class="habit-text">${habit}</div>
          </div>
            
          <div class="right-card">
          <ion-icon name="create" class="edit"></ion-icon>
          <ion-icon name="trash" class="delete"></ion-icon>
          </div>
          
          </div>
        `;
    });
  });
  document.getElementById("habits-section").innerHTML = habit_card;
}

function showDate(getTodayDate) {
  document.querySelector(".day").innerHTML = getTodayDate().dayNum;
  // document.querySelector(".dayword").innerHTML = getTodayDate().dayWord;
  document.querySelector(".month").innerHTML = getTodayDate().month;
}
export { generateHabit, showDate };
