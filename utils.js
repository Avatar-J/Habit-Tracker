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

  const dayWord = today.toLocaleDateString("en-US", { weekday: "long" });
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const dayNum = String(today.getDate()).padStart(2, "0");

  return { dayWord, month, dayNum };
}

export { getWeekDates, getTodayDate };
