import { TAntVariant, TPlayerVariant } from '@domain/Area';

export class CM {
  ant?: TAntVariant;
  hive?: TPlayerVariant;
  food?: number;

  constructor(food?: number, ant?: number, hive?: number) {
    if (food != null) this.food = food;
    if (ant !== undefined) this.ant = ant === null ? 'stranger' : ant.toString();
    if (hive !== undefined) this.hive = hive === null ? 'stranger' : hive.toString();
  }
}
