<template>
  <v-form ref="form">
    <div class="text-center">
      <v-avatar 
        size="128"
        tile
      >
        <img
          src="/charges.png"
          alt="Logo"
        >
      </v-avatar>
    </div>

    <v-row class="pt-10" no-gutters>
      <v-col cols="12">
        <div class="mb-1">
          <label class="body-1 font-weight-bold">
            What is your unit charge *
          </label>
        </div>

        <v-text-field
          outlined
          persistent-hint
          type="number"
          min="0"
          step=".01"
          class="rounded-lg"
          prefix="KES"
          v-model="apartmentObj.unit_rate"
          :hint="errors.get('unit_rate')"
          :error="errors.has('unit_rate')"
          @input="errors.clear('unit_rate')"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <div class="mb-1">
          <label class="body-1 font-weight-bold">
            What is your flat rate charge
          </label>
        </div>

        <v-text-field
          outlined
          persistent-hint
          min="0"
          step=".01"
          class="rounded-lg"
          prefix="KES"
          v-model="apartmentObj.flat_rate"
          :hint="errors.get('flat_rate')"
          :error="errors.has('flat_rate')"
          @input="errors.clear('flat_rate')"
        ></v-text-field>
      </v-col>

      

      <v-col cols="12">
        <div class="mb-1">
          <label class="body-1 font-weight-bold">
            What is your flat rate unit limit
          </label>
        </div>

        <v-text-field
          outlined
          persistent-hint
          min="0"
          step=".01"
          class="rounded-lg"
          suffix="UNITS"
          v-model="apartmentObj.flat_rate_limit"
          :hint="errors.get('flat_rate_limit')"
          :error="errors.has('flat_rate_limit')"
          @input="errors.clear('flat_rate_limit')"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn
          block
          x-large
          class="body-2 font-weight-bold"
          color="primary"
          @click="save()"
        >
          Save and continue
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import Apartment from '@/libs/app/apartments/Apartment'

export default {
  data () {
    return {
      loading: false,
      apartmentObj: new Apartment()
    }
  },

  computed: {
    errors () {
      return this.apartmentObj.form.errors
    }
  },

  methods: {
    save () {
      if (!this.loading) {
        this.loading = true
        this.apartmentObj.store().then(() => {

        })
          // .then(() => {
          //   this.authObj.retrieve('apartment')
          //     ? this.$router.push({name: 'dashboard'})
          //     : this.$router.push({name: 'onboarding-apartment'})
          // }).finally(() => {
          //   this.loading = false
          // })
      }
    }
  }
}
</script>