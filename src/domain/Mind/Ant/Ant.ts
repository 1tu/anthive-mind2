import { action, computed, observable } from 'mobx';
import { Cell, Area, Action, Mother, EActionType } from '../..';
import isEqual from 'lodash/isEqual';

const PAYLOAD_MAX = 9;
const HEALTH_MAX = 9;

export enum EAntGoal {
  FOOD_TAKE,
  FOOD_HOME,
}

export class Ant {
  @observable health: number;

  @observable private _payload: number;
  @computed public get payload(): number {
    return this._payload;
  }
  public set payload(value: number) {
    this._payload = value;
    if (this._payload === PAYLOAD_MAX) this.goal = EAntGoal.FOOD_HOME;
    else if (this._payload === 0) this.goal = EAntGoal.FOOD_TAKE;
  }

  @observable point: MArea.IPoint = {
    x: undefined,
    y: undefined,
  };

  @computed get cell(): Cell {
    return this._mother.area.cellGet(this.point);
  }

  @observable public goal = EAntGoal.FOOD_TAKE;

  @observable public targetPoint?: MArea.IPoint;
  @computed public get targetCell(): Cell {
    return this.targetPoint ? this._mother.area.cellGet(this.targetPoint) : undefined;
  }

  @computed public get targetMoveCount(): number | undefined {
    if (!this.targetPoint) return;
    const { x, y } = Area.pathDiff(this.point, this.targetPoint);
    return Math.abs(x) + Math.abs(y) - (this.goal != null ? 1 : 0);
  }

  @computed public get targetMove(): MArea.IPoint | undefined {
    if (!this.targetPoint) return;
    const { x, y } = Area.pathDiff(this.point, this.targetPoint);
    const temp = [
      { x: Math.sign(x), y: 0 },
      { x: 0, y: Math.sign(y) },
    ];
    const tempMirror = [
      { x: Math.sign(x) * -1, y: 0 },
      { x: 0, y: Math.sign(y) * -1 },
    ];
    const xPrior = Math.abs(x) >= Math.abs(y);
    const moveList: MArea.IPoint[] = [xPrior ? temp.shift() : temp.pop(), temp.pop(), tempMirror.pop(), tempMirror.pop()];
    return moveList.find((d) => {
      const point = { x: this.point.x + d.x, y: this.point.y + d.y };
      return isEqual(point, this.targetPoint) || this._mother.area.pointValid(point) && this._mother.area.cellGet(point).isWalkable;
    });
  }

  @computed public get action() {
    if (this.health < HEALTH_MAX / 2 && this.payload) return new Action(EActionType.EAT);
    else if (this.goal === EAntGoal.FOOD_TAKE) {
      return new Action(this.targetMoveCount ? EActionType.MOVE : EActionType.LOAD, this.targetMove);
    } else if (this.goal === EAntGoal.FOOD_HOME) {
      return new Action(this.targetMoveCount ? EActionType.MOVE : EActionType.UNLOAD, this.targetMove);
    }
  }

  constructor(private _mother: Mother, public id: MArea.Cell.AntId, ant: MGame.IAnt) {
    this.update(ant);
  }

  @action update(ant: MGame.IAnt) {
    this.health = ant.health;
    this.payload = ant.payload;
    this.point = { x: ant.x, y: ant.y };
  }

  @action goalUpdate() {
    this.goal = this.payload !== PAYLOAD_MAX ? EAntGoal.FOOD_TAKE : EAntGoal.FOOD_HOME;
  }

  pathLen(target: MArea.IPoint) {
    const { x, y } = Area.pathDiff(this.point, target);
    return Math.abs(x) + Math.abs(y);
  }
}
