var Player = require('../player')
var Turns = require('./turns')
var Field = require('../field')

module.exports = {
  turns: Turns,

  minPlayers: 2,
  maxPlayers: 6,
  players: [],
  player: function () {
    return this.players[this.turns.playerId]
  },

  field: Field.field,

  create: function () {
    this.players = []
    this.turns.reset()

    // White Crow
    this.field = Field.field // TWCField.Create
    // this.messages = [] // TMessageList.Create;
    // Self.FMessages.Fill;

    // this.addPlayers(players)
    // this.nextRound()
  },
  start: function () {
    this.turns.reset()
    this.player().turn()
  },

  nextTurn: function () {
    this.turns.nextPlayer()
  },

  addPlayer: function (id, name) {
    this.players.push(Player.createPlayer('' + id, name))
    this.turns.players = this.players.length

    // extern long curch,cms;
    // extern long mynum;
    // extern long maxu;
    // extern long rd_qd;
    // let fl = 0
    // let string = ''
    // extern char globme[];

    // makebfr()
    // cms = -1
    // putmeon(name)
    // if (!openworld()) crapup("Sorry AberMUD is currently unavailable");
    /*
    if (mynum >= maxu) {
      printf("\nSorry AberMUD is full at the moment\n");
      return(0);
    }
    */
    // globme = name
    // rte(name)
    // closeworld()
    // cms = -1
    // special(".g",name)
    // i_setup=1;
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
