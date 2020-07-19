import { Action, EName } from '@domain/Action';
import { Cell, IPointState, Pathfinder, Point } from '@domain/Area';
import { Ant } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import { computed, observable } from 'mobx';

export enum EGoal {
  FOOD_EAT,
  FOOD_TAKE,
  FOOD_HOME,
}

export class Goal {
  @observable private _type: EGoal;
  @computed public get type(): EGoal {
    return this._type;
  }
  public set type(value: EGoal) {
    this._type = value || (EGoal.FOOD_TAKE as EGoal);
    if (this._type === EGoal.FOOD_TAKE || this._type === EGoal.FOOD_EAT) {
      this.target = this.calcTarget(this._mother.area.listFoodFree);
    } else if (this._type === EGoal.FOOD_HOME) {
      this.target = this.calcTarget(this._mother.area.listHive);
    }
  }

  @observable public target: Cell;

  @computed public get targetDistance(): number | undefined {
    if (!this.target) return;
    return this._ant.distanceCalc(this.target);
  }

  @computed public get action() {
    if (this.type === EGoal.FOOD_EAT && this._ant.payload) {
      const point = this._mother.area.pathfinder.neighbours(this._ant.point)[0];
      if (point) return new Action(EName.UNLOAD, new Point(point));
    }
    if (!this._ant.canWalk || !this.target || !this.targetMove) return new Action(EName.STAY);
    return new Action(this.actionName, new Point(this.targetMove));
  }

  @computed public get actionName() {
    return this.targetDistance > 1 ? EName.MOVE : this.type === EGoal.FOOD_EAT ? EName.EAT : this.type === EGoal.FOOD_TAKE ? EName.LOAD : EName.UNLOAD;
  }

  @computed public get targetMove(): IPointState | undefined {
    if (!this.target) return;
    const { x, y } = Pathfinder.vector(this._ant.point, this.target.point);
    const temp = [
      { x: Math.sign(x), y: 0 },
      { x: 0, y: Math.sign(y) },
    ];
    const tempMirror = [
      { x: Math.sign(x) * -1, y: 0 },
      { x: 0, y: Math.sign(y) * -1 },
    ];
    const xPrior = Math.abs(x) >= Math.abs(y);
    const moveList: IPointState[] = [xPrior ? temp.shift() : temp.pop(), temp.pop(), tempMirror.pop(), tempMirror.pop()];
    return moveList.find((d) => {
      const point = { x: this._ant.point.x + d.x, y: this._ant.point.y + d.y };
      return this.target.point.equal(point) || (this._mother.area.pointValid(point) && this._mother.area.cellGet(point).isWalkable);
    });
  }

  constructor(private _mother: Mother, private _ant: Ant) {
    this.type = EGoal.FOOD_TAKE;
  }

  calcTarget(list: Cell[]) {
    const distanceList = list.map(this._ant.distanceCalc);
    return list[distanceList.indexOf(Math.max(...distanceList))];
  }
}
