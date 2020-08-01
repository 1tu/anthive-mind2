import { IInput } from '@domain/Game';
import { Area } from '@domain/Area';
import { Mind } from '@domain/Mind';
import { transaction } from 'mobx';

export class Mother {
  static config = {
    PAYLOAD_MAX: 9,
    HEALTH_MAX: 9,
  };

  tick = 0;
  id!: string;

  area = new Area(this);
  mind = new Mind(this);

  private _isInit = false;

  input(data: IInput) {
    if (!this._isInit) {
      this.id = data.id;
      this._isInit = true;
    }
    this.tick = data.tick;
    transaction(() => {
      this.area.input(data.canvas);
      this.mind.input(data.ants);
    });
    const z = this.mind.actionList;
    console.warn('END TURN');
    return z;
  }
}
