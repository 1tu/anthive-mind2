import { Cell } from '@domain/Area';
import { Ant } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import { IDisposable } from 'src/common/class/Disposable/Disposable.types';
import { Action, EActionName } from '@domain/Game/Action';

export interface IGoal extends IDisposable {
  readonly stageList: IGoalStage[];
  readonly _target?: Cell;
  readonly target: Cell;
  readonly targetDistance: number;
  readonly action: Action;
}

export interface IGoalStage {
  conditionEnd(ant: Ant, mother: Mother): boolean;
  target(ant: Ant, list: Cell[]): Cell;
  targetList: (ant: Ant, mother: Mother) => Cell[];
  targetValid(ant: Ant, target?: Cell): boolean;
  actionName(distance: number): EActionName;
}
