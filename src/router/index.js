import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Index/index'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () =>import('../views/Home/index')
      },
      {
        path: '/order',
        name: 'Order',
        component: () =>import('../views/Order/index')
      },
      {
        path: '/me',
        name: 'Me',
        component: () =>import('../views/Me/index')
      },
      {
        path: '/address',
        name: 'Address',
        component: () =>import('../views/Address/index')
      },
      {
        path: '/city',
        name: 'City',
        component: () =>import('../views/City/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>import('../views/Login/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
