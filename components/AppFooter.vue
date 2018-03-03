<template>
    <v-footer app fixed>
      <v-layout row wrap>
        <v-flex md2>
          Игрок №{{ game.turnId() }}: {{ player.name }}
        </v-flex>
        <v-flex md2>
          Тур {{ game.round }}
        </v-flex>
        <v-flex md2 v-if="player">
          День {{ player.day }}
        </v-flex>
        <v-flex md6 v-if="player.fieldDate">
          {{ player.fieldDate.caption }}
        </v-flex>
      </v-layout>
    </v-footer>
</template>

<script>
var GameModule = require('@/store/game')
var game = GameModule.game

export default {
  name: 'app-footer',
  computed: {
    player: function () {
      if (!game.player()) {
        return {
          name: 'Player',
          avatar: 'https://vuetifyjs.com/static/doc-images/logo.svg',
          mails: 0
        }
      }

      return game.player()
    }
  },
  data: () => ({
    game: game
  })
}
</script>
