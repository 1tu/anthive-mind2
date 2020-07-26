import { EPlayer, IPointState, Pathfinder, TAntVariant, TPlayerVariant } from '@domain/Area';
import { Point } from '@domain/Area/Point';
import { ICell } from '@domain/Game';
import { Ant } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import { computed, observable } from 'mobx';

export class Cell {
  point: Point;

  @observable food?: number;
  @observable hive?: TPlayerVariant;
  @observable private _ant?: TAntVariant;
  @computed get ant(): Ant | TAntVariant | undefined {
    if (!this._ant) return;
    return this._ant !== EPlayer.STRANGER ? this._mother.mind.dict[this._ant] : EPlayer.STRANGER;
  }
  set ant(value: Ant | TAntVariant | undefined) {
    this._ant = value instanceof Ant ? value.id : value;
  }

  @computed get isAntMy() {
    return !!this.ant && this.ant !== EPlayer.STRANGER;
  }
  @computed get isHiveMy() {
    return !!this.hive && this.hive !== EPlayer.STRANGER;
  }
  @computed get isFood() {
    return !this.hive && !this.ant && this.food > 0;
  }
  @computed get isFoodFree() {
    return this.isFood && !this.targetBy;
  }

  @computed get isWalkable() {
    return this.hive !== EPlayer.STRANGER && !this.ant && !this.food;
  }

  @computed get targetBy() {
    return this._mother.mind.list.filter(a => a.goal._target === this);
  }

  constructor(private _mother: Mother, point: IPointState, cell: ICell) {
    this.point = new Point(point);
    this.update(cell);
  }

  update(cell: ICell) {
    this.food = cell.food;
    this.ant = cell.ant;
    this.hive = cell.hive;
  }

  distanceTo(point: Point) {
    return Pathfinder.manhattanDistance(this.point, point);
  };
}
