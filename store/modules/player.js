const { Game } = require('../models')
const Messages = require('../models/messages')

const state = {
  player: null,
  pos: null,

  messages: [],

  sysbuf: '',
  rdQd: false
}

const getters = {
  messages: (state) => {
    if (!state.player) return false
    return state.player.countMails()
  },
  items: (state) => {
    if (!state.player) return false
    if (!state.player.items) return false
    return state.player.items.length
  },
  day: (state) => {
    if (!state.player) return false
    return state.player.day
  },

  play: state => {
    if (!state.player.play) return {}
    if (!state.player.messages.length) return {}
    return {
      show: true,
      message: state.player.newMails[0]
    }
  },
  offer: state => {
    if (!state.player.offers.length) return {}
    return {
      show: true,
      offer: state.player.offers[0],
      offered: true
    }
  },

  prompt: state => {
    let prmpt = '\r'
    // if (state.debugMode) prmpt += '#'
    // if (state.lev > 9) prmpt += '----'

    // if (state.convflg === 0) prmpt += '>'
    // else if (state.convflg === 1) prmpt += '\"'
    // else if (state.convflg === 2) prmpt += '*'
    // else prmpt += '?'
    prmpt += '>'

    // if (state.vis) prmpt = '(' + prmpt + ')'
    return prmpt
  },
  progname: state => {
    /*
    if (state.vis > 9999) {
      return '-csh'
    }
    if (state.vis === 0) {
      return '   --}----- ABERMUD -----{--     Playing as ' + state.name
    }
    */
  }
}

const mutations = {
  setPlayer: (state, value) => { state.player = value },

  addItem: (state, item) => { state.player.addItem(item) },
  playerTurn: (state) => { state.player.turn() },
  showSplash: (state) => { state.player.showSplash() },

  nextPlayer: state => { Game.nextTurn() },
  resetRdQd: (state) => { state.rdQd = false },

  textBfr: (state, value) => {
    state.sysbuf += value
  },
  input: (state, value) => {
    state.sysbuf += '<div class="iskb">' + value + '</div>'
  },
  clearBfr: state => { state.sysbuf = '' },

  resetPos: state => { state.pos = Messages.findend() },
  setPos: (state, value) => { state.pos = value }
}

const actions = {
  load: function (context, id) {
    context.commit('setPlayer', Game.player())
    context.dispatch('update')
  },
  next: function (context) {
    context.dispatch('sendmsg', { text: 'Next Turn' })
    context.commit('nextPlayer')
    context.dispatch('load', 0)
    context.state.player.turn()
  },
  update: function (context) {
    // if (!context.state.player) { return }
    // context.fieldDate = context.state.player.fieldDate.id
    // context.fieldName = context.state.player.fieldDate.caption

    // this.player.bills = this.players[tabIndex].total.bills
    // fmField.cdField.Day = context.state.player.day
  },
  useDay: function (context) {
    if (!context.state.player) { return }
    // this.player.fieldDate.useDay()
    context.dispatch('update')
  },

  showBfr: function (context) {
    // Output for log
    // Output for snoop
    console.log(context.state.sysbuf)
    /* clear buffer */
    context.commit('clearBfr')
    // View my snoops
  },
  sendmsg: function (context, msg) {
    // TOP BEGIN
    context.commit('input', msg.text)
    context.dispatch('processMsgs', false)
    // Apply convflg
    // Apply curmode
    context.dispatch('doAction', msg)
    // Fight counter
    // TOP END
  },
  doAction: function (context, msg) {
    console.log(msg)
  },
  processMsgs: function (context, interrupt) {
    if (!context.state.pos) context.commit('resetPos')
    Messages.process(context.state.pos)
    context.commit('resetPos')

    context.dispatch('eorte', interrupt)
    // Reset summon data
  },
  eorte: function (context, interrupt) {
    // If time => interrupt
    // Set interruption time

    // Invisibility counter
    // Calibrate if needed
    // Summon if summoned
    // Next fight round (interrupt)
    // Item on worn
    // forchk()
    // Hiccup if drunk
  },

  alarm: function (context) {
    context.dispatch('processMsgs', true)
    // on_timing()
    context.dispatch('showBfr')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
