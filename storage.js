const addedHabits = [
  {
    category: "health & Fitness",
    habits: [
      {
        id: 1,
        habit: "Drink water",
      },
      {
        id: 2,
        habit: "Exercise for 30 minutes",
      },
    ],
  },
  {
    category: "Personal Development",
    habits: [
      {
        id: 3,
        habit: "Read for one hour",
      },
      {
        id: 4,
        habit: "practice French",
      },
    ],
  },
  {
    category: "Chores",
    habits: [
      {
        id: 5,
        habit: "Wash clothes",
      },
      {
        id: 6,
        habit: "Scrub the bathroom",
      },
    ],
  },
  {
    category: "productivity",
    habits: [
      {
        id: 7,
        habit: "Reduce screen time",
      },
      {
        id: 8,
        habit: "Clear emails",
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
  };
}
export { addedHabits, stateOfElements, habitsTracked };
