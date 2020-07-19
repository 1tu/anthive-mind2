export type TPlayerId = string;
export type TPlayerVariant = TPlayerId | 'stranger';

export interface IInput {
  tick: number;
  id: TPlayerId;
  ants: IAntList;
  map: IMap;
}

export type IAntList = { [id: string]: IAnt };

export interface IAnt {
  wasted: number;
  age: number;
  health: number;
  payload: number;
  x: number;
  y: number;
  event: string;
}

export interface IMap {
  // width: number;
  // height: number;
  cells: ICell[][];
}

export interface ICell {
  ant?: TPlayerVariant;
  hive?: TPlayerVariant;
  food?: number;
}
