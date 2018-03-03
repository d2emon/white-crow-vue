<template>
    <v-toolbar color="blue darken-3" dark app clipped-left fixed >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="switchDrawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">Белая Ворона</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon to="/">
           <v-icon>home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn icon slot="activator" @click="nextTurn">
            <v-icon>casino</v-icon>
          </v-btn>
          <span>Next Turn</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-icon>attach_money</v-icon>
          </v-btn>
          <span>Bank</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator" v-if="player.day" @click="showField">
           <v-badge overlap>
              <span slot="badge">{{ player.day }}</span>
              <v-icon>today</v-icon>
            </v-badge>
          </v-btn>
          <v-btn  v-else icon slot="activator" @click="showField">
            <v-icon>today</v-icon>
          </v-btn>
          <span>Field</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-badge overlap color="red">
              <span slot="badge">{{ player.mails }}</span>
              <v-icon>mail</v-icon>
            </v-badge>
          </v-btn>
          <span>Mails</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-badge overlap color="red">
              <span slot="badge">{{ player.items }}</span>
              <v-icon>work</v-icon>
            </v-badge>
          </v-btn>
          <span>Items</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-btn flat large>
          {{ player.name }}
          <v-avatar size="32px">
            <img :src="player.avatar" :alt="player.name">
          </v-avatar>
        </v-btn>
      </div>
    </v-toolbar>
</template>

<script>
var GameModule = require('@/store/game')
var game = GameModule.game

export default {
  name: 'app-header',
  computed: {
    player: function () {
      if (!game.player()) {
        return {
          name: 'Player',
          avatar: 'https://vuetifyjs.com/static/doc-images/logo.svg',
          mails: 0
        }
      }

      return game.player()
    }
  },
  data: () => ({
  }),
  methods: {
    switchDrawer () {
      this.$store.commit('switchSidebar')
    },
    nextTurn () {
      game.nextTurn()
      // this.player = game.player()
      game.activePlayer = '' + game.playerId
      // this.updateForm()
    },
    showField: function () {
      alert('Field click')
      // fmField.Show;
    }
  }
}
</script>

