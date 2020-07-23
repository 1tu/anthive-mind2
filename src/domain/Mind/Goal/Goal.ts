import { Disposable } from '@common/class/Disposable/Disposable';
import { Action, EActionName } from '@domain/Action';
import { Cell, IPointState, Pathfinder } from '@domain/Area';
import { Ant } from '@domain/Mind';
import { IGoal } from '@domain/Mind/Goal/Goal.types';
import { Mother } from '@domain/Mother';
import { computed, observable } from 'mobx';

export abstract class Goal extends Disposable implements IGoal {
  @observable target: Cell;
  abstract get action(): Action;
  protected abstract get _actionName(): EActionName;

  @computed get targetDistance() {
    return this.target?.distanceTo(this._ant.point) ?? -1;
  }

  @computed protected get _targetMove(): IPointState | undefined {
    if (!this.target) return;
    const { x, y } = Pathfinder.vector(this._ant.point, this.target.point);
    const temp = [{ x: Math.sign(x), y: 0 }, { x: 0, y: Math.sign(y) }];
    const tempMirror = [{ x: Math.sign(x) * -1, y: 0 }, { x: 0, y: Math.sign(y) * -1 }];
    const xPrior = Math.abs(x) >= Math.abs(y);
    const moveList: IPointState[] = [xPrior ? temp.shift() : temp.pop(), temp.pop(), tempMirror.pop(), tempMirror.pop()];
    return moveList.find((d) => {
      const point = { x: this._ant.point.x + d.x, y: this._ant.point.y + d.y };
      return this.target.point.equal(point) || (this._mother.area.pathfinder.pointValid(point) && this._mother.area.cellGet(point).isWalkable);
    });
  }

  constructor(protected _mother: Mother, protected _ant: Ant) {
    super();
  }

  protected _targetClosest(targetList: Cell[]) {
    const distanceList = targetList.map((c) => c.distanceTo(this._ant.point));
    return targetList[distanceList.indexOf(Math.min(...distanceList))];
  }
}
