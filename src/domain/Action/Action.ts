import { EDirection, EName } from '@domain/Action';
import { Point } from '@domain/Area';

export class Action {
  constructor(public name: EName, public move?: Point) {}

  toJSON() {
    return {
      act: this.name,
      dir: this.move?.direction || undefined,
    };
  }
}
