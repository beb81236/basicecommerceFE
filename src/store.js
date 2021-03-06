import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const initialState = {};

const middleware = [thunk];


const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window == "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

let store = createStore(
  rootReducer,
  initialState,
  composeSetup(applyMiddleware(...middleware))
);

export default store;
