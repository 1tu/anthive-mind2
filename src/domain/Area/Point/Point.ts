import { IPointState } from '@domain/Area';
import { action, observable } from 'mobx';
import { EDirection } from '@domain/Action';

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

  get direction(): EDirection | undefined {
    return Math.abs(this.x) > Math.abs(this.y) ? (this.x > 0 ? EDirection.RIGHT : EDirection.LEFT) : this.y > 0 ? EDirection.DOWN : EDirection.UP;
  }

  equal(point: IPointState) {
    return this.x === point.x && this.y === point.y;
  }
}
