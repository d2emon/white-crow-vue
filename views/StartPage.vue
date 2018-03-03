<template>
  <v-app>
    <v-container fluid fill-height @click="startGame">
      <v-jumbotron class="text-xs-center" color="grey lighten-2">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h1 class="display-4 align-center">White Crow</h1>
              <span class="subheading">Business game</span>
              <v-divider class="my-3"></v-divider>
              <div class="title mb-3">by D2emon</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron> 
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'start-page',
  methods: {
    startGame (event) {
      event.stopPropagation()
      this.$router.push('/play')
    }
  }
}
</script>
