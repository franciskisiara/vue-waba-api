<template>
  <v-row 
    class="app--full-height d-flex align-center justify-center"
  >
    <v-col cols="12">
      <v-card 
        flat
        class="px-5"
      >
        <p class="text-h5 font-weight-bold primary--text">
          Welcome, {{ user.name }}
        </p>

        <p class="body-1">
          Let us help you set up in order to get started with waba quickly
        </p>

        <v-card-text class="px-0">
          <router-view />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Auth from '@/libs/auth/Auth'

export default {
  data () {
    return {
      authObj: new Auth()
    }
  },

  computed: {
    user () {
      return this.authObj.retrieve('user')
    }
  }
}
</script>