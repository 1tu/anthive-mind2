import { Cell } from '@domain/Area';
import { GameAction } from '@domain/Game/Action';
import { IGoalAction } from '@domain/Mind/Goal/Action/Action.types';
import { IDisposable } from 'src/common/class/Disposable/Disposable.types';

export interface IGoal extends IDisposable {
  readonly actionList: IGoalAction[];
  readonly _target?: Cell;
  readonly target: Cell;
  readonly targetDistance: number;
  readonly gameAction: GameAction;
}
