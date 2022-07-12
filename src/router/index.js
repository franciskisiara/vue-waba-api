import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/libs/auth/Auth'

Vue.use(VueRouter)

const auth = new Auth()

const routes = [
  {
    path: '/auth',
    component: () => import('@/views/layouts/Authentication.vue'),
    beforeEnter: (to, from, next) => {
      if (!auth.decrypt() && to.name != 'verify') {
        next()
      } else if (!auth.decrypt() && to.name == 'verify') {
        next('/auth/login')
      } else {
        if (auth.retrieve('user') && !auth.retrieve('token')) {
          if (to.name !== 'verify') {
            next('/auth/verify')
          } else {
            next()
          }
        } else {
          if (!auth.retrieve('apartment')) {
            next('/onboarding/apartment')
          } else {
            next('/')
          }
        }
      }
    },
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('@/components/auth/Register.vue'),
      },

      {
        path: 'verify',
        name: 'verify',
        component: () => import('@/components/auth/Verify.vue'),
      },

      {
        path: 'login',
        name: 'login',
        component: () => import('@/components/auth/Login.vue'),
      },    
    ]
  },

  {
    path: '/onboarding',
    component: () => import('@/views/layouts/Onboarding.vue'),
    beforeEnter: (to, from, next) => {
      if (!auth.retrieve('apartment')) {
        if (!auth.retrieve('token')) {
          next('/auth/login')
        } else {
          next()
        }
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'apartment',
        name: 'onboarding-apartment',
        component: () => import('@/components/onboard/Apartment.vue'),
      }, 
    //   {
    //     path: 'configuration',
    //     name: 'onboarding-configuration',
    //     component: () => import('@/components/onboard/Configuration.vue'),
    //   },   
    ]
  },

  {
    path: '',
    component: () => import('@/views/layouts/Application.vue'),
    beforeEnter: (to, from, next) => {
      if (!auth.retrieve('apartment')) {
        next('/auth/login')
      } else {
        next()
      }
    },
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/components/app/houses/Index.vue')
      },

      {
        path: '/houses',
        name: 'houses.index',
        component: () => import('@/components/app/houses/Index.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from) => {
//   console.log("This runs before each")
// })

export default router
