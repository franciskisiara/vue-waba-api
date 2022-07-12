<template>
  <v-card flat> 
    <v-card-title>
      <div>
        <h1 class="text-h5 font-weight-bold">
          Hi {{ user.nickname }},
        </h1>
        <p class="body-1">
          Please enter the code sent to the phone<br> number ending in <span class="font-weight-bold">
            {{ user.phone.slice(user.phone.length - 3) }}
          </span>
        </p>
      </div>
    </v-card-title>
    <v-card-text>
      <v-text-field
        dense
        outlined
        persistent-hint
        label="Verification code"
        class="rounded-lg"
        v-model="authObj.code"
        :hint="errors.get('code')"
        :error="errors.has('code')"
        @input="errors.clear('code')"
      ></v-text-field>
    </v-card-text>

    <v-card-actions class="px-4">
      <v-btn 
        block
        large
        color="primary"
        class="rounded-lg body-2 font-weight-bold"
        :dark="!loading"
        :loading="loading"
        :disabled="loading"
        @click="verify()"
      >
        Verify Code
      </v-btn>
    </v-card-actions>

    <v-card-text class="pb-0">
      <p class="body-1 text-center">
        Not {{ user.name }}? 
        <v-btn 
          text
          small
          color="primary"
          class="ttn body-2 font-weight-bold mt-n1 px-2"
          @click="authObj.logout()"
        >
          Logout
        </v-btn>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import Auth from '@/libs/auth/Auth'

export default {
  data () {
    return {
      loading: false,
      authObj: new Auth(),
    }
  },

  computed: {
    user () {
      return this.authObj.retrieve('user')
    },

    errors () {
      return this.authObj.form.errors
    }
  },

  methods: {
    verify () {
      if (!this.loading) {
        this.authObj.phone = this.user.phone
        this.loading = true
        this.authObj.login()
          .then(() => {
            this.authObj.retrieve('apartment')
              ? this.$router.push({name: 'dashboard'})
              : this.$router.push({name: 'onboarding-apartment'})
          }).finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>