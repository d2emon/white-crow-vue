module.exports = {
  turn: 0,
  round: 0,

  players: 0,

  reset: function () {
    this.turn = -1
    this.round = 0
  },
  nextRound: function () {
    this.round++
    this.turn = 0
  },
  nextTurn: function () {
    this.turn++
    if (this.turn >= this.players) {
      this.nextRound()
    }
    alert(this.turn)
    alert(this.players)
  }
}
