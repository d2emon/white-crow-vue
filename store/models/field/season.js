const dtSeason = 7

module.exports = function (date) {
  return {
    date: date,
    dateType: dtSeason,
    caption: 'Сезонная линька',
    message: 'У всех сезонная линька',
    cost: 0,
    useDay: function (player) {
      alert('Election')
      // useDay: function (player) {
    }
  }
}
