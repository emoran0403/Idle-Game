import { combineReducers } from "@reduxjs/toolkit";
import buttonsReducer from "../Slices/Buttons";

export default combineReducers({
  buttons: buttonsReducer,
});
