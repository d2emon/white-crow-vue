const dtBusiness = 2

module.exports = function (date) {
  return {
    date: date,
    dateType: dtBusiness,
    caption: 'Бизнес',
    message: 'У вас новое предложение',
    cost: 0,
    useDay: function (player) {
      player.items += 1
    }
  }
}
