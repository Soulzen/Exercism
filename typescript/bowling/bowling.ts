export class Bowling {
  game = new Array(13).fill(0).map(() => new Array(2).fill(0))
  ball = "first" || "second"
  points = 0
  frame = 1

  public roll(pins: number): void {
    if (pins < 0) {
      throw new Error("Negative roll is invalid")
    }
    if (this.frame > 10 && !this.isSpare(10) && !this.isStrike(10)) {
      throw new Error("Cannot roll after game is over")
    }

    if (
      this.isSpare(10) &&
      !this.isStrike(10) &&
      this.frame === 11 &&
      this.ball === "second"
    ) {
      throw new Error("Cannot roll after game is over")
    }

    if (this.isStrike(10)) {
      if (!this.isStrike(11) && this.frame === 12 && this.ball === "first") {
        throw new Error("Cannot roll after game is over")
      }
      if (
        this.isStrike(11) &&
        !this.isStrike(12) &&
        this.frame === 12 &&
        this.ball === "second"
      ) {
        throw new Error("Cannot roll after game is over")
      }
      if (
        this.isStrike(11) &&
        this.isStrike(12) &&
        this.frame === 13 &&
        this.ball === "first"
      ) {
        throw new Error("Cannot roll after game is over")
      }
    }

    this.ball === "first"
      ? (this.game[this.frame][0] = pins)
      : (this.game[this.frame][1] = pins)

    if (pins > 10 || this.game[this.frame][0] + this.game[this.frame][1] > 10) {
      throw new Error("Pin count exceeds pins on the lane")
    }

    if (this.ball === "second" || this.isStrike(this.frame)) {
      this.ball = "first"
      this.frame = this.frame + 1
    } else {
      this.ball = "second"
    }
  }

  public score(): number {
    if (!this.allBallsThrown()) {
      throw new Error("Score cannot be taken until the end of the game")
    }
    for (let i = 0; i < 11; i++) {
      this.points = this.points + this.game[i][0] + this.game[i][1]
      if (this.isStrike(i)) {
        if (this.isStrike(i + 1)) {
          this.points = this.points + this.game[i + 1][0] + this.game[i + 2][0]
        } else {
          this.points = this.points + this.game[i + 1][0] + this.game[i + 1][1]
        }
      } else if (this.isSpare(i)) {
        this.points = this.points + this.game[i + 1][0]
      }
    }
    return this.points
  }

  public isSpare(frame: number): boolean {
    return this.game[frame][0] + this.game[frame][1] === 10
  }

  public isStrike(frame: number): boolean {
    return this.game[frame][0] === 10
  }

  public allBallsThrown(): boolean {
    if (
      !this.isSpare(10) &&
      !this.isStrike(10) &&
      this.frame === 11 &&
      this.ball === "first"
    ) {
      return true
    }

    if (
      this.isSpare(10) &&
      !this.isStrike(10) &&
      !this.isStrike(11) &&
      this.frame === 11 &&
      this.ball === "second"
    ) {
      return true
    }

    if (
      this.isSpare(10) &&
      !this.isStrike(10) &&
      this.isStrike(11) &&
      this.frame === 12 &&
      this.ball === "first"
    ) {
      return true
    }

    if (
      this.isStrike(10) &&
      !this.isStrike(11) &&
      this.frame === 12 &&
      this.ball === "first"
    ) {
      return true
    }

    if (
      this.isStrike(10) &&
      this.isStrike(11) &&
      !this.isStrike(12) &&
      this.frame === 12 &&
      this.ball === "second"
    ) {
      return true
    }

    if (
      this.isStrike(10) &&
      this.isStrike(11) &&
      this.isStrike(12) &&
      this.frame === 13 &&
      this.ball === "first"
    ) {
      return true
    }

    return false
  }
}
