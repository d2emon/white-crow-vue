var Player = require('../player')
var Field = require('../field')
var Turns = require('./turns')

module.exports = {
  turns: Turns,

  minPlayers: 2,
  maxPlayers: 6,
  players: [],
  player: function () {
    return this.players[this.turns.turn]
  },

  field: Field.field,
  messages: [],

  create: function (players) {
    this.players = []
    this.turns.reset()

    // White Crow
    this.field = null // TWCField.Create
    this.messages = [] // TMessageList.Create;
    // Self.FMessages.Fill;

    this.createPlayers(players)
    this.nextRound()
  },

  nextTurn: function () {
    this.turns.nextTurn()

    // this.player().showSplash()
    // this.nextRound()
  },
  nextRound: function () { this.turns.nextRound() },

  addPlayer: function (id, name) {
    this.players.push(Player.createPlayer(id, name))
    this.turns.players = this.players.length
  },
  addPlayers: function (count) {
    if (count < 2) { return }
    if (count > 16) { return }

    this.players = []
    for (let i = 0; i < count; i++) {
      this.addPlayer('' + i, 'Player ' + (i + 1))
    }
    console.log(this.players)
  }
}
