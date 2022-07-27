import { Request } from "express";

export interface AppProps {}
export interface NoProps {}
export interface LobbyProps {
  setShowLobbyButton: Function;
}
export interface GameContainerProps {
  setShowLobbyButton: Function;
}
export interface LoginCompProps {
  setLoggedIn: Function;
  loggedIn: boolean;
}
export interface NewUserCompProps {
  setLoggedIn: Function;
  loggedIn: boolean;
}
export interface NavigationAreaCompProps {
  newChatLog: Function;
  chatLogArray: IChatLog[];
}
export interface ResourcesCompProps {
  newChatLog: Function;
}

export interface QuestPanelCompProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
  chatLogArray: IChatLog[];
  questStepProgress: number;
}

export interface SkillsPanelCompProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
  chatLogArray: IChatLog[];
  setCurrentEquipment: Function;
  currentEquipment: ICurrentEquipment;
}

export interface ActivityButtonsCompProps {
  handleUpdateDisplay: Function;
  newChatLog?: Function;
}

export interface MinigamePanelCompProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
}

export interface BossesPanelProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
}

export interface CombatPanelProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
  chatLogArray: IChatLog[];
}

export interface BankPanelProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
}

export interface ShopPanelProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
  chatLogArray: IChatLog[];
}

export interface CluesPanelProps {
  handleUpdateDisplay: Function;
  newChatLog: Function;
}

export interface WornEquipmentCompProps {
  newChatLog: Function;
  setCurrentEquipment: Function;
  currentEquipment: ICurrentEquipment;
}

export interface ActivityAreaCompProps {
  newChatLog: Function;
  chatLogArray: IChatLog[];
  setCurrentEquipment: Function;
  currentEquipment: ICurrentEquipment;
  questStepProgress: number;
}

export interface ChatWindowCompProps {
  chatLogArray: IChatLog[];
}

