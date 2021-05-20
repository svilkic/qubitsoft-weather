import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { toggleListReducer, weatherReducer } from "./reducers/weatherReducer";

const reducer = combineReducers({
  weatherList: weatherReducer,
  toggleList: toggleListReducer,
});

const weatherListFromStorage = localStorage.getItem("weatherList")
  ? JSON.parse(localStorage.getItem("weatherList"))
  : [];

const initialState = {
  weatherList: weatherListFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
