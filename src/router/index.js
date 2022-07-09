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
      if (!auth.retrieve('user')) {
        next()
      } else {
        if (!auth.retrieve('apartment')) {
          next('/onboarding/apartment')
        } else {
          next('/')
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
      if (!auth.retrieve('user')) {
        next('/auth/login')
      }
      else {
        if (!auth.retrieve('apartment')) {
          next()
        } else {
          next('/')
        }
      }
    },
    children: [
      {
        path: 'apartment',
        name: 'onboarding-apartment',
        component: () => import('@/components/onboard/Apartment.vue'),
      }, 
      {
        path: 'configuration',
        name: 'onboarding-configuration',
        component: () => import('@/components/onboard/Configuration.vue'),
      },   
    ]
  },

  {
    path: '',
    component: () => import('@/views/layouts/Application.vue'),
    beforeEnter: (to, from, next) => {
      if (!auth.retrieve('user')) {
        next('/auth/login')
      }
      else {
        if (!auth.retrieve('apartment')) {
          next('/onboarding/apartment')
        }
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

      // {
      //   path: '/tenants',
      //   name: 'tenants.index',
      //   component: () => import('@/components/app/tenants/Index.vue')
      // },

      // {
      //   path: '/readings',
      //   name: 'readings.index',
      //   component: () => import('@/components/app/readings/Index.vue')
      // },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
