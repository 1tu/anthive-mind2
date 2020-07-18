import { computed, observable } from 'mobx';
import { Ant } from '../../Mind/Ant/Ant';
import { Mother } from '../..';

export class Cell {
  @observable private _ant?: MArea.Cell.AntVariant;
  @computed public get ant(): Ant | MArea.Cell.AntVariant | undefined {
    if (!this._ant) return;
    return this._ant !== MArea.Cell.EPlayerOther.STRANGER ? this._mother.mind.dict[this._ant] : MArea.Cell.EPlayerOther.STRANGER;
  }
  public set ant(value: Ant | MArea.Cell.AntVariant | undefined) {
    this._ant = value instanceof Ant ? value.id : value;
  }

  hive?: MArea.Cell.PlayerVariant;

  @observable private _food?: number;
  @computed public get food(): number {
    return this._food;
  }
  public set food(value: number | undefined) {
    if (this._food && !value && this.targetBy?.goal === MAnt.EGoal.FOOD_TAKE) this.targetBy.targetPoint = undefined;
    this._food = value;
  }

  @observable private _targetBy?: MArea.Cell.AntId;
  @computed public get targetBy(): Ant {
    return this._targetBy ? this._mother.mind.dict[this._targetBy] : undefined;
  }
  public set targetBy(value: Ant | undefined) {
    const ant = this.targetBy;
    this._targetBy = value ? value.id : undefined;
    if (ant && ant.targetCell === this) ant.targetPoint = undefined;
    else if (!ant) ant.targetPoint = this.point;
  }

  @computed public get isAntMy() {
    return !!this.ant && this.ant !== MArea.Cell.EPlayerOther.STRANGER;
  }
  @computed public get isHiveMy() {
    return !!this.hive && this.hive !== MArea.Cell.EPlayerOther.STRANGER;
  }
  @computed public get isFoodFree() {
    return this.isFree && this.food > 0;
  }
  @computed public get isFree() {
    return !this.hive && !this.ant;
  }

  constructor(private _mother: Mother, public point: MArea.IPoint, cell: MGame.ICell) {
    this.update(cell);
  }

  update(cell: MGame.ICell) {
    this.food = cell.food;
    this.ant = cell.ant;
    this.hive = cell.hive;
  }
}
