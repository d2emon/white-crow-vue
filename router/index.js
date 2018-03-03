import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-page',
      component: require('@/components/StartPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/play',
      name: 'play',
      component: require('@/components/Play').default
    }
  ]
})
