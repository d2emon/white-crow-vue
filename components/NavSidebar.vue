<template>
  <v-navigation-drawer
    fixed
    clipped
    app
    :value="show"
    :mini-variant="mini"
  >
    <v-toolbar flat class="transparent" @click="switchMini">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="this.player.avatar" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ this.player.name }}</v-list-tile-title>
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
      <template v-for="(item, i) in items">
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
          <v-list-tile v-for="(child, i) in item.children" :key="i" @click="selected(i)">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ child.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="i" @click="selected(i)">
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
    player: function () {
      return {
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        name: 'Player 1'
      }
    },
    show: function () { return this.$store.state.showSidebar },
    mini: function () { return this.$store.state.minified },
    items: function () { return this.$store.state.sidebarMenu }
  },
  data: () => ({
    drawer: this.show,
    minified: this.mini
  }),
  methods: {
    selected: function (i) {
      alert(i)
    },
    switchMini: function () {
      this.$store.commit('switchSidebarMini')
    }
  },
  watch: {
    show: function (val) {
      this.drawer = this.show
    },
    drawer: function (val) {
      this.$store.commit('setShowSidebar', val)
    }
  }
}
</script>
