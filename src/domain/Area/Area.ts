import { Cell, IPointState, ISize, Pathfinder } from '@domain/Area';
import { ICell, IMap } from '@domain/Game';
import { Mother } from '@domain/Mother';
import flatten from 'lodash/flatten';
import { computed, observable } from 'mobx';

export class Area {
  @observable public matrix: Cell[][] = [];
  @computed public get list() {
    return flatten(this.matrix);
  }

  public pathfinder = new Pathfinder(this._mother);
  public size: ISize = {
    width: 0,
    height: 0,
  };

  private _isInit = false;

  @computed public get listFood() {
    return this.list.filter((c) => c.isFood);
  }
  @computed public get listFoodFree() {
    return this.list.filter((c) => c.isFoodFree);
  }
  @computed public get listHive() {
    return this.list.filter((c) => c.isHiveMy);
  }

  constructor(private _mother: Mother) {}

  input(map: IMap) {
    if (!this._isInit) this._init(map);
    else this._update(map);
  }

  cellGet(point: IPointState) {
    return this.matrix[point.y][point.x];
  }

  pointValid(point: IPointState) {
    return 0 <= point.x && point.x < this.size.width && 0 <= point.y && point.y < this.size.height;
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
      const rowOut = this.matrix[y];
      for (let x = 0; x < this.size.width; x++) rowOut[x].update(rowIn[x]);
    }
  }

  private _fillMatrix(input: ICell[][]) {
    for (let y = 0; y < this.size.height; y++) {
      const rowOut: Cell[] = [];
      for (let x = 0; x < this.size.width; x++) {
        rowOut.push(new Cell(this._mother, { x, y }, input[y][x]));
      }
      this.matrix.push(rowOut);
    }
  }
}
