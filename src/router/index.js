import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/forks/search',
    name: 'Forks',
    query: {page: 1, repository: ''},
    component: () => import('../views/Forks.vue'),
    beforeEnter(to, from, next) {
      if (to.query.repository) {
        next()
      } else {
        router.push({name: 'Home'})
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
