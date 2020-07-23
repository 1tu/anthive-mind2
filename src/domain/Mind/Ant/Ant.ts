import { Cell, Point, TAntId } from '@domain/Area';
import { IAnt } from '@domain/Game';
import { Mother } from '@domain/Mother';
import { action, computed, observable } from 'mobx';
import { GoalFeed } from '@domain/Mind/Goal/GoalFeed';
import { GoalGrow } from '@domain/Mind/Goal/GoalGrow';
import { IGoal } from '@domain/Mind/Goal';

export class Ant {
  private _goal: IGoal;
  @computed get goal(): IGoal {
    this._goal?.dispose();
    if (GoalFeed.NEED(this.health, this._mother.config.HEALTH_MAX)) this._goal = new GoalFeed(this._mother, this);
    else this._goal = new GoalGrow(this._mother, this);
    return this._goal;
  }

  point: Point;
  @observable health: number;
  @observable payload: number;

  @computed get canWalk() {
    return !!this._mother.area.pathfinder.neighbours(this.point).length;
  }

  @computed get cell(): Cell {
    return this._mother.area.cellGet(this.point);
  }

  constructor(private _mother: Mother, public id: TAntId, ant: IAnt) {
    this.point = new Point(ant);
    this.update(ant);
  }

  @action update(ant: IAnt) {
    this.point.update(ant);
    this.payload = ant.payload;
    this.health = ant.health;
  }
}
