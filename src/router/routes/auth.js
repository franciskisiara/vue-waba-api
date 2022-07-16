import vault from '@/libs/core/vault'

export const authRoutes = () => ([
  {
    path: '/auth',
    component: () => import('@/views/layouts/Authentication.vue'),
    beforeEnter: (to, from, next) => {
      const details = vault.details()
      if (!details.token) {
        if (details.user && to.name != 'login') {
          next('/auth/login')
        } else {
          next()
        }
      } else {
        if (!details.apartment) {
          next('/onboarding')
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
  }
])