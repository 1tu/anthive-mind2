import { Cell, Point, TAntId, Pathfinder } from '@domain/Area';
import { IAnt } from '@domain/Game';
import { EGoal } from '@domain/Mind';
import { Goal } from '@domain/Mind/Goal';
import { Mother } from '@domain/Mother';
import { action, computed, observable } from 'mobx';

const PAYLOAD_MAX = 9;
const HEALTH_MAX = 9;

export class Ant {
  public readonly goal: Goal;

  @observable point: Point;

  @observable private _health: number;
  @computed public get health(): number {
    return this._health;
  }
  public set health(value: number) {
    this._health = value;
    if (value < HEALTH_MAX / 2) this.goal.type = EGoal.FOOD_EAT;
    else if (value === HEALTH_MAX) this.payload = this._payload;
  }

  @observable private _payload: number;
  @computed public get payload(): number {
    return this._payload;
  }

  @computed public get canWalk() {
    return !!this._mother.area.pathfinder.neighbours(this.point).length;
  }

  public set payload(value: number) {
    this._payload = value;
    if (this._payload === PAYLOAD_MAX) this.goal.type = EGoal.FOOD_HOME;
    else if (this._payload === 0) this.goal.type = EGoal.FOOD_TAKE;
  }

  @computed get cell(): Cell {
    return this._mother.area.cellGet(this.point);
  }

  constructor(private _mother: Mother, public id: TAntId, ant: IAnt) {
    this.point = new Point({ x: ant.x, y: ant.y });
    this.goal = new Goal(this._mother, this);
    this.update(ant);
  }

  @action update(ant: IAnt) {
    this.point.update({ x: ant.x, y: ant.y });
    this.payload = ant.payload;
    this.health = ant.health;
  }

  public distanceCalc = (cell: Cell) => {
    return Pathfinder.manhattanDistance(this.point, cell.point);
  };
}
