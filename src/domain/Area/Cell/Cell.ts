import { IPointState, Pathfinder, TAntVariant, TPlayerVariant } from '@domain/Area';
import { Point } from '@domain/Area/Point';
import { ICell } from '@domain/Game';
import { Ant } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import { computed, observable, action } from 'mobx';

export class Cell {
  point: Point;

  @observable food?: number;
  @observable hive?: TPlayerVariant;
  @observable private _ant?: TPlayerVariant;
  @computed get ant(): Ant | TPlayerVariant | undefined {
    if (!this._ant) return;
    return this._ant === this._mother.id ? this._mother.mind.dict[this._ant] : this._ant;
  }
  set ant(value: Ant | TPlayerVariant | undefined) {
    this._ant = value instanceof Ant ? this._mother.id : value;
  }

  @computed get isAntMy() {
    return !!this.ant && this.ant === this._mother.id;
  }
  @computed get isHiveMy() {
    return !!this.hive && this.hive === this._mother.id;
  }
  @computed get isHiveMyFree() {
    return !!this.isHiveMy && !this._ant;
  }
  @computed get isHiveMyWithFood() {
    return !!this.isHiveMyFree && this.food > 0;
  }
  @computed get isFood() {
    return !this.hive && !this.ant && this.food > 0;
  }

  @computed get isWalkable() {
    return (this.hive ? this.hive === this._mother.id : true) && !this._ant && !this.food;
  }

  get targetBy() {
    return this._mother.mind.list.filter((a) => a.goal._target === this);
  }

  constructor(private _mother: Mother, point: IPointState, cell: ICell) {
    this.point = new Point(point);
    this.update(cell);
  }

  @action
  update(cell: ICell) {
    this.food = cell.food;
    this.ant = cell.ant;
    this.hive = cell.hive;
  }

  distanceTo(point: Point) {
    return Pathfinder.manhattanDistance(this.point, point);
  }
}
