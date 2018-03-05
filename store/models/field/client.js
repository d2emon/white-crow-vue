const dtClient = 3

module.exports = function (date) {
  return {
    date: date,
    dateType: dtClient,
    caption: 'Клиент',
    message: 'У вас новое предложение',
    cost: 0,
    useDay: function (player) {
    }
  }
}
