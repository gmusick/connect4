GameBoard = require('./game_board');
Player = require('./player');

function canPlayAGamePiece() {
  var gameBoard = new GameBoard();

  var redPlayer = new Player("red");
  var blackPlayer = new Player("black");

  var column = 0;
  gameBoard.play(redPlayer, column);
  gameBoard.play(blackPlayer, column);

  console.log("\n", gameBoard.board);

  if (gameBoard.cellAt(0, 0).player !== redPlayer) {
    throw "Failed: gameboard doesn't have redPlayer";
  }

  if (gameBoard.cellAt(0, 1).player !== blackPlayer) {
    throw "Failed: gameboard doesn't have blackPlayer";
  }
}

function canReturnStatusOfTheGame() {
  var gameBoard = new GameBoard();

  var redPlayer = new Player("red");
  var blackPlayer = new Player("black");

  var column = 0;
  gameBoard.play(redPlayer, column);

  var status = gameBoard.play(blackPlayer, column);

  console.log("\n", gameBoard.board);

  if (status !== "no winner!") {
    throw "Failed: status is " + status;
  }
}

function canVerticallyConnectFourOfTheSamePlayer() {
  var gameBoard = new GameBoard();

  var redPlayer = new Player("red");

  var column = 0;
  gameBoard.play(redPlayer, column);
  gameBoard.play(redPlayer, column);
  gameBoard.play(redPlayer, column);

  console.log("\n\n\n\n", "final!!!!");
  var status = gameBoard.play(redPlayer, column);

  console.log("\n", gameBoard.board);

  if (status !== "red wins!") {
    throw "Failed: gameBoard status is: " + status;
  }
}

function canHorizontallyConnectFourOfTheSamePlayer() {
  var gameBoard = new GameBoard();

  var redPlayer = new Player("red");

  gameBoard.play(redPlayer, 0);
  gameBoard.play(redPlayer, 1);
  gameBoard.play(redPlayer, 2);

  var status = gameBoard.play(redPlayer, 3);

  console.log("\n", gameBoard.board);

  if (status !== "red wins!") {
    throw "Failed: gameBoard status is: " + status;
  }
}

function canDiagonallyConnectFourOfTheSamePlayer() {
  var gameBoard = new GameBoard();

  var redPlayer = new Player("red");
  var blackPlayer = new Player("black");

  gameBoard.play(redPlayer, 0);
  gameBoard.play(blackPlayer, 1);
  gameBoard.play(redPlayer, 1);
  gameBoard.play(blackPlayer, 2);
  gameBoard.play(blackPlayer, 2);
  gameBoard.play(redPlayer, 2);
  gameBoard.play(blackPlayer, 3);
  gameBoard.play(blackPlayer, 3);
  gameBoard.play(blackPlayer, 3);

  var status = gameBoard.play(redPlayer, 3);

  console.log("\n", gameBoard.board);

  if (status !== "red wins!") {
    throw "Failed: gameBoard status is: " + status;
  }
}

canPlayAGamePiece();
canReturnStatusOfTheGame();
canVerticallyConnectFourOfTheSamePlayer();
canHorizontallyConnectFourOfTheSamePlayer();
canDiagonallyConnectFourOfTheSamePlayer();

