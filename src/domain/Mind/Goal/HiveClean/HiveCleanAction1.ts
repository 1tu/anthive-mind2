import { Cell, Pathfinder } from '@domain/Area';
import { EActionName } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { GoalAction } from '@domain/Mind/Goal/Action/Action';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';

export class GoalHiveCleanAction1 extends GoalAction {
  @computed get end() {
    return this._ant.payload === 0;
  }

  actionName(distance: number): EActionName {
    return distance > 1 ? EActionName.MOVE : EActionName.PUT;
  }

  isTargetValid(target?: Cell): boolean {
    return target?.isHiveMyFree;
  }

  @computed protected get _targetList() {
    const withFood = this._mother.area.listHiveWithFood;
    return withFood.length ? withFood : this._mother.area.listHive;
  }

  protected _targetPick(list: Cell[]) {
    const food = list.map(c => c.food);
    const max = Math.max(...food);
    return !max ? Pathfinder.closest(this._ant.point, list).cell : list[food.indexOf(max)];
  }

  constructor(mother: Mother, ant: Ant) {
    super(mother, ant);
  }
}
