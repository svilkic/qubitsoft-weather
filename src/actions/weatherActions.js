export const addToList = (weather) => async (dispatch, getState) => {
  dispatch({
    type: "WEATHER_ADD",
    payload: {
      weather,
    },
  });
  localStorage.setItem("weatherList", JSON.stringify(getState().weatherList));
};
