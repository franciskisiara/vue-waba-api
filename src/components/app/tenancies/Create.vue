<template>
  <v-dialog
    v-if="dialog"
    v-model="dialog"
    width="380"
    persistent
  >
    <v-card>
      <v-card-title>
        <h2 class="text-subtitle-1 font-weight-bold">
          Add a tenant
        </h2>
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          color="red"
          @click="$emit('closed')"
        >
          <v-icon 
            small 
            color="red"
          >
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-divider class="mb-5"></v-divider>

      <v-card-text>
        <v-text-field
          dense
          outlined
          persistent-hint
          class="rounded-lg"
          label="Tenant name"
          v-model="tenancyObj.tenant.name"
          :hint="errors.get('tenant.name')"
          :error="errors.has('tenant.name')"
          @input="errors.clear('tenant.name')"
        ></v-text-field>

        <div class="mb-7">
          <vue-tel-input 
            class="outlined rounded-lg"
            v-model="tenancyObj.tenant.phone"
          ></vue-tel-input>
          <p
            v-if="errors.has('tenant.phone')"
            class="ma-0 px-3"
            style="color: #e74c3c; font-size: 12px; position: absolute;"
          >
            {{ errors.get('tenant.phone') }}
          </p>
        </div>

        <v-text-field
          dense
          outlined
          persistent-hint
          min="0"
          step=".01"
          prefix="UNT"
          type="number"
          class="rounded-lg"
          label="Initial meter reading"
          v-model="tenancyObj.meter_reading"
          :hint="errors.get('meter_reading')"
          :error="errors.has('meter_reading')"
          @input="errors.clear('meter_reading')"
        ></v-text-field>
      </v-card-text>

      <v-card-actions class="px-5 pb-5">
        <v-btn
          block
          large
          type="submit"
          color="primary"
          class="rounded-lg caption font-weight-bold"
          :dark="!loading"
          :loading="loading"
          :disabled="loading"
          @click="submit()"
        >
          Add Tenancy Details
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as _ from 'lodash'
import Tenancy from '@/models/Tenancy'

export default {
  props: [
    'house',
    'action'
  ],

  data () {
    return {
      dialog: false,
      loading: false,
      houseSearch: '',
      tenancyObj: new Tenancy()
    }
  },

  watch: {
    action (action) {
      this.dialog = action == 'board'
    },
  },

  computed: {
    errors () {
      return this.tenancyObj.form.errors
    }
  },

  methods: {
    submit () {
      if (!this.loading) {
        this.loading = true
        this.tenancyObj.house_id = this.house.id
        this.tenancyObj.store().then((response) => {
          flash(response)
          this.$emit('stored')
        }).finally(() => {
          this.loading = false
        })
      }
    },
  },
}
</script>