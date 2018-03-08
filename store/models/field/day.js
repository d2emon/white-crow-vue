const dtFree = 0

module.exports = {
  dtFree: dtFree,
  FreeDay: function (date) {
    return {
      icon: 'mdi-emoticon-cool',
      date: date,
      dateType: dtFree,
      caption: 'Выходной',
      message: '',
      cost: 0,
      useDay: function (player) {}
    }
  },
  PayableDay: function (date, caption, cost, message, icon) {
    return {
      icon: icon,
      date: date,
      dateType: dtFree,
      caption: caption,
      message: message,
      cost: cost,
      useDay: function (player) {}
    }
  }
}
