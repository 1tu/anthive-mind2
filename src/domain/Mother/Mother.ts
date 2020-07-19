import { IInput } from '@domain/Game';
import { Area } from '@domain/Area';
import { Mind } from '@domain/Mind';

export class Mother {
  public tick = 0;
  public id!: string;

  private _isInit = false;

  area = new Area(this);
  mind = new Mind(this);

  input(data: IInput) {
    if (!this._isInit) {
      this.id = data.id;
      this._isInit = true;
    }
    this.tick = data.tick;
    this.area.input(data.map);
    this.mind.input(data.ants);
    return this.mind.getActions();
  }
}
