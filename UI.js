import {
  getWeekDates,
  totalHabits,
  streakCount,
  checkedCount,
  missedCount,
  filterHabits,
} from "./utils.js";

function generateHabit(addedHabits, addInputListenerToChecked) {
  let habit_card = ``;
  addedHabits.forEach((category) => {
    category.habits.forEach((element) => {
      habit_card += `
         <div class="habit-container">
          <div class="left-card">
            <input type="checkbox" id="${element.id}" ${
        element.isChecked ? "checked" : ""
      }/>
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
  addInputListenerToChecked(addedHabits);
}

function addInputListenerToChecked(addedHabits) {
  addedHabits.forEach((category) => {
    category.habits.forEach((element) => {
      const checkbox = document.getElementById(element.id);
      if (checkbox) {
        checkbox.addEventListener("change", () => {
          element.toggleCheckbox();
          displayCheckedCount(addedHabits);
          displayMissedCount(addedHabits);
        });
      }
    });
  });
}

function showDate(getTodayDate) {
  document.querySelector(".day").innerHTML = getTodayDate().dd;
  document.querySelector(".month").innerHTML = getTodayDate().mm;
}

function displayTotalHabits(habits) {
  const total = totalHabits(habits);
  document.getElementById("total-habits").textContent = total;
}
function displayStreakCount(habits) {
  const total = streakCount(habits);
  document.getElementById("streak_count").textContent = total;
}
function displayMissedCount(habits) {
  const total = missedCount(habits);
  document.getElementById("missed").textContent = total;
}
function displayCheckedCount(habits) {
  const total = checkedCount(habits);
  document.getElementById("checked").textContent = total;
}

function addListenersToFilterButtons(habits, filterState) {
  document
    .querySelector(".category-container")
    .addEventListener("click", (e) => {
      const searchCategory = e.target;
      const result = filterHabits(habits, searchCategory.id);
      console.log(result);
      addActiveClass();
      generateHabit(result, addInputListenerToChecked);
      filterState.set(true);
    });
}

function addActiveClass() {
  const buttons = document.querySelectorAll(".category");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      buttons.forEach((b) => b.classList.remove("active"));

      e.target.classList.add("active");
    });
  });
}

function updateAll(habitObjects, addInputListenerToChecked) {
  generateHabit(habitObjects, addInputListenerToChecked);
  displayCheckedCount(habitObjects);
  displayMissedCount(habitObjects);
  displayTotalHabits(habitObjects);
  displayStreakCount(habitObjects);
}

function updateCounter(habitObjects) {
  displayCheckedCount(habitObjects);
  displayMissedCount(habitObjects);
  displayTotalHabits(habitObjects);
}

export {
  generateHabit,
  showDate,
  displayTotalHabits,
  displayStreakCount,
  displayCheckedCount,
  displayMissedCount,
  addInputListenerToChecked,
  addListenersToFilterButtons,
};
