import { EPlayer, IPointState, TAntId, TAntVariant, TPlayerVariant } from '@domain/Area';
import { ICell } from '@domain/Game';
import { Ant, EGoal } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import { computed, observable } from 'mobx';
import { Point } from '@domain/Area/Point';

export class Cell {
  public point: Point;

  @observable private _ant?: TAntVariant;
  @computed public get ant(): Ant | TAntVariant | undefined {
    if (!this._ant) return;
    return this._ant !== EPlayer.STRANGER ? this._mother.mind.dict[this._ant] : EPlayer.STRANGER;
  }
  public set ant(value: Ant | TAntVariant | undefined) {
    this._ant = value instanceof Ant ? value.id : value;
  }

  hive?: TPlayerVariant;

  @observable private _food?: number;
  @computed public get food(): number {
    return this._food;
  }
  public set food(value: number | undefined) {
    if (this._food && !value && this.targetBy?.goal.type === EGoal.FOOD_TAKE) this.targetBy.goal.type = undefined;
    this._food = value;
  }

  @computed public get targetBy() {
    return this._mother.mind.list.find(a => a.goal.target === this);
  }

  @computed public get isAntMy() {
    return !!this.ant && this.ant !== EPlayer.STRANGER;
  }
  @computed public get isHiveMy() {
    return !!this.hive && this.hive !== EPlayer.STRANGER;
  }
  @computed public get isFood() {
    return !this.hive && !this.ant && this.food > 0;
  }
  @computed public get isFoodFree() {
    return this.isFood && !this.targetBy;
  }
  @computed public get isWalkable() {
    return this.hive !== EPlayer.STRANGER && !this.ant && !this.food;
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
}
