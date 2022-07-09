<template>
  <v-row 
    class="app--full-height d-flex align-center justify-center curves"
  >
    <v-col 
      cols="12" 
      md="4"
    >
      <v-card outlined class="rounded-xl">
        <v-card-text class="px-6 py-10">
          <p class="text-h5 font-weight-bold primary--text">
            Welcome, {{ user.username }}
          </p>

          <p class="body-1">
            Let us help you set up in order to get started with waba quickly
          </p>

          <div>
            <router-view />
          </div>
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