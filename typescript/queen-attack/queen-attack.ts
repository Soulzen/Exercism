type Position = readonly [number, number]

type Positions = {
  white: Position
  black: Position
}

export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  // white: [whiteRow, whiteColumn]
  // black: [blackRow, blackColumn]
  constructor({ black, white }: Partial<Positions> = {}) {
    //Staring positions
    this.black = black ? black : [0, 3]
    this.white = white ? white : [7, 3]

    //Check if the queens are in the same position
    if (this.black[0] === this.white[0] && this.black[1] === this.white[1]) {
      throw new Error("Queens cannot share the same space")
    }

    //Check if the queens are on the board
    if (
      this.black[0] < 0 ||
      this.black[0] > 7 ||
      this.black[1] < 0 ||
      this.black[1] > 7 ||
      this.white[0] < 0 ||
      this.white[0] > 7 ||
      this.white[1] < 0 ||
      this.white[1] > 7
    ) {
      throw new Error("Queen must be placed on the board")
    }
  }

  toString(): string {
    let board = ""
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === this.white[0] && col === this.white[1]) {
          board += "W "
        } else if (row === this.black[0] && col === this.black[1]) {
          board += "B "
        } else {
          board += "_ "
        }
      }
      board = board.slice(0, -1)
      row === 7 ? board : (board += "\n")
    }
    console.log(board)
    return board
  }

  get canAttack(): boolean {
    //Check if the queens are in the same row or column
    if (this.black[0] === this.white[0] || this.black[1] === this.white[1]) {
      return true
    }

    //Check if the queens are in the same diagonal
    if (
      Math.abs(this.black[0] - this.white[0]) ===
      Math.abs(this.black[1] - this.white[1])
    ) {
      return true
    }

    return false
  }
}
