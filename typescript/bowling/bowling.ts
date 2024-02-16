export class Bowling {
  points = 0

  public roll(pins: number): void {
    this.points = this.points + pins
  }

  public score(): number {
    return this.points
  }
}
