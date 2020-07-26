import { IPointState } from '@domain/Area';
import { action, observable } from 'mobx';
import { EActionDirection } from '@domain/Action';

export class Point implements IPointState {
  @observable x: number;
  @observable y: number;

  constructor(point: IPointState) {
    this.update(point);
  }

  @action update(point: IPointState) {
    this.x = point.x;
    this.y = point.y;
  }

  get direction(): EActionDirection | undefined {
    return Math.abs(this.x) > Math.abs(this.y) ? (this.x > 0 ? EActionDirection.RIGHT : EActionDirection.LEFT) : this.y > 0 ? EActionDirection.DOWN : EActionDirection.UP;
  }

  equal(point: IPointState) {
    return this.x === point.x && this.y === point.y;
  }

  toJSON() {
    return { x: this.x, y: this.y }
  }
}
