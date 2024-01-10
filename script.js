function Gameboard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  function getBoard() {
    return board;
  }

  function addPiece(piece, coord) {
    [row, col] = coord;
    if (isNaN(row)) return false;
    if (isNaN(col)) return false;
    if (row > 2 || row < 0) return false;
    if (col > 2 || col < 0) return false;
    if (board[row][col] != null) return false;
    board[row][col] = piece;
    return true;
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
  return { getBoard, addPiece, printBoard, checkWin, checkBoardFull };
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

  function getMove() {
    let input = prompt("Enter coords with space between:");
    return input.split(" ");
  }

  return { getPlayer, getToken, getMove };
}

function Game() {
  // Set new objects.
  let board = new Gameboard();
  let player1 = new Player("player1", "X");
  let player2 = new Player("player2", "O");

  // Keep track of turn.
  let turn = player1;

  // Loop will end only if there is a tie or someone wins
  while (true) {
    console.log(`${turn.getPlayer()}'s turn!`);
    board.printBoard();

    // Will loop until correct cell has been chosen
    while (true) {
      if (board.addPiece(turn.getToken(), turn.getMove())) break;
      console.log("Incorrect move!");
    }

    // Check for win
    if (board.checkWin(turn.getToken())) {
      console.log(`${turn.getPlayer()} won!!`);
      board.printBoard();
      break;
    }

    // Check for tie
    if (board.checkBoardFull()) {
      console.log("Tie!");
      board.printBoard();
      break;
    }

    // Switch turn
    if (turn == player1) turn = player2;
    else turn = player1;
  }
}

const game = new Game();
