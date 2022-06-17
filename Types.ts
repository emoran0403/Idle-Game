import store from "./src/client/Redux/store";

export interface AppProps {}
export interface NoProps {}
export interface CounterProps {}
export interface InventoryProps {}
export interface WoodcuttingCompProps {}
export interface FletchingCompProps {}
export interface FiremakingCompProps {}

export interface ILog {
  name: string;
  levelReqWoodcutting: number;
  XPGivenWoodcutting: number;
  levelReqFiremaking: number;
  XPGivenFiremaking: number;
  value: number;
}

export interface IListOfLogs {
  [key: string]: ILog;
}

export interface IFish {
  name: string;
  levelReqFishing: number;
  XPGivenFishing: number;
  levelReqCooking: number;
  XPGivenCooking: number;
  stopBurnLevel: number;
  value: number;
}

export interface IListOfFish {
  [key: string]: IFish;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

//! this can probably be improved
export interface ButtonSlice {
  buttons1?: { value: number };
  buttons2?: { value: number };
  buttons3?: { value: number };
}

export interface IFlatObjectOfNums {
  [key: string]: number;
}

export interface IFlatObjectOfBooleans {
  [key: string]: boolean;
}

export interface ISkillList {
  Woodcutting: number;
  Firemaking: number;
  Attack: number;
  Strength: number;
  Defense: number;
  Consitution: number;
  Prayer: number;
  Summoning: number;
  Ranged: number;
  Magic: number;
}

//! revamp this
export interface IStateQuest {
  name: string;
  stepsComplete: number;
  stepsTotal: number;
  complete: boolean;
}

export interface AllState {
  Experience: ISkillList;
  Bank: IBankList;
  Inventory: I_Inventory;
  CurrentLocation: ICurrentLocation;
  CurrentActivity: ICurrentActivity;
  Resources: IResources;
}

export interface IBankList {
  Coins: number;
  Logs: number;
  Ashes: number;
}

export interface I_Inventory {
  quantity: number;
  items: { [key: string]: number };
}

export interface ICurrentLocation {
  Lumbridge: boolean;
  Bank: boolean;
}

export interface ICurrentActivity {
  Banking: boolean;
  Woodcutting: boolean;
  Firemaking: boolean;
  Combat: boolean;
}

export interface IResources {
  Banking: boolean;
  Dropping: boolean;
}

export interface IAllQuestInfo {
  name: string;
  location: string;
  stepsComplete: number;
  stepsTotal: number;
  questPoints: number;
  complete: boolean;
  combatRequirements: number;
  questRequirements: string[];
  levelRequirements: IFlatObjectOfNums;
  experienceRewards: IFlatObjectOfNums;
  itemRewards: IFlatObjectOfNums;
}

export interface ILocationSummary {
  Quests: string[];
  Skills: {
    Mining?: string[];
    Fishing?: string[];
    Woodcutting?: string[];
    Farming?: string[];
    Hunter?: string[];
    Divination?: string[];
    Archaeology?: string[];
    Runecrafting?: string[];
    Construction?: string[];
    Summoning?: string[];
    Agility?: string[];
    Thieving?: string[];
  };
  Combat: string[];
}
