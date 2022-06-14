import { combineReducers } from "@reduxjs/toolkit";
import buttons1Reducer from "../Slices/TestSlices/Button1";
import buttons2Reducer from "../Slices/TestSlices/Button2";
import buttons3Reducer from "../Slices/TestSlices/Button3";
import experienceReducer from "../Slices/Experience";
import bankreducer from "../Slices/Bank";
import inventoryReducer from "../Slices/Inventory";

export default combineReducers({
  buttons1: buttons1Reducer,
  buttons2: buttons2Reducer,
  buttons3: buttons3Reducer,
  Experience: experienceReducer,
  Bank: bankreducer,
  Inventory: inventoryReducer,
});
