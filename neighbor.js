function Neighbor(cell, direction) {
  this.cell = cell;
  this.player = cell.player;
  this.direction = direction;
}

module.exports = Neighbor;

