export class CM implements ICell {
  ant?: TInputPlayerVariant;
  hive?: TInputPlayerVariant;
  food?: number;

  constructor(food?: number, ant?: number, hive?: number) {
    if (food != null) this.food = food;
    if (ant !== undefined) this.ant = ant === null ? 'stranger' : ant.toString();
    if (hive !== undefined) this.hive = hive === null ? 'stranger' : hive.toString();
  }
}
