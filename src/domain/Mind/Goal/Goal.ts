import { Disposable } from '@common/class/Disposable/Disposable';
import { Action } from '@domain/Action';
import { Cell, IPointState, Pathfinder } from '@domain/Area';
import { Ant } from '@domain/Mind';
import { IGoal, IGoalStage } from '@domain/Mind/Goal/Goal.types';
import { Mother } from '@domain/Mother';
import { computed, observable, runInAction, trace } from 'mobx';

export abstract class Goal extends Disposable implements IGoal {
  abstract get stageList(): IGoalStage[];

  protected stageIndex = 0;
  protected get stage() {
    return this.stageList[this.stageIndex];
  }

  @observable _target?: Cell;
  @computed get target(): Cell {
    console.log('[GOAL] get TARGET', this._ant.id);
    trace();
    let target = this._target;
    while (this.stage.conditionEnd(this._ant, this._mother)) {
      const nextIndex = this.stageIndex + 1;
      this.stageIndex = nextIndex < this.stageList.length ? nextIndex : 0;
    }
    if (this.stage.targetValid(this._ant, target)) return target;
    const targetList = [...this.stage.targetList(this._ant, this._mother)];
    while (!target || !targetList.length) {
      const targetTemp = this.stage.target(this._ant, targetList);
      if (this.stage.targetValid(this._ant, targetTemp)) target = targetTemp;
      else targetList.splice(targetList.indexOf(targetTemp), 1);
    }
    Promise.resolve(target).then((cell) => {
      console.log('RUN');
      runInAction(() => this._target = cell);
    })
    console.log('RUN FATER');
    return target;
  }

  abstract get action(): Action;

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
}
