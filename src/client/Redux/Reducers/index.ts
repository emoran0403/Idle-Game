import { combineReducers } from "@reduxjs/toolkit";
import buttons1Reducer from "../Slices/Button1";
import buttons2Reducer from "../Slices/Button2";
import buttons3Reducer from "../Slices/Button3";

export default combineReducers({
  buttons1: buttons1Reducer,
  buttons2: buttons2Reducer,
  buttons3: buttons3Reducer,
});
