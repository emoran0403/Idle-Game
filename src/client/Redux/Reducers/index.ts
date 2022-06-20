import { combineReducers } from "@reduxjs/toolkit";
import buttons1Reducer from "../Slices/TestSlices/Button1";
import buttons2Reducer from "../Slices/TestSlices/Button2";
import buttons3Reducer from "../Slices/TestSlices/Button3";
import experienceReducer from "../Slices/Experience";
import bankreducer from "../Slices/Bank";
import inventoryReducer from "../Slices/Inventory";
import currentLocationReducer from "../Slices/CurrentLocation";
import currentSkillReducer from "../Slices/CurrentSkill";
import resourcesReducer from "../Slices/Resources";
import walletReducer from "../Slices/Wallet";
import lumbridgequestReducer from "../Slices/QuestSlices/Lumbridge";
import draynorquestReducer from "../Slices/QuestSlices/Draynor";

export default combineReducers({
  buttons1: buttons1Reducer,
  buttons2: buttons2Reducer,
  buttons3: buttons3Reducer,
  Experience: experienceReducer,
  Bank: bankreducer,
  Inventory: inventoryReducer,
  CurrentLocation: currentLocationReducer,
  CurrentSkill: currentSkillReducer,
  Resources: resourcesReducer,
  Wallet: walletReducer,
  Quests_Lumbridge: lumbridgequestReducer,
  Quests_Draynor: draynorquestReducer,
});
