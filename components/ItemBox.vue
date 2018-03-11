<template>
  <v-card>
    <v-card-title>
      <h1>{{ item.title }}</h1>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex md4>
          <v-avatar :size="128">
            <img v-bind:src="item.avatar" :alt="item.title">
          </v-avatar>
        </v-flex>
        <v-flex md8>
          <v-list one-line>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Цена:</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>{{ item.cost }} монет</v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Стоимость:</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>{{ item.price }} монет</v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Комисионные:</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>{{ item.comission }} монет</v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex md12>
          {{ item.description }}
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <template v-if="!ask">
        <v-btn color="primary" flat @click.stop="closeBox">Ok</v-btn>
      </template>
      <template v-else>
        <v-btn color="success" flat @click.stop="accept">Да</v-btn>
        <v-spacer />
        <v-btn color="error" flat @click.stop="closeBox">Нет</v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'item-box',
  props: [
    'item',
    'ask'
  ],
  methods: {
    accept () {
      this.$emit('accept', this.item)
    },
    closeBox () {
      this.$emit('close')
    }
  }
}
</script>
