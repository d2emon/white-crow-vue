const dtEnd = 8

module.exports = function (date) {
  return {
    date: date,
    dateType: dtEnd,
    caption: 'День Белой Вороны',
    message: 'Время подводить итоги',
    cost: 325,
    useDay: function (player) {
      // fmBalance.ShowBalance(fmPlay.Player)
      player.nextMonth()
    }
  }
}
