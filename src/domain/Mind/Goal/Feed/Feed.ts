import { Ant } from '@domain/Mind';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { GoalFeedAction0 } from '@domain/Mind/Goal/Feed/FeedAction0';
import { GoalFeedAction1 } from '@domain/Mind/Goal/Feed/FeedAction1';
import { Goal } from '@domain/Mind/Goal/Goal';
import { Mother } from '@domain/Mother';

export class GoalFeed extends Goal {
  static DISTANCE_NO_PUT = 1;
  static NEED = (current: number, max: number, isFeeding: boolean) => isFeeding ? current < max * 0.8 : current < max * 0.3;

  actionList: IGoalAction[] = [
    new GoalFeedAction0(this._mother, this._ant),
    new GoalFeedAction1(this._mother, this._ant),
  ];

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
