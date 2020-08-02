import { Cell, Pathfinder } from '@domain/Area';
import { EActionName } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { GoalAction } from '@domain/Mind/Goal/Action/Action';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';

export class GoalFeedAction1 extends GoalAction {
  @computed get end() {
    return this._ant.health >= Mother.config.HEALTH_MAX;
  }

  actionName(distance: number): EActionName {
    return distance > 1 ? EActionName.MOVE : EActionName.EAT;
  }

  isTargetValid(target?: Cell): boolean {
    return target?.isFood
  }

  @computed protected get _targetList() {
    return this._mother.area.listFood;
  };


  protected _targetPick(list: Cell[]) {
    return Pathfinder.closest(this._ant.point, list).cell;
  };

  constructor(mother: Mother, ant: Ant) {
    super(mother, ant)
  }
}