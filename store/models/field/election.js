const dtElection = 5

module.exports = function (date) {
  return {
    date: date,
    dateType: dtElection,
    caption: 'День Выборов',
    message: 'Выборы Царя Зверей',
    cost: 0,
    useDay: function (player) {
      alert('Election')
    }
  }
}
