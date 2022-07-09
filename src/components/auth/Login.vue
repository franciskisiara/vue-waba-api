<template>
  <v-card flat> 
    <v-card-title>
      <div>
        <h1 class="text-h5 font-weight-bold">
          Sign in
        </h1>
        <p class="body-1">
          Access your caretaker account
        </p>
      </div>
    </v-card-title>
    <v-card-text>
      <v-text-field
        dense
        outlined
        type="email"
        persistent-hint
        label="Phone"
        class="rounded-lg"
        v-model="authObj.phone"
        :hint="errors.get('phone')"
        :error="errors.has('phone')"
        @input="errors.clear('phone')"
      ></v-text-field>

      <v-text-field
        dense
        outlined
        type="password"
        persistent-hint
        label="Password"
        class="rounded-lg"
        v-model="authObj.password"
        :hint="errors.get('password')"
        :error="errors.has('password')"
        @input="errors.clear('password')"
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
        @click="login()"
      >
        Log in
      </v-btn>
    </v-card-actions>

    <v-card-text class="pb-0">
      <p class="body-1 text-center">
        Dont have an account? <router-link to="/auth/register" class="font-weight-bold">Register</router-link>
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
    errors () {
      return this.authObj.form.errors
    }
  },

  methods: {
    login () {
      if (!this.loading) {
        this.loading = true
        this.authObj.login()
          .then(() => {
            this.$router.push({name: 'Dashboard'})
          }).finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>