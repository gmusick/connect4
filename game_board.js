Cell = require('./cell');
Neighbor = require('./neighbor');
EmptyNeighbor = require('./empty_neighbor')

function GameBoard() {
  this.board = new Array(8);

  for (var i = 0; i < this.board.length; i++) {
    var column = new Array(8);
    this.board[i] = column;
  }
}

GameBoard.prototype = {
  play: function(player, column) {
    var rows = this.board[column];

    for (var row = 0; row < rows.length; row++) {
      var cell = rows[row];

      if (cell === undefined) {
        cell = new Cell(column, row, player);
        rows[row] = cell;

        return this.statusOf(cell);
      }
    }
  },

  neighborsOf: function(cell) {
    return [
      this.neighborOf(cell, "N"),
      this.neighborOf(cell, "NE"),
      this.neighborOf(cell, "E"),
      this.neighborOf(cell, "SE"),
      this.neighborOf(cell, "S"),
      this.neighborOf(cell, "SW"),
      this.neighborOf(cell, "W"),
      this.neighborOf(cell, "NW")
    ];
  },

  neighborOf: function(cell, direction) {
    var cellColumn = cell.column;
    var cellRow = cell.row;

    var neighborCell;

    switch (direction) {
      case "N":
        neighborCell = this.cellAt(cellColumn - 1, cellRow);
        break;
      case "NE":
        neighborCell = this.cellAt(cellColumn + 1, cellRow + 1);
        break;
      case "E":
        neighborCell = this.cellAt(cellColumn + 1, cellRow);
        break;
      case "SE":
        neighborCell = this.cellAt(cellColumn + 1, cellRow - 1);
        break;
      case "S":
        neighborCell = this.cellAt(cellColumn, cellRow - 1);
        break;
      case "SW":
        neighborCell = this.cellAt(cellColumn - 1, cellRow - 1);
        break;
      case "W":
        neighborCell = this.cellAt(cellColumn - 1, cellRow);
        break;
      case "NW":
        neighborCell = this.cellAt(cellColumn - 1, cellRow + 1);
        break;
    }

    if (neighborCell !== undefined) {
      return new Neighbor(neighborCell, direction);
    } else {
      return new EmptyNeighbor();
    }
  },

  cellAt: function(column, row) {
    if (column >= 0 && column <= this.board.length &&
        row >= 0 && row <= this.board[column].length) {
      return this.board[column][row];
    }

    return undefined;
  },

  statusOf: function(cell) {
    var neighbors = this.neighborsOf(cell);

    var count = 3;

    // iterate to find a neighbor with the same color and same direction
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (neighbor.player == cell.player) {
        count--;

        if (this.hasCountOfMatchingNeighborsInSameDirection(count, neighbor)) {
          return cell.player.name + " wins!";
        }
      }
    }

    return "no winner!";
  },

  hasCountOfMatchingNeighborsInSameDirection: function(count, neighbor) {
    var next = this.neighborInSameDirectionOf(neighbor);
    if (next.player == neighbor.player) {
      count--;
      if (count == 0) {
        return true;
      } else {
        return this.hasCountOfMatchingNeighborsInSameDirection(count, next);
      }
    }

    return false;
  },

  neighborInSameDirectionOf: function(neighbor) {
    return this.neighborOf(neighbor.cell, neighbor.direction);
  }
};

module.exports = GameBoard;

