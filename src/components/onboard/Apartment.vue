<template>
  <v-form ref="form">
    <div class="text-center">
      <v-avatar 
        size="128"
        tile
      >
        <img
          src="/apartment.png"
          alt="Logo"
        >
      </v-avatar>
    </div>

    <div class="pt-10">
      <div class="mb-1">
         <label class="body-1 font-weight-bold">
          Enter your apartments' name
        </label>
      </div>
     
      <v-text-field
        outlined
        class="rounded-lg"
        :rules="rules"
        v-model="apartment"
      ></v-text-field>

      <v-btn
        block
        x-large
        class="body-2 font-weight-bold"
        color="primary"
        @click="save()"
      >
        Save and continue
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      apartment: null,
      rules: [
        v => !!v || 'Please provide the apartment name',
      ],
    }
  },

  methods: {
    save () { 
      if (this.$refs.form.validate()) {
        localStorage.setItem('apartment', this.apartment)
        this.$router.push({ name: 'onboarding-configuration' })
      }
    }
  },

  mounted () {
    this.apartment = localStorage.getItem('apartment')
  }
}
</script>