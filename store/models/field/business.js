var items = require('../../data/business.json')

const dtBusiness = 2

module.exports = function (date) {
  return {
    date: date,
    dateType: dtBusiness,
    caption: 'Бизнес',
    message: 'У вас новое предложение',
    cost: 0,
    items: items,
    useDay: function (player) {
      let id = Math.floor(Math.random() * this.items.length)
      let item = this.items[id]

      player.offerItem(item)
    }
  }
}
