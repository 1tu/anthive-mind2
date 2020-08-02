import { EActionName } from '@domain/Game/Action';
import { Cell } from '@domain/Area';

export interface IGoalAction {
  readonly end: boolean;
  readonly target?: Cell;
  actionName(distance: number): EActionName;
  isTargetValid(target?: Cell): boolean;
}