<template>
  <v-dialog id="prompt-players" v-model="promptPlayers" transition="dialog-bottom-transition" fullscreen scrollable>
    <v-card>
      <v-toolbar style="flex: 0 0 auto;" dark class="primary">
        <v-toolbar-title>Игроки</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat @click.stop="setPlayerNames">Ok</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-list three-line>
          <!-- v-subheader>Игроки</v-subheader -->
          <v-list-tile>
            <v-list-tile-title>Количество игроков</v-list-tile-title>
            <v-list-tile-content>
              <v-text-field v-model="count" type="number" min="2" max="16" @input="addPlayers"></v-text-field>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile avatar v-for="(player, index) in players" :key="player.id">
            <v-list-tile-avatar>
              <img v-bind:src="player.avatar"/>
            </v-list-tile-avatar>
            <!-- v-list-tile-title>{{ player.name }}</v-list-tile-title -->
            <v-list-tile-content>
              <v-text-field :name="'prompt-input-' + index" single-line :label="'Игрок ' + (index + 1) + ':'" v-model="player.name"></v-text-field>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
          <v-icon>add</v-icon>
        </v-btn>

      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">
            Create contact
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-avatar size="40px" class="mr-3">
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                  </v-avatar>
                  <v-text-field placeholder="Name"></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field placeholder="Job title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000" mask="phone"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn flat color="primary">More</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
var GameModule = require('@/store/game')
var game = GameModule.game

export default {
  name: 'ask-players',
  data: function () {
    return {
      game: game,
      count: 3,
      promptPlayers: true,
      players: game.players,
      dialog: false
    }
  },
  methods: {
    askPlayers: function (count) {
      this.count = count
      this.addPlayers(count)

      // var result = []
      // return result
    },
    addPlayers: function (count) {
      if (count <= 0) {
        count = this.count
      }

      if (count < 2) { return }
      if (count > 16) { return }

      game.players.length = 0
      for (var i = 0; i < count; i++) {
        game.addPlayer('' + i, 'Player ' + (i + 1))
      }
      game.nextRound()
    },
    setPlayerNames: function (e) {
      // game = TWCGame.Create(3, this.count)
      this.promptPlayers = false

      game.player().showSplash()
    }
  },
  created: function () {
    this.askPlayers(3)
  }
}
</script>
