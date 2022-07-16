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
        component: () => import('@/components/app/dashboard/Index.vue')
      },

      {
        path: 'tenancies',
        name: 'tenancies.index',
        component: () => import('@/components/app/tenancies/Index.vue')
      },

      {
        path: '/settings',
        component: () => import('@/components/app/Settings.vue'),
        children: [
          {
            path: 'houses',
            name: 'houses.index',
            component: () => import('@/components/app/houses/Index.vue')
          },

          {
            path: 'pricing',
            name: 'pricing',
            component: () => import('@/components/app/pricing/Index.vue')
          },
        ]
      },
    ]
  }
])

