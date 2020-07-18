import flatten from 'lodash/flatten';
import { computed, observable } from 'mobx';

import { Mother } from '..';
import { Ant, EAntGoal } from '../Mind/Ant/Ant';
import { Cell } from './component/Cell';
import { Pathfinder } from './component/Pathfinder';

export class Area {
  public static pathDiff(current: MArea.IPoint, target: MArea.IPoint): MArea.IPoint {
    return { x: target.x - current.x, y: target.y - current.y };
  }

  @observable public matrix: Cell[][] = [];
  @computed public get list() {
    return flatten(this.matrix);
  }

  public pathfinder = new Pathfinder(this._mother);
  public size: MArea.ISize = {
    width: 0,
    height: 0,
  };

  private _isInit = false;

  @computed public get cellListFood() {
    return this.list.filter((c) => c.isFoodFree);
  }
  @computed public get cellListHive() {
    return this.list.filter((c) => c.isHiveMy);
  }

  constructor(private _mother: Mother) {}

  input(map: MGame.IMap) {
    if (!this._isInit) this._init(map);
    else this._update(map);
  }

  targetClosest(ant: Ant) {
    if (ant.goal === EAntGoal.FOOD_TAKE) {
      if (!this.cellListFood) return;
      const lenList = this.cellListFood.map((c) => ant.pathLen(c.point));
      while (lenList.length) {
        const index = lenList.indexOf(Math.max(...lenList));
        const cell = this.cellListFood[index];
        cell.targetBy = ant;
        if (ant.targetMove) break;
        cell.targetBy = undefined;
        lenList.splice(index, 1);
      }
    } else if (ant.goal === EAntGoal.FOOD_HOME) {
      const lenList = this.cellListHive.map((c) => ant.pathLen(c.point));
      this.cellListHive[lenList.indexOf(Math.max(...lenList))].targetBy = ant;
    }
  }

  cellGet(point: MArea.IPoint) {
    return this.matrix[point.y][point.x];
  }

  pointValid(point: MArea.IPoint) {
    return 0 <= point.x && point.x < this.size.width && 0 <= point.y && point.y < this.size.height;
  }

  private _init(map: MGame.IMap) {
    this.size.width = map.width;
    this.size.height = map.height;
    this._fillMatrix(map.cells);
    this._isInit = true;
  }

  private _update(map: MGame.IMap) {
    for (let y = 0; y < this.size.height; y++) {
      const rowIn = map.cells[y];
      const rowOut = this.matrix[y];
      for (let x = 0; x < this.size.width; x++) rowOut[x].update(rowIn[x]);
    }
  }

  private _fillMatrix(input: MGame.ICell[][]) {
    for (let y = 0; y < this.size.height; y++) {
      const rowOut: Cell[] = [];
      for (let x = 0; x < this.size.width; x++) {
        rowOut.push(new Cell(this._mother, { x, y }, input[y][x]));
      }
      this.matrix.push(rowOut);
    }
  }
}
