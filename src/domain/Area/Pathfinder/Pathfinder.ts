import { computed } from 'mobx';
import { IPointState } from '@domain/Area';
import { Mother } from '@domain/Mother';

export class Pathfinder {
  static vector(current: IPointState, target: IPointState): IPointState {
    return { x: target.x - current.x, y: target.y - current.y };
  }

  // linear movement - no diagonals - just cardinal directions (NSEW)
  static manhattanDistance(current: IPointState, target: IPointState) {
    const { x, y } = Pathfinder.vector(current, target);
    return Math.abs(x) + Math.abs(y);
  }

  // diagonal movement - assumes diag dist is 1, same as cardinals
  static diagonalDistance(current: IPointState, target: IPointState) {
    const { x, y } = Pathfinder.vector(current, target);
    return Math.max(Math.abs(x), Math.abs(y));
  }

  // diagonals are considered a little farther than cardinal directions
  // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
  // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
  static euclideanDistance(current: IPointState, target: IPointState) {
    const { x, y } = Pathfinder.vector(current, target);
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  @computed get height() {
    return this._mother.area.size.height;
  }
  @computed get width() {
    return this._mother.area.size.width;
  }
  @computed get size() {
    return this.width * this.height;
  }

  constructor(private _mother: Mother) { }

  neighbours({ x, y }: IPointState): IPointState[] {
    const N = y - 1,
      S = y + 1,
      E = x + 1,
      W = x - 1,
      myN = N > -1 && this.canWalkHere(x, N),
      myS = S < this.height && this.canWalkHere(x, S),
      myE = E < this.width && this.canWalkHere(E, y),
      myW = W > -1 && this.canWalkHere(W, y),
      result = [];
    if (myN) result.push({ x: x, y: N });
    if (myE) result.push({ x: E, y: y });
    if (myS) result.push({ x: x, y: S });
    if (myW) result.push({ x: W, y: y });
    // result.push(this.<diagonalNeighbours / diagonalNeighboursFree>());
    return result;
  }

  // можно ходить по диагонали НО проскакивать сквозь щели по диагонали НЕЛЬЗЯ
  diagonalNeighbours(myN: number, myS: number, myE: number, myW: number, N: number, S: number, E: number, W: number) {
    if (myN) {
      if (myE && this.canWalkHere(E, N)) return { x: E, y: N };
      if (myW && this.canWalkHere(W, N)) return { x: W, y: N };
    }
    if (myS) {
      if (myE && this.canWalkHere(E, S)) return { x: E, y: S };
      if (myW && this.canWalkHere(W, S)) return { x: W, y: S };
    }
  }

  // можно ходить по диагонали и проскакивать сквозь щели по диагонали
  diagonalNeighboursFree(N: number, S: number, E: number, W: number) {
    const myN = N > -1;
    const myS = S < this.height;
    const myE = E < this.width;
    const myW = W > -1;
    if (myE) {
      if (myN && this.canWalkHere(E, N)) return { x: E, y: N };
      if (myS && this.canWalkHere(E, S)) return { x: E, y: S };
    }
    if (myW) {
      if (myN && this.canWalkHere(W, N)) return { x: W, y: N };
      if (myS && this.canWalkHere(W, S)) return { x: W, y: S };
    }
  }

  canWalkHere(x: number, y: number) {
    const cell = this._mother.area.cellGet({ x, y });
    return cell?.isWalkable;
  }

  pointValid(point: IPointState) {
    return 0 <= point.x && point.x < this.width && 0 <= point.y && point.y < this.height;
  }

  find(start: IPointState, end: IPointState) {
    var distanceFunction = Pathfinder.manhattanDistance;

    var mypathStart = new Node(null, start, this.width);
    var mypathEnd = new Node(null, end, this.width);
    var AStar = new Array(this.size);
    var Open: Node[] = [mypathStart];
    var Closed: Node[] = [];
    var result: IPointState[] = [];
    var myNeighbours;
    var myNode;
    var myPath;
    var length, max, min, i, j;

    // iterate through the open list until none are left
    while ((length = Open.length)) {
      max = this.size;
      min = -1;
      for (i = 0; i < length; i++) {
        if (Open[i].f < max) {
          max = Open[i].f;
          min = i;
        }
      }

      myNode = Open.splice(min, 1)[0];
      // is it the destination node?
      if (myNode.value === mypathEnd.value) {
        myPath = Closed[Closed.push(myNode) - 1];
        do {
          result.push(myPath.point);
        } while ((myPath = myPath.parent));

        AStar = Closed = Open = [];
        result.reverse();
      } else {
        // find which nearby nodes are walkable
        myNeighbours = this.neighbours(myNode.point);
        // test each one that hasn't been tried already
        for (i = 0, j = myNeighbours.length; i < j; i++) {
          myPath = new Node(myNode, myNeighbours[i], this.width);
          if (!AStar[myPath.value]) {
            // estimated cost of this particular route so far
            myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode.point);
            // estimated cost of entire guessed route to the destination
            myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd.point);
            // remember this new path for testing above
            Open.push(myPath);
            // mark this node in the world graph as visited
            AStar[myPath.value] = true;
          }
        }
        // remember this route as having no more untested options
        Closed.push(myNode);
      }
    } // keep iterating until the Open list is empty
    return result;
  }
}

class Node {
  value: number;
  f = 0;
  g = 0;

  constructor(public parent: Node, public point: IPointState, width: number) {
    this.value = point.y * width + point.x;
  }
}
