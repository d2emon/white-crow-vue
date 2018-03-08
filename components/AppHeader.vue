<template>
    <v-toolbar color="blue darken-3" dark app clipped-left fixed >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="switchDrawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">Белая Ворона</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <template v-for="(item, id) in menuItems">
           <v-spacer v-if="item.spacer" :key="id"></v-spacer>
           <v-tooltip v-else-if="item.text" bottom>
             <v-btn icon slot="activator" @click="itemAction(item)">
               <v-icon>{{ item.icon }}</v-icon>
             </v-btn>
             <span>{{ item.text }}</span>
           </v-tooltip>
           <v-btn v-else icon :key="id" icon :to="item.to" @click="itemAction(item)">
             <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <v-tooltip bottom>
          <v-btn icon slot="activator" v-if="day" @click="showField">
           <v-badge overlap>
              <span slot="badge">{{ day }}</span>
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
            <v-badge overlap color="red" v-if="mails">
              <span slot="badge">{{ mails }}</span>
              <v-icon>mail</v-icon>
            </v-badge>
            <v-icon v-else>mail</v-icon>
          </v-btn>
          <span>Mails</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-badge overlap color="red" v-if="items">
              <span slot="badge">{{ items }}</span>
              <v-icon>work</v-icon>
            </v-badge>
            <v-icon v-else>work</v-icon>
          </v-btn>
          <span>Items</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-btn flat v-if="player" large>
          {{ player.name }}
          <v-avatar size="32px">
            <img :src="player.avatar" :alt="player.name">
          </v-avatar>
        </v-btn>
      </div>
    </v-toolbar>
</template>

<script>
export default {
  name: 'app-header',
  computed: {
    player: function () { return this.$store.getters.player },
    day: function () { return this.player ? this.player.day : false },
    mails: function () { return this.player ? this.player.countMails() : false },
    items: function () { return this.player ? this.player.items.length : false },
    menuItems: function () {
      return [
        {
          icon: 'home',
          to: '/'
        },
        { icon: 'apps' },
        { icon: 'notifications' },
        { spacer: true },
        {
          icon: 'casino',
          action: this.nextTurn,
          text: 'Next Turn'
        },
        {
          icon: 'attach_money',
          text: 'Bank'
        }
        /*
        {
          icon: 'today',
          click: 'showField',
          badge: this.player.day,
          text: 'Field'
        },
        {
          icon: 'mail',
          badge: this.player.mails,
          badgeColor: 'red',
          text: 'Mails'
        },
        {
          icon: 'work',
          badge: this.player.items,
          badgeColor: 'red',
          text: 'Items'
        }
        */
      ]
    }
  },
  data: () => ({
  }),
  methods: {
    switchDrawer () {
      this.$store.commit('sidebar/switchVisible')
    },
    nextTurn () {
      this.$store.dispatch('nextTurn')
      // this.player = game.player()
      // game.activePlayer = '' + game.playerId
      // this.updateForm()
      this.$router.push('/new-turn')
    },
    showField: function () {
      alert('Field click')
      // fmField.Show;
    },
    itemAction: function (item) {
      if (!item) return
      if (!item.action) return
      item.action()
    }
  }
}
</script>

