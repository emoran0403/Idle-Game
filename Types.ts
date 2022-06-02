export interface AppProps {}
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
