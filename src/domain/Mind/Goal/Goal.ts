import { Disposable } from '@common/class/Disposable/Disposable';
import { Cell, IPointState, Pathfinder, Point } from '@domain/Area';
import { EActionName, GameAction } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { IGoal } from '@domain/Mind/Goal/Goal.types';
import { Mother } from '@domain/Mother';
import { autorun, computed, observable, onBecomeUnobserved, trace } from 'mobx';

export abstract class Goal extends Disposable implements IGoal {
  abstract get actionList(): IGoalAction[];

  private _actionIndex = 0;
  @computed protected get action() {
    let index = this._actionIndex;
    while (this.actionList[index].end) {
      const nextIndex = index + 1;
      index = nextIndex < this.actionList.length ? nextIndex : 0;
      IS_DEV && console.warn(`[GOAL ${this._ant.id}] next ACTION`, index);
    }
    return this.actionList[this._actionIndex = index];
  }

  @observable _target?: Cell;
  @computed get target(): Cell {
    IS_DEV && trace();
    return this.action.target;
  }

  @computed get gameAction() {
    if (!this.target || !this._targetMove) return new GameAction(this._ant, EActionName.STAY);
    return new GameAction(this._ant, this.action.actionName(this.targetDistance), new Point(this._targetMove));
  }

  @computed get targetDistance() {
    return this.target?.distanceTo(this._ant.point) ?? -1;
  }

  @computed get targetPath() {
    return this.target ? this._mother.area.pathfinder.find(this._ant.point, this.target.point) : [];
  }

  @computed protected get _targetMove(): IPointState | undefined {
    if (!this.target) return;
    // const { x, y } = Pathfinder.vector(this._ant.point, this.target.point);
    // const temp = [
    //   { x: Math.sign(x), y: 0 },
    //   { x: 0, y: Math.sign(y) },
    // ];
    // const tempMirror = [
    //   { x: Math.sign(x) * -1, y: 0 },
    //   { x: 0, y: Math.sign(y) * -1 },
    // ];
    // const xPrior = Math.abs(x) >= Math.abs(y);
    // const moveList: IPointState[] = [xPrior ? temp.shift() : temp.pop(), temp.pop(), tempMirror.pop(), tempMirror.pop()];
    // return moveList.find((d) => {
    //   const point = { x: this._ant.point.x + d.x, y: this._ant.point.y + d.y };
    //   return this.target.point.equal(point) || (this._mother.area.pathfinder.pointValid(point) && this._mother.area.cellGet(point).isWalkable);
    // });
    // IS_DEV && console.warn(`[PATH ${this._ant.id}]`, JSON.stringify(this.targetPath));
    return Pathfinder.vector(this._ant.point, this.targetPath[0]);
  }

  constructor(protected _mother: Mother, protected _ant: Ant) {
    super();
    this.disposes.push(
      autorun(() => {
        this._target = this.target;
      })
    );
    if (IS_DEV) {
      onBecomeUnobserved(this, 'target', () => {
        console.log('!!!!!!!!!!!!!!UN', this._ant.id);
      });
    }
  }
}