export interface ILog {
  name: string;
  displayName: string;
  levelReqWoodcutting: number;
  XPGivenWoodcutting: number;
  levelReqFiremaking: number;
  XPGivenFiremaking: number;
  value: number;
  low: logRoll;
  high: logRoll;
}
export interface logRoll {
  bronze: number;
  iron: number;
  steel: number;
  mithril: number;
  adamant: number;
  rune: number;
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
  displayName: string;
  levelReqFishing: number;
  XPGivenFishing: number;
  levelReqCooking: number;
  XPGivenCooking: number;
  stopBurnLevel: number;
  value: number;
  low: number;
  high: number;
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

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export interface IFlatObjectOfNums {
  [key: string]: number;
}

export interface IFlatObjectOfBooleans {
  [key: string]: boolean;
}

export interface ISkillList {
  Attack: number;
  Strength: number;
  Defence: number;
  Constitution: number;
  Prayer: number;
  Summoning: number;
  Ranged: number;
  Magic: number;
  Crafting: number;
  Mining: number;
  Smithing: number;
  Fishing: number;
  Cooking: number;
  Firemaking: number;
  Woodcutting: number;
  Runecrafting: number;
  Dungeoneering: number;
  Fletching: number;
  Agility: number;
  Herblore: number;
  Thieving: number;
  Slayer: number;
  Farming: number;
  Construction: number;
  Hunter: number;
  Divination: number;
  Invention: number;
  Archaeology: number;
}

export interface IStateQuest {
  name: string;
  stepsComplete: number;
  stepsTotal: number;
  complete: boolean;
}

export interface ListOfSkills {
  CurrentSkill: ListOfSkillOptions;
}

export type ListOfSkillOptions = `none` | `Woodcutting` | `Firemaking` | `Mining` | `Fishing` | `Attack` | `Strength` | `Defence` | `Ranged` | `Magic`;
export type ListOfCombatStyleSkills = `Attack` | `Strength` | `Defence` | `Ranged` | `Magic`;

export interface ICurrentResource {
  CurrentResource: ICurrentResourceOptions;
}
export type ICurrentResourceOptions =
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

export interface AllSlots {
  BackSlot: IBackSlotSlice;
  BodySlot: IBodySlotSlice;
  FeetSlot: IFeetSlotSlice;
  HandSlot: IHandSlotSlice;
  HeadSlot: IHeadSlotSlice;
  LegsSlot: ILegsSlotSlice;
  NeckSlot: INeckSlotSlice;
  RingSlot: IRingSlotSlice;
  TwoHandSlot: ITwoHandSlotSlice;
}

export interface AllState extends AllSlots {
  Experience: ISkillList;
  Bank_Fish: IFishBankSlice;
  Bank_Logs: ILogBankSlice;
  Inventory: I_Inventory;
  Location: ICurrentLocation;
  Activity: ICurrentActivity;
  Skill: ListOfSkills;
  CombatStyle: IListOfCombatStyles;
  Resource: ICurrentResource;
  Target: ICurrentTarget;
  Quest: ICurrentQuest;
  Hatchets: IHatchetsSlice;
  Resources: IResources;
  Wallet: IWallet;
  QuestPoints: IQuestPointsSlice;
  Quests_Lumbridge: LumbridgeQuestSliceCrap;
  Quests_Draynor: DraynorQuestSliceCrap;
}

//@ this is the entirety of the player data structure, identifying player info is optional for auth purposes
export interface IPlayerData extends AllState, IPlayerPayload {
  timestamp: number;
}

export interface IPlayerDataFromMongo extends IPlayerData {
  _id: string;
}

export interface IPlayerPayload {
  username?: string;
  email?: string;
  password?: string;
}

export type ICurrentStyleOptions = `none` | `melee` | `ranged` | `air` | `fire` | `water` | `earth`;

export interface IListOfCombatStyles {
  CurrentStyle: ICurrentStyleOptions;
}

export interface IQuestPointsSlice {
  CurrentQuestPoints: number;
}

export interface ICurrentTarget {
  CurrentTarget: ICurrentTargetOptions;
}
export type ICurrentTargetOptions = `none` | `man` | `goblin` | `giantspider` | `chicken` | `cow` | `spider` | `giantrat` | `swampfrog`;

//@ extend this as more locations are added
export interface ILumbridgeEnemies {
  man: IEnemySummary;
  goblin: IEnemySummary;
  giantspider: IEnemySummary;
  chicken: IEnemySummary;
  cow: IEnemySummary;
  spider: IEnemySummary;
  giantrat: IEnemySummary;
  swampfrog: IEnemySummary;
}

export interface ICurrentQuest {
  CurrentQuest: ICurrentQuestOptions;
}
export type ICurrentQuestOptions =
  | `none`
  | `Cook's Assistant`
  | `Myths of the White Lands`
  | `The Restless Ghost`
  | `The Lost Tribe`
  | `The Blood Pact`
  | `Buyers and Cellars`
  | `A Fairy Tale I - Growing Pains`
  | `A Fairy Tale II - Cure a Queen`
  | `Vampyre Slayer`
  | `Ernest the Chicken`
  | `Animal Magnetism`
  | `Love Story`
  | `Swept Away`
  | `Missing My Mummy`
  | `Stolen Hearts`;

export type AllSliceKeys =
  | IBackSlotSlice
  | IBodySlotSlice
  | IFeetSlotSlice
  | IHandSlotSlice
  | IHeadSlotSlice
  | ILegsSlotSlice
  | INeckSlotSlice
  | IRingSlotSlice
  | ITwoHandSlotSlice;

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
  CurrentInventory: string[];
}

export interface ICurrentActivity {
  CurrentActivity: ICurrentActivityOptions;
}
export type ICurrentActivityOptions = `Banking` | `Skilling` | `Questing` | `In combat` | `Idle`;

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
  itemRewards: IQuestItemReward;
}

export interface IQuestItemReward {
  Coins?: number;
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
  CurrentLocation: ICurrentLocationOptions;
}
export type ICurrentLocationOptions = `Lumbridge` | `Draynor`;

export interface IChatLog {
  timeStamp: string;
  message: string;
  tags: ChatLogTag;
}

