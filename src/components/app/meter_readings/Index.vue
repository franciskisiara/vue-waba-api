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
      <v-spacer></v-spacer>
      <meter-readings-create
        @stored="loadMeterReadings()"
      ></meter-readings-create>
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
        <template v-slot:item.communication_status="{ item }">
          <v-chip 
            dark
            small
            label
            :color="commsColor[item.communication_status]"
          >
            {{ item.communication_status }}
          </v-chip>
        </template>

        <template v-slot:item.bill="{ item }">
          <bill-menu
            :meter-reading="item"
          ></bill-menu>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            text
            small
            color="primary"
            class="caption ttn"
            @click="lease(item)"
            style="background-color: rgba(79, 179, 188, 0.1)"
          >
            Record payment
          </v-btn>
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
    'meter-readings-create': () => import('./Create.vue'),
    'bill-menu': () => import('./index/BillMenu.vue'),
  },

  data () {
    return {
      crumbs: [
        { text: 'Meter readings', disabled: true, },
      ],
      headers: [
        { text: 'INV.', value: 'communication_status', width: '10%' },
        { text: 'Occupancy', value: 'occupancy' },
        { text: 'Total Bill', value: 'bill' },
        { text: 'Actions', value: 'actions' },
      ],
      commsColor: {
        failed: '#e74c3c',
        pending: '#9b59b6',
        delivered: '#2ecc71'
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