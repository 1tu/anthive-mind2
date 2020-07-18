declare namespace MGame {
  type TInputPlayerId = string;
  type TInputPlayerVariant = TInputPlayerId | 'stranger';

  enum EEvent {
    NONE = 'no_action',
    BIRTH = 'birth',
    DEATH = 'death',
    SLOW = 'slow',

    ERROR = 'error',
    ERROR_MOVE = 'bad_move',
    ERROR_UNLOAD = 'bad_unload',
    ERROR_EAT = 'bad_eat',
  }

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
    event: EEvent;
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
