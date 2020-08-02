import { Game } from './domain/Game/Game';
import { IInput } from '@domain/Game';

const game = new Game(7070);

if (IS_DEV) {
  if (window) (window as any).game = game;

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function runServer() {
    // console.log(game.handleData(require('../data/payload.json')));
    const res = (require('../data/pTargetBy').payload as IInput[]).map((item) => async () => {
      await delay(500);
      return item;
    });

    const result = [];
    for (const item of res) {
      result.push(game.handleData(await item()));
    }
    console.log('RESULT', JSON.stringify(result, null, 2));
  }

  runServer();
}
