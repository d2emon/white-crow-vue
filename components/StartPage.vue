<template>
  <v-layout justify-center align-center>
    <v-tooltip right>
      <v-btn icon large to="/play" target="_blank" slot="activator">
        <v-icon large>done</v-icon>
      </v-btn>
      <span>Старт</span>
    </v-tooltip>
  </v-layout>
</template>

<script>
export default {
  name: 'start-page'
}
</script>

<style>
</style>
