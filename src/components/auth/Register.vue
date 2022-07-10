<template>
  <v-card flat> 
    <v-card-title>
      <div>
        <h1 class="text-h5 font-weight-bold">
          Sign up
        </h1>
        <p class="body-1">
          Register a caretaker account
        </p>
      </div>
    </v-card-title>
    <v-card-text>
      <v-text-field
        dense
        outlined
        persistent-hint
        label="Name"
        class="rounded-lg"
        v-model="authObj.name"
        :hint="errors.get('name')"
        :error="errors.has('name')"
        @input="errors.clear('name')"
      ></v-text-field>

      <v-text-field
        dense
        outlined
        persistent-hint
        label="Phone"
        class="rounded-lg"
        v-model="authObj.username"
        :hint="errors.get('username')"
        :error="errors.has('username')"
        @input="errors.clear('username')"
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
        @click="register()"
      >
        Register
      </v-btn>
    </v-card-actions>

    <v-card-text class="pb-0">
      <p class="body-1 text-center">
        Already have an account? <router-link to="/auth/login" class="font-weight-bold">Login</router-link>
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
    register () {
      if (!this.loading) {
        this.loading = true
        this.authObj.register()
          .then(() => {
            this.authObj.retrieve('apartment')
              ? this.$router.push({name: 'dashboard'})
              : this.$router.push({name: 'onboarding-apartment'})
          }).finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>