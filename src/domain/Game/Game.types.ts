export type TPlayerId = string;
export type TPlayerVariant = TPlayerId | 'stranger';

export interface IInput {
  id: TPlayerId;
  tick: number;
  ants: IAnt[];
  canvas: IMap;
}

export interface IAnt {
  id: number;
  wasted: number;
  age: number;
  health: number;
  cargo: number;
  point: { x: number; y: number };
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
  terrain?: string; // TODO: 'clear' | ...
}
