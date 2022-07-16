<template>
  <v-card flat> 
    <v-card-title>
      <div>
        <h1 class="text-h5 font-weight-bold">
          Sign in
        </h1>
        <p class="body-1">
          Log into your caretaker account
        </p>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="mb-7">
        <vue-tel-input 
          :disabled="Boolean(user)"
          v-model="authObj.phone"
          class="outlined rounded-lg"
        ></vue-tel-input>
        <p
          v-if="errors.has('phone')"
          class="ma-0 px-3"
          style="color: #e74c3c; font-size: 12px; position: absolute;"
        >
          {{ errors.get('phone') }}
        </p>
      </div>

      <Transition name="slide-fade">
        <auth-verify
          v-if="user"
          :model="authObj"
          :errors="errors"
          @coded="coded"
          @clear="errors.clear('code')"
        ></auth-verify>
      </Transition>
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
        @click="submit()"
      >
        {{ user ? 'Log in' : 'Generate code' }}
      </v-btn>
    </v-card-actions>

    <v-card-text class="pb-0" v-if="user">
      <v-btn 
        text
        block
        color="secondary"
        class="ttn body-2 mt-n1 px-2"
        @click="authObj.logout()"
      >
        Not {{ user.name }}? 
      </v-btn>
    </v-card-text>

    <v-card-text class="pb-0">
      <p class="body-1 text-center">
        Dont have an account? 
        <router-link 
          to="/auth/register" 
          class="font-weight-bold"
        >
          Register
        </router-link>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import Auth from '@/models/Auth'
import vault from '@/libs/core/vault'

export default {
  components: {
    'auth-verify': () => import('./partials/Verify.vue')
  },

  data () {
    return {
      user: null,
      loading: false,
      authObj: new Auth(),
    }
  },

  computed: {
    errors () {
      return this.authObj.form.errors
    }
  },

  methods: {
    coded (code) {
      this.authObj.code = code
    },

    submit () {
      if (!this.loading) {
        this.loading = true
        this.user 
          ? this.login()
          : this.generateCode() 
      }
    },

    generateCode () {
      this.authObj.generateCode().then(({ data }) => {
        this.user = data.user
      }).finally(() => {
        this.loading = false
      })
    },

    login () {
      this.authObj.login().then(() => {
        vault.extract('apartment')
          ? this.$router.push({name: 'dashboard'})
          : this.$router.push({name: 'onboarding'})
      }).finally(() => {
        this.loading = false
      })
    }
  },

  mounted () {
    this.user = vault.extract('user')
    this.authObj.phone = this.user ? this.user.phone : ''
  }
}
</script>