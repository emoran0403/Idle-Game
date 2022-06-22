import store from "./src/client/Redux/store";

export interface AppProps {}
export interface NoProps {}
export interface CounterProps {}
export interface InventoryProps {}
export interface WoodcuttingCompProps {}
export interface FletchingCompProps {}
export interface FiremakingCompProps {}
export interface ActivitiesProps {
  handleUpdateDisplay: Function;
}

export interface ILog {
  name: string;
  levelReqWoodcutting: number;
  XPGivenWoodcutting: number;
  levelReqFiremaking: number;
  XPGivenFiremaking: number;
  value: number;
}

export interface IListOfLogs {
  logs: ILog;
  oak: ILog;
  willow: ILog;
  maple: ILog;
  yew: ILog;
  magic: ILog;
  elder: ILog;
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

export interface IStateQuest {
  name: string;
  stepsComplete: number;
  stepsTotal: number;
  complete: boolean;
}

export interface ListOfSkills {
  Current: `Woodcutting` | `Firemaking` | `Mining` | `Fishing`;
}

export type bigwow = `Woodcutting` | `Firemaking` | `Mining` | `Fishing`;

export interface AllState {
  Experience: ISkillList;
  Bank: IBankList;
  Inventory: I_Inventory;
  CurrentLocation: ICurrentLocation;
  CurrentSkill: ListOfSkills;
  Resources: IResources;
  Wallet: IWallet;
  Quests_Lumbridge: LumbridgeQuestSliceCrap;
  Quests_Draynor: DraynorQuestSliceCrap;
}

export interface IWallet {
  Coins: number;
}

//! will need to make more of these for each location's quests
export interface LumbridgeQuestSliceCrap {
  LumbridgeQuestArray: IStateQuest[];
}

export interface DraynorQuestSliceCrap {
  DraynorQuestArray: IStateQuest[];
}

export interface IBankList {
  Coins: number;
  Logs: number;
  Ashes: number;
}

export interface I_Inventory {
  Current: string[];
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

export interface IQuestInfo {
  name: string;
  location: string;
  stepsTotal: number;
  questPoints: number;
  combatRequirements: number;
  questRequirements: string[];
  levelRequirements: IFlatObjectOfNums;
  experienceRewards: IFlatObjectOfNums;
  itemRewards: IFlatObjectOfNums;
}

export interface IAllQuests {
  Lumbridge: IQuestInfo[];
  Draynor: IQuestInfo[];
  Varrock: IQuestInfo[];
}

//@ copy this and trim it down to match the location summary
export interface ILocationSummary {
  Quests: string[];
  Skills: LocationSkills;
  Combat: string[];
  Bosses: string[];
}

export interface ILumbridgeLocationSummary {
  Quests: string[];
  Skills: {
    Mining: string[];
    Fishing: string[];
    Woodcutting: string[];
  };
  Combat: string[];
  Bosses: string[];
}

export interface IDraynorLocationSummary {
  Quests: string[];
  Skills: {
    Mining: string[];
    Fishing: string[];
    Woodcutting: string[];
  };
  Combat: string[];
  Bosses: string[];
}

export interface LocationSkills extends dyamicwow {
  Mining: string[];
  Fishing: string[];
  Woodcutting: string[];
  Farming: string[];
  Firemaking: string[];
  Hunter: string[];
  Divination: string[];
  Archaeology: string[];
  Runecrafting: string[];
  Construction: string[];
  Summoning: string[];
  Agility: string[];
  Thieving: string[];
}

export interface dyamicwow {
  [pizza: string]: string[];
}

export interface IAllLocations {
  Lumbridge: ILumbridgeLocationSummary;
  Draynor: IDraynorLocationSummary;
  // Varrock: ILocationSummary;
}

//This will be the type used for quests displayed in the Quest List component and the Quests in Area panel
export interface ICompositeQuest extends IQuestInfo {
  stepsComplete: number;
  complete: boolean;
}

//@ extend this as needed to account for future locations
export interface ICurrentLocation {
  Current: `Lumbridge` | `Draynor`;
}
