module.exports = function () {
  return {
    cash: 325,
    account: 0,
    obligations: 0,
    bills: 0,
    pay: function (value) {
      if (value <= this.cash) {
        this.cash -= value
      }
      this.account -= (value - this.cash)
      this.cash = 0
    }
  }
}
