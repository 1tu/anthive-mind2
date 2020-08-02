import { Point } from '@domain/Area';
import { GameAction, EActionName } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { Goal } from '@domain/Mind/Goal/Goal';
import { GoalGrowAction0 } from '@domain/Mind/Goal/Grow/GrowAction0';
import { GoalGrowAction1 } from '@domain/Mind/Goal/Grow/GrowAction1';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';

export class GoalGrow extends Goal {
  actionList: IGoalAction[] = [
    new GoalGrowAction0(this._mother, this._ant),
    new GoalGrowAction1(this._mother, this._ant),
  ];

  @computed get gameAction() {
    if (!this.target || !this._targetMove) return new GameAction(this._ant, EActionName.STAY);
    return new GameAction(this._ant, this.action.actionName(this.targetDistance), new Point(this._targetMove));
  }

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
