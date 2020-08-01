import { IAnt } from '@domain/Game';
import { IActionServer } from '@domain/Game/Action';
import { Ant } from '@domain/Mind';
import { Mother } from '@domain/Mother';
import difference from 'lodash/difference';
import { action, autorun, computed, observable, getDependencyTree } from 'mobx';

export class Mind {
  private _isInit = false;
  actionList: IActionServer[] = [];

  @observable public dict: { [id: string]: Ant } = {};
  @computed public get list() {
    return Object.values(this.dict);
  }

  @computed get goalList() {
    return this.list.map((a) => a.goal);
  }

  @computed get actionListComputed() {
    const result: IActionServer[] = [];
    const list = [...this.list];
    let i = 0;
    while (list.length) {
      const ant = list[i];
      const action = ant.goal.gameAction;
      if (action) {
        result.push(action.toJSON());
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
      if (IS_DEV) {
        const z = getDependencyTree(this, 'actionListComputed');
        console.log('ZZZ', z);
      }
    });
  }

  input(list: IAnt[]) {
    if (!this._isInit) this._init(list);
    else this._update(list);
  }

  private _init(list: IAnt[]) {
    this._fill(list);
    this._isInit = true;
  }

  @action
  private _update(list: IAnt[]) {
    const listInId = list.map((a) => a.id.toString());
    list.forEach((antIn) => {
      const antOut = this.dict[antIn.id];
      if (antOut) antOut.update(antIn);
      else this.dict[antIn.id] = new Ant(this._mother, antIn.id, antIn);
    });
    const listRemoveId = difference(Object.keys(this.dict), listInId);
    listRemoveId.forEach((id) => delete this.dict[id]);
  }

  private _fill(list: IAnt[]) {
    list.forEach((ant) => {
      this.dict[ant.id] = new Ant(this._mother, ant.id, ant);
    });
  }
}
