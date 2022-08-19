import { combineReducers } from "@reduxjs/toolkit";
import experienceReducer from "../Slices/Experience";
import fishReducer from "../Slices/BankSlices/FishSlice";
import logsReducer from "../Slices/BankSlices/LogsSlice";
import oresReducer from "../Slices/BankSlices/OresSlice";
import runesreducer from "../Slices/BankSlices/RunesSlice";
import inventoryReducer from "../Slices/Inventory";
import currentLocationReducer from "../Slices/GameStateSlices/CurrentLocation";
import currentSkillReducer from "../Slices/GameStateSlices/CurrentSkill";
import currentCombatStyleReducer from "../Slices/GameStateSlices/CurrentCombatStyle";
import currentActivityReducer from "../Slices/GameStateSlices/CurrentActivity";
import currentResourceReducer from "../Slices/GameStateSlices/CurrentResource";
import currentTargetReducer from "../Slices/GameStateSlices/CurrentTarget";
import currentQuestReducer from "../Slices/GameStateSlices/CurrentQuest";
import resourcesReducer from "../Slices/Resources";
import walletReducer from "../Slices/CurrencySlices/Wallet";
import questPointsReducer from "../Slices/CurrencySlices/QuestPoints";
import lumbridgequestReducer from "../Slices/QuestSlices/Lumbridge";
import draynorquestReducer from "../Slices/QuestSlices/Draynor";
import wizardTowerquestReducer from "../Slices/QuestSlices/WizardTower";
import bodySlotSliceReducer from "../Slices/EquipmentSlices/BodySlotSlice";
import handSlotSliceReducer from "../Slices/EquipmentSlices/HandsSlotSlice";
import feetSlotSliceReducer from "../Slices/EquipmentSlices/FeetSlotSlice";
import headSlotSliceReducer from "../Slices/EquipmentSlices/HeadSlotSlice";
import legsSlotSliceReducer from "../Slices/EquipmentSlices/LegsSlotSlice";
import BackSlotSliceReducer from "../Slices/EquipmentSlices/BackSlotSlice";
import RingSlotSliceReducer from "../Slices/EquipmentSlices/RingSlotSlice";
import NeckSlotSliceReducer from "../Slices/EquipmentSlices/NeckSlotSlice";
import TwoHandSlotSliceReducer from "../Slices/EquipmentSlices/TwoHandSlotSlice";
import HatchetsSliceReducer from "../Slices/SkillingEquipmentSlices/Hatchets";
import PickaxesSliceReducer from "../Slices/SkillingEquipmentSlices/Pickaxes";
import SlayerTaskReducer from "../Slices/SlayerTask";

const AppReducer = combineReducers({
  Experience: experienceReducer,
  Bank_Fish: fishReducer,
  Bank_Logs: logsReducer,
  Bank_Ores: oresReducer,
  Bank_Runes: runesreducer,
  Inventory: inventoryReducer,
  Location: currentLocationReducer,
  Skill: currentSkillReducer,
  CombatStyle: currentCombatStyleReducer,
  Activity: currentActivityReducer,
  Resource: currentResourceReducer,
  Target: currentTargetReducer,
  Quest: currentQuestReducer,
  Resources: resourcesReducer,
  Wallet: walletReducer,
  QuestPoints: questPointsReducer,
  Quests_Lumbridge: lumbridgequestReducer,
  Quests_Draynor: draynorquestReducer,
  Quests_WizardTower: wizardTowerquestReducer,
  BodySlot: bodySlotSliceReducer,
  HandSlot: handSlotSliceReducer,
  FeetSlot: feetSlotSliceReducer,
  HeadSlot: headSlotSliceReducer,
  LegsSlot: legsSlotSliceReducer,
  BackSlot: BackSlotSliceReducer,
  RingSlot: RingSlotSliceReducer,
  NeckSlot: NeckSlotSliceReducer,
  TwoHandSlot: TwoHandSlotSliceReducer,
  Hatchets: HatchetsSliceReducer,
  Pickaxes: PickaxesSliceReducer,
  SlayerTask: SlayerTaskReducer,
});

// wrapping app reducer in another reducer so that we can hydrate with data from the database
// @ts-ignore
const RootReducer = (state, action) => {
  if (action.type === `mongoHydrate`) {
    return AppReducer(action.payload, action);
  }
  return AppReducer(state, action);
};

export default RootReducer;
export type RootState = ReturnType<typeof AppReducer>;
