import { computed, observable } from 'mobx';
import { Ant, EAntGoal } from '../../Mind/Ant/Ant';
import { Mother } from '../..';

export enum EPlayerOther {
  STRANGER = 'stranger',
}

export class Cell {
  @observable private _ant?: MArea.Cell.AntVariant;
  @computed public get ant(): Ant | MArea.Cell.AntVariant | undefined {
    if (!this._ant) return;
    return this._ant !== EPlayerOther.STRANGER ? this._mother.mind.dict[this._ant] : EPlayerOther.STRANGER;
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
    if (this._food && !value && this.targetBy?.goal === EAntGoal.FOOD_TAKE) this.targetBy.targetPoint = undefined;
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
    else if (value) value.targetPoint = this.point;
  }

  @computed public get isAntMy() {
    return !!this.ant && this.ant !== EPlayerOther.STRANGER;
  }
  @computed public get isHiveMy() {
    return !!this.hive && this.hive !== EPlayerOther.STRANGER;
  }
  @computed public get isFoodFree() {
    return !this.hive && !this.ant && this.food > 0 && !this.targetBy;
  }
  @computed public get isWalkable() {
    return this.hive !== EPlayerOther.STRANGER && !this.ant && !this.food;
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
