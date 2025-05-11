/**
 * @jest-environment jsdom
 */

import {
  getTodayDate,
  generateID,
  totalHabits,
  streakCount,
  missedCount,
  checkedCount,
  createHabitObjectBlueprint,
  filterHabits,
  deleteElement,
  getWeekDates,
} from "../utils";

const mockHabitsArray = [
  { id: 1, category: "health", habit: "Exercise", isChecked: false },
  { id: 2, category: "chores", habit: "Read", isChecked: true },
  { id: 3, category: "health", habit: "Meditate", isChecked: false },
];

test("should return today's date", () => {
  const today = new Date();
  const ddTest = String(today.getDate()).padStart(2, "0");
  const mmTest = String(today.getMonth() + 1).padStart(2, "0");
  const yyTest = today.getFullYear();
  const dayTest = today.toLocaleDateString("en-US", { weekday: "long" });
  const datetest = `${ddTest}-${mmTest}-${yyTest}`;

  const result = getTodayDate();

  expect(result).toEqual({
    day: dayTest,
    mm: mmTest,
    dd: ddTest,
    yy: yyTest,
    date: datetest,
  });
});

describe("generateID", () => {
  test("should return unique ID", () => {
    const id = generateID();

    expect(typeof id).toBe("number");
  });
});

test("should return the total number of habits", () => {
  const result = totalHabits(mockHabitsArray);

  expect(result).toBe(3);
});

test("should return the streak count", () => {
  expect(streakCount(mockHabitsArray)).toBe(0);
});

test("should return the missed count", () => {
  const result = missedCount(mockHabitsArray);
  expect(result).toBe(2);
});

test("should return the checked count", () => {
  const result = checkedCount(mockHabitsArray);
  expect(result).toBe(1);
});

test("should create a habit object blueprint", () => {
  const habit = createHabitObjectBlueprint("run a mile", 1, "health");

  expect(habit.category).toBe("health");
  expect(habit.id).toBe(1);
  expect(habit.habit).toBe("run a mile");
  expect(habit.isChecked).toBe(false);
  expect(typeof habit.toggleCheckbox).toBe("function");

  habit.toggleCheckbox();
  expect(habit.isChecked).toBe(true);
});

test("should filter habits by category", () => {
  const result = filterHabits(mockHabitsArray, "health");
  expect(result).toEqual([
    { id: 1, category: "health", habit: "Exercise", isChecked: false },
    { id: 3, category: "health", habit: "Meditate", isChecked: false },
  ]);
});

test("should delete a habit by ID", () => {
  const result = deleteElement(mockHabitsArray, 2);
  expect(result).toEqual([
    { id: 1, category: "health", habit: "Exercise", isChecked: false },
    { id: 3, category: "health", habit: "Meditate", isChecked: false },
  ]);
});

test("should return the week dates", () => {
  const weekDates = getWeekDates();

  expect(weekDates.length).toBe(7);
});
