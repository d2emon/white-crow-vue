<template>
  <v-app>
    <v-container fluid fill-height>
      <v-flex xs12>
        <v-card class="text-xs-center" v-if="player">
          <v-card-title class="grey py-4 title">
            Новый ход
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-card class="ma-5 fill-height">
              <v-card-text>
                <h1 class="display-4">{{ player.name }}</h1>
              </v-card-text>
              <v-card-actions>
                <div style="width: 100%;">
                  <v-btn large color="primary" @click="beginTurn">Ok</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'set-players',
  computed: {
    players: function () { return this.$store.getters.players },
    player: function () { return this.$store.getters.player }
  },
  data: function () {
    return {
    }
  },
  methods: {
    beginTurn: function () {
      this.$store.commit('playerTurn')
      this.$router.push('/play')
    }
  },
  mounted: function () {
    if (!this.players) this.$router.push('/set-players')
  }
}
</script>

