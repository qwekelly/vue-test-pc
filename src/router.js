import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('./views/home/index.vue')
    },
    {
      path: '/home',
      name: 'homepage',
      component: () => import('./views/home/index.vue')
    },
    {
      path: '/three',
      name: 'about',
      component: () => import('./views/three/index.vue')
    }
  ]
})
