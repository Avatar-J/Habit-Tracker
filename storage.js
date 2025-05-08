const habits = [
  {
    category: "health & Fitness",
    habit: ["Drink water", "Exercise for 30 minutes", "sleep for 8 hours"],
  },
  {
    category: "Personal Development",
    habit: ["Read for one hour", "practice French", "Learn JavaScript"],
  },
  {
    category: "Chores",
    habit: [
      "Wash clothes",
      "Scrub the bathroom",
      "Wash the dishes",
      "Meal prep",
    ],
  },
  {
    category: "productivity",
    habit: ["Reduce screen time", "Clear emails", "Make a budget"],
  },
];

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
export { habits, stateOfElements };
