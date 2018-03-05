const dtTirage = 6

module.exports = function (date) {
  return {
    date: date,
    dateType: dtTirage,
    caption: 'День Тиража',
    message: 'Тираж облигации лесного займа',
    cost: 0,
    useDay: function (player) {}
  }
}
