import { IInput } from '@domain/Game';

import { CM } from './Cell';

export const payload: IInput[] = [
  {
    tick: 1,
    id: '1',
    ants: {
      '1': { wasted: 0, age: 14, health: 7, payload: 3, x: 0, y: 0, event: 'birth' },
      '17': { wasted: 4, age: 1, health: 1, payload: 0, x: 1, y: 1, event: 'good' },
    },
    map: {
      cells: [
        [new CM(null, 1, 1), {}, {}],
        [new CM(5), new CM(null, 17), {}],
        [new CM(9), {}, new CM(null, null, null)],
      ],
    },
  },
  {
    tick: 2,
    id: '1',
    ants: {
      '1': { wasted: 0, age: 14, health: 7, payload: 4, x: 0, y: 0, event: 'birth' },
      '17': { wasted: 4, age: 1, health: 1, payload: 0, x: 1, y: 2, event: 'good' },
    },
    map: {
      cells: [
        [new CM(1, 1, 1), {}, {}],
        [new CM(4), {}, {}],
        [new CM(9), new CM(null, 17), new CM(null, null, null)],
      ],
    },
  },
  {
    tick: 3,
    id: '1',
    ants: {
      '1': { wasted: 0, age: 14, health: 7, payload: 4, x: 0, y: 0, event: 'birth' },
      '17': { wasted: 4, age: 1, health: 1, payload: 0, x: 1, y: 2, event: 'good' },
    },
    map: {
      cells: [
        [new CM(1, 1, 1), {}, {}],
        [new CM(4), {}, {}],
        [new CM(9), new CM(null, 17), new CM(null, null, null)],
      ],
    },
  },
];
