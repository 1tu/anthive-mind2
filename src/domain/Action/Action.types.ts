export interface IActionServer {
  act: EActionName,
  dir?: EActionDirection,
};

export enum EActionDirection {
  UP = 'up',
  DOWN = 'down',
  RIGHT = 'right',
  LEFT = 'left',
}

export enum EActionName {
  STAY = 'stay',
  MOVE = 'move',
  EAT = 'eat',
  LOAD = 'load',
  UNLOAD = 'unload',
}
