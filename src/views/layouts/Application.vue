<template>
  <v-main>
    <app-bar />
    <router-view />
    <app-nav class="hidden-md-and-up" />
  </v-main>
</template>

<script>
export default {
   components: {
    'app-nav': () => import('@/views/includes/AppNav.vue'),
    'app-bar': () => import('@/views/includes/AppBar.vue'),
  },
}
</script>