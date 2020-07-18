import { Mother } from '../Mother/index';
import { Ant } from './Ant/Ant';
import difference from 'lodash/difference';
import { observable, action, computed } from 'mobx';

export class Mind {
  private _isInit = false;
  @observable public dict: { [id: string]: Ant } = {};
  @computed public get list() {
    return Object.values(this.dict);
  }

  constructor(private _mother: Mother) {}

  input(list: MGame.IAntList) {
    if (!this._isInit) this._init(list);
    else this._update(list);
  }

  public getActions() {
    return this.list.map(ant => {
      if (!ant.targetPoint) this._mother.area.targetClosest(ant);
      return ant.action;
    });
  }

  private _init(list: MGame.IAntList) {
    this._fill(list);
    this._isInit = true;
  }

  @action
  private _update(list: MGame.IAntList) {
    const listInId = Object.keys(list);
    for (const antId of listInId) {
      const antIn = list[antId];
      const antOut = this.dict[antId];
      if (antOut) antOut.update(antIn);
      else this.dict[antId] = new Ant(this._mother, antId, antIn);
    }
    const listRemoveId = difference(Object.keys(this.dict), listInId);
    listRemoveId.forEach(id => delete this.dict[id]);
  }

  @action
  private _fill(list: MGame.IAntList) {
    for (const antId in list) {
      const ant = list[antId];
      this.dict[antId] = new Ant(this._mother, antId, ant);
    }
  }
}
