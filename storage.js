const addedHabits = [
  {
    category: "health&fitness",
    habits: [
      {
        id: 1,
        habit: "Drink water",
        isChecked: false,
        toggleCheckbox: function () {
          this.isChecked = !this.isChecked;
        },
      },
      {
        id: 2,
        habit: "Exercise for 30 minutes",
        isChecked: false,
        toggleCheckbox: function () {
          this.isChecked = !this.isChecked;
        },
      },
    ],
  },
  {
    category: "personal-dev",
    habits: [
      {
        id: 3,
        habit: "Read for one hour",
        isChecked: false,
        toggleCheckbox: function () {
          this.isChecked = !this.isChecked;
        },
      },
    ],
  },
  {
    category: "chores",
    habits: [
      {
        id: 5,
        habit: "Wash clothes",
        isChecked: false,
        toggleCheckbox: function () {
          this.isChecked = !this.isChecked;
        },
      },
      {
        id: 6,
        habit: "Scrub the bathroom",
        isChecked: false,
        toggleCheckbox: function () {
          this.isChecked = !this.isChecked;
        },
      },
    ],
  },
  {
    category: "Productivity",
    habits: [
      {
        id: 7,
        habit: "Reduce screen time",
        isChecked: false,
        toggleCheckbox: function () {
          this.isChecked = !this.isChecked;
        },
      },
    ],
  },
];

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
export { addedHabits, stateOfElements, habitsTracked };
