import {
  getWeekDates,
  totalHabits,
  streakCount,
  checkedCount,
  missedCount,
} from "./utils.js";
import { stateOfElements, habitsTracked } from "./storage.js";

function generateHabit(addedHabits) {
  let habit_card = ``;
  addedHabits.forEach((category) => {
    category.habits.forEach((element) => {
      const isChecked = stateOfElements();
      habit_card += `
         <div class="habit-container">
          <div class="left-card">
            <input type="checkbox" id="check-habit" />
            <div class="habit-text">${element.habit}</div>
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

function addInputListenerToChecked(id) {
  const element = document.getElementById(id);
  console.log(element);
}

function showDate(getTodayDate) {
  document.querySelector(".day").innerHTML = getTodayDate().dd;
  // document.querySelector(".dayword").innerHTML = getTodayDate().dayWord;
  document.querySelector(".month").innerHTML = getTodayDate().mm;
}

function displayTotalHabits(habits) {
  const total = totalHabits(habits);
  document.getElementById("total-habits").textContent = total;
}
function displayStreakCount() {
  const total = streakCount();
  document.getElementById("streak_count").textContent = total;
}
function displayMissedCount() {
  const total = missedCount();
  document.getElementById("missed").textContent = total;
}
function displayCheckedCount() {
  const total = checkedCount();
  document.getElementById("checked").textContent = total;
}

export {
  generateHabit,
  showDate,
  displayTotalHabits,
  displayStreakCount,
  displayCheckedCount,
  displayMissedCount,
};
