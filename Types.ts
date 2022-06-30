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

export interface IBankItem {
  name: string;
  amount: number;
}

export interface ILogBankSlice {
  logs: IBankItem;
  oak: IBankItem;
  willow: IBankItem;
  maple: IBankItem;
  yew: IBankItem;
  magic: IBankItem;
  elder: IBankItem;
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

export interface IFishBankSlice {
  raw_shrimp: IBankItem;
  raw_crayfish: IBankItem;
  raw_anchovies: IBankItem;
  raw_trout: IBankItem;
  raw_salmon: IBankItem;
  raw_pike: IBankItem;
  raw_sardine: IBankItem;
  raw_herring: IBankItem;
}

export interface IListOfFish {
  raw_shrimp: IFish;
  raw_crayfish: IFish;
  raw_anchovies: IFish;
  raw_trout: IFish;
  raw_salmon: IFish;
  raw_pike: IFish;
  raw_sardine: IFish;
  raw_herring: IFish;
}

export interface IOre {
  name: string;
  levelReqMining: number;
  XPGivenMining: number;
  levelReqSmithing: number;
  XPGivenSmithing: number;
  value: number;
}

export interface IListOfOres {
  tin: IOre;
  copper: IOre;
  iron: IOre;
  coal: IOre;
  mithril: IOre;
}

export interface IRune {
  name: string;
  levelReqRunecrafting: number;
  XPGivenRunecrafting: number;
  value: number;
}

export interface IListOfRunes {
  air: IRune;
  mind: IRune;
  water: IRune;
  earth: IRune;
  fire: IRune;
  body: IRune;
  cosmic: IRune;
  chaos: IRune;
  astral: IRune;
  nature: IRune;
  law: IRune;
  death: IRune;
  blood: IRune;
  soul: IRune;
}

export interface IArrow {
  name: string;
  levelReqRanged: number;
  damage: number;
  value: number;
}

export interface IListOfArrows {
  bronzeArrow: IArrow;
  ironArrow: IArrow;
  steelArrow: IArrow;
  mithrilArrow: IArrow;
  adamantArrow: IArrow;
  runeArrow: IArrow;
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
  Fishing: number;
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

export interface ICurrentResource {
  Current:
    | `none`
    | `raw_shrimp`
    | `raw_crayfish`
    | `raw_anchovies`
    | `raw_trout`
    | `raw_salmon`
    | `raw_pike`
    | `raw_sardine`
    | `raw_herring`
    | `logs`
    | `oak`
    | `willow`
    | `maple`
    | `yew`
    | `magic`
    | `elder`;
}

export interface AllState {
  Experience: ISkillList;
  Bank_Fish: IFishBankSlice;
  Bank_Logs: ILogBankSlice;
  Inventory: I_Inventory;
  CurrentLocation: ICurrentLocation;
  CurrentSkill: ListOfSkills;
  CurrentResource: ICurrentResource;
  Resources: IResources;
  Wallet: IWallet;
  Quests_Lumbridge: LumbridgeQuestSliceCrap;
  Quests_Draynor: DraynorQuestSliceCrap;
}

export interface AllStateQuestSlices {
  Quests_Lumbridge: LumbridgeQuestSliceCrap;
  Quests_Draynor: DraynorQuestSliceCrap;
}

export interface IWallet {
  coins: number;
}

//! will need to make more of these for each location's quests
export interface LumbridgeQuestSliceCrap {
  LumbridgeQuestArray: IStateQuest[];
}

export interface DraynorQuestSliceCrap {
  DraynorQuestArray: IStateQuest[];
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

//! do i really need this?
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

//! do i really need this?
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

export interface LocationSkills {
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

export interface IAllLocations {
  Lumbridge: ILumbridgeLocationSummary;
  Draynor: IDraynorLocationSummary;
  // Varrock: ILocationSummary;
}

//This will be the type used for quests displayed in the Quest List component and the Quests in Area panel
export interface ICompositeQuestInfo extends IQuestInfo {
  stepsComplete: number;
  complete: boolean;
}

//@ extend this as needed to account for future locations
export interface ICurrentLocation {
  Current: `Lumbridge` | `Draynor`;
}

export interface IChatLog {
  timeStamp: string;
  message: string;
  tags: ChatLogTag[];
}

//@ chatLogs may only have 1 tag - if this is changed, then the filter logic needs to be updated
export type ChatLogTag = `Gained Resource` | `Monster Drop` | `Rare Item` | `Level Up` | `Gained XP` | `Welcome` | `Quest Completed`;

export interface IArmorItem {
  name: string;
  levelReqDefence: number;
  tier: number;
  armor: number;
  lifePointsExtra: number;
  prayerPointsExtra: number;
  damageReduction: number;
  styleBonusMelee: number;
  styleBonusRanged: number;
  styleBonusMagic: number;
  value: number;
}

export interface IListOfArmorItems {
  [key: string]: IArmorItem;
}
