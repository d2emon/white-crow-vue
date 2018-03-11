module.exports = {
  turn: 0,
  round: 0,

  players: 0,
  playerId: 0,

  reset: function () {
    this.playerId = 0
    this.turn = 0
    this.round = 0
  },
  nextRound: function () {
    this.round++
    this.turn = 0
  },
  nextTurn: function () {
    this.turn++
    this.playerId = 0
  },
  nextPlayer: function () {
    this.playerId++
    if (this.playerId >= this.players) {
      this.nextTurn()
    }
  }
}
