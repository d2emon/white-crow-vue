const dtPost = 1

module.exports = function (date) {
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
