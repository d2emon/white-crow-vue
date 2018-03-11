const { Game, Turns, Field } = require('../models')

const state = {
  Game,
  Turns,
  Field

  /*
  game: {
    length: 0,

    turnId: function () {
      return this.playerId + 1
    },

    player: function () {
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

    addPlayers: function (players) {
      for (var i = 0; i < players.length; i++) {
        this.addPlayer('' + i, 'Player ' + (i + 1))
      }
    }
  }
  */
}

const getters = {
  playerId: (state) => { return '' + state.Turns.playerId },
  turn: (state) => { return state.Turns.turn },
  round: (state) => { return state.Turns.round },

  players: (state) => { return state.Game.players },
  player: function (state) { return state.Game.player() }
}

const mutations = {
  create: state => { state.Game.create() },
  start: state => { state.Game.start() },

  clearPlayers: function (state) {
    state.players = []
  },
  addPlayer: function (state, id) {
    const name = 'Player ' + (id + 1)
    console.log(id, name)
    state.Game.addPlayer(id, name)
  },
  addPlayers: function (state, count) {
    state.Game.addPlayers(count)
  },
  addItem: function (state, item) {
    state.Game.player().addItem(item)
  },
  nextTurn: function (state) {
    state.Game.nextTurn()
  },
  showSplash: function (state) {
    state.Game.player().showSplash()
  }
}

const actions = {
  nextTurn: function (context) {
    context.commit('nextTurn')
  },
  playerTurn: function (context) {
    context.getters.player.turn()
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
