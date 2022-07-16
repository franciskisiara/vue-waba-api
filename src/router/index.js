import Vue from 'vue'
import VueRouter from 'vue-router'

import { appRoutes } from './routes/app'
import { authRoutes } from './routes/auth'

const routes = [
  ...authRoutes(),
  ...appRoutes(),
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
