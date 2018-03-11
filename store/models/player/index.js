const gravatar = require('gravatar')
const Field = require('../field')
const Account = require('./account')
const codes = require('../codes')

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

    messages: [],

    mails: [],
    newMails: [],

    offers: [],

    items: [],
    play: null,

    countMails: function () {
      return this.mails.length + this.newMails.length
    },

    addMessage: function (code, data) {
      this.messages.push({
        active: false,
        day: this.day,
        from: data.from,
        code: code,
        data: data.data
      })
    },
    doMessage: function (msg) {
      if (!msg) return
      if (msg.active) return
      msg.active = true
      console.log(msg)
      if (msg.code === codes.POST_MESSAGE) {
        console.log('MAIL')
        this.addMail(msg)
        return
      }
      if (msg.code === codes.POST_GAME) {
        console.log('GAME')
        // this.addMail(msg)

        this.play = msg.data
        this.play.avatar = msg.from.avatar
        // this.tickets[mail.fromId].cost = mail.cost
        // this.tickets[mail.fromId].active = true
        return
      }
      if (msg.code === codes.BUSINESS) {
        console.log('BUSINESS')
        this.offerItem(msg.data)
        return
      }
      console.log(msg)
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

      /*
      let ticket = -1
      for (var i = 0; i <= 2; i++) {
        if (this.tickets[i].active) {
          ticket = i
        }
      }
      */
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
        text: mail.data.text,
        cost: mail.data.cost || mail.data.obligation
      })

      this.addBill(mail.data)
      console.log(this.newMails)
    },
    addBill: function (msg) {
      let payed = false
      // if (this.tickets[msg.fromId]) { payed = this.tickets[msg.fromId].payed }
      if (payed) { return }

      // if (!msg.cost) { return }
      // let cost = parseInt(msg.cost)
      if (msg.cost) {
        if (msg.cost < 0) {
          this.money.bills += msg.cost
          // this.total.bills += post.cost
        } else {
          this.money.modify(msg.cost)
        }
      }

      if (msg.obligation) {
        this.money.obligations += msg.obligation
        // this.total.bills += mail.obligation
      }

      if (msg.fromId) {
        // this.tickets[msg.fromId].cost = msg.cost
        // this.tickets[msg.fromId].active = true
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
      this.money.modify(-item.cost)
      this.items.push(item)
      console.log(item)
      console.log(this.items)
    },
    turn: function () {
      this.mails = this.mails.concat(this.newMails)
      this.newMails = []
      this.play = null
      this.offers = []
      console.log(this.newMails)

      // for (var i = 1; i <= 2; i++) {
      //   this.tickets[i].active = false
      // }

      if (this.day <= 0) { this.day = 31 }
      if (this.day >= 31) { this.newMonth() }
      this.day += this.dice.roll()
      if (this.day >= 31) { this.day = 31 }

      this.date = Field.getDate(this.day)
      this.addMessage(codes.DAY, { data: this.date })

      this.money.modify(this.date.cost)

      this.date.useDay(this)
    },
    newMonth: function () {
      this.day = 0
      // this.total.bills = 0
      // this.total.bank = 0
      // this.total.month = this.money.cash
    },
    nextMonth: function () {
      if (this.money.account > 0) {
        // this.total.bank = this.money.account / 10
      }
      if (this.money.account < -100) {
        // this.total.bank = this.money.account / 5
      }

      // this.money.modify(this.total.bills)
      // this.money.modify(this.total.bank)
    },
    payTicket: function (id) {
      // this.money.modify(this.tickets[id].cost)
      // this.tickets[id].payed = true
    }
  }
  // Self.NewMonth
}

module.exports = {
  createPlayer: createPlayer
}
