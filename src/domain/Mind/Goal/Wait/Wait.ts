import { Ant } from '@domain/Mind';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { Goal } from '@domain/Mind/Goal/Goal';
import { GoalWaitAction0 } from '@domain/Mind/Goal/Wait/WaitAction0';
import { Mother } from '@domain/Mother';

export class GoalWait extends Goal {
  actionList: IGoalAction[] = [new GoalWaitAction0(this._mother, this._ant)];

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
