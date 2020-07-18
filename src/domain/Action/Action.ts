export enum EActionType {
  STAY = 'stay',
  MOVE = 'move',
  EAT = 'eat',
  LOAD = 'load',
  UNLOAD = 'unload',
}

export enum EActionDirection {
  UP = 'up',
  DOWN = 'down',
  RIGHT = 'right',
  LEFT = 'left',
}

export class Action {
  constructor(public type: EActionType, public move?: MArea.IPoint) { }

  get direction(): EActionDirection | undefined {
    if (!this.move) return;
    return this.move.x !== 0
      ? (this.move.x > 0 ? EActionDirection.RIGHT : EActionDirection.LEFT)
      : (this.move.y > 0 ? EActionDirection.DOWN : EActionDirection.UP)
  }

  toJSON() {
    return {
      act: this.type,
      dir: this.direction,
    };
  }
}
