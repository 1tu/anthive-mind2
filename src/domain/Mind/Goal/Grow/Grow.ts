import { Ant } from '@domain/Mind';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { Goal } from '@domain/Mind/Goal/Goal';
import { GoalGrowAction0 } from '@domain/Mind/Goal/Grow/GrowAction0';
import { GoalGrowAction1 } from '@domain/Mind/Goal/Grow/GrowAction1';
import { Mother } from '@domain/Mother';
import { IGoal } from '@domain/Mind/Goal/Goal.types';

export class GoalGrow extends Goal {
  static NEED = (mother: Mother, ant: Ant, goal?: IGoal) =>
    (goal && goal instanceof GoalGrow && goal.action instanceof GoalGrowAction1) ||
    mother.area.listFood.length > mother.mind.list.filter((a) =>
      a !== ant && a._goal instanceof GoalGrow && a._goal.action instanceof GoalGrowAction0
    ).length;

  actionList: IGoalAction[] = [new GoalGrowAction0(this._mother, this._ant), new GoalGrowAction1(this._mother, this._ant)];

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
