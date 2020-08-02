import { Ant } from '@domain/Mind';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { Goal } from '@domain/Mind/Goal/Goal';
import { GoalHiveCleanAction0 } from '@domain/Mind/Goal/HiveClean/HiveCleanAction0';
import { GoalHiveCleanAction1 } from '@domain/Mind/Goal/HiveClean/HiveCleanAction1';
import { Mother } from '@domain/Mother';

export class GoalHiveClean extends Goal {
  static NEED = (mother: Mother, ant: Ant, isCleaning: boolean) => mother.area.listHiveWithFood.length > 1 || (isCleaning && ant.payload > 0);

  actionList: IGoalAction[] = [
    new GoalHiveCleanAction0(this._mother, this._ant),
    new GoalHiveCleanAction1(this._mother, this._ant),
  ];

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