//@ chatLogs may only have 1 tag - if this is changed, then the filter logic needs to be updated
export type ChatLogTag =
  | `Gained Resource`
  | `Monster Drop`
  | `Monster Defeated`
  | `Rare Item`
  | `Level Up`
  | `Gained XP`
  | `Nonfilterable`
  | `Quest Completed`
  | `Equipment Swap`
  | `Activity Swap`
  | `Misc`;

export interface IArmorItem {
  name: string;
  displayName: string;
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

export interface ICompositeArmorItem extends IArmorItem {
  playerOwnsThisItem: boolean;
}

export type SpellElement = `typeless` | `air` | `fire` | `water` | `earth`;
export type CombatStyle = `melee` | `magic` | `ranged`;

export interface ICompositeWeaponItem extends IWeaponItem {
  playerOwnsThisItem: boolean;
}

export interface IWeaponItem {
  thisWeaponStyle: CombatStyle;
  levelReqAttack: number;
  levelReqStrength: number;
  levelReqMagic: number;
  levelReqRanged: number;
  damage: number;
  accuracy: number;
  staffElement: SpellElement;
  name: string;
  displayName: string;
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
/*********************************************************************************************************************** */
export interface IListOfMeleeHeads {
  bronzefullhelm: IArmorItem;
  ironfullhelm: IArmorItem;
  steelfullhelm: IArmorItem;
  mithrilfullhelm: IArmorItem;
  adamantfullhelm: IArmorItem;
  runefullhelm: IArmorItem;
}
export interface IListOfMagicHeads {
  wizardhat: IArmorItem;
  imphidehood: IArmorItem;
  spidersilkhood: IArmorItem;
  batwinghood: IArmorItem;
  splitbarkhelm: IArmorItem;
}
export interface IListOfRangedHeads {
  leathercowl: IArmorItem;
  hardleathercowl: IArmorItem;
  studdedleathercoif: IArmorItem;
  carapacehelm: IArmorItem;
  greendragonhidecoif: IArmorItem;
}
export type IListOfAllHeads = IListOfMeleeHeads | IListOfMagicHeads | IListOfRangedHeads;

export interface IArmorSlotHead {
  none: IArmorItem;
  bronzefullhelm: IArmorItem;
  ironfullhelm: IArmorItem;
  steelfullhelm: IArmorItem;
  mithrilfullhelm: IArmorItem;
  adamantfullhelm: IArmorItem;
  runefullhelm: IArmorItem;
  wizardhat: IArmorItem;
  imphidehood: IArmorItem;
  spidersilkhood: IArmorItem;
  batwinghood: IArmorItem;
  splitbarkhelm: IArmorItem;
  leathercowl: IArmorItem;
  hardleathercowl: IArmorItem;
  studdedleathercoif: IArmorItem;
  carapacehelm: IArmorItem;
  greendragonhidecoif: IArmorItem;
}
export interface IHeadSlotSlice {
  playerOwnsbronzefullhelm: boolean;
  playerOwnsironfullhelm: boolean;
  playerOwnssteelfullhelm: boolean;
  playerOwnsmithrilfullhelm: boolean;
  playerOwnsadamantfullhelm: boolean;
  playerOwnsrunefullhelm: boolean;

  playerOwnswizardhat: boolean;
  playerOwnsimphidehood: boolean;
  playerOwnsspidersilkhood: boolean;
  playerOwnsbatwinghood: boolean;
  playerOwnssplitbarkhelm: boolean;

