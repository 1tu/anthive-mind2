import { Cell } from '@domain/Area';
import { EActionName } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { GoalAction } from '@domain/Mind/Goal/Action/Action';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';

export class GoalHiveCleanAction0 extends GoalAction {
  @computed get end() {
    return this._ant.payload === Mother.config.PAYLOAD_MAX || this._targetList.length <= 1;
  }

  actionName(distance: number): EActionName {
    return distance > 1 ? EActionName.MOVE : EActionName.TAKE;
  }

  isTargetValid(target?: Cell): boolean {
    return target?.food > 0;
  }

  @computed protected get _targetList() {
    return this._mother.area.listHiveWithFood;
  }

  protected _targetPick(list: Cell[]) {
    const food = list.map(c => c.food);
    return list[food.indexOf(Math.min(...food))];
  }

  constructor(mother: Mother, ant: Ant) {
    super(mother, ant);
  }
}
