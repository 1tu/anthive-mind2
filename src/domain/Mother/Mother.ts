import { IInput } from '@domain/Game';
import { Area } from '@domain/Area';
import { Mind } from '@domain/Mind';

export class Mother {
  tick = 0;
  id!: string;

  config = {
    PAYLOAD_MAX: 9,
    HEALTH_MAX: 9,
  }

  area = new Area(this);
  mind = new Mind(this);

  private _isInit = false;

  input(data: IInput) {
    if (!this._isInit) {
      this.id = data.id;
      this._isInit = true;
    }
    this.tick = data.tick;
    this.area.input(data.map);
    this.mind.input(data.ants);
    const z = this.mind.getActions();
    console.log('END TURN');
    return z;
  }
}
