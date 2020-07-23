import { Cell, IPointState, ISize, Pathfinder } from '@domain/Area';
import { ICell, IMap } from '@domain/Game';
import { Mother } from '@domain/Mother';
import flatten from 'lodash/flatten';
import { computed, observable, runInAction } from 'mobx';
import { IGoal } from '@domain/Mind';

export class Area {
  pathfinder = new Pathfinder(this._mother);

  @observable map: Cell[][] = [];
  targetList = new Map<Cell, IGoal[]>();

  @computed get list() {
    return flatten(this.map);
  }

  size: ISize = { width: 0, height: 0 };

  private _isInit = false;

  @computed get listFood() {
    return this.list.filter((c) => c.isFood);
  }
  @computed get listHive() {
    return this.list.filter((c) => c.isHiveMy);
  }

  constructor(private _mother: Mother) {}

  input(map: IMap) {
    if (!this._isInit) this._init(map);
    else this._update(map);
  }

  cellGet(point: IPointState) {
    return this.map[point.y][point.x];
  }

  targetHas(cell: Cell, goal: IGoal) {
    const c = this.targetList.get(cell);
    return c?.includes(goal);
  }

  targetAdd(cell: Cell, goal: IGoal) {
    console.log('TARGET ADD');

    Promise.resolve().then(() => {
      runInAction(() => {
        const current = this.targetList.get(cell);
        if (!current) this.targetList.set(cell, [goal]);
        else if (!current.includes(goal)) current.push(goal);
        else console.error('targetAdd WTF')
      })
    });
  }

  targetRemove(cell: Cell, goal: IGoal) {
    console.log('TARGET REMOVE');

    Promise.resolve(cell).then((cell) => {
      runInAction(() => {
        const current = this.targetList.get(cell);
        if (!current) return
        else if (current.includes(goal)) {
          if (current.length <= 1) this.targetList.delete(cell);
          else this.targetList.set(cell, current.splice(current.indexOf(goal), 1));
        }
      })
    });
  }

  private _init(map: IMap) {
    this.size.width = (map.cells[0] || []).length;
    this.size.height = map.cells.length;
    this._fillMatrix(map.cells);
    this._isInit = true;
  }

  private _update(map: IMap) {
    for (let y = 0; y < this.size.height; y++) {
      const rowIn = map.cells[y];
      const rowOut = this.map[y];
      for (let x = 0; x < this.size.width; x++) rowOut[x].update(rowIn[x]);
    }
  }

  private _fillMatrix(input: ICell[][]) {
    for (let y = 0; y < this.size.height; y++) {
      const rowOut: Cell[] = [];
      for (let x = 0; x < this.size.width; x++) {
        rowOut.push(new Cell(this._mother, { x, y }, input[y][x]));
      }
      this.map.push(rowOut);
    }
  }
}
