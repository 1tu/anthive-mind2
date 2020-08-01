import { Cell, Point, TAntId } from '@domain/Area';
import { IAnt } from '@domain/Game';
import { IGoal } from '@domain/Mind/Goal';
import { GoalFeed } from '@domain/Mind/Goal/Feed/Feed';
import { GoalGrow } from '@domain/Mind/Goal/Grow/Grow';
import { Mother } from '@domain/Mother';
import { action, computed, observable } from 'mobx';

export class Ant {
  private _goal: IGoal;
  @computed get goal(): IGoal {
    this._goal?.dispose();
    if (GoalFeed.NEED(this.health, Mother.config.HEALTH_MAX)) this._goal = new GoalFeed(this._mother, this);
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
    this.point = new Point(ant.point);
    this.update(ant);
  }

  @action update(ant: IAnt) {
    this.point.update(ant.point);
    this.payload = ant.payload;
    this.health = ant.health;
  }
}
