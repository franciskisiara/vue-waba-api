<template>
  <v-dialog
    v-model="dialog"
    width="380"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="rounded-lg body-2 ttn"
        v-bind="attrs"
        v-on="on"
      >
        Record reading
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h2 class="text-subtitle-1 font-weight-bold">
          Record a meter reading
        </h2>
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          color="red"
          @click="dialog = false"
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
          min="0"
          step=".01"
          type="number"
          suffix="UNITS"
          class="rounded-lg"
          label="Meter reading"
          v-model="meterReadingObj.meter_reading"
          :hint="errors.get('meter_reading')"
          :error="errors.has('meter_reading')"
          @input="errors.clear('meter_reading')"
        ></v-text-field>
        <!-- 


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
        ></v-text-field> -->
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
          Record reading details
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MeterReading from '@/models/MeterReading'

export default {
  data () {
    return {
      dialog: false,
      loading: false,
      meterReadingObj: new MeterReading()
    }
  },

  computed: {
    errors () {
      return this.meterReadingObj.form.errors
    }
  },

  methods: {
    submit () {
      if (!this.loading) {
        this.loading = true
        this.meterReadingObj.store()
          .finally(() => {
            this.loading = false
          })
      }
    }
  },
}
</script>