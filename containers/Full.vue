<template>
  <v-app>
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" :key="i" no-action>
            <v-list-tile slot="item" @click="alert(item.icon)">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="alert(i)">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="i" @click="alert(i)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- v-btn fab bottom right color="pink" dark fixed @click.stop="nextTurn" -->
    <v-btn fab bottom right dark fixed @click.stop="nextTurn">
      <v-icon>casino</v-icon>
    </v-btn>

    <v-toolbar color="blue darken-3" dark app clipped-left fixed >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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

    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <v-layout row wrap>
        <v-flex md2>
          Игрок №{{ game.turnId() }}
        </v-flex>
        <v-flex md2>
          Тур №{{ game.round }}
        </v-flex>
        <v-flex md2 v-if="player">
          День {{ player.day }}
        </v-flex>
        <v-flex md6 v-if="player.fieldDate">
          <v-text-field name="lb-field-names" single-line readonly :value="player.fieldDate.caption"></v-text-field>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
// import 'vuetify/dist/vuetify.min.css'
// import 'font-awesome/css/font-awesome.css'

import 'vuetify/dist/vuetify.min.css'

var GameModule = require('@/store/game')
var game = GameModule.game

export default {
  name: 'white-crow',
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
    dialog: false,
    drawer: null,
    game: game,
    items: [
      { icon: 'contacts', text: 'Contacts' },
      { icon: 'history', text: 'Frequently contacted' },
      { icon: 'content_copy', text: 'Duplicates' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Labels',
        model: true,
        children: [
          { icon: 'add', text: 'Create label' }
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' }
        ]
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Go to the old version' }
    ]
  }),
  methods: {
    nextTurn: function () {
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

<style>
/* CSS */
* {
  /* box-sizing: border-box; */
  /* margin: 0; */
  /* padding: 0; */
}
</style>
