import { IAntList } from '@domain/Game';
import { Ant, TActionList } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import difference from 'lodash/difference';
import { action, autorun, computed, observable } from 'mobx';

export class Mind {
  private _isInit = false;
  actionList: TActionList = {};

  @observable public dict: { [id: string]: Ant } = {};
  @computed public get list() {
    return Object.values(this.dict);
  }

  @computed get goalList() {
    return this.list.map((a) => a.goal);
  }

  @computed get actionListComputed() {
    const result: TActionList = {};
    const list = [...this.list];
    let i = 0;
    while (list.length) {
      const ant = list[i];
      const action = ant.goal.action;
      if (action) {
        result[ant.id] = action.toJSON();
        list.splice(i, 1);
      } else i = i >= list.length ? 0 : i + 1;
    }
    return result;

    // return this.list.reduce((acc, ant) => {
    //   acc[ant.id] = ant.goal.action.toJSON();
    //   return acc;
    // }, {} as any);
  }

  constructor(private _mother: Mother) {
    autorun(() => {
      this.actionList = this.actionListComputed;
      console.log('NEW ACTIONS');

    });
  }

  input(list: IAntList) {
    if (!this._isInit) this._init(list);
    else this._update(list);
  }

  public getActions() {
    const result: TActionList = {};
    const list = [...this.list];
    let i = 0;
    while (list.length) {
      const ant = list[i];
      const action = ant.goal.action;
      if (action) {
        result[ant.id] = action.toJSON();
        list.splice(i, 1);
      } else i = i >= list.length ? 0 : i + 1;
    }
    return result;

    // return this.list.reduce((acc, ant) => {
    //   acc[ant.id] = ant.goal.action.toJSON();
    //   return acc;
    // }, {} as any);
  }

  private _init(list: IAntList) {
    this._fill(list);
    this._isInit = true;
  }

  @action
  private _update(list: IAntList) {
    const listInId = Object.keys(list);
    for (const antId of listInId) {
      const antIn = list[antId];
      const antOut = this.dict[antId];
      if (antOut) antOut.update(antIn);
      else this.dict[antId] = new Ant(this._mother, antId, antIn);
    }
    const listRemoveId = difference(Object.keys(this.dict), listInId);
    listRemoveId.forEach((id) => delete this.dict[id]);
  }

  @action
  private _fill(list: IAntList) {
    for (const antId in list) {
      const ant = list[antId];
      this.dict[antId] = new Ant(this._mother, antId, ant);
    }
  }
}
