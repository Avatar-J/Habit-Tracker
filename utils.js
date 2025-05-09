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

function totalHabits(habitsObj) {
  let total = 0;
  habitsObj.forEach((category) => {
    category.habits.forEach((habit) => {
      total += 1;
    });
  });

  return total;
}

function streakCount(habitsObj) {
  let total = 0;
  const isComplete = habitsObj
    .flatMap((category) => category.habits.map((habit) => habit.isChecked))
    .reduce((acc, isChecked) => acc && isChecked, true);

  total = isComplete ? total++ : 0;
  return total;
}

function missedCount(habitsObj) {
  let total = 0;
  total = habitsObj
    .flatMap((category) =>
      category.habits.map((habit) => (habit.isChecked ? 0 : 1))
    )
    .reduce((acc, value) => {
      return acc + value;
    }, 0);

  return total;
}
function checkedCount(habitsObj) {
  let total = 0;
  total = habitsObj
    .flatMap((category) =>
      category.habits.map((habit) => (habit.isChecked ? 1 : 0))
    )
    .reduce((acc, value) => {
      return acc + value;
    }, 0);

  return total;
}

function filterHabits(habitsObj, category) {
  const result = habitsObj.filter(
    (obj) => obj.category.toLowerCase() === category.toLowerCase()
  );
  return result;
}

function createHabitObjectBlueprint(habit, id) {
  return {
    id: id,
    habit: habit,
    isChecked: false,
    toggleCheckbox: function () {
      this.isChecked = !this.isChecked;
    },
  };
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
};
