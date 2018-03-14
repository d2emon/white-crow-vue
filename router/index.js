import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
// import Empty from '@/containers/Empty'

// Views
import Start from '@/views/StartPage'
import SetPlayers from '@/views/SetPlayers'
import NewTurn from '@/views/NewTurn'
import Play from '@/views/Play'

Vue.use(Router)

export default new Router({
  // mode: 'hash', // Demo is living in GitHub.io, so required!
  // linkActiveClass: 'open active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/start',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'play',
          name: 'Play',
          component: Play
        }
      ]
    },
    {
      path: '/start',
      name: 'White Crow',
      component: Start
    },
    {
      path: '/set-players',
      name: 'SetPlayers',
      component: SetPlayers
    },
    {
      path: '/new-turn',
      name: 'NewTurn',
      component: NewTurn
    },
    {
      path: '*',
      redirect: '/start'
    }
  ]
})
