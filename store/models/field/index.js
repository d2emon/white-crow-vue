const { FreeDay } = require('./day')
const {
  StartDay,
  StashDay,
  TrapDay,
  BonusDay,
  DanceDay,
  FixDay,
  ShopDay
} = require('./other')
const PostDay = require('./post')
const BusinessDay = require('./business')
const ClientDay = require('./client')
const AuctionDay = require('./auction')
const ElectionDay = require('./election')
const SeasonDay = require('./season')
const TirageDay = require('./tirage')
const EndDay = require('./endMonth')

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

/*
function useDayBase (player) {
  // if Player.FieldDate.DateType = dtTirage then DoTirage;
  // if Player.FieldDate.DateType = dtSeason then DoSeason;
  // ShowMessage('This day');
}
*/

var field = {
  fieldData: [
    StartDay(0),
    PostDay(1),
    StashDay(2),
    PostDay(3),
    BusinessDay(4),
    PostDay(5),
    TrapDay(6),

    FreeDay(7),
    BonusDay(8),
    ClientDay(9),
    AuctionDay(10),
    PostDay(11),
    BusinessDay(12),
    DanceDay(13),

    FreeDay(14),
    BusinessDay(15),
    PostDay(16),
    ClientDay(17),
    FixDay(18),
    PostDay(19),
    ClientDay(20),

    FreeDay(21),
    PostDay(22),
    ShopDay(23),
    PostDay(24),
    ElectionDay(25),
    BusinessDay(26),
    SeasonDay(27),

    FreeDay(28),
    TirageDay(29),
    ClientDay(30),
    EndDay(31)
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
  },
  getDate: function (date) {
    if (!this.locations.length) { return null }

    var fd = this.locations[date]
    if (!fd.useDay) {
      fd.useDay = useDay
    }
    return fd
  }
}

field.create()

module.exports = field
