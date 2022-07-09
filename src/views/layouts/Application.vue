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
//   components: {
//     'app-drawer': () => import('./includes/AppDrawer.vue'),
//     'app-bar': () => import('./includes/AppBar.vue'),
//   },

  // data () {
  //   return {
  //     showDrawer: false
  //   }
  // },

  // computed: {
  //   isTiny () {
  //     const name = this.$vuetify.breakpoint.name
  //     return name == 'xs' || name == 'sm'
  //   }
  // },

  // mounted () {
  //   this.showDrawer = !this.isTiny
  // }
}
</script>