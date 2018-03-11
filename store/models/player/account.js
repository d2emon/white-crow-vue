module.exports = function () {
  return {
    cash: 325,
    account: 0,
    obligations: 0,
    bills: 0,
    modify: function (value) {
      let newValue = this.cash + value
      if (newValue > 0) {
        this.cash = newValue
        return
      }
      this.account = newValue
      this.cash = 0
    }
  }
}
