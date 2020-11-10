import authReducer from "./authReducer";
import todoReducer from "./todoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authReducer,
  todoReducer,
});
export default rootReducer;
