<template>
    <v-footer app fixed>
      <v-layout row wrap>
        <v-flex md2>
          Игрок №{{ turns.turn + 1 }}: <span v-if="player">{{ player.name }}</span>
        </v-flex>
        <v-flex md2>
          Тур {{ turns.round }}
        </v-flex>
        <v-flex md2 v-if="player">
          День {{ player.day }}
        </v-flex>
        <v-flex md6>
          <span v-if="player && player.fieldDate">{{ player.fieldDate.caption }}</span>
          <span v-else>День</span>
        </v-flex>
      </v-layout>
    </v-footer>
</template>

<script>
export default {
  name: 'app-footer',
  computed: {
    game: function () { return this.$store.state.game },
    turns: function () { return this.$store.state.game.Turns },
    player: function () { return this.$store.getters.player }
  },
  data: () => ({
  })
}
</script>
