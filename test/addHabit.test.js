jest.mock("../storage.js", () => ({
  getLocalStorage: jest.fn(),
  setLocalStorage: jest.fn(),
}));

jest.mock("../habitTracker", () => ({
  generateHabits: jest.fn(),
}));

jest.mock("../utils", () => ({
  generateID: jest.fn(),
  createHabitObjectBlueprint: jest.fn(),
}));

import { getLocalStorage, setLocalStorage } from "../storage.js";
import { generateID, createHabitObjectBlueprint } from "../utils.js";
import { addListenerToForm, addListenerToCloseButton } from "../addHabit.js";

describe("add listener to form", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <form id="habit-form">
            <input name="category" value="health" />
           <input name="habit" value="run" />
            </form>
        `;
    delete window.location;
    window.location = { href: "" };

    generateID.mockReturnValue(1);
    createHabitObjectBlueprint.mockReturnValue({
      id: 1,
      habit: "run",
      category: "health",
      isChecked: false,
    });
    getLocalStorage.mockReturnValue([]);
  });

  test("should create a new object, update local storage", () => {
    const formElement = document.getElementById("habit-form");
    addListenerToForm();
    formElement.dispatchEvent(new Event("submit"));

    expect(generateID).toHaveBeenCalled();
    expect(getLocalStorage).toHaveBeenCalled();
    expect(setLocalStorage).toHaveBeenCalledWith([
      {
        id: 1,
        habit: "run",
        category: "health",
        isChecked: false,
      },
    ]);
  });
});

test("should add a listener to close button", () => {
  document.body.innerHTML = `
            <button id="close-modal"></button>
        `;

  const closeButton = document.getElementById("close-modal");
  addListenerToCloseButton();
  closeButton.dispatchEvent(new Event("click"));

  expect(window.location.href).toBe("./index.html");
});
