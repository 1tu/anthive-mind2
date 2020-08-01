import { Point } from '@domain/Area';
import { EActionName, IActionServer as IGameAction } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';

export class GameAction {
  constructor(public ant: Ant, public name: EActionName, public move?: Point) {}

  toJSON(): IGameAction {
    return {
      antId: this.ant.id,
      act: this.name,
      dir: this.move?.direction || undefined,
    };
  }
}
