function getWeekDates() {
  const dates = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + mondayOffset + i);

    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = date.getDate();

    dates.push({ [day]: dayNum });
  }

  return dates;
}

function getTodayDate() {
  const today = new Date();

  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const yy = today.getFullYear();
  const date = `${dd}-${mm}-${yy}`;

  return { day, mm, dd, yy, date };
}

function generateID() {
  const today = new Date();
  const uniqueID = today.getTime();
  return uniqueID;
}

function totalHabits(habitsArray) {
  return habitsArray.length;
}

function streakCount(habitsArray) {
  const isComplete = habitsArray.every((habit) => habit.isChecked);
  return isComplete ? 1 : 0;
}

function missedCount(habitsArray) {
  return habitsArray.filter((habit) => !habit.isChecked).length;
}
function checkedCount(habitsArray) {
  return habitsArray.filter((habit) => habit.isChecked).length;
}

function filterHabits(habitsArray, category) {
  return habitsArray.filter(
    (habit) => habit.category.toLowerCase() === category.toLowerCase()
  );
}

function createHabitObjectBlueprint(habit, id, category) {
  return {
    category: category,
    id: id,
    habit: habit,
    isChecked: false,
    toggleCheckbox: function () {
      this.isChecked = !this.isChecked;
    },
  };
}

function deleteElement(habitsArray, habitID) {
  return habitsArray.filter((habit) => habit.id !== habitID);
}

export {
  getWeekDates,
  getTodayDate,
  totalHabits,
  streakCount,
  missedCount,
  checkedCount,
  generateID,
  filterHabits,
  createHabitObjectBlueprint,
  deleteElement,
};
