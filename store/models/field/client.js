var codes = require('../codes')

module.exports = function (date) {
  return {
    icon: 'mdi-account',
    date: date,
    caption: 'Клиент',
    message: 'У вас новое предложение',
    cost: 0,
    useDay: function (player) {
      player.addMessage(
        codes.CLIENT,
        {}
      )
    }
  }
}
