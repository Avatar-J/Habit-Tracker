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
  habitsObj.forEach((item) => {
    item.habits.forEach((habit) => {
      total += 1;
    });
  });

  return total;
}

function streakCount() {
  let total = 0;
  return total;
}

function missedCount() {
  let total = 0;
  return total;
}
function checkedCount() {
  let total = 0;
  return total;
}

export {
  getWeekDates,
  getTodayDate,
  totalHabits,
  streakCount,
  missedCount,
  checkedCount,
  generateID,
};
