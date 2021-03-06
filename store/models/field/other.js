const { dtFree, PayableDay } = require('./day')

module.exports = {
  StartDay: function (date) {
    return {
      icon: 'mdi-flag-checkered',
      date: date,
      dateType: dtFree,
      caption: 'Старт',
      message: '',
      cost: 0,
      useDay: function (player) {}
    }
  },
  StashDay: (date) => {
    return PayableDay(
      date,
      'Давно забытая заначка',
      500,
      'Вы нашли давно забытую заначку - 500 монет',
      'mdi-wallet'
    )
  },
  TrapDay: (date) => {
    return PayableDay(
      date,
      'Капкан для охотника',
      -50,
      'Скиньтесь на капкан для охотника - 50 монет',
      ''
    )
  },
  BonusDay: (date) => {
    return PayableDay(
      date,
      'Премия-Сюрприз',
      100,
      'Вам неожиданно выдали премию - 100 монет',
      'mdi-wallet'
    )
  },
  DanceDay: (date) => {
    return PayableDay(
      date,
      'Танцевальная студия',
      -40,
      'Посетите танцеваьную студию - 40 монет',
      'mdi-music'
    )
  },
  FixDay: (date) => {
    return PayableDay(
      date,
      'Ремонт норы',
      -50,
      'Оплатите ремонт норы - 50 монет',
      'mdi-home'
    )
  },
  ShopDay: (date) => {
    return PayableDay(
      date,
      'Магазин "Мяу-Мяу" для кошек',
      -75,
      'Вы потратили в магазине 75 монет',
      'mdi-shopping'
    )
  }
}
