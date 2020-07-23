import { Action, EActionName } from '@domain/Action';
import { Cell, Point } from '@domain/Area';
import { Ant } from '@domain/Mind';
import { Goal } from '@domain/Mind/Goal/Goal';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';

export class GoalFeed extends Goal {
  static DISTANCE_NO_UNLOAD = 2;
  static NEED = (current: number, max: number) => current < 2;
  // static NEED = (current: number, max: number) => current < max / 2;

  @computed get target(): Cell {
    return this._targetClosest(this._mother.area.listFood);
  }

  @computed get action() {
    if (this._ant.payload > 0 && this.target?.distanceTo(this._ant.point) > GoalFeed.DISTANCE_NO_UNLOAD) {
      const list = this._mother.area.pathfinder.neighbours(this._ant.point);
      if (list.length) return new Action(EActionName.UNLOAD, new Point(list[0]));
    }
    if (!this._ant.canWalk || !this.target || !this._targetMove) return new Action(EActionName.STAY);
    return new Action(this._actionName, new Point(this._targetMove));
  }

  @computed protected get _actionName() {
    return this.targetDistance > 1 ? EActionName.MOVE : EActionName.EAT;
  }

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
