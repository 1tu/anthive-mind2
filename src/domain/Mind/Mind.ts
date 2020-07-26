import { Ant, TActionList } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import difference from 'lodash/difference';
import { action, autorun, computed, observable } from 'mobx';
import { IAnt } from '@domain/Game';

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
    });
  }

  input(list: IAnt[]) {
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

  private _init(list: IAnt[]) {
    this._fill(list);
    this._isInit = true;
  }

  @action
  private _update(list: IAnt[]) {
    const listInId = list.map(a => a.id.toString());
    list.forEach((antIn) => {
      const antOut = this.dict[antIn.id];
      if (antOut) antOut.update(antIn);
      else this.dict[antIn.id] = new Ant(this._mother, antIn.id, antIn);
    });
    const listRemoveId = difference(Object.keys(this.dict), listInId);
    listRemoveId.forEach((id) => delete this.dict[id]);
  }

  @action
  private _fill(list: IAnt[]) {
    list.forEach((ant) => {
      this.dict[ant.id] = new Ant(this._mother, ant.id, ant);
    });
  }
}
