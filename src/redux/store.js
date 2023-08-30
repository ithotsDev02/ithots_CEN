import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

// (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(
  rootReducer,
  peristedState,
  composeWithDevTools(
    compose(applyMiddleware(thunk.withExtraArgument(), logger))
  )
);

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
