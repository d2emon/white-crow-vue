<template>
  <v-layout justify-center align-center>
    <!-- v-btn fab bottom right color="pink" dark fixed @click.stop="nextTurn" -->
    <v-btn fab bottom right dark fixed @click.stop="nextTurn">
      <v-icon>casino</v-icon>
    </v-btn>

    <v-dialog v-model="messageBox.show" max-width="500px">
      <message-box :message="messageBox.message" @close="hideMessage" v-if="messageBox.message" />
    </v-dialog>

    <v-dialog v-model="offer.show" max-width="500px">
      <item-box :item="offer.offer" :ask="offer.offered" @accept="accept" @close="hideItem" v-if="offer.offer" />
    </v-dialog>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex md12>
          <v-card id="pn-players">
            <v-tabs
              v-model="activePlayer"
              color="primary"
              dark
              fixed-tabs
            >
              <v-tab
                v-for="(p, id) in players"
                :key="'tab-' + id"
                ripple
              >
                <v-avatar size="24px">
                  <img :src="p.avatar" :alt="p.name">
                </v-avatar>
                <v-badge v-if="p == player" overlap color="red">
                  <span slot="badge"><v-icon>check</v-icon></span>
                  {{ p.name }}
                </v-badge>
                <span v-else>{{ p.name }}</span>
              </v-tab>
              <v-tabs-items v-model="activePlayer">
                <v-tab-item
                  v-for="(p, id) in players"
                  :key="'tab-panel-' + id"
                  :id="p.id"
                >
                  <v-card flat>
                    <v-card-text>
                      <template v-if="p === player">
                        <v-alert color="success" v-if="player.fieldDate" v-model="motd" :icon="player.fieldDate.icon" dismissible>
                          {{ player.fieldDate.message }}
                        </v-alert>
                      </template>
                      <v-layout row wrap>
                        <v-flex md4>
                          <v-card>
                            <v-layout row wrap>
                              <v-flex md4>
                                <v-avatar size="48px">
                                  <img :src="p.avatar" :alt="p.name">
                                </v-avatar>
                              </v-flex>
                              <v-flex md8>
                                <h1>{{ p.name }}</h1>
                              </v-flex>
                            </v-layout>
                            <v-list two-line>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-title>День:</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ p.fieldDate.caption }}</v-list-tile-sub-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>{{ p.day }}</v-list-tile-action>
                              </v-list-tile>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-title>Наличные:</v-list-tile-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>{{ p.money.cash }}$</v-list-tile-action>
                              </v-list-tile>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-title>В банке:</v-list-tile-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>{{ p.money.account }}$</v-list-tile-action>
                              </v-list-tile>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-title>Оплатить:</v-list-tile-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>{{ p.money.bills }}$</v-list-tile-action>
                              </v-list-tile>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-title>Бросок:</v-list-tile-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>
                                    <v-icon large v-if="(p.dice.score > 0) && (p.dice.score < 7)">mdi-dice-{{ p.dice.score }}</v-icon>
                                    <v-icon large v-else>mdi-dice-multiple</v-icon>
                                  </v-list-tile-action>
                              </v-list-tile>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-title>Банк:</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-text-field name="player-bank" single-line readonly label="Bank" :value="p.total.bank"></v-text-field>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                        <v-flex md8>
                            <v-card v-if="p.countMails()">
                              <v-toolbar color="primary" dark>
                                <v-toolbar-title>Письма</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>{{ p.countMails() }}</v-toolbar-title>
                                <v-btn icon>
                                  <v-icon>search</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-list two-line>
                                <v-subheader v-if="p.newMails.length > 0" v-text="'Сегодня'"></v-subheader>
                                <template v-for="(mail, id) in p.newMails">
                                  <v-list-tile avatar v-bind:key="'mail-new-' + id" @click="showMessage(mail)">
                                    <v-list-tile-avatar>
                                       <template v-if="mail.avatar">
                                          <img v-bind:src="mail.avatar">
                                       </template>
                                       <template v-else>
                                          <img v-bind:src="p.avatar">
                                       </template>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-title v-html="mail.from"></v-list-tile-title>
                                      <v-list-tile-sub-title v-html="mail.text"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                </template>
                                <v-subheader v-if="p.mails.length > 0" v-text="'Прошлые'"></v-subheader>
                                <template v-for="(mail, id) in p.mails">
                                  <v-list-tile avatar v-bind:key="'mail-' + id" @click="showMessage(mail)">
                                    <v-list-tile-avatar>
                                       <template v-if="mail.avatar">
                                          <img v-bind:src="mail.avatar">
                                       </template>
                                       <template v-else>
                                          <img v-bind:src="p.avatar">
                                       </template>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-title v-html="mail.from"></v-list-tile-title>
                                      <v-list-tile-sub-title v-html="mail.text"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                </template>
                              </v-list>
                            </v-card>
                            <br />
                          <v-card v-if="p.mails.length || p.items.length">
                            <v-card v-if="p.items.length">
                              <v-toolbar color="primary" dark>
                                <v-toolbar-title>Товары</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>{{ p.items.length }}</v-toolbar-title>
                                <v-btn icon>
                                  <v-icon>search</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-list two-line>
                                <template v-for="(item, id) in p.items">
                                  <v-list-tile avatar v-bind:key="'item-1-' + id + '-' + item.title" @click="showItem(item)">
                                    <v-list-tile-avatar>
                                      <img v-bind:src="item.avatar">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                      <v-list-tile-sub-title v-if="item.description" v-html="item.description"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                </template>
                              </v-list>

                              <!-- v-container fluid grid-list-md>
                                <v-layout row wrap>
                                  <v-flex
                                    xs4
                                    v-for="(item, id) in p.items"
                                    :key="'item-' + id"
                                    @click="viewItem(item)"
                                  >
                                    <v-card>
                                      <v-card-media
                                        :src="item.avatar"
                                        height="200px"
                                      >
                                        <v-container fill-height fluid>
                                          <v-layout fill-height>
                                            <v-flex xs12 align-end flexbox>
                                              <span class="headline" v-text="item.title"/>
                                            </v-flex>
                                          </v-layout>
                                        </v-container>
                                      </v-card-media>
                                    </v-card>
                                  </v-flex>
                                </v-layout>
                              </v-container -->
                            </v-card>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { MessageBox, ItemBox } from '@/components'

