import vault from '@/libs/core/vault'

export const appRoutes = () => ([
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/components/app/Onboarding.vue'),
    beforeEnter: (to, from, next) => {
      if (vault.extract('apartment')) {
        next('/')
      } else {
        if (!vault.extract('token')) {
          next('/auth/login')
        } else {
          next()
        }
      }
    },
  },

  {
    path: '',
    component: () => import('@/views/layouts/Application.vue'),
    beforeEnter: (to, from, next) => {
      if (!vault.extract('apartment')) {
        if (!vault.extract('token')) {
          next('/auth/login')
        } else {
          next('/onboarding')
        }
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

      {
        path: '/meter-readings',
        name: 'meter-readings.index',
        component: () => import('@/components/app/meter_readings/Index.vue'),
      },
    ]
  }
])

