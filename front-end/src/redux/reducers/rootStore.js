import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authReducer";
const rootReducers = combineReducers({ authReducer: AuthReducer });
const myMiddleware = (store) => (next) => (action) => {
  console.log(typeof action);
  if (typeof action === "function") {
    return action(next);
  }
  return next(action);
};
export default configureStore(
  { reducer: rootReducers },
  applyMiddleware(myMiddleware)
); //store -> index.js
