import { Game } from './Game';

const game = new Game(7070);
// if (window) (window as any).game = game;

// console.log(
//  game.handleData({
//   tick: 1,
//   id: '1',
//   ants: {
//     '1': { wasted: 0, age: 14, health: 7, payload: 3, x: 0, y: 0, event: 'birth' },
//     '17': { wasted: 4, age: 1, health: 1, payload: 0, x: 1, y: 1, event: 'good' },
//   },
//   map: {
//     width: 3,
//     height: 3,
//     cells: [
//       [{ ant: '1', hive: '1' }, {}, {}],
//       [{ food: 5 }, { ant: '17' }, {}],
//       [{ food: 9 }, {}, { ant: 'stranger', hive: 'stranger' }],
//     ],
//   },
//  })
// );

// console.log( '------------',
//   game.handleData({
//    tick: 2,
//    id: '1',
//    ants: {
//      '1': { wasted: 0, age: 14, health: 7, payload: 4, x: 0, y: 0, event: 'birth' },
//      '17': { wasted: 4, age: 1, health: 1, payload: 0, x: 1, y: 2, event: 'good' },
//    },
//    map: {
//      width: 3,
//      height: 3,
//      cells: [
//        [{ ant: '1', hive: '1' }, {}, {}],
//        [{ food: 4 }, {}, {}],
//        [{ food: 9 }, { ant: '17' }, { ant: 'stranger', hive: 'stranger' }],
//      ],
//    },
//   })
//  );
