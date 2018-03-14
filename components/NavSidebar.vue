<template>
  <v-navigation-drawer
    fixed
    clipped
    app
    :value="show"
    :mini-variant="mini"
  >
    <v-toolbar flat class="transparent" @click="switchMini" v-if="player">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="player.avatar" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ player.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="switchMini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <template v-for="(item, i) in fullItems">
        <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="i"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i" @click="selected(item)">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ child.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-divider v-else-if="item.spacer" :key="i" />
        <v-list-tile v-else-if="item.badge" :key="i" :to="item.to" @click="selected(item)">
          <v-list-tile-action>
            <v-badge overlap color="red">
              <span slot="badge">{{ item.badge }}</span>
              <v-icon>{{ item.icon }}</v-icon>
            </v-badge>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else :key="i" :to="item.to" @click="selected(item)">
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
</template>

<script>
export default {
  name: 'nav-sidebar',
  computed: {
    player: function () { return this.$store.getters.player },
    show: function () { return this.$store.state.sidebar.visible },
    mini: function () { return this.$store.state.sidebar.minified },
    day: function () { return this.$store.getters['player/day'] },
    mails: function () { return this.$store.getters['player/messages'] },
    items: function () { return this.$store.getters['player/items'] },
    menuItems: function () {
      return [
        { icon: 'home', text: 'Главная', to: '/' },
        // { icon: 'apps' },
        // { icon: 'notifications' },
        { spacer: true },
        {
          icon: 'mdi-dice-multiple',
          action: this.nextTurn,
          text: 'Следующий Ход'
        },
        {
          icon: 'attach_money',
          text: 'Банк'
        },
        { spacer: true },
        {
          icon: 'today',
          click: 'showField',
          badge: this.day,
          text: 'Календарь'
        },
        {
          icon: 'mail',
          badge: this.mails,
          badgeColor: 'red',
          text: 'Почта'
        },
        {
          icon: 'work',
          badge: this.items,
          badgeColor: 'red',
          text: 'Товары'
        }
      ]
    },
    fullItems: function () { return this.menuItems.concat(this.$store.state.sidebar.menu) }
  },
  data: () => ({
    drawer: this.show,
    minified: this.mini
  }),
  methods: {
    selected: function (i) {
      if (i.to) {
        this.$router.push(i.to)
        return
      }
      console.log(i)
      console.log(this)
      if (i.action) {
        i.action()
        return
      }
      alert(i)
    },
    switchMini: function () {
      this.$store.commit('sidebar/switchMini')
    },
    nextTurn () {
      this.$store.dispatch('nextTurn')
      // this.player = game.player()
      // game.activePlayer = '' + game.playerId
      // this.updateForm()
      this.$router.push('/new-turn')
    }
  },
  watch: {
    show: function (val) {
      this.drawer = this.show
    },
    drawer: function (val) {
      this.$store.commit('sidebar/setVisibility', val)
    }
  }
}
</script>
