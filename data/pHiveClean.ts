import { IInput } from '@domain/Game';

import { CM } from './Cell';

export const payload: IInput[] = [
  {
    tick: 1,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 2, point: { x: 1, y: 0 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, new CM(2, 1), new CM(0, undefined, 1), new CM(1, undefined, 1)],
        [{}, {}, {}, new CM(2, undefined, 1)],
        [{}, {}, {}, new CM(5, undefined, 1)],
      ],
    },
  },
  {
    tick: 2,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 2, point: { x: 2, y: 0 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, {}, new CM(2, 1, 1), new CM(1, undefined, 1)],
        [{}, {}, {}, new CM(2, undefined, 1)],
        [{}, {}, {}, new CM(5, undefined, 1)],
      ],
    },
  },
  {
    tick: 3,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 3, point: { x: 2, y: 0 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, {}, new CM(3, 1, 1), new CM(0, undefined, 1)],
        [{}, {}, {}, new CM(2, undefined, 1)],
        [{}, {}, {}, new CM(5, undefined, 1)],
      ],
    },
  },
  {
    tick: 4,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 3, point: { x: 3, y: 0 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, {}, new CM(0, undefined, 1), new CM(3, 1, 1)],
        [{}, {}, {}, new CM(2, undefined, 1)],
        [{}, {}, {}, new CM(5, undefined, 1)],
      ],
    },
  },
  {
    tick: 5,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 4, point: { x: 3, y: 0 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, {}, new CM(0, undefined, 1), new CM(4, 1, 1)],
        [{}, {}, {}, new CM(1, undefined, 1)],
        [{}, {}, {}, new CM(5, undefined, 1)],
      ],
    },
  },
  {
    tick: 6,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 5, point: { x: 3, y: 0 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, {}, new CM(0, undefined, 1), new CM(5, 1, 1)],
        [{}, {}, {}, new CM(0, undefined, 1)],
        [{}, {}, {}, new CM(5, undefined, 1)],
      ],
    },
  },
  {
    tick: 7,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 5, point: { x: 3, y: 1 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, {}, new CM(0, undefined, 1), new CM(0, undefined, 1)],
        [{}, {}, {}, new CM(5, 1, 1)],
        [{}, {}, {}, new CM(5, undefined, 1)],
      ],
    },
  },
  {
    tick: 8,
    id: '1',
    ants: [{ id: 1, wasted: 0, age: 14, health: 7, payload: 4, point: { x: 3, y: 1 }, event: 'birth' }],
    canvas: {
      cells: [
        [{}, {}, new CM(0, undefined, 1), new CM(0, undefined, 1)],
        [{}, {}, {}, new CM(4, 1, 1)],
        [{}, {}, {}, new CM(0, undefined, 1)],
      ],
    },
  },
];