  playerOwnsleathercowl: boolean;
  playerOwnshardleathercowl: boolean;
  playerOwnsstuddedleathercoif: boolean;
  playerOwnscarapacehelm: boolean;
  playerOwnsgreendragonhidecoif: boolean;
}
/*********************************************************************************************************************** */

export interface IListOfMeleeBodies {
  bronzeplatebody: IArmorItem;
  ironplatebody: IArmorItem;
  steelplatebody: IArmorItem;
  mithrilplatebody: IArmorItem;
  adamantplatebody: IArmorItem;
  runeplatebody: IArmorItem;
}
export interface IListOfMagicBodies {
  wizardrobetop: IArmorItem;
  imphiderobetop: IArmorItem;
  spidersilkrobetop: IArmorItem;
  batwingtorso: IArmorItem;
  splitbarkbody: IArmorItem;
}
export interface IListOfRangedBodies {
  leatherbody: IArmorItem;
  hardleatherbody: IArmorItem;
  studdedbody: IArmorItem;
  carapacetorso: IArmorItem;
  greendragonhidebody: IArmorItem;
}
export type IListOfAllBodies = IListOfMeleeBodies | IListOfMagicBodies | IListOfRangedBodies;

export interface IArmorSlotBody {
  none: IArmorItem;
  bronzeplatebody: IArmorItem;
  ironplatebody: IArmorItem;
  steelplatebody: IArmorItem;
  mithrilplatebody: IArmorItem;
  adamantplatebody: IArmorItem;
  runeplatebody: IArmorItem;
  wizardrobetop: IArmorItem;
  imphiderobetop: IArmorItem;
  spidersilkrobetop: IArmorItem;
  batwingtorso: IArmorItem;
  splitbarkbody: IArmorItem;
  leatherbody: IArmorItem;
  hardleatherbody: IArmorItem;
  studdedbody: IArmorItem;
  carapacetorso: IArmorItem;
  greendragonhidebody: IArmorItem;
}
export interface IBodySlotSlice {
  playerOwnsbronzeplatebody: boolean;
  playerOwnsironplatebody: boolean;
  playerOwnssteelplatebody: boolean;
  playerOwnsmithrilplatebody: boolean;
  playerOwnsadamantplatebody: boolean;
  playerOwnsruneplatebody: boolean;

  playerOwnswizardrobetop: boolean;
  playerOwnsimphiderobetop: boolean;
  playerOwnsspidersilkrobetop: boolean;
  playerOwnsbatwingtorso: boolean;
  playerOwnssplitbarkbody: boolean;

  playerOwnsleatherbody: boolean;
  playerOwnshardleatherbody: boolean;
  playerOwnsstuddedbody: boolean;
  playerOwnscarapacetorso: boolean;
  playerOwnsgreendragonhidebody: boolean;
}
/*********************************************************************************************************************** */

export interface IListOfMeleeLegs {
  bronzeplatelegs: IArmorItem;
  ironplatelegs: IArmorItem;
  steelplatelegs: IArmorItem;
  mithrilplatelegs: IArmorItem;
  adamantplatelegs: IArmorItem;
  runeplatelegs: IArmorItem;
}
export interface IListOfMagicLegs {
  wizardrobeskirt: IArmorItem;
  imphiderobebottom: IArmorItem;
  spidersilkrobebottom: IArmorItem;
  batwinglegs: IArmorItem;
  splitbarklegs: IArmorItem;
}
export interface IListOfRangedLegs {
  leatherchaps: IArmorItem;
  hardleatherchaps: IArmorItem;
  studdedchaps: IArmorItem;
  carapacelegs: IArmorItem;
  greendragonhidechaps: IArmorItem;
}
export type IListOfAllLegs = IListOfMeleeLegs | IListOfMagicLegs | IListOfRangedLegs;

export interface IArmorSlotLegs {
  none: IArmorItem;
  bronzeplatelegs: IArmorItem;
  ironplatelegs: IArmorItem;
  steelplatelegs: IArmorItem;
  mithrilplatelegs: IArmorItem;
  adamantplatelegs: IArmorItem;
  runeplatelegs: IArmorItem;
  wizardrobeskirt: IArmorItem;
  imphiderobebottom: IArmorItem;
  spidersilkrobebottom: IArmorItem;
  batwinglegs: IArmorItem;
  splitbarklegs: IArmorItem;
  leatherchaps: IArmorItem;
  hardleatherchaps: IArmorItem;
  studdedchaps: IArmorItem;
  carapacelegs: IArmorItem;
  greendragonhidechaps: IArmorItem;
}
export interface ILegsSlotSlice {
  playerOwnsbronzeplatelegs: boolean;
  playerOwnsironplatelegs: boolean;
  playerOwnssteelplatelegs: boolean;
  playerOwnsmithrilplatelegs: boolean;
  playerOwnsadamantplatelegs: boolean;
  playerOwnsruneplatelegs: boolean;

