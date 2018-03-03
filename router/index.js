import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
// import Empty from '@/containers/Empty'

// Views
import Start from '@/views/StartPage'
import Play from '@/views/Play'

Vue.use(Router)

export default new Router({
  // mode: 'hash', // Demo is living in GitHub.io, so required!
  // linkActiveClass: 'open active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/play',
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
      path: '*',
      redirect: '/start'
    }
  ]
})
