import { Action, EActionName } from '@domain/Action';
import { Cell, Point } from '@domain/Area';
import { Ant } from '@domain/Mind';
import { Goal } from '@domain/Mind/Goal/Goal';
import { Mother } from '@domain/Mother';
import { computed, trace, reaction } from 'mobx';

export class GoalGrow extends Goal {
  private isInit = false;
  private _stage = EActionName.LOAD;
  private get _toHome() {
    return this._stage === EActionName.UNLOAD;
  }

  // target: Cell;
  @computed get target(): Cell {
    console.log('TARGET GET', this._ant.id);
    // trace();
    if (!this.isInit || this._ant.payload === 0) {
      this.isInit = true;
      this._stage = EActionName.LOAD;
      return this._targetClosest(this._mother.area.listFood);
      // return this._targetClosest(this._listFoodFree);
    } else if (this._ant.payload === this._mother.config.PAYLOAD_MAX && !this._toHome) {
      this._stage = EActionName.UNLOAD;
      return this._targetClosest(this._mother.area.listHive);
    }
  }

  @computed get action() {
    if (!this._ant.canWalk || !this.target || !this._targetMove) return new Action(EActionName.STAY);
    return new Action(this._actionName, new Point(this._targetMove));
  }

  @computed protected get _actionName() {
    return this.targetDistance > 1 ? EActionName.MOVE : this._stage;
  }

  // @computed private get _targetOtherList() {
  //   return this._mother.mind.list.filter(a => a !== this._ant).map(a => a.goal.target);
  // }

  // @computed private get _listFoodFree() {
  //   return this._mother.area.listFood.filter(c => !c.targetBy.length || (c.targetBy.length === 1 && c.targetBy.includes(this)));
  // }

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
    // this.disposes.push(reaction(() => ({ payload: this._ant.payload, food: this._mother.area.listFood  }), () => {
    //   if (!this.isInit || this._ant.payload === 0) {
    //     this.isInit = true;
    //     this._stage = EActionName.LOAD;
    //     // return this._targetClosest(this._mother.area.listFood);
    //     this.target = this._targetClosest(this._listFoodFree);
    //   } else if (this._ant.payload === this._mother.config.PAYLOAD_MAX && !this._toHome) {
    //     this._stage = EActionName.UNLOAD;
    //     this.target = this._targetClosest(this._mother.area.listHive);
    //   }
    // }))
  }
}