export default {
  name: 'play',
  components: {
    MessageBox,
    ItemBox
  },
  computed: {
    game: function () { return this.$store.state.game.Game },
    players: function () { return this.$store.getters.players },
    // activePlayer: function () { return this.$store.state.game.activePlayer },
    player: function () { return this.$store.state.player.player },
    nextPlayer: function () {
      if (!this.player) return false
      return this.player.active
    }
  },
  data: function () {
    return {
      activePlayer: '' + this.$store.state.game.Turns.turn,
      fieldDate: 0,
      fieldName: 0,
      motd: true,

      messageBox: {
        show: false,
        message: null
      },
      offer: {
        show: false,
        offered: false,
        offer: null
      }
    }
  },
  methods: {
    beginTurn () {
      // this.$store.dispatch('player/useDay')
      this.$store.dispatch('player/load', 0)
      this.$store.dispatch('player/alarm')

      if (!this.player) { return }

      // this.player.turn()
      this.motd = true

      this.showGame(this.$store.getters['player/play'])
      this.showOffer(this.$store.getters['player/offer'])

      this.$store.dispatch('player/showBfr')
      console.log(this.$store.getters.prompt)
    },
    nextTurn () {
      this.$store.dispatch('player/next')

      if (this.$store.state.player.rdQd) this.$store.dispatch('player/processMsgs')
      this.$store.commit('player/resetRdQd')
      this.$store.dispatch('player/showBfr')

      this.$router.push('/new-turn')
    },

    showOffer (offer) {
      console.log(offer)
      if (!offer) return

      this.offer.show = offer.show
      this.offer.offered = offer.offered
      this.offer.offer = offer.offer
      this.motd &= !offer.offered
    },
    showItem: function (item) {
      this.offer.show = true
      this.offer.offered = false
      this.offer.offer = item
    },
    accept: function (offer) {
      console.log(offer)
      this.$store.commit('addItem', offer)
      this.hideItem()
    },
    hideItem () {
      this.offer.show = false
      this.offer.offer = null
      this.offer.offered = false
    },

    showGame (play) {
      console.log(play)
      if (!play) return
      if (!play.show) return

      this.messageBox.show = play.show
      this.messageBox.message = play.message
      this.motd &= play.show
    },
    showMessage (message) {
      this.messageBox.show = true
      this.messageBox.message = message
    },
    hideMessage () {
      this.messageBox.show = false
      this.messageBox.message = null
    }
  },
  mounted: function () {
    if (!this.players.length) { this.$router.push('/set-players') }
    if (this.nextPlayer) { this.$router.push('new-turn') }

    this.beginTurn()
  }
}
</script>
