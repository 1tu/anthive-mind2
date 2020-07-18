import * as http from 'http';
import { Mother } from './domain/Mother/Mother';

export class Game {
  private _mother = new Mother();
  private _server: http.Server;

  constructor(port: number) {
    this._server = http
      .createServer((req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);

              const response = this._handleData(data);
              res.end(JSON.stringify(response));
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

  private _handleData(data: MGame.IInput) {
    return this._mother.input(data);
  }
}
