import { Cell, Pathfinder } from '@domain/Area';
import { EActionName } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { GoalAction } from '@domain/Mind/Goal/Action/Action';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';

export class GoalGrowAction0 extends GoalAction {
  @computed get end() {
    return this._ant.payload === Mother.config.PAYLOAD_MAX || !this._targetList.length;
  }

  actionName(distance: number): EActionName {
    return distance > 1 ? EActionName.MOVE : EActionName.TAKE;
  }

  isTargetValid(target?: Cell): boolean {
    const by = target?.targetBy;
    return target?.isFood && (!by.length || by[0] === this._ant);
  }

  @computed protected get _targetList() {
    return this._mother.area.listFood;
  }

  protected _targetPick(list: Cell[]) {
    return Pathfinder.closest(this._ant.point, list).cell;
  }

  constructor(mother: Mother, ant: Ant) {
    super(mother, ant);
  }
}
