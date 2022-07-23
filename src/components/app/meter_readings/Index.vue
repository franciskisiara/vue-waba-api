<template>
  <v-card flat>
    <v-card-title>
      <div>
        <h1 class="text-h6 font-weight-bold text--darken-3">
          Meter readings
        </h1>
        <app-crumbs 
          :crumbs="crumbs"
        ></app-crumbs>
      </div>
    </v-card-title>

    <v-card-text>
      <v-data-table
        flat 
        disable-sort
        class="mb-3 body-2" 
        hide-default-footer
        disable-pagination
        :headers="headers" 
        :items="meterReadings.data"
      >
        <template v-slot:item.bill_delivery_status="{ item }">
          <v-chip 
            dark
            small
            label
            :color="commsColor[item.bill_delivery_status]"
          >
            {{ item.bill_delivery_status }}
          </v-chip>
        </template>

        <template v-slot:item.house="{ item }">
          {{ item.house.house_number }}
        </template>

        <template v-slot:item.tenant="{ item }">
          {{ item.tenant.name }} 
          <p class="ma-0 caption">
            {{ item.tenant.phone }}
          </p>
        </template>

        <template v-slot:item.bill="{ item }">
          <bill-menu
            :meter-reading="item"
          ></bill-menu>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import vault from '@/libs/core/vault'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'bill-menu': () => import('./index/BillMenu.vue'),
  },

  data () {
    return {
      crumbs: [
        { text: 'Meter readings', disabled: true, },
      ],
      headers: [
        { text: 'Delivery status', value: 'bill_delivery_status', },
        { text: 'House', value: 'house' },
        { text: 'Tenant', value: 'tenant' },
        { text: 'Total Bill', value: 'bill' },
        { text: 'Date', value: 'created_at' },
      ],
      commsColor: {
        failed: '#e74c3c',
        pending: '#9b59b6',
        success: '#2ecc71'
      }
    }
  },

  computed: {
    ...mapGetters({
      meterReadings: 'getMeterReadings'
    }),
  },

  methods: {
    ...mapActions([
      'setMeterReadings'
    ]),

    comms (status) {
      switch (status) {
        case null:
          return {
            color: '',
            text: 'pending'
          }
        case false:
          return {
            color: '',
            text: 'failed'
          }
        case true:
          return {
            color: '',
            text: 'delivered'
          }
      }
    },

    loadMeterReadings () {
      this.setMeterReadings({
        path: {
          apartment: vault.extract('apartment').id
        }
      })
    },
  },

  mounted () {
    this.loadMeterReadings()
  }
}
</script>