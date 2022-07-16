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
        label="Full name"
        class="rounded-lg"
        v-model="authObj.name"
        :hint="errors.get('name')"
        :error="errors.has('name')"
        @input="errors.clear('name')"
      ></v-text-field>

      <div class="mb-7">
        <vue-tel-input 
          v-model="authObj.phone"
          class="outlined rounded-lg"
        ></vue-tel-input>
        <p
          v-if="errors.has('phone')"
          class="ma-0 px-3"
          style="color: #e74c3c; font-size: 12px"
        >
          {{ errors.get('phone') }}
        </p>
      </div>
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
        Already have an account? 

        <router-link 
          to="/auth/login" 
          class="font-weight-bold"
        >
          Login
        </router-link>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import Auth from '@/models/Auth'

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
    },
  },

  methods: {
    register () {
      if (!this.loading) {
        this.loading = true
        this.authObj.register().then(({ data }) => {
          this.user = data.user
          this.$router.push({ name: 'login' })
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
}
</script>