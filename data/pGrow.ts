import { IInput } from '@domain/Game';

import { CM } from './Cell';

export const payload: IInput[] = [
  {
    tick: 1,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, cargo: 9, point: { x: 2, y: 0 }, event: 'birth' },
      { id: 17, wasted: 4, age: 1, health: 5, cargo: 2, point: { x: 2, y: 1 }, event: 'good' },
    ],
    canvas: {
      cells: [
        [{}, {}, new CM(9, 1), new CM(null, undefined, 1)],
        [new CM(5), {}, new CM(2, 1), {}],
        [new CM(9), {}, new CM(null, null, null), {}],
      ],
    },
  },
  {
    tick: 2,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, cargo: 8, point: { x: 2, y: 0 }, event: 'birth' },
      { id: 17, wasted: 4, age: 1, health: 5, cargo: 1, point: { x: 1, y: 1 }, event: 'good' },
      { id: 18, wasted: 4, age: 1, health: 9, cargo: 0, point: { x: 3, y: 0 }, event: 'good' },
    ],
    canvas: {
      cells: [
        [{}, {}, new CM(8, 1), new CM(null, 1, 1)],
        [new CM(4), new CM(1, 1), {}, {}],
        [new CM(9), {}, new CM(null, null, null), {}],
      ],
    },
  },
  {
    tick: 3,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, cargo: 8, point: { x: 2, y: 0 }, event: 'birth' },
      { id: 17, wasted: 4, age: 1, health: 5, cargo: 0, point: { x: 1, y: 1 }, event: 'good' },
      { id: 18, wasted: 4, age: 1, health: 5, cargo: 0, point: { x: 3, y: 1 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [{}, {}, new CM(7, 1), new CM(0, undefined, 1)],
        [new CM(4), new CM(null, 1), {}, new CM(null, 1)],
        [new CM(9), {}, new CM(null, null, null), {}],
      ],
    },
  },
  {
    tick: 4,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, cargo: 0, point: { x: 2, y: 0 }, event: 'birth' },
      { id: 17, wasted: 4, age: 1, health: 4, cargo: 0, point: { x: 1, y: 1 }, event: 'good' },
      { id: 18, wasted: 4, age: 1, health: 5, cargo: 0, point: { x: 2, y: 1 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [{}, {}, new CM(1, 1, 1), new CM(1, undefined, 1)],
        [new CM(3), new CM(1, 1), new CM(null, 1), {}],
        [new CM(9), {}, new CM(null, null, null), {}],
      ],
    },
  },
  {
    tick: 5,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, cargo: 0, point: { x: 1, y: 0 }, event: 'birth' },
      { id: 17, wasted: 4, age: 1, health: 4, cargo: 0, point: { x: 1, y: 1 }, event: 'good' },
      { id: 18, wasted: 4, age: 1, health: 5, cargo: 0, point: { x: 3, y: 1 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [{},  new CM(1, 1), new CM(0, undefined, 1), new CM(1, undefined, 1)],
        [new CM(3), new CM(1, 1),  {}, new CM(null, 1)],
        [new CM(9), {}, new CM(null, null, null), {}],
      ],
    },
  },
  {
    tick: 5,
    id: '1',
    ants: [
      { id: 1, wasted: 0, age: 14, health: 7, cargo: 0, point: { x: 0, y: 0 }, event: 'birth' },
      { id: 17, wasted: 4, age: 1, health: 4, cargo: 0, point: { x: 1, y: 1 }, event: 'good' },
      { id: 18, wasted: 4, age: 1, health: 5, cargo: 0, point: { x: 3, y: 1 }, event: 'birth' },
    ],
    canvas: {
      cells: [
        [new CM(1, 1), {}, new CM(0, undefined, 1), new CM(1, undefined, 1)],
        [new CM(3), new CM(1, 1),  {}, new CM(null, 1)],
        [new CM(9), {}, new CM(null, null, null), {}],
      ],
    },
  },
];
