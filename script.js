"use strict";

function Gameboard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  function getBoard() {
    return board;
  }

  // Checks if coords are valid.
  function addPiece(piece, coord) {
    let [row, col] = coord;
    board[row][col] = piece;
  }

  // Debugging. Prints to console.
  function printBoard() {
    for (let row of board) console.log(row);
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
  let playerName = name;
  let playerToken = token;

  function getPlayer() {
    return playerName;
  }

  function getToken() {
    return playerToken;
  }

  return { getPlayer, getToken };
}

function Game(player1Name, player2Name) {
  // Set new objects.
  let board = new Gameboard();

  let player1 = new Player(player1Name, "X");
  let player2 = new Player(player2Name, "O");

  // Keep track of turn.
  let turn = player1;

  board.printBoard();

  function playRound(move) {
    console.log(`${turn.getPlayer()}'s turn!`);

    // Will loop until correct cell has been chosen
    board.addPiece(turn.getToken(), move);

    board.printBoard();
  }

  function checkWin() {
    if (board.checkWin(turn.getToken())) {
      console.log(`${turn.getPlayer()} won!!`);
      return true;
    } else return false;
  }

  function checkTie() {
    if (board.checkBoardFull()) {
      console.log("Tie!");
      return true;
    } else return false;
  }

  function getBoard() {
    return board.getBoard();
  }

  function changeTurn() {
    if (turn == player1) turn = player2;
    else turn = player1;
  }

  function getTurn() {
    return turn;
  }

  return { playRound, getBoard, getTurn, checkWin, checkTie, changeTurn };
}

function ScreenController() {
  let game;

  const cells = document.querySelectorAll(".cell");
  const turn = document.querySelector(".turn");
  const dialog = document.querySelector("dialog");
  const submit = document.querySelector("dialog button");
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const playButton = document.querySelector(".play");

  // event listener
  function cellEventListener(e) {
    if (e.target.textContent == "") cellAction(e);
  }

  playButton.addEventListener("click", (e) => {
    cells.forEach((cell) => {
      cell.addEventListener("click", cellEventListener);
    });

    submit.addEventListener("click", (e) => {
      e.preventDefault(); // BRUH MOMENT
      game = new Game(player1.value, player2.value);
      turn.textContent = game.getTurn().getPlayer();
      turn.style.backgroundColor = "white";
      dialog.close();
      cells.forEach((cell) => (cell.textContent = ""));
    });

    dialog.showModal();
  });

  function cellAction(e) {
    let move = e.target.getAttribute("data-value").split(" ");
    game.playRound(move);
    updateScreen(e);
  }

  function updateScreen(e) {
    e.target.textContent = game.getTurn().getToken();
    if (game.checkWin()) {
      turn.textContent = `${game.getTurn().getPlayer()} won`;
      turn.style.backgroundColor = "#90ee90";

      // Remove cell event listener
      // Disallows user from adding more input after game ends.
      cells.forEach((cell) => {
        cell.removeEventListener("click", cellEventListener);
      });
      return;
    } else if (game.checkTie()) {
      turn.textContent = "tie";
      turn.style.backgroundColor = "#ffa07a";
      return;
    }
    game.changeTurn();
    turn.textContent = game.getTurn().getPlayer();
  }
}

ScreenController();
