jest.mock("../storage", () => ({
  setLocalStorage: jest.fn(),
}));
jest.mock("../utils", () => ({
  deleteElement: jest.fn(),
  filterHabits: jest.fn(),
  getTodayDate: jest.fn(() => ({
    dd: "10",
    mm: "05",
    yy: "2025",
    date: "10-05-2025",
    day: "Saturday",
  })),
  streakCount: jest.fn(),
  totalHabits: jest.fn(),
  missedCount: jest.fn(),
  checkedCount: jest.fn(),
}));

import {
  showDate,
  addListenersToFilterButtons,
  addInputListenerToChecked,
  addListenerToDelete,
  displayCheckedCount,
  displayStreakCount,
  displayTotalHabits,
  displayMissedCount,
  updateCounter,
  addActiveClass,
  createHtmlCard,
  generateHabits,
  generateHabitForFiltered,
} from "../habitTracker";
import { setLocalStorage } from "../storage";
import {
  deleteElement,
  filterHabits,
  totalHabits,
  streakCount,
  missedCount,
  checkedCount,
} from "../utils";

const mockHabitsArray = [
  {
    id: 1,
    category: "health",
    habit: "Exercise",
    isChecked: false,
    toggleCheckbox: jest.fn(),
  },
  {
    id: 2,
    category: "chores",
    habit: "Read",
    isChecked: true,
    toggleCheckbox: jest.fn(),
  },
  {
    id: 3,
    category: "health",
    habit: "Meditate",
    isChecked: false,
    toggleCheckbox: jest.fn(),
  },
];

describe("showDate", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="day"></div>
            <div class="month"></div>
        `;
  });
  test("should display the current date", () => {
    showDate();

    expect(document.querySelector(".day").textContent).toBe("10");
    expect(document.querySelector(".month").textContent).toBe("05");
  });
});

describe("delete habits and check habits", () => {
  beforeEach(() => {
    document.body.innerHTML = `
                <div id="habits-section">
                    <div class="habit-container">
                        <input type="checkbox" id="1" />
                        <div class="habit-text">Test Habit</div>
                        <button id="delete-1"><ion-icon name="trash" class="delete"></ion-icon></button>
                    </div>  
                </div>
        `;
    global.isFilterActive = false;
    global.generateHabitForFiltered = jest.fn();
    global.categorySearch = "health";
    global.addInputListenerToChecked = jest.fn();

    jest.clearAllMocks();
  });
  test("should toggle checkbox state", () => {
    const callback = jest.fn();
    addInputListenerToChecked(mockHabitsArray, callback);

    const checkbox = document.getElementById("1");
    checkbox.dispatchEvent(new Event("change"));

    expect(callback).toHaveBeenCalledWith(mockHabitsArray);
    expect(setLocalStorage).toHaveBeenCalledWith(mockHabitsArray);
  });

  test("should delete habit and update local storage", () => {
    const mockGenerateHabits = jest.fn();
    const mockUpdateCounter = jest.fn();
    const mockGetHabitID = jest.fn(() => 1);
    const updatedArray = mockHabitsArray.filter((habit) => habit.id !== 1);

    deleteElement.mockReturnValue(updatedArray);

    addListenerToDelete(
      mockHabitsArray,
      mockGenerateHabits,
      mockUpdateCounter,
      mockGetHabitID
    );
    const deleteButton = document.getElementById("delete-1");
    deleteButton.dispatchEvent(new Event("click"));

    expect(deleteElement).toHaveBeenCalledWith(mockHabitsArray, 1);
    expect(deleteElement).toHaveReturnedWith(updatedArray);

    expect(mockGetHabitID).toHaveBeenCalled();
    expect(mockUpdateCounter).toHaveBeenCalled();
    expect(setLocalStorage).toHaveBeenCalledWith(updatedArray);
    expect(mockGenerateHabits).toHaveBeenCalledWith(updatedArray);
  });
});

describe("update counters", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div id="total-habits"></div>
            <div id="streak_count"></div>
            <div id="missed"></div>
            <div id="checked"></div>
        `;
  });

  test("update total habits", () => {
    const container = document.getElementById("total-habits");
    const sizeOfArray = mockHabitsArray.length;
    totalHabits.mockReturnValue(sizeOfArray);

    displayTotalHabits(mockHabitsArray);
    expect(totalHabits).toHaveBeenCalled();
    expect(totalHabits).toHaveReturnedWith(sizeOfArray);
    expect(container.textContent).toBe(sizeOfArray.toString());
  });
  test("update streak count", () => {
    const container = document.getElementById("streak_count");
    streakCount.mockReturnValue(0);

    displayStreakCount(mockHabitsArray);
    expect(streakCount).toHaveBeenCalled();
    expect(streakCount).toHaveReturnedWith(0);
    expect(container.textContent).toBe("0");
  });

  test("update missed habits", () => {
    const container = document.getElementById("missed");
    missedCount.mockReturnValue(2);

    displayMissedCount(mockHabitsArray);
    expect(missedCount).toHaveBeenCalled();
    expect(missedCount).toHaveReturnedWith(2);
    expect(container.textContent).toBe("2");
  });
  test("update checked count", () => {
    const container = document.getElementById("checked");
    checkedCount.mockReturnValue(1);

    displayCheckedCount(mockHabitsArray);
    expect(checkedCount).toHaveBeenCalled();
    expect(checkedCount).toHaveReturnedWith(1);
    expect(container.textContent).toBe("1");
  });
});

describe("add Listners to Filter buttons", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="category-container">
                <button class="category" id="Productivity"></button>
                <button class="category" id="chores"></button>
                <button class="category" id="health&fitness"></button>
            </div>
            
        `;
    global.generateHabits = jest.fn();
    global.filterHabits = jest.fn();
  });
  test("filter habitsArray", () => {
    addListenersToFilterButtons(mockHabitsArray);
  });

  test("should add active class", () => {
    addActiveClass();
    const btn = document.getElementById("health&fitness");
    btn.dispatchEvent(new Event("click"));
    expect(btn.classList).toContain("active");
  });
});
describe("render habits", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div id="habits-section">
               
            </div>

        `;
  });
  test("should return empty string if array is empty", () => {
    expect(createHtmlCard([])).toBe("");
  });

  test("dynamicall display", () => {
    generateHabits(mockHabitsArray);
  });

  test("generate filtered habit", () => {
    const mockfilteredHabit = jest.fn();
    const mockaddInputListenerToChecked = jest.fn();
    const mockupdateCounter = jest.fn();
    const mockgetHabitID = jest.fn();

    generateHabitForFiltered(
      mockfilteredHabit,
      mockaddInputListenerToChecked,
      mockHabitsArray,
      mockupdateCounter,
      mockgetHabitID
    );
  });
});
