import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: () => import('@/views/layouts/Authentication.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (!auth.retrieve('user')) {
    //     next()
    //   } else {
    //     next('/')
    //   }
    // },
    // children: [
    //   {
    //     path: 'register',
    //     name: 'register',
    //     component: () => import('@/components/auth/Register.vue'),
    //   },

    //   {
    //     path: 'login',
    //     name: 'login',
    //     component: () => import('@/components/auth/Login.vue'),
    //   },    
    // ]
  },

  // {
  //   path: '',
  //   component: () => import('@/views/layouts/Application.vue'),
  //   beforeEnter: (to, from, next) => {
  //     if (!auth.retrieve('user')) {
  //       next('/auth/login')
  //     }
  //     else {
  //       next()
  //     }
  //   },
  //   children: [
  //     {
  //       path: '/',
  //       name: 'dashboard',
  //       component: () => import('@/components/app/dashboard/Index.vue')
  //     },

  //     {
  //       path: '/listings',
  //       name: 'listings.index',
  //       component: () => import('@/components/app/listings/Index.vue')
  //     },

  // //     // {
  // //     //   path: '/profiles',
  // //     //   name: 'knowledge-scales.index',
  // //     //   component: () => import('@/components/app/knowledge_scales/Index.vue')
  // //     // },
  //   ]

  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
