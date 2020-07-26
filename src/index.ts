import { payload as data } from '../data/payload';
// import { payload2 as data } from '../data/payload.2';

import { Game } from './domain/Game/Game';

const game = new Game(7070);
if (window) (window as any).game = game;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runServer() {
  const res = data.map((item) => async () => {
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
