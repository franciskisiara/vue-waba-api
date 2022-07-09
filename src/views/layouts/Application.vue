<template>
  <div class="app--full-height">
    <!-- <app-drawer /> -->

    <v-container 
      class="app--main-content" 
      fluid
    >
      <app-bar />

      <div class="content-area">
        <router-view />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
   components: {
    'app-drawer': () => import('@/views/includes/AppDrawer.vue'),
    'app-bar': () => import('@/views/includes/AppBar.vue'),
  },

}
</script>