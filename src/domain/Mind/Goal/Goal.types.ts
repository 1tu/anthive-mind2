import { Action } from '@domain/Action';
import { Cell } from '@domain/Area';
import { IDisposable } from 'src/common/class/Disposable/Disposable.types';

export interface IGoal extends IDisposable {
  target: Cell;
  readonly action: Action;
}