  playerOwnswizardrobeskirt: boolean;
  playerOwnsimphiderobebottom: boolean;
  playerOwnsspidersilkrobebottom: boolean;
  playerOwnsbatwinglegs: boolean;
  playerOwnssplitbarklegs: boolean;

  playerOwnsleatherchaps: boolean;
  playerOwnshardleatherchaps: boolean;
  playerOwnsstuddedchaps: boolean;
  playerOwnscarapacelegs: boolean;
  playerOwnsgreendragonhidechaps: boolean;
}
/*********************************************************************************************************************** */

export interface IListOfMeleeFeet {
  bronzearmouredboots: IArmorItem;
  ironarmouredboots: IArmorItem;
  steelarmouredboots: IArmorItem;
  mithrilarmouredboots: IArmorItem;
  adamantarmouredboots: IArmorItem;
  runearmouredboots: IArmorItem;
}
export interface IListOfMagicFeet {
  wizardboots: IArmorItem;
  imphideboots: IArmorItem;
  spidersilkboots: IArmorItem;
  batwingboots: IArmorItem;
  splitbarkboots: IArmorItem;
}
export interface IListOfRangedFeet {
  leatherboots: IArmorItem;
  hardleatherboots: IArmorItem;
  studdedleatherboots: IArmorItem;
  carapaceboots: IArmorItem;
  greendragonhideboots: IArmorItem;
}
export type IListOfAllFeet = IListOfMeleeFeet | IListOfMagicFeet | IListOfRangedFeet;

export interface IArmorSlotFeet {
  none: IArmorItem;
  bronzearmouredboots: IArmorItem;
  ironarmouredboots: IArmorItem;
  steelarmouredboots: IArmorItem;
  mithrilarmouredboots: IArmorItem;
  adamantarmouredboots: IArmorItem;
  runearmouredboots: IArmorItem;
  wizardboots: IArmorItem;
  imphideboots: IArmorItem;
  spidersilkboots: IArmorItem;
  batwingboots: IArmorItem;
  splitbarkboots: IArmorItem;
  leatherboots: IArmorItem;
  hardleatherboots: IArmorItem;
  studdedleatherboots: IArmorItem;
  carapaceboots: IArmorItem;
  greendragonhideboots: IArmorItem;
}
export interface IFeetSlotSlice {
  playerOwnsbronzearmouredboots: boolean;
  playerOwnsironarmouredboots: boolean;
  playerOwnssteelarmouredboots: boolean;
  playerOwnsmithrilarmouredboots: boolean;
  playerOwnsadamantarmouredboots: boolean;
  playerOwnsrunearmouredboots: boolean;

  playerOwnswizardboots: boolean;
  playerOwnsimphideboots: boolean;
  playerOwnsspidersilkboots: boolean;
  playerOwnsbatwingboots: boolean;
  playerOwnssplitbarkboots: boolean;

  playerOwnsleatherboots: boolean;
  playerOwnshardleatherboots: boolean;
  playerOwnsstuddedleatherboots: boolean;
  playerOwnscarapaceboots: boolean;
  playerOwnsgreendragonhideboots: boolean;
}
/*********************************************************************************************************************** */

export interface IListOfMeleeHands {
  bronzegauntlets: IArmorItem;
  irongauntlets: IArmorItem;
  steelgauntlets: IArmorItem;
  mithrilgauntlets: IArmorItem;
  adamantgauntlets: IArmorItem;
  runegauntlets: IArmorItem;
}
export interface IListOfMagicHands {
  wizardgloves: IArmorItem;
  imphidegloves: IArmorItem;
  spidersilkgloves: IArmorItem;
  batwinggloves: IArmorItem;
  splitbarkgauntlets: IArmorItem;
}
export interface IListOfRangedHands {
  leathervambraces: IArmorItem;
  hardleathergloves: IArmorItem;
  studdedleathergloves: IArmorItem;
  carapacegloves: IArmorItem;
  greendragonhidevambraces: IArmorItem;
}
export type IListOfAllHands = IListOfMeleeHands | IListOfMagicHands | IListOfRangedHands;

export interface IArmorSlotHands {
  none: IArmorItem;
  bronzegauntlets: IArmorItem;
  irongauntlets: IArmorItem;
  steelgauntlets: IArmorItem;
  mithrilgauntlets: IArmorItem;
  adamantgauntlets: IArmorItem;
  runegauntlets: IArmorItem;
  wizardgloves: IArmorItem;
  imphidegloves: IArmorItem;
  spidersilkgloves: IArmorItem;
  batwinggloves: IArmorItem;
  splitbarkgauntlets: IArmorItem;
  leathervambraces: IArmorItem;
  hardleathergloves: IArmorItem;
  studdedleathergloves: IArmorItem;
  carapacegloves: IArmorItem;
  greendragonhidevambraces: IArmorItem;
}
export interface IHandSlotSlice {
  playerOwnsbronzegauntlets: boolean;
  playerOwnsirongauntlets: boolean;
  playerOwnssteelgauntlets: boolean;
  playerOwnsmithrilgauntlets: boolean;
  playerOwnsadamantgauntlets: boolean;
  playerOwnsrunegauntlets: boolean;

