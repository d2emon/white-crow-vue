<template>
  <v-layout justify-center align-center>
    <!-- v-btn fab bottom right color="pink" dark fixed @click.stop="nextTurn" -->
    <v-btn fab bottom right dark fixed @click.stop="nextTurn">
      <v-icon>casino</v-icon>
    </v-btn>

    <v-dialog v-model="viewMessage" max-width="500px">
      <v-card v-if="message">
        <v-card-title>
          <h1>{{ message.from }}</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md4>
              <v-avatar>
                <img v-bind:src="message.avatar" :alt="message.from">
              </v-avatar>
              <template v-if="message.cost">
                <h1 v-if="message.cost < 0">{{ -message.cost }}</h1>
                <h1 v-else>{{ message.cost }}</h1>
              </template>
            </v-flex>
            <v-flex md8>
              {{ message.text }}
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="viewMessage=false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="viewOffer" max-width="500px">
      <v-card v-if="offer">
        <v-card-title>
          <h1>{{ offer.title }}</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md4>
              <v-avatar>
                <img v-bind:src="offer.avatar" :alt="offer.title">
              </v-avatar>
            </v-flex>
            <v-flex md8>
              <v-list one-line>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Цена:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>{{ offer.cost }} монет</v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Стоимость:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>{{ offer.price }} монет</v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Комисионные:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>{{ offer.comission }} монет</v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <template v-if="!offered">
            <v-btn color="primary" flat @click.stop="viewOffer=false">Ok</v-btn>
          </template>
          <template v-else>
            <v-spacer />
            <v-btn color="success" flat @click.stop="acceptOffer(offer)">Да</v-btn>
            <v-btn color="error" flat @click.stop="declineOffer(offer)">Нет</v-btn>
          </template>
        </v-card-actions>
      </v-card>
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
                                    <v-list-tile-title>День:</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ p.fieldDate.caption }}</v-list-tile-sub-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>{{ p.day }}</v-list-tile-action>
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
export default {
  name: 'play',
  computed: {
    game: function () { return this.$store.state.game.Game },
    players: function () { return this.$store.getters.players },
    // activePlayer: function () { return this.$store.state.game.activePlayer },
    player: function () { return this.$store.getters.player },
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

      viewMessage: false,
      message: null,

      offered: false,
      viewOffer: false,
      offer: null
    }
  },
  methods: {
    beginTurn () {
      if (!this.player) { return }

      // this.player.turn()
      this.motd = true

      if (this.player.play && this.player.newMails.length) {
        this.viewMessage = true
        this.message = this.player.newMails[0]
      }
      console.log(this.player)

      if (this.player.offers.length) {
        this.viewOffer = true
        this.offer = this.player.offers[0]
        this.offered = true
        this.motd = false
      }

      if (this.player.play) {
        this.motd = false
      }
      console.log(this.motd)
    },
    nextTurn () {
      this.$store.dispatch('nextTurn')
      // this.player = game.player()
      // game.activePlayer = '' + game.playerId
      // this.updateForm()
      this.$router.push('/new-turn')
    },
    updateForm: function () {
      if (!this.player) { return }
      this.fieldDate = this.player.fieldDate.id
      this.fieldName = this.player.fieldDate.caption

      // this.activePlayer = '' + tabIndex
      // this.player.bills = this.players[tabIndex].total.bills

      // fmField.cdField.Day := Player.Day;
    },
    useDay: function () {
      if (!this.player) { return }
      this.player.fieldDate.useDay()
      this.updateForm()
    },
    turnClick: function () {
      this.$store.dispatch('nextTurn')
      this.useDay()
    },
    fieldClick: function () {
      alert('Field click')
      // fmField.Show;
    },
    acceptOffer: function (offer) {
      this.viewOffer = false
      this.offer = null
      this.offered = false
      this.$store.commit('addItem', offer)
    },
    declineOffer: function (offer) {
      this.viewOffer = false
      this.offer = null
      this.offered = false
    },
    showItem: function (item) {
      this.viewOffer = true
      this.offer = item
      this.offered = false
    },
    showMessage: function (message) {
      this.message = message
      this.viewMessage = true
    }
  },
  mounted: function () {
    if (!this.players.length) { this.$router.push('/set-players') }
    if (this.nextPlayer) { this.$router.push('new-turn') }

    this.beginTurn()
  }
}
</script>
