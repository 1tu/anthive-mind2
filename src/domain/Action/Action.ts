import { EActionName } from '@domain/Action';
import { IActionServer } from '@domain/Action/Action.types';
import { Point } from '@domain/Area';

export class Action {
  constructor(public name: EActionName, public move?: Point) {}

  toJSON(): IActionServer {
    return {
      act: this.name,
      dir: this.move?.direction || undefined,
    };
  }
}
