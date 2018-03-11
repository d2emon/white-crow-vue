var gravatar = require('gravatar')
var Field = require('../field')
var Account = require('./account')

function createPlayer (id, name) {
  return {
    id: id,
    name: name,
    avatar: gravatar.url(name, { d: 'retro' }), // 'https://www.gravatar.com/avatar/' + name + '?d=retro',
    money: Account(),
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

    messages: [],

    mails: [],
    newMails: [],

    offers: [],

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

    addMessage: function (from, code, text, data) {
      this.messages.push({
        active: false,
        day: this.day,
        from: from,
        code: code,
        text: text,
        data: data
      })
    },
    doMessage: function (msg) {
      if (!msg) return
      msg.active = true
      if (msg.code === -1001){
        console.log('MAIL')
	this.addMail(msg)
        console.log(msg)
        return
      }
      if (msg.code === -1002) {
	console.log('GAME')
	// this.addMail(msg)
        console.log(msg)

        this.play = msg.data
        // this.tickets[mail.fromId].cost = mail.cost
        // this.tickets[mail.fromId].active = true
      }
      console.log(msg)
      return
    },
    processMessages: function () {
      this.messages.forEach(item => { this.doMessage(item) })
    },

    addMail: function (mail) {
      if (!mail) { return }
      if (!mail.data) { return }

      // this.mails += 1
      // this.post.nextCard
      // this.mail.addFromCard(this.post.currentMessage)

      let ticket = -1
      for (var i = 0; i <= 2; i++) {
        if (this.tickets[i].active) {
          ticket = i
        }
      }
      /**
       * if (MessageDlg('Pay?', mtInformation, [mbYes, mbNo], 0) = mrYes) {
       *   fmPlay.Player.PayTicket(Ticket)
       * }
       */

      /**
       * if MessageDlg(PostText, mtInformation, [mbYes, mbNo], 0) = mrYes then
       *   fmPlay.Player.PayTicket(Ticket);
       */

      // let cost = 0
      // if (mail.cost) { cost += mail.cost }
      // if (mail.obligation) { cost += mail.obligation }

      this.newMails.push({
        day: mail.day,
        from: mail.from.title,
        avatar: mail.from.avatar,
        text: mail.text,
        cost: mail.data.cost || mail.data.obligation
      })

      this.addBill(mail.data)
      console.log(this.newMails)
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
    offerItem: function (item) {
      console.log(item)
      let image = ''
      if (item.image) {
        image = '/static/images/items/' + item.image
      } else {
        image = gravatar.url(item.title, { d: 'retro' })
      }
      this.offers.push({
        title: item.title,
        cost: item.cost,
        price: item.price,
        comission: item.comission,
        avatar: image
      })
    },
    addItem: function (item) {
      this.money.pay(item.cost)
      this.items.push(item)
      console.log(item)
      console.log(this.items)
    },
    turn: function () {
      this.mails = this.mails.concat(this.newMails)
      this.newMails = []
      this.play = null
      this.offers = []

      for (var i = 1; i <= 2; i++) {
        this.tickets[i].active = false
      }

      this.total.day = this.money.cash

      if (this.day <= 0) { this.day = 31 }
      if (this.day >= 31) { this.newMonth() }
      this.day += this.dice.roll()
      if (this.day >= 31) { this.day = 31 }

      this.fieldDate = Field.getDate(this.day)

      if (this.fieldDate.cost < 0) {
        this.money.pay(-this.fieldDate.cost)
      } else {
        this.total.cost = this.fieldDate.cost
        this.money.cash += this.total.cost
      }

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
