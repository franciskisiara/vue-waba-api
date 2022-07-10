<template>
  <v-dialog
    v-if="house != null"
    v-model="dialog"
    width="380"
    persistent
  >
    <v-card>
      <v-card-title>
        <h2 class="text-subtitle-1 font-weight-bold">
          Add a tenant to {{ house.house_number }}
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

      <v-divider class="mb-4"></v-divider>

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

        <v-text-field
          dense
          outlined
          persistent-hint
          class="rounded-lg"
          label="Tenant phone"
          v-model="tenancyObj.tenant.phone"
          :hint="errors.get('tenant.phone')"
          :error="errors.has('tenant.phone')"
          @input="errors.clear('tenant.phone')"
        ></v-text-field>

        <v-text-field
          dense
          outlined
          persistent-hint
          min="0"
          step=".01"
          class="rounded-lg"
          suffix="UNITS"
          label="Meter reading"
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
          {{ house ? 'Update' : 'Save' }} House Details
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Tenancy from '@/libs/app/tenancies/Tenancy'

export default {
  props: [
    'house',
    'action'
  ],

  data () {
    return {
      dialog: false,
      loading: false,
      tenancyObj: new Tenancy()
    }
  },

  watch: {
    house (house) {
      this.dialog = Boolean(house) && this.action == 'lease'
    }
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
        this.tenancyObj.store()
          .then((response) => {
            flash(response)
            this.$emit('leased')
          }).finally(() => {
            this.loading = false
          })
      }
    },
  }
}
</script>