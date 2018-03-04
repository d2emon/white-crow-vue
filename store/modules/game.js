var Player = require('../player')
// var Field = require('../field')

const state = {
  players: [],

  round: 0,
  turn: 0,
  playerId: 0,
  activePlayer: '0'

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
  player: function (state) {
    console.log(state)
    return state.players[state.playerId]
  }
}

const mutations = {
  clearPlayers: function (state) {
    state.players = []
  },
  addPlayer: function (state, id) {
    const name = 'Player ' + (id + 1)
    console.log(id, name)
    var p = Player.createPlayer('' + id, name)
    state.players.push(p)
  },
  nextRound: function (state) {
    state.round++
    state.turn = 0
    state.playerId = 0
  },
  nextTurn: function (state) {
    state.turn++
    alert(state.turn)
  },
  playerTurn: function (state) {
    state.players[state.playerId].turn()
  },
  showSplash: function (state) {
    state.players[state.playerId].showSplash()
  },
  setPlayerId: function (state, turn) {
    state.playerId = turn
    state.activePlayer = '' + state.playerId
  }
}

const actions = {
  nextTurn: function (context) {
    context.commit('nextTurn')
    if (context.state.turn >= context.state.players.length) {
      context.commit('nextRound')
    }
    context.commit('setPlayerId', context.state.turn)

    context.commit('showSplash')
    // state.nextRound()
  },
  playerTurn: function (context) {
    context.getters.player.turn()
  },
  addPlayers: function (context, count) {
    if (count < 2) { return }
    if (count > 16) { return }

    context.commit('clearPlayers')
    for (let i = 0; i < count; i++) {
      context.commit('addPlayer', i)
    }
    console.log(context.state.players)
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
