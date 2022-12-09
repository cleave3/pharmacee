import { combineReducers } from "redux";
import authSlice from "./auth"

export default combineReducers({
  auth: authSlice,
});
