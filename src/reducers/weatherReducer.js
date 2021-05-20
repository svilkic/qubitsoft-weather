export const weatherReducer = (state = [], action) => {
  switch (action.type) {
    case "WEATHER_ADD":
      const { weather } = action.payload;
      const itemExists = [...state].find((x) => x.data.id === weather.data.id);
      let newArray;
      if (itemExists) {
        newArray = [weather, ...state.filter((x) => x.data != itemExists.data)];
      } else {
        newArray = [weather, ...state];
      }
      if (newArray.length > 9) newArray.pop();
      return newArray;

    default:
      return state;
  }
};

export const toggleListReducer = (state = { toggled: true }, action) => {
  switch (action.type) {
    case "SEARCH_LIST_TOGGLE":
      return { toggled: !state.toggled };
    default:
      return state;
  }
};
