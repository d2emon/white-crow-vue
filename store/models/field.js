function useDay (player) {
  alert('Use day')
  // if DateType = dtPost     then Day := TDayPost.Create()     else
  // if DateType = dtBusiness then Day := TDayBusiness.Create() else
  // if DateType = dtClient   then Day := TDayClient.Create()   else
  // if DateType = dtAuction  then Day := TDayAuction.Create()  else
  // if DateType = dtElection then Day := TDayElection.Create() else
  // if DateType = dtEnd      then Day := TDayEnd.Create()      else
  // Day := TDay.Create();

  // Day.UseDay;
}

const dtFree = 0
const dtPost = 1
const dtBusiness = 2
const dtClient = 3
const dtAuction = 4
const dtElection = 5
const dtTirage = 6
const dtSeason = 7
const dtEnd = 8

function createPostDay (date) {
  return {
    date: date,
    dateType: dtPost,
    caption: 'Почта',
    message: 'У вас новое сообщение',
    cost: 0,
    useDay: function (player) {
      // fmPost.ShowPost(fmPlay.Player.Messages.CurrentMessage);

      // M := fmPlay.Player.Messages.CurrentMessage;
      /*
       * PostText := M.From + #13 + M.Text + #13 + IntToStr(M.Cost)
       */

      var ticket = -1
      for (var i = 0; i <= 2; i++) {
        if (player.tickets[i].active) {
          ticket = i
        }
      }

      if (ticket >= 0) {
        /*
        if (MessageDlg('Pay?', mtInformation, [mbYes, mbNo], 0) = mrYes) {
          fmPlay.Player.PayTicket(Ticket)
        }
        */

        /*
         * if MessageDlg(PostText, mtInformation, [mbYes, mbNo], 0) = mrYes then
         *   fmPlay.Player.PayTicket(Ticket);
         */
      } else {
        alert('No post')
        /*
         * MessageDlg(PostText, mtInformation, [mbOk], 0);
         */
      }

      player.doPost()
    }
  }
}

function createBusinessDay (date) {
  return {
    date: date,
    dateType: dtBusiness,
    caption: 'Бизнес',
    message: 'У вас новое предложение',
    cost: 0,
    useDay: function (player) {
      player.items += 1
    }
  }
}

function createClientDay (date) {
  return {
    date: date,
    dateType: dtClient,
    caption: 'Клиент',
    message: 'У вас новое предложение',
    cost: 0,
    useDay: function (player) {
    }
  }
}

function createFreeDay (date) {
  return {
    date: date,
    dateType: dtFree,
    caption: 'Выходной',
    message: '',
    cost: 0,
    useDay: function (player) {}
  }
}

function createPayableDay (date, caption, cost, message) {
  return {
    date: date,
    dateType: dtFree,
    caption: caption,
    message: message,
    cost: cost,
    useDay: function (player) {}
  }
}

/*
function useDayBase (player) {
  // if Player.FieldDate.DateType = dtTirage then DoTirage;
  // if Player.FieldDate.DateType = dtSeason then DoSeason;
  // ShowMessage('This day');
}
*/

function useDayAuction (player) {
  alert('Auction')
}

function useDayElection (player) {
  alert('Election')
}

var field = {
  fieldData: [
    {
      date: 0,
      dateType: dtFree,
      caption: 'Старт',
      cost: 0,
      useDay: function (player) {}
    },
    createPostDay(1),
    createPayableDay(
      2,
      'Давно забытая заначка',
      500,
      'Вы нашли давно забытую заначку - 500 монет'
    ),
    createPostDay(3),
    createBusinessDay(4),
    createPostDay(5),
    createPayableDay(
      6,
      'Капкан для охотника',
      -50,
      'Скиньтесь на капкан для охотника - 50 монет'
    ),

    createFreeDay(7),
    createPayableDay(
      8,
      'Премия-Сюрприз',
      100,
      'Вам неожиданно выдали премию - 100 монет'
    ),
    createClientDay(9),
    {
      date: 10,
      dateType: dtAuction,
      caption: 'Аукцион',
      message: 'День аукциона',
      cost: 0,
      useDay: useDayAuction
    },
    createPostDay(11),
    createBusinessDay(12),
    createPayableDay(
      13,
      'Танцевальная студия',
      -40,
      'Посетите танцеваьную студию - 40 монет'
    ),

    createFreeDay(14),
    createBusinessDay(15),
    createPostDay(16),
    createClientDay(17),
    createPayableDay(
      18,
      'Ремонт норы',
      -50,
      'Оплатите ремонт норы - 50 монет'
    ),
    createPostDay(19),
    createClientDay(20),

    createFreeDay(21),
    createPostDay(22),
    createPayableDay(
      23,
      'Магазин "Мяу-Мяу" для кошек',
      -75,
      'Вы потратили в магазине 75 монет'
    ),
    createPostDay(24),
    {
      date: 25,
      dateType: dtElection,
      caption: 'День Выборов',
      message: 'Выборы Царя Зверей',
      cost: 0,
      useDay: useDayElection
    },
    createBusinessDay(26),
    {
      date: 27,
      dateType: dtSeason,
      caption: 'Сезонная линька',
      message: 'У всех сезонная линька',
      cost: 0,
      useDay: function (player) {
        //
      }
    },

    createFreeDay(28),
    {
      date: 29,
      dateType: dtTirage,
      caption: 'День Тиража',
      message: 'Тираж облигации лесного займа',
      cost: 0,
      useDay: function (player) {
        //
      }
    },
    createClientDay(30),
    {
      date: 31,
      dateType: dtEnd,
      caption: 'День Белой Вороны',
      message: 'Время подводить итоги',
      cost: 325,
      useDay: function (player) {
        // fmBalance.ShowBalance(fmPlay.Player)
        player.nextMonth()
      }
    }
  ],
  locations: [],
  create: function () {
    // AssignFile(DataFile, 'data/field.dat');
    // Reset(DataFile);
    // while not EOF(DataFile) do
    for (var d = 0; d < this.fieldData.length; d++) {
      var fd = this.fieldData[d]
      this.locations.push(fd)
    }
  }
}

field.create()

function getDate (date) {
  var fd = field.locations[date]
  if (!fd.useDay) {
    fd.useDay = useDay
  }
  return fd
}

module.exports = {
  field: field,
  getDate: getDate
}
