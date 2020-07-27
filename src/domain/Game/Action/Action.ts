import { Point } from '@domain/Area';
import { EActionName, IActionServer } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';

export class Action {
  constructor(public ant: Ant, public name: EActionName, public move?: Point) {}

  toJSON(): IActionServer {
    return {
      antId: this.ant.id,
      act: this.name,
      dir: this.move?.direction || undefined,
    };
  }
}
