var items = require('../../data/business.json')
var codes = require('../codes')

module.exports = function (date) {
  return {
    date: date,
    caption: 'Бизнес',
    message: 'У вас новое предложение',
    cost: 0,
    items: items,
    useDay: function (player) {
      let id = Math.floor(Math.random() * this.items.length)
      let item = this.items[id]

      player.addMessage(
        codes.BUSINESS,
        { data: item }
      )
    }
  }
}
