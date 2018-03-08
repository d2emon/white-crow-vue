<template>
  <v-layout justify-center align-center>
    <!-- v-btn fab bottom right color="pink" dark fixed @click.stop="nextTurn" -->
    <v-btn fab bottom right dark fixed @click.stop="nextTurn">
      <v-icon>casino</v-icon>
    </v-btn>

    <v-dialog v-model="motd" max-width="500px">
      <v-card v-if="player">
        <v-card-title>
          День {{ player.day }}
        </v-card-title>
        <v-card-text>
          <h1>{{ player.fieldDate.caption }}</h1>
          <div>
            {{ player.fieldDate.message }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="motd=false">Ok</v-btn>
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
                      <v-layout row wrap>
                        <v-flex md12>
                          <v-avatar size="48px">
                            <img :src="p.avatar" :alt="p.name">
                          </v-avatar>
                          <h1>{{ p.name }}</h1>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex md4>
                          <v-card>
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
                          <v-card v-if="p.mails.length || p.items.length">
                            <v-card v-if="p.mails.length">
                              <v-toolbar color="primary" dark>
                                <v-toolbar-title>Письма</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>{{ p.mails.length }}</v-toolbar-title>
                                <v-btn icon>
                                  <v-icon>search</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-list two-line>
                                <v-subheader v-text="'Today'"></v-subheader>
                                <template v-for="(mail, id) in p.mails">
                                  <v-list-tile avatar v-bind:key="'mail-1-' + id" @click="alert(mail.paiment)">
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
                            <v-card v-if="p.items.length">
                              <!--
                                  <v-toolbar color="primary" dark>
                                    <v-toolbar-title>Товары</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-title>{{ p.items }}</v-toolbar-title>
                                    <v-btn icon>
                                      <v-icon>search</v-icon>
                                    </v-btn>
                                  </v-toolbar>
                                  <v-list two-line>
                                    <template v-for="(item, id) in p.item">
                                      <v-list-tile avatar v-bind:key="'item-1-' + id + '-' + item.title" @click="alert(item.avatar)">
                                        <v-list-tile-avatar>
                                          <img v-bind:src="item.avatar">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </template>
                                  </v-list>
                              -->
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
      motd: true
    }
  },
  methods: {
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
    beginTurn: function () {
      this.player.turn()
      this.motd = true
    }
  },
  mounted: function () {
    console.log(this.$store.getters)
    console.log(this.game.players)
    console.log(this.players)
    if (!this.players.length) this.$router.push('/set-players')
    if (this.nextPlayer) this.$router.push('new-turn')
  }
}
</script>
