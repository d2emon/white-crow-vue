<template>
    <v-footer app inset fixed>
      <v-layout row wrap>
        <v-flex md2>
          Игрок №{{ turns.playerId + 1 }}: <span v-if="player">{{ player.name }}</span>
        </v-flex>
        <v-flex md2>
          Тур {{ turns.turn + 1 }} ({{ turns.round + 1 }})
        </v-flex>
        <v-flex md2 v-if="player">
          День {{ player.day }}
        </v-flex>
        <v-flex md6>
          <span v-if="player && player.date">{{ player.date.caption }}</span>
          <span v-else>День</span>
        </v-flex>
      </v-layout>
    </v-footer>
</template>

<script>
export default {
  name: 'app-footer',
  computed: {
    turns: function () { return this.$store.state.game.Turns },
    player: function () { return this.$store.getters.player }
  }
}
</script>
