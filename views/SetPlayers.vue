<template>
  <v-app>
    <v-container fluid fill-height>
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

      <v-flex xs12>
      <v-card xs12>
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
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'set-players',
  computed: {
    players: function () { return this.$store.getters.players }
  },
  data: function () {
    return {
      count: 3,
      dialog: false
    }
  },
  methods: {
    askPlayers: function (count) {
      this.count = count
      this.addPlayers(count)
    },
    addPlayers: function (count) {
      this.$store.commit('addPlayers', this.count)
    },
    setPlayerNames: function (e) {
      this.$store.commit('start')
      this.$router.push('/new-turn')
    }
  },
  mounted: function () {
    this.$store.commit('create')
    this.askPlayers(3)
  }
}
</script>
