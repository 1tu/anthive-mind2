import { Point } from '@domain/Area';
import { EActionName, GameAction } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { GoalFeedAction0 } from '@domain/Mind/Goal/Feed/Action0';
import { GoalFeedAction1 } from '@domain/Mind/Goal/Feed/Action1';
import { Goal } from '@domain/Mind/Goal/Goal';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';

export class GoalFeed extends Goal {
  static DISTANCE_NO_UNLOAD = 1;
  static NEED = (current: number, max: number) => current < max / 3;

  actionList: IGoalAction[] = [
    new GoalFeedAction0(this._mother, this._ant),
    new GoalFeedAction1(this._mother, this._ant),
  ];

  @computed get gameAction() {
    if (!this.target || !this._targetMove) return new GameAction(this._ant, EActionName.STAY);
    return new GameAction(this._ant, this.action.actionName(this.targetDistance), new Point(this._targetMove));
  }

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
