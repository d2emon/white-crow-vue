var messages = require('../../data/post.json')
var gravatar = require('gravatar')
var codes = require('../codes')

module.exports = function (date) {
  return {
    icon: 'mdi-message',
    date: date,
    caption: 'Почта',
    message: 'У вас новое сообщение',
    cost: 0,
    messages: messages,
    useDay: function (player) {
      let id = Math.floor(Math.random() * this.messages.length)
      let message = this.messages[id]

      // fmPost.ShowPost(fmPlay.Player.Messages.CurrentMessage);
      // M := fmPlay.Player.Messages.CurrentMessage;

      let code = codes.POST_MESSAGE
      if (message.play) code = codes.POST_GAME

      let from = {
        title: message.from,
        avatar: ''
      }
      from.avatar = gravatar.url(from.title, { d: 'retro' }) // 'https://www.gravatar.com/avatar/' + name + '?d=retro',
      player.addMessage(
        code,
        {
          from: from,
          data: message
        }
      )
    }
  }
}