  playerOwnswizardgloves: boolean;
  playerOwnsimphidegloves: boolean;
  playerOwnsspidersilkgloves: boolean;
  playerOwnsbatwinggloves: boolean;
  playerOwnssplitbarkgauntlets: boolean;

  playerOwnsleathervambraces: boolean;
  playerOwnshardleathergloves: boolean;
  playerOwnsstuddedleathergloves: boolean;
  playerOwnscarapacegloves: boolean;
  playerOwnsgreendragonhidevambraces: boolean;
}
/*********************************************************************************************************************** */

export interface IListOfMeleeCapes {
  bladestormdrape: IArmorItem;
}
export interface IListOfMagicCapes {
  spellstormdrape: IArmorItem;
}
export interface IListOfRangedCapes {
  arrowstormdrape: IArmorItem;
}
export interface IListOfTypelessCapes {
  pathfindercape: IArmorItem;
  teamcape: IArmorItem;
  obsidiancape: IArmorItem;
}
export type IListOfAllCapes = IListOfMeleeCapes | IListOfMagicCapes | IListOfRangedCapes | IListOfTypelessCapes;

export interface IArmorSlotBack {
  none: IArmorItem;
  bladestormdrape: IArmorItem;
  spellstormdrape: IArmorItem;
  arrowstormdrape: IArmorItem;
  pathfindercape: IArmorItem;
  teamcape: IArmorItem;
  obsidiancape: IArmorItem;
}
export interface IBackSlotSlice {
  playerOwnsbladestormdrape: boolean;
  playerOwnsspellstormdrape: boolean;
  playerOwnsarrowstormdrape: boolean;
  playerOwnspathfindercape: boolean;
  playerOwnsteamcape: boolean;
  playerOwnsobsidiancape: boolean;
}
/*********************************************************************************************************************** */
export interface IListOfMeleeRings {
  warriorring: IArmorItem;
}
export interface IListOfMagicRings {
  seersring: IArmorItem;
}
export interface IListOfRangedRings {
  archerring: IArmorItem;
}
export interface IListOfTypelessRings {
  ringofpotency: IArmorItem;
  ringofwealth: IArmorItem;
  berserkerring: IArmorItem;
}
export type IListOfAllRings = IListOfMeleeRings | IListOfMagicRings | IListOfRangedRings | IListOfTypelessRings;

export interface IArmorSlotRing {
  none: IArmorItem;
  warriorring: IArmorItem;
  seersring: IArmorItem;
  archerring: IArmorItem;
  ringofpotency: IArmorItem;
  ringofwealth: IArmorItem;
  berserkerring: IArmorItem;
}
export interface IRingSlotSlice {
  playerOwnswarriorring: boolean;
  playerOwnsseersring: boolean;
  playerOwnsarcherring: boolean;
  playerOwnsringofpotency: boolean;
  playerOwnsringofwealth: boolean;
  playerOwnsberserkerring: boolean;
}

/*********************************************************************************************************************** */
export interface IListOfMeleeNecks {
  amuletofstrength: IArmorItem;
}
export interface IListOfMagicNecks {
  amuletofmagic: IArmorItem;
}
export interface IListOfRangedNecks {
  amuletofaccuracy: IArmorItem;
}
export interface IListOfTypelessNecks {
  holysymbol: IArmorItem;
  amuletofdefence: IArmorItem;
  amuletofpower: IArmorItem;
  amuletofglory: IArmorItem;
  amuletoffury: IArmorItem;
}
export type IListOfAllNecks = IListOfMeleeNecks | IListOfMagicNecks | IListOfRangedNecks | IListOfTypelessNecks;

export interface IArmorSlotNeck {
  none: IArmorItem;
  amuletofstrength: IArmorItem;
  amuletofmagic: IArmorItem;
  amuletofaccuracy: IArmorItem;
  holysymbol: IArmorItem;
  amuletofdefence: IArmorItem;
  amuletofpower: IArmorItem;
  amuletofglory: IArmorItem;
  amuletoffury: IArmorItem;
}
export interface INeckSlotSlice {
  playerOwnsamuletofstrength: boolean;
  playerOwnsamuletofmagic: boolean;
  playerOwnsamuletofaccuracy: boolean;
  playerOwnsholysymbol: boolean;
  playerOwnsamuletofdefence: boolean;
  playerOwnsamuletofpower: boolean;
  playerOwnsamuletofglory: boolean;
  playerOwnsamuletoffury: boolean;
}
/*********************************************************************************************************************** */

export interface IListOfMeleeTwoHand {
  bronze2hsword: IWeaponItem;
  iron2hsword: IWeaponItem;
  steel2hsword: IWeaponItem;
  mithril2hsword: IWeaponItem;
  adamant2hsword: IWeaponItem;
  rune2hsword: IWeaponItem;
}
export interface IListOfMagicTwoHand {
  staffofair: IWeaponItem;
  staffofwater: IWeaponItem;
  staffofearth: IWeaponItem;
  staffoffire: IWeaponItem;
  airbattlestaff: IWeaponItem;
  waterbattlestaff: IWeaponItem;
  earthbattlestaff: IWeaponItem;
  firebattlestaff: IWeaponItem;
  mysticairstaff: IWeaponItem;
  mysticwaterstaff: IWeaponItem;
  mysticearthstaff: IWeaponItem;
  mysticfirestaff: IWeaponItem;
}
export interface IListOfRangedTwoHand {
  shortbow: IWeaponItem;
  oakshortbow: IWeaponItem;
  willowshortbow: IWeaponItem;
  mapleshortbow: IWeaponItem;
  yewshortbow: IWeaponItem;
  magicshortbow: IWeaponItem;
}
export type IListOfAllTwoHand = IListOfMeleeTwoHand | IListOfMagicTwoHand | IListOfRangedTwoHand;

export interface IArmorSlotTwoHand {
  none: IArmorItem;
  bronze2hsword: IWeaponItem;
  iron2hsword: IWeaponItem;
  steel2hsword: IWeaponItem;
  mithril2hsword: IWeaponItem;
  adamant2hsword: IWeaponItem;
  rune2hsword: IWeaponItem;
  staffofair: IWeaponItem;
  staffofwater: IWeaponItem;
  staffofearth: IWeaponItem;
  staffoffire: IWeaponItem;
  airbattlestaff: IWeaponItem;
  waterbattlestaff: IWeaponItem;
  earthbattlestaff: IWeaponItem;
  firebattlestaff: IWeaponItem;
  mysticairstaff: IWeaponItem;
  mysticwaterstaff: IWeaponItem;
  mysticearthstaff: IWeaponItem;
  mysticfirestaff: IWeaponItem;
  shortbow: IWeaponItem;
  oakshortbow: IWeaponItem;
  willowshortbow: IWeaponItem;
  mapleshortbow: IWeaponItem;
  yewshortbow: IWeaponItem;
  magicshortbow: IWeaponItem;
}
export interface ITwoHandSlotSlice {
  playerOwnsbronze2hsword: boolean;
  playerOwnsiron2hsword: boolean;
  playerOwnssteel2hsword: boolean;
  playerOwnsmithril2hsword: boolean;
  playerOwnsadamant2hsword: boolean;
  playerOwnsrune2hsword: boolean;

