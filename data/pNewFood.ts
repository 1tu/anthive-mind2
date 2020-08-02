import { IInput } from '@domain/Game';
import { CM } from './Cell';

export const payload: IInput[] = [
  {
    tick: 1,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 9, payload: 0, point: { x: 0, y: 0 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [new CM(0, 1), {}, {}, new CM(9)],
        [{}, {}, {}, {}],
      ],
    },
  },
  {
    tick: 2,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, payload: 0, point: { x: 1, y: 0 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [{}, new CM(0, 1), {}, new CM(9)],
        [{}, new CM(9), {}, {}],
      ]
    },
  },
  {
    tick: 3,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, payload: 1, point: { x: 1, y: 0 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [{}, new CM(1, 1), {}, new CM(9)],
        [{}, new CM(8), {}, {}],
      ],
    },
  },
  {
    tick: 4,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, payload: 4, point: { x: 1, y: 0 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [{}, {}, new CM(1, 1), new CM(null, undefined, 1)],
        [new CM(4), new CM(null, 1), {}, {}],
      ],
    },
  },
];
