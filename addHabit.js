import { getLocalStorage, setLocalStorage } from "./storage.js";
import { generateHabits } from "./habitTracker.js";
import { generateID, createHabitObjectBlueprint } from "./utils.js";

function addListenerToForm() {
  document.getElementById("habit-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = generateID();
    const targetCategory = e.target.category.value.trim();
    const habit = e.target.habit.value.trim();

    //create new object
    const newHabit = createHabitObjectBlueprint(habit, id, targetCategory);

    const loadedHabits = getLocalStorage();

    const updatedHabits = [...loadedHabits, newHabit];

    setLocalStorage(updatedHabits);

    window.location.href = "./index.html";

    generateHabits(updatedHabits);
    // updateCounter(habitObj);
  });
}

function addListenerToCloseButton() {
  document.getElementById("close-modal").addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}

addListenerToForm();
addListenerToCloseButton();
