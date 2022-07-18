<template>
  <v-row 
    v-if="user"
    no-gutters
    class="app--full-height d-flex align-center justify-center"
  >
    <v-col 
      cols="12"
      md="4"
      xl="3"
    >
      <v-card outlined class="rounded-xl mask">
        <v-card-text class="px-5 py-10">
          <div class="text-center">
            <v-avatar 
              size="60"
              tile
            >
              <img
                src="/apartment.png"
                alt="Logo"
              >
            </v-avatar>
          </div>

          <v-card flat> 
            <v-card-title>
              <div>
                <h1 class="text-h5 font-weight-bold">
                  Welcome {{ user.nickname }}
                </h1>
                <p class="body-1">
                  Lets get your apartment setup quickly
                </p>
              </div>
            </v-card-title>

            <v-card-text>
              <v-text-field
                dense
                outlined
                persistent-hint
                label="Apartment name *"
                class="rounded-lg"
                v-model="apartmentObj.name"
                :hint="errors.get('name')"
                :error="errors.has('name')"
                @input="errors.clear('name')"
              ></v-text-field>

              <v-text-field 
                dense
                outlined
                persistent-hint
                min="0"
                step=".01"
                prefix="KES"
                type="number"
                class="rounded-lg"
                label="Unit charge *"
                v-model="apartmentObj.unit_rate"
                :hint="errors.get('unit_rate')"
                :error="errors.has('unit_rate')"
                @input="errors.clear('unit_rate')"
              ></v-text-field>

              <v-text-field
                dense
                outlined
                persistent-hint
                min="0"
                step=".01"
                prefix="KES"
                type="number"
                class="rounded-lg"
                label="Flat rate charge *"
                v-model="apartmentObj.flat_rate"
                :hint="errors.get('flat_rate')"
                :error="errors.has('flat_rate')"
                @input="errors.clear('flat_rate')"
              ></v-text-field>

              <v-text-field
                dense
                outlined
                persistent-hint
                min="0"
                step=".01"
                type="number"
                class="rounded-lg"
                prefix="UNT"
                label="Flat rate max. limit *"
                v-model="apartmentObj.flat_rate_limit"
                :hint="errors.get('flat_rate_limit')"
                :error="errors.has('flat_rate_limit')"
                @input="errors.clear('flat_rate_limit')"
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
                @click="submit()"
              >
                Setup Apartment
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import vault from '@/libs/core/vault'
import Apartment from '@/models/Apartment'

export default {
  data () {
    return {
      user: null,
      loading: false,
      apartmentObj: new Apartment(),
    }
  },  

  computed: {
    errors () {
      return this.apartmentObj.form.errors
    }
  },

  methods: {
    submit () {
      if (!this.loading) {
        this.loading = true
        this.apartmentObj.store().then(() => {
          this.$router.push({ name: 'houses.index' })
        }).finally(() => {
          this.loading = false
        })
      }
    } 
  },
  
  mounted () {
    this.user = vault.extract('user')
  }
}
</script>