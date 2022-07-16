<template>
  <v-card 
    class="rounded-lg"
    outlined
  >
    <v-card-title>
      <h1 class="body-2 font-weight-bold text--darken-3">
        Set pricing configurations
      </h1>
    </v-card-title>

    <v-divider class="mb-4"></v-divider>

    <v-card-text class="px-5">
      <v-row no-gutters>
        <v-col 
          cols="12"
          md="2"
          class="pt-2"
        >
          Unit rate
        </v-col>

        <v-col 
          cols="12"
          md="5"
        >
          <v-text-field
            dense
            outlined
            persistent-hint
            suffix="KES"
            class="rounded-lg"
            v-model="apartmentObj.unit_rate"
            :hint="errors.get('unit_rate')"
            :error="errors.has('unit_rate')"
            @input="errors.clear('unit_rate')"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col 
          cols="12"
          md="2"
          class="pt-2"
        >
          Flat rate
        </v-col>

        <v-col 
          cols="12"
          md="5"
        >
          <v-text-field
            dense
            outlined
            persistent-hint
            suffix="KES"
            class="rounded-lg"
            v-model="apartmentObj.flat_rate"
            :hint="errors.get('flat_rate')"
            :error="errors.has('flat_rate')"
            @input="errors.clear('flat_rate')"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col 
          cols="12"
          md="2"
          class="pt-2"
        >
          Flat rate limit
        </v-col>

        <v-col 
          cols="12"
          md="5"
        >
          <v-text-field
            dense
            outlined
            persistent-hint
            suffix="UNITS"
            class="rounded-lg"
            v-model="apartmentObj.flat_rate_limit"
            :hint="errors.get('flat_rate_limit')"
            :error="errors.has('flat_rate_limit')"
            @input="errors.clear('flat_rate_limit')"
          ></v-text-field>
        </v-col>
      </v-row>
      
    </v-card-text>

    <v-card-actions class="px-5 pt-0 pb-6">
      <v-btn 
        color="primary"
        class="rounded-lg body-2 font-weight-bold ttn px-4"
        :dark="!loading"
        :loading="loading"
        :disabled="loading"
        @click="submit()"
      >
        Save changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import vault from '@/libs/core/vault'
import Apartment from '@/models/Apartment'

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
    },

    apartment () {
      return vault.extract('apartment')
    }
  },

  methods: {
    submit () {
      if (!this.loading) {
        this.loading = true
        this.apartmentObj.update()
          .then(response => {
            flash(response)
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  },

  mounted () {
    this.$emit('loaded', {
      page: 'Pricing',
      crumbs: [
        { text: 'Pricing', disabled: true, },
      ],
    })

    Object.keys(this.apartment).forEach(key => {
      if (this.apartmentObj.hasOwnProperty(key)) {
        this.apartmentObj[key] = this.apartment[key]
      }
    })
    // this.loadHouses()
  }
}
</script>