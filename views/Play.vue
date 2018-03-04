<template>
  <v-layout justify-center align-center>
    <!-- v-btn fab bottom right color="pink" dark fixed @click.stop="nextTurn" -->
    <v-btn fab bottom right dark fixed @click.stop="nextTurn">
      <v-icon>casino</v-icon>
    </v-btn>

    <v-dialog id="next-player" v-model="nextPlayer" transition="dialog-bottom-transition" fullscreen scrollable text-md-center>
      <v-card class="text-xs-center" v-if="game.player()">
        <v-card-title class="grey py-4 title">
          Новый ход
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-card class="ma-5 fill-height">
            <v-card-text>
              <h1 class="display-4">{{ game.player().name }}</h1>
            </v-card-text>
            <v-card-actions>
              <div style="width: 100%;">
                <v-btn large color="primary" @click="beginTurn">Ok</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="motd" max-width="500px">
      <v-card v-if="game.player()">
        <v-card-title>
          День {{ game.player().day }}
        </v-card-title>
        <v-card-text>
          <h1>{{ game.player().fieldDate.caption }}</h1>
          <div>
            {{ game.player().fieldDate.message }}
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
              v-model="game.activePlayer"
              color="primary"
              dark
              fixed-tabs
            >
              <v-tab
                v-for="(player, id) in players"
                :key="'tab-' + id"
                ripple
              >
                <v-avatar size="24px">
                  <img :src="player.avatar" :alt="player.name">
                </v-avatar>
                <v-badge v-if="player == game.player()" overlap color="red">
                  <span slot="badge"><v-icon>check</v-icon></span>
                  {{ player.name }}
                </v-badge>
                <span v-else>{{ player.name }}</span>
              </v-tab>
              <v-tabs-items v-model="game.activePlayer">
                <v-tab-item
                  v-for="(player, id) in players"
                  :key="'tab-panel-' + id"
                  :id="player.id"
                >
                  <v-card flat>
                      <v-card-text>
                        <v-layout row wrap>
                          <v-flex md12>
                            <h1>{{ player.name }}</h1>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md6>
                            <v-card>

                            <v-layout row wrap>
                              <v-flex md3>
                                Игрок:
                              </v-flex>
                              <v-flex md3>
                                <v-text-field name="player-name" single-line readonly label="Name" :value="player.name"></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex md3>
                                Наличные:
                              </v-flex>
                              <v-flex md3>
                                <v-text-field name="player-money" single-line readonly label="Money" :value="player.money.cash"></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex md3>
                                В банке:
                              </v-flex>
                              <v-flex md3>
                                <v-text-field name="player-account" single-line readonly label="Account" :value="player.money.account"></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex md3>
                                День:
                              </v-flex>
                              <v-flex md3>
                                <v-text-field name="player-day" single-line readonly label="Day" :value="player.day"></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex md3>
                                Бросок:
                              </v-flex>
                              <v-flex md3>
                                <v-icon large v-if="(player.dice.score > 0) && (player.dice.score < 7)">mdi-dice-{{ player.dice.score }}</v-icon>
                                <v-icon large v-else>mdi-dice-multiple</v-icon>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex md3>
                                Банк:
                              </v-flex>
                              <v-flex md3>
                                <v-text-field name="player-bank" single-line readonly label="Bank" :value="player.total.bank"></v-text-field>
                              </v-flex>
                            </v-layout>
                            </v-card>
                          </v-flex>
                          <v-flex md6>
                            <v-card>
                                <v-card>
                                  <v-toolbar color="primary" dark>
                                    <v-toolbar-title>Письма</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-title>{{ player.mails }}</v-toolbar-title>
                                    <v-btn icon>
                                      <v-icon>search</v-icon>
                                    </v-btn>
                                  </v-toolbar>
                                  <v-list two-line>
                                    <v-subheader v-text="'Today'"></v-subheader>
                                    <template v-for="(mail, id) in player.mail">
                                      <v-list-tile avatar v-bind:key="'mail-1-' + id + '-' + mail.title" @click="alert(player.mail)">
                                        <v-list-tile-avatar>
                                          <img v-bind:src="mail.avatar">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                          <v-list-tile-title v-html="mail.title"></v-list-tile-title>
                                          <v-list-tile-sub-title v-html="mail.subtitle"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </template>
                                    <v-subheader v-text="'Today'"></v-subheader>
                                    <template v-for="(mail, id) in player.mail">
                                      <v-list-tile avatar v-bind:key="'mail-2-' + id + '-' + mail.title" @click="alert(player.mail)">
                                        <v-list-tile-avatar>
                                          <img v-bind:src="mail.avatar">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                          <v-list-tile-title v-html="mail.title"></v-list-tile-title>
                                          <v-list-tile-sub-title v-html="mail.subtitle"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </template>
                                  </v-list>
                                </v-card>
                                <br>
                                <v-card>
                                  <v-toolbar color="primary" dark>
                                    <v-toolbar-title>Товары</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-title>{{ player.items }}</v-toolbar-title>
                                    <v-btn icon>
                                      <v-icon>search</v-icon>
                                    </v-btn>
                                  </v-toolbar>
                                  <v-list two-line>
                                    <template v-for="(item, id) in player.item">
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
                                </v-card>

                            </v-card>
                          </v-flex>
                        </v-layout>
                            <v-layout row wrap>
                              <v-flex md6>
                                <v-card>
                                  <v-toolbar color="primary" dark>
                                    <v-toolbar-title>Письма</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-title>{{ player.mails }}</v-toolbar-title>
                                    <v-btn icon>
                                      <v-icon>search</v-icon>
                                    </v-btn>
                                  </v-toolbar>
                                  <v-list two-line>
                                    <v-subheader v-text="'Today'"></v-subheader>
                                    <template v-for="(mail, id) in player.mail">
                                      <v-list-tile avatar v-bind:key="'mail-3-' + id + '-' + mail.title" @click="alert(mail.avatar)">
                                        <v-list-tile-avatar>
                                          <img v-bind:src="mail.avatar">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                          <v-list-tile-title v-html="mail.title"></v-list-tile-title>
                                          <v-list-tile-sub-title v-html="mail.subtitle"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </template>
                                    <v-subheader v-text="'Today'"></v-subheader>
                                    <template v-for="(mail, id) in player.mail">
                                      <v-list-tile avatar v-bind:key="'mail-4-' + id + '-' + mail.title" @click="alert(mail.avatar)">
                                        <v-list-tile-avatar>
                                          <img v-bind:src="mail.avatar">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                          <v-list-tile-title v-html="mail.title"></v-list-tile-title>
                                          <v-list-tile-sub-title v-html="mail.subtitle"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </template>
                                  </v-list>
                                </v-card>
                              </v-flex>
                              <v-flex md6>
                                <v-card>
                                  <v-toolbar color="primary" dark>
                                    <v-toolbar-title>Товары</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-title>{{ player.items }}</v-toolbar-title>
                                    <v-btn icon>
                                      <v-icon>search</v-icon>
                                    </v-btn>
                                  </v-toolbar>
                                  <v-list two-line>
                                    <template v-for="(item, id) in player.item">
                                      <v-list-tile avatar v-bind:key="'item-2-' + id + '-' + item.title" @click="alert(item.avatar)">
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
    nextPlayer: function () {
      if (!this.game.player()) {
        return false
      }
      return this.game.player().active
    }
  },
  data: function () {
    return {
      game: this.$store.state.game.game,
      fieldDate: 0,
      fieldName: 0,
      count: 3,
      players: this.$store.state.game.players,
      activePlayer: this.$store.state.game.activePlayer,
      motd: false
    }
  },
  methods: {
    updateForm: function () {
      if (!this.game.player()) { return }
      this.fieldDate = this.game.player().fieldDate.id
      this.fieldName = this.game.player().fieldDate.caption

      // this.activePlayer = '' + tabIndex
      // this.player.bills = this.players[tabIndex].total.bills

      // fmField.cdField.Day := Player.Day;
    },
    useDay: function () {
      if (!this.game.player()) { return }
      this.game.player().fieldDate.useDay()
      this.updateForm()
    },
    turnClick: function () {
      this.$store.dispatch('nextTurn')
      alert(this.game.turnId())
      this.player = this.game.player()
      // this.activePlayer = '' + this.game.playerId
      this.useDay()
    },
    fieldClick: function () {
      alert('Field click')
      // fmField.Show;
    },
    beginTurn: function () {
      this.game.player().turn()
      this.motd = true
    }
  },
  mounted: function () {
    if (!this.$store.state.game.players.length) this.$router.push('/set-players')
  }
}
</script>
