<template>
  <v-card>
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
      <v-btn color="primary" flat @click.stop="closeBox">Ok</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'message-box',
  props: [
    'message'
  ],
  methods: {
    closeBox () {
      this.$emit('close')
    }
  }
}
</script>
