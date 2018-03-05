const dtAuction = 4

module.exports = function (date) {
  return {
    date: date,
    dateType: dtAuction,
    caption: 'Аукцион',
    message: 'День аукциона',
    cost: 0,
    useDay: function (player) {
      alert('Auction')
    }
  }
}
