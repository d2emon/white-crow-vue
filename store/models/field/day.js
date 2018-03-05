const dtFree = 0

module.exports = {
  dtFree: dtFree,
  FreeDay: function (date) {
    return {
      date: date,
      dateType: dtFree,
      caption: 'Выходной',
      message: '',
      cost: 0,
      useDay: function (player) {}
    }
  },
  PayableDay: function (date, caption, cost, message) {
    return {
      date: date,
      dateType: dtFree,
      caption: caption,
      message: message,
      cost: cost,
      useDay: function (player) {}
    }
  }
}
