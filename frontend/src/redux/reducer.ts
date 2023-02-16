import { combineReducers } from "redux";
import authSlice from "./auth"
import dashboardSlice from "./dashboard"
import inventorySlice from "./inventory"

export default combineReducers({
  auth: authSlice,
  dashboard: dashboardSlice,
  inventory: inventorySlice
});
