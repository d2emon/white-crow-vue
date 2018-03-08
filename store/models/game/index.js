var Player = require('../player')

var Turns = require('./turns')
var Field = require('../field')

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

  create: function () {
    this.players = []
    this.turns.reset()

    // White Crow
    this.field = Field.field // TWCField.Create
    this.messages = [] // TMessageList.Create;
    // Self.FMessages.Fill;

    // this.addPlayers(players)
    // this.nextRound()
  },

  nextTurn: function () {
    this.turns.nextTurn()

    // this.player().showSplash()
    // this.nextRound()
  },
  nextRound: function () { this.turns.nextRound() },

  addPlayer: function (id, name) {
    this.players.push(Player.createPlayer('' + id, name))
    this.turns.players = this.players.length
  },
  addPlayers: function (count) {
    if (count < this.minPlayers) { return }
    if (count > this.maxPlayers) { return }

    this.players = []
    for (let i = 0; i < count; i++) {
      let player = 'Player ' + (i + 1)
      this.addPlayer(i, player)
    }
    console.log(this.players)
  }
}
