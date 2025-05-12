// const addedHabits = [
//   {
//     category: "health&fitness",
//     habits: [
//       {
//         id: 1,
//         habit: "Drink water",
//         isChecked: false,
//         toggleCheckbox: function () {
//           this.isChecked = !this.isChecked;
//         },
//       },
//     ],
//   },
//   {
//     category: "personal-dev",
//     habits: [
//       {
//         id: 3,
//         habit: "Read for one hour",
//         isChecked: false,
//         toggleCheckbox: function () {
//           this.isChecked = !this.isChecked;
//         },
//       },
//     ],
//   },
//   {
//     category: "chores",
//     habits: [
//       {
//         id: 5,
//         habit: "Wash clothes",
//         isChecked: false,
//         toggleCheckbox: function () {
//           this.isChecked = !this.isChecked;
//         },
//       },
//     ],
//   },
//   {
//     category: "Productivity",
//     habits: [
//       {
//         id: 7,
//         habit: "Reduce screen time",
//         isChecked: false,
//         toggleCheckbox: function () {
//           this.isChecked = !this.isChecked;
//         },
//       },
//     ],
//   },
// ];
const addedHabits = [];
const habitsTracked = [];

function stateOfElements(initialState = false) {
  let state = initialState;

  return {
    toggle: function () {
      state = !state;
      return state;
    },
    get: function () {
      return state;
    },
    set: function (input) {
      state = input;
    },
  };
}

function setLocalStorage(habitsArray) {
  localStorage.setItem("habits", JSON.stringify(habitsArray));
}

const restoreMethods = (habits) => {
  habits.forEach((habit) => {
    habit.toggleCheckbox = function () {
      this.isChecked = !this.isChecked;
    };
  });
  return habits;
};

function getLocalStorage() {
  let loadedHabits;
  let data = JSON.parse(localStorage.getItem("habits"));
  if (data) {
    loadedHabits = restoreMethods(data);
  } else {
    loadedHabits = [];
  }
  return loadedHabits;
}

function setLocalStorgeForStreaks(streak) {
  localStorage.setItem("streaks", JSON.stringify(streak));
}
function getLocalStorageForStreak() {
  let loadedStreaks;
  let data = JSON.parse(localStorage.getItem("streaks"));
  loadedStreaks = data ? data : [];
  return loadedStreaks;
}

export {
  addedHabits,
  stateOfElements,
  habitsTracked,
  setLocalStorage,
  getLocalStorage,
};
