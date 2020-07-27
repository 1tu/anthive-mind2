import { Mother } from '@domain/Mother';
import { IInput } from '@domain/Game';
import { configure } from 'mobx';

configure({ computedRequiresReaction: true });

export enum EGameEvent {
  NONE = 'no_action',
  BIRTH = 'birth',
  DEATH = 'death',
  SLOW = 'slow',

  ERROR = 'error',
  ERROR_MOVE = 'bad_move',
  ERROR_UNLOAD = 'bad_unload',
  ERROR_EAT = 'bad_eat',
}

export class Game {
  private _mother = new Mother();

  constructor(port: number) {
    if (!IS_DEV) {
      const http = require('http');
      http
        .createServer((req: any, res: any) => {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk: string) => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const response = this.handleData(data);
                res.end(JSON.stringify({ orders: response }));
                console.log('Tick:', data.tick, response);
              } catch (error) {
                res.end('parse data error');
                console.log('parse error:', error.message);
              }
            });
          } else {
            res.end('only POST allowed');
          }
        })
        .listen(port);
    }
  }

  handleData = (data: IInput) => {
    return this._mother.input(data);
  };
}
