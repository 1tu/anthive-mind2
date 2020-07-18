export class Action {
  constructor(public type: MAction.EType, public move?: MArea.IPoint) { }

  get direction(): MAction.EDirection | undefined {
    if (!this.move) return;
    return this.move.x !== 0
      ? (this.move.x > 0 ? MAction.EDirection.RIGHT : MAction.EDirection.LEFT)
      : (this.move.y > 0 ? MAction.EDirection.DOWN : MAction.EDirection.UP)
  }

  toJSON() {
    return {
      act: this.type,
      dir: this.direction,
    };
  }
}
