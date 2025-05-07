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

export { getWeekDates };
