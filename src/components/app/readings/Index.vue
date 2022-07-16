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
        <!-- <template v-slot:item.tenant_name="{ item }">
          {{ item.tenant ? item.tenant.name : 'n/a' }}
        </template>

        <template v-slot:item.tenant_phone="{ item }">
          {{ item.tenant ? item.tenant.phone : 'n/a' }}
        </template>

        <template v-slot:item.house="{ item }">
          {{ item.house_number }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip 
            dark
            small
            label
            :color="item.active_tenancy_id ? '#e74c3c' : '#2ecc71'"
          >
            {{ item.active_tenancy_id ? 'rented' : 'vacant' }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu offset-x
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                v-on="on"
                v-bind="attrs"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list 
              dense
              width="170"
            >
              <v-list-item
                v-for="action, index in actions"
                :key="`action-${index}`"
                @click="action['process'](item)"
              >
                <v-list-item-title>
                  {{ action.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template> -->
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import vault from '@/libs/core/vault'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'meter-readings-create': () => import('./Create.vue')
  },

  data () {
    return {
      crumbs: [
        { text: 'Meter readings', disabled: true, },
      ],
      headers: [
        { text: 'HSE.', value: 'house' },
        { text: 'Occupancy', value: 'previous_units' },
        { text: 'Tenant name', value: 'current_units' },
        { text: 'Tenant phone', value: 'tenant_phone' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },

  computed: {
    ...mapGetters({
      meterReadings: 'getMeterReadings'
    })
  },

  methods: {
    ...mapActions([
      'setMeterReadings'
    ]),

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