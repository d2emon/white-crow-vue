var Player = require('./player')
var Field = require('./field')

var game = {
  length: 0,
  round: 0,
  turn: 0,

  playerId: 0,
  turnId: function () {
    return this.playerId + 1
  },
  activePlayer: '0',

  players: [],
  player: function () {
    return this.players[this.playerId]
  },

  field: Field.field,

  count: 0,
  mails: [],

  create: function (players) {
    this.players.length = 0
    this.round = 0
    this.turn = -1

    this.playerId = 0

    // White Crow
    this.field = null // TWCField.Create
    this.messages = [] // TMessageList.Create;
    // Self.FMessages.Fill;

    this.createPlayers(players)
    this.nextRound()
  },

  nextRound: function () {
    this.round++
    this.turn = 0
    this.playerId = 0
  },

  nextTurn: function () {
    this.turn++
    if (this.turn >= this.players.length) {
      this.nextRound()
    }

    this.playerId = this.turn
    this.activePlayer = '' + this.playerId

    this.player().showSplash()
    // this.nextRound()
  },

  addPlayer: function (id, name) {
    var p = Player.createPlayer(id, name)
    this.players.push(p)
  },

  addPlayers: function (players) {
    for (var i = 0; i < players.length; i++) {
      this.addPlayer('' + i, 'Player ' + (i + 1))
    }
  }
}

module.exports = {
  game: game
}
