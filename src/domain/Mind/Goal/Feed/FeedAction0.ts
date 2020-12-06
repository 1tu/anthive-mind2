import { GoalAction } from '@domain/Mind/Goal/Action/Action';
import { computed } from 'mobx';
import { Ant } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import { Pathfinder, Cell } from '@domain/Area';
import { GoalFeed } from '@domain/Mind/Goal/Feed/Feed';
import { EActionName } from '@domain/Game/Action';

export class GoalFeedAction0 extends GoalAction {
  @computed get end() {
    return this._ant.cargo === 0 || Pathfinder.closest(this._ant.point, this._mother.area.listFood).distance <= GoalFeed.DISTANCE_NO_PUT;
  }

  actionName(distance: number): EActionName {
    return EActionName.PUT;
  }

  isTargetValid(target?: Cell): boolean {
    return target && !target.isFood;
  }

  @computed protected get _targetList() {
    return this._mother.area.pathfinder.neighbours(this._ant.point).map((p) => this._mother.area.cellGet(p));
  }

  protected _targetPick(list: Cell[]) {
    return list[0];
  }

  constructor(mother: Mother, ant: Ant) {
    super(mother, ant);
  }
}