  playerOwnsstaffofair: boolean;
  playerOwnsstaffofwater: boolean;
  playerOwnsstaffofearth: boolean;
  playerOwnsstaffoffire: boolean;
  playerOwnsairbattlestaff: boolean;
  playerOwnswaterbattlestaff: boolean;
  playerOwnsearthbattlestaff: boolean;
  playerOwnsfirebattlestaff: boolean;
  playerOwnsmysticairstaff: boolean;
  playerOwnsmysticwaterstaff: boolean;
  playerOwnsmysticearthstaff: boolean;
  playerOwnsmysticfirestaff: boolean;

  playerOwnsshortbow: boolean;
  playerOwnsoakshortbow: boolean;
  playerOwnswillowshortbow: boolean;
  playerOwnsmapleshortbow: boolean;
  playerOwnsyewshortbow: boolean;
  playerOwnsmagicshortbow: boolean;
}
/*********************************************************************************************************************** */

export type IEquipmentSlotOptions = IArmorSlotBody | IArmorSlotHead | IArmorSlotLegs | IArmorSlotHands | IArmorSlotFeet | IArmorSlotTwoHand;

export interface ICurrentEquipment {
  BackSlot: `none` | IArmorSlotBack;
  BodySlot: `none` | IArmorSlotBody;
  FeetSlot: `none` | IArmorSlotFeet;
  HandsSlot: `none` | IArmorSlotHands;
  HeadSlot: `none` | IArmorSlotHead;
  LegsSlot: `none` | IArmorSlotLegs;
  NeckSlot: `none` | IArmorSlotNeck;
  RingSlot: `none` | IArmorSlotRing;
  TwoHandSlot: `none` | IArmorSlotTwoHand;
  Hatchet: `none` | IListOfHatchetOptions;
}
/*********************************************************************************************************************** */

export interface IEnemySummary {
  name: string;
  displayName: string;
  level: number;
  lifePoints: number;
  XPGivenCombatStyle: number;
  XPGivenConstitution: number;
  affinities: {
    explicitWeakness: CombatStyle | SpellElement;
    weakStyle: CombatStyle;
    neutralStyle: CombatStyle;
    strongStyle: CombatStyle;
  };
  armor: number;
  defence: number;
  accuracy: number;
}

//@ recreate this for each location
export interface ILumbridgeEnemies {
  man: IEnemySummary;
  goblin: IEnemySummary;
  giantspider: IEnemySummary;
  chicken: IEnemySummary;
  cow: IEnemySummary;
  spider: IEnemySummary;
  giantrat: IEnemySummary;
  swampfrog: IEnemySummary;
}

//@ extend this as more locations are added
export interface IAllEnemies {
  Lumbridge: ILumbridgeEnemies;
}
//@ extend this as more locations are added
export type IEnemyLocations = ILumbridgeEnemies;

export interface IHatchet {
  name: string;
  displayName: string;
  levelReqWoodcutting: number;
  value: number;
}

export interface IListOfHatchets {
  bronzehatchet: IHatchet;
  ironhatchet: IHatchet;
  steelhatchet: IHatchet;
  mithrilhatchet: IHatchet;
  adamanthatchet: IHatchet;
  runehatchet: IHatchet;
}
export type IListOfHatchetOptions = `bronzehatchet` | `ironhatchet` | `steelhatchet` | `mithrilhatchet` | `adamanthatchet` | `runehatchet`;

export interface IHatchetsSlice {
  playerOwnsbronzehatchet: boolean;
  playerOwnsironhatchet: boolean;
  playerOwnssteelhatchet: boolean;
  playerOwnsmithrilhatchet: boolean;
  playerOwnsadamanthatchet: boolean;
  playerOwnsrunehatchet: boolean;
}

export interface ICompositeHatchet extends IHatchet {
  playerOwnsThisItem: boolean;
}

export interface IFetchOptions {
  headers: IHeaderObject;
  body?: string;
}

export interface IHeaderObject {
  [key: string]: string;
}

export interface ReqUser extends Request {
  user?: { username?: string; email?: string; password?: string };
}
