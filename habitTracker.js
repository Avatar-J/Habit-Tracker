import {
  getTodayDate,
  totalHabits,
  streakCount,
  missedCount,
  checkedCount,
  deleteElement,
  filterHabits,
} from "./utils.js";
import { setLocalStorage } from "./storage.js";

let isFilterActive = false;
let categorySearch;

function showDate() {
  document.querySelector(".day").innerHTML = getTodayDate().dd;
  document.querySelector(".month").innerHTML = getTodayDate().mm;
}

//created html for card
function createHtmlCard(habitsArray) {
  let habit_card = ``;
  if (habitsArray) {
    habitsArray.forEach((element) => {
      habit_card += `
         <div class="habit-container">
          <div class="left-card">
            <input type="checkbox" id="${element.id}" ${
        element.isChecked ? "checked" : ""
      }/>
            <div class="habit-text">${element.habit}</div>
          </div>
            
          <div class="right-card">

          <button id="delete-${
            element.id
          }"><ion-icon name="trash" class="delete"></ion-icon></button>
          
          </div>
          
          </div>
        `;
    });
  }
  return habit_card;
}

//render habits
function generateHabits(habitsArray) {
  const habit_card = createHtmlCard(habitsArray);
  if (habit_card) {
    document.getElementById("habits-section").innerHTML = habit_card;
  } else {
    document.getElementById("habits-section").innerHTML = `
    <div class="no-habits">
                        <p>No habits. Add to track</p>
     </div>
    `;
  }

  addInputListenerToChecked(habitsArray, updateCounter);
  addListenerToDelete(habitsArray, generateHabits, updateCounter, getHabitID);
}
//render filtered habits
function generateHabitForFiltered(
  filteredHabit,
  addInputListenerToChecked,
  habitsArray,
  updateCounter,
  getHabitID
) {
  const habit_card = createHtmlCard(filteredHabit);
  if (habit_card) {
    document.getElementById("habits-section").innerHTML = habit_card;
  } else {
    document.getElementById("habits-section").innerHTML = `
    <div class="no-habits">
                        <p>No habits found for this category</p>
     </div>
    `;
  }
  addInputListenerToChecked(habitsArray, updateCounter);
  addListenerToDelete(habitsArray, generateHabits, updateCounter, getHabitID);
}

//adds event listener to checkboxes
function addInputListenerToChecked(habitsArray, updateCounter) {
  habitsArray.forEach((element) => {
    const checkbox = document.getElementById(element.id);
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        element.toggleCheckbox();
        updateCounter(habitsArray);
        setLocalStorage(habitsArray);
      });
    }
  });
}

//adds click event to delete button
function addListenerToDelete(
  habitsArray,
  generateHabits,
  updateCounter,
  getHabitID
) {
  habitsArray.forEach((element) => {
    const deleteButton = document.getElementById(`delete-${element.id}`);

    if (deleteButton) {
      deleteButton.addEventListener("click", (e) => {
        const targetElement = e.target;

        const habitID = getHabitID(targetElement);

        const updatedArray = deleteElement(habitsArray, habitID);
        setLocalStorage(updatedArray);

        if (isFilterActive) {
          const result = filterHabits(updatedArray, categorySearch);
          generateHabitForFiltered(
            result,
            addInputListenerToChecked,
            updatedArray,
            updateCounter,
            getHabitID
          );
          updateCounter(updatedArray);
        } else {
          generateHabits(updatedArray);
          updateCounter(updatedArray);
        }
      });
    }
  });
}

function getHabitID(targetElement) {
  const elementID =
    targetElement.tagName.toLowerCase() === "button"
      ? targetElement.id
      : targetElement.parentNode.id;

  const habitID = Number(elementID.split("-")[1]);
  return habitID;
}

function addListenersToFilterButtons(habitsArray) {
  document
    .querySelector(".category-container")
    .addEventListener("click", (e) => {
      const searchCategory = e.target.id;
      if (searchCategory === categorySearch) {
        categorySearch = null;
        isFilterActive = false;
        removeActiveClass();
        generateHabits(habitsArray);
      } else {
        const result = filterHabits(habitsArray, searchCategory);
        isFilterActive = true;
        categorySearch = searchCategory;
        addActiveClass();
        generateHabitForFiltered(
          result,
          addInputListenerToChecked,
          habitsArray,
          updateCounter,
          getHabitID
        );
      }
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
function removeActiveClass() {
  const buttons = document.querySelectorAll(".category");
  buttons.forEach((btn) => btn.classList.remove("active"));
}

//function to update the counters
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

//function to update tracker
function updateCounter(habitsArray) {
  displayCheckedCount(habitsArray);
  displayMissedCount(habitsArray);
  displayTotalHabits(habitsArray);
  displayStreakCount(habitsArray);
}

export { generateHabits, showDate, updateCounter, addListenersToFilterButtons };
