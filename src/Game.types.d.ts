declare module MGame {
  type TInputPlayerId = string;
  type TInputPlayerVariant = TInputPlayerId | 'stranger';

  interface IInput {
    tick: number;
    id: TInputPlayerId;
    ants: IAntList;
    map: IMap;
  }

  type IAntList = { [id: string]: IAnt };

  interface IAnt {
    wasted: number;
    age: number;
    health: number;
    payload: number;
    x: number;
    y: number;
    event: string;
  }

  interface IMap {
    width: number;
    height: number;
    cells: ICell[][];
  }

  interface ICell {
    ant?: TInputPlayerVariant;
    hive?: TInputPlayerVariant;
    food?: number;
  }
}
