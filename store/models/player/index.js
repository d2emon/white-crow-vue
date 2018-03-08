var gravatar = require('gravatar')
var Field = require('../field')

function createPlayer (id, name) {
  return {
    id: id,
    name: name,
    avatar: gravatar.url(name, { d: 'retro' }), // 'https://www.gravatar.com/avatar/' + name + '?d=retro',
    active: false,
    // Money:     TMoney;
    money: {
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
    },
    day: 0,
    // FieldDate: TFieldDate;
    fieldDate: {
      id: 0,
      caption: '0',
      icon: '',
      useDay: function (player) {
        alert('Use day')
      },
      cost: 0
    },
    // Dice:      TDice;
    dice: {
      score: 0,
      roll: function () {
        this.score = Math.floor(Math.random() * 6) + 1
        return this.score
      }
    },
    // Total:     TDayTotal;
    total: {
      day: 0,
      cost: 0,
      bills: 0,
      bank: 0,
      month: 0
    },

    // Messages:  TMessageList;
    // mail: this.messages

    newMails: [],
    offers: [],

    mails: [],
    items: [],
    play: null,

    tickets: [
      {
        active: false,
        cost: 0,
        payed: false
      },
      {
        active: false,
        cost: 0,
        payed: false
      },
      {
        active: false,
        cost: 0,
        payed: false
      }
    ],
    countMails: function () {
      return this.mails.length + this.newMails.length
    },

    addBill: function (msg) {
      let payed = false
      if (this.tickets[msg.fromId]) { payed = this.tickets[msg.fromId].payed }
      if (payed) { return }

      // if (!msg.cost) { return }
      // let cost = parseInt(msg.cost)
      if (msg.cost) {
        if (msg.cost < 0) {
          this.money.bills += msg.cost
          // this.total.bills += post.cost
        } else {
          this.money.cash += msg.cost
        }
      }

      if (msg.obligation) {
        this.money.obligations += msg.obligation
        // this.total.bills += mail.obligation
      }

      if (msg.fromId) {
        this.tickets[msg.fromId].cost = msg.cost
        this.tickets[msg.fromId].active = true
      }
    },
    addMail: function (mail) {
      if (!mail) { return }

      console.log(mail)

      // this.mails += 1
      // this.post.nextCard
      // this.mail.addFromCard(this.post.currentMessage)

      let cost = 0
      if (mail.cost) { cost += mail.cost }
      if (mail.obligation) { cost += mail.obligation }

      this.newMails.push({
        day: this.day,
        from: mail.from,
        avatar: gravatar.url(mail.from, { d: 'retro' }), // 'https://www.gravatar.com/avatar/' + name + '?d=retro',
        text: mail.text,
	cost: cost
      })

      this.addBill(mail)

      if (mail.play) {
	this.play = mail
        // this.tickets[mail.fromId].cost = mail.cost
        // this.tickets[mail.fromId].active = true
      }
      console.log(this.newMails)
    },
    offerItem: function (item) {
      this.offers.push({
        title: item.title,
        cost: item.cost,
        price: item.price,
        comission: item.comission,
        avatar: gravatar.url(item.title, { d: 'retro' }) // 'https://www.gravatar.com/avatar/' + name + '?d=retro',
      })
    },
    addItem: function (item) {
      this.money.pay(item.cost)
      this.items.push(item)
      console.log(item)
      console.log(this.items)
    },
    showSplash: function () {
      this.active = true
    },
    turn: function () {
      this.mails = this.mails.concat(this.newMails)
      this.newMails = []
      this.play = null
      this.offers = []

      this.active = false
      for (var i = 1; i <= 2; i++) {
        this.tickets[i].active = false
      }

      this.total.day = this.money.cash

      if (this.day <= 0) { this.day = 31 }
      if (this.day >= 31) { this.newMonth() }
      this.day += this.dice.roll()
      if (this.day >= 31) { this.day = 31 }

      this.fieldDate = Field.getDate(this.day)

      this.total.cost = this.fieldDate.cost
      this.money.cash += this.total.cost

      this.fieldDate.useDay(this)
    },
    newMonth: function () {
      this.day = 0
      this.total.bills = 0
      this.total.bank = 0
      this.total.month = this.money.cash
    },
    nextMonth: function () {
      if (this.money.account > 0) {
        this.total.bank = this.money.account / 10
      }
      if (this.money.account < -100) {
        this.total.bank = this.money.account / 5
      }

      this.money.cash += this.total.bills
      this.money.cash += this.total.bank
    },
    payTicket: function (id) {
      this.money.cash += this.tickets[id].cost
      this.tickets[id].payed = true
    }
  }
  // Self.NewMonth
}

module.exports = {
  createPlayer: createPlayer
}
