export interface IActionServer {
  antId: number;
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
  TAKE = 'take',
  PUT = 'put',
}
