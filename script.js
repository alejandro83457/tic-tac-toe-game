function Gameboard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  function getBoard() {
    return board;
  }

  function setPiece(piece, coord) {
    [row, col] = coord;
    if (board[row][col] != null) return 0;
    board[row][col] = piece;
    return 1;
  }

  function printBoard() {
    for (let row of board) {
      console.log(row);
    }
    console.log("-");
  }

  // Note how I'm not returning board array.
  // It's a private variable. (Closure)
  return { getBoard, setPiece, printBoard };
}

let board = new Gameboard();
board.printBoard();
board.setPiece("X", [1, 1]);
board.setPiece("Y", [1, 1]);
board.printBoard();
