const state = {
  visible: true,
  minified: false,
  menu: [
    { spacer: true },

    { icon: 'contacts', text: 'Игроки' },
    { icon: 'history', text: 'Друзья' },
    { icon: 'content_copy', text: 'Дубликаты' },
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Метки',
      model: true,
      children: [
        { icon: 'add', text: 'Добавить метку' }
      ]
    },
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Еще',
      model: false,
      children: [
        { text: 'Импорт' },
        { text: 'Экспорт' },
        { text: 'Печать' },
        { text: 'Отменить изменения' },
        { text: 'Прочие игроки' }
      ]
    },
    { icon: 'settings', text: 'Настройки' },
    { icon: 'chat_bubble', text: 'Отправить отзыв' },
    { icon: 'help', text: 'Помощь' },
    { icon: 'phonelink', text: 'Скачать' },
    { icon: 'keyboard', text: 'Перейти к старой версии' }
  ]
}

const mutations = {
  switchVisible: (state) => {
    state.showSidebar = !state.showSidebar
  },
  setVisibility: (state, show) => {
    state.showSidebar = show
  },
  switchMini: (state) => {
    state.minified = !state.minified
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
