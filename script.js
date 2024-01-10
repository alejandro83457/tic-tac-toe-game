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

  function checkWin(token) {
    // Check if rows have a win.
    for (let row of board) if (row.every((e) => e == token)) return true;
    // Check if cols have a win.
    for (let i = 0; i < board.length; i++) {
      let col = [board[0][i], board[1][i], board[2][i]];
      if (col.every((e) => e == token)) return true;
    }
    // Check if diagonals have a win.
    let diag1 = [board[0][0], board[1][1], board[2][2]];
    let diag2 = [board[2][0], board[1][1], board[0][2]];
    if (diag1.every((e) => e == token)) return true;
    if (diag2.every((e) => e == token)) return true;
    // No win found.
    return false;
  }

  // Check if board is full.
  function checkBoardFull() {
    let arr = board.reduce((a, b) => a.concat(b), []);
    if (arr.some((e) => e == null)) return false;
    return true;
  }

  // Note how I'm not returning board array.
  // It's a private variable. (Closure)
  return { getBoard, setPiece, printBoard, checkWin, checkBoardFull };
}

function Player(name, token) {
  let playernName = name;
  let playerToken = token;

  function getPlayer() {
    return playernName;
  }

  function getToken() {
    return playerToken;
  }

  return { getPlayer, getToken };
}

function Game() {
  let board = new Gameboard();
  let player1 = new Player("player1", "X");
  let player2 = new Player("player2", "O");
}

const game = new Game();
