import { combineReducers } from "@reduxjs/toolkit";
import buttons1Reducer from "../Slices/TestSlices/Button1";
import buttons2Reducer from "../Slices/TestSlices/Button2";
import buttons3Reducer from "../Slices/TestSlices/Button3";
import experienceReducer from "../Slices/Experience";
import fishReducer from "../Slices/BankSlices/FishSlice";
import logsReducer from "../Slices/BankSlices/LogsSlice";
import inventoryReducer from "../Slices/Inventory";
import currentLocationReducer from "../Slices/CurrentLocation";
import currentSkillReducer from "../Slices/CurrentSkill";
import resourceReducer from "../Slices/CurrentResource";
import resourcesReducer from "../Slices/Resources";
import walletReducer from "../Slices/Wallet";
import lumbridgequestReducer from "../Slices/QuestSlices/Lumbridge";
import draynorquestReducer from "../Slices/QuestSlices/Draynor";
import bodySlotSliceReducer from "../Slices/ArmorSlices/BodySlotSlice";
import handSlotSliceReducer from "../Slices/ArmorSlices/HandsSlotSlice";
import feetSlotSliceReducer from "../Slices/ArmorSlices/FeetSlotSlice";
import headSlotSliceReducer from "../Slices/ArmorSlices/HeadSlotSlice";
import legsSlotSliceReducer from "../Slices/ArmorSlices/LegsSlotSlice";

export default combineReducers({
  buttons1: buttons1Reducer,
  buttons2: buttons2Reducer,
  buttons3: buttons3Reducer,
  Experience: experienceReducer,
  Bank_Fish: fishReducer,
  Bank_Logs: logsReducer,
  Inventory: inventoryReducer,
  CurrentLocation: currentLocationReducer,
  CurrentSkill: currentSkillReducer,
  CurrentResource: resourceReducer,
  Resources: resourcesReducer,
  Wallet: walletReducer,
  Quests_Lumbridge: lumbridgequestReducer,
  Quests_Draynor: draynorquestReducer,
  BodySlot: bodySlotSliceReducer,
  HandSlot: handSlotSliceReducer,
  FeetFlot: feetSlotSliceReducer,
  HeadSlot: headSlotSliceReducer,
  LegsSlot: legsSlotSliceReducer,
});
