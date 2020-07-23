import { IDisposable, TDisposable } from 'src/common/class/Disposable/Disposable.types';

export class Disposable implements IDisposable {
  disposes: TDisposable[] = [];
  dispose() {
    this.disposes.forEach((d) => d());
  }
}
