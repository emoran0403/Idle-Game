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

export type SpellElement = `none` | `air` | `fire` | `water` | `earth`;

export interface IWeaponItem {
  levelReqAttack: number;
  levelReqStrength: number;
  levelReqMagic: number;
  levelReqRanged: number;
  damage: number;
  accuracy: number;
  staffElement: SpellElement;
  name: string;
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

export interface IArmorSlotHead {
  melee: IListOfMeleeHeads;
  magic: IListOfMagicHeads;
  ranged: IListOfRangedHeads;
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

export interface IArmorSlotBody {
  melee: IListOfMeleeBodies;
  magic: IListOfMagicBodies;
  ranged: IListOfRangedBodies;
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

export interface IArmorSlotLegs {
  melee: IListOfMeleeLegs;
  magic: IListOfMagicLegs;
  ranged: IListOfRangedLegs;
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

export interface IArmorSlotFeet {
  melee: IListOfMeleeFeet;
  magic: IListOfMagicFeet;
  ranged: IListOfRangedFeet;
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

export interface IArmorSlotHands {
  melee: IListOfMeleeHands;
  magic: IListOfMagicHands;
  ranged: IListOfRangedHands;
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

export interface IArmorSlotBack {
  melee: IListOfMeleeCapes;
  magic: IListOfMagicCapes;
  ranged: IListOfRangedCapes;
  hybrid: IListOfTypelessCapes;
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

export interface IArmorSlotRing {
  melee: IListOfMeleeRings;
  magic: IListOfMagicRings;
  ranged: IListOfRangedRings;
  hybrid: IListOfTypelessRings;
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

export interface IArmorSlotNeck {
  melee: IListOfMeleeNecks;
  magic: IListOfMagicNecks;
  ranged: IListOfRangedNecks;
  hybrid: IListOfTypelessNecks;
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

export interface IArmorSlotTwoHand {
  melee: IListOfMeleeTwoHand;
  magic: IListOfMagicTwoHand;
  ranged: IListOfRangedTwoHand;
}
export interface ITwoHandSlotSlice {
  bronze2hsword: boolean;
  iron2hsword: boolean;
  steel2hsword: boolean;
  mithril2hsword: boolean;
  adamant2hsword: boolean;
  rune2hsword: boolean;

  staffofair: boolean;
  staffofwater: boolean;
  staffofearth: boolean;
  staffoffire: boolean;
  airbattlestaff: boolean;
  waterbattlestaff: boolean;
  earthbattlestaff: boolean;
  firebattlestaff: boolean;
  mysticairstaff: boolean;
  mysticwaterstaff: boolean;
  mysticearthstaff: boolean;
  mysticfirestaff: boolean;

  shortbow: boolean;
  oakshortbow: boolean;
  willowshortbow: boolean;
  mapleshortbow: boolean;
  yewshortbow: boolean;
  magicshortbow: boolean;
}
