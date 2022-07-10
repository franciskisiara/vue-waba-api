<template>
  <v-card flat>
    <v-card-title>
       <div>
        <h1 class="text-h6 font-weight-bold text--darken-3">
          Houses (Rooms)
        </h1>
        <app-crumbs 
          :crumbs="crumbs"
        ></app-crumbs>
      </div>

      <v-spacer></v-spacer>

      <houses-create
        @stored="loadHouses()"
      ></houses-create>
    </v-card-title>

    <v-card-text>
      <v-data-table
        flat 
        class="mb-3 body-2" 
        hide-default-footer
        disable-pagination
        :headers="headers" 
        :items="houses.data"
      >
        <template v-slot:item.status="{ item }">
          <v-icon
            v-if="item.tenant"
            color="#e74c3c"
          >
            mdi-lock
          </v-icon>

          <v-icon
            v-if="!item.tenant"
            color="#2ecc71"
          >
            mdi-lock-open-variant
          </v-icon>
        </template>

        <template v-slot:item.tenant_name="{ item }">
          {{ item.tenant ? item.tenant.name : 'n/a' }}
        </template>

        <template v-slot:item.tenant_phone="{ item }">
          {{ item.tenant? item.tenant.phone : 'n/a' }}
        </template>

        <template v-slot:item.reading="{ item }">
          <v-btn
            dark
            label
            small
            text
            color="#3BACB6"
            class="caption ttn mr-2"
            @click="lease(item)"
            style="background-color: rgba(59,172,182, 0.1)"
          >
            Record units
          </v-btn>
        </template>

        <template v-slot:item.lease="{ item }">
          <v-btn
            dark
            label
            small
            text
            color="#2ecc71"
            class="caption ttn mr-2"
            @click="lease(item)"
            style="background-color: rgba(46, 204, 113,0.1)"
          >
            Add a tenant
          </v-btn>
        </template>

        <template v-slot:item.evict="{ item }">
          <v-btn
            dark
            label
            small
            text
            color="#e74c3c"
            class="caption ttn mr-2"
            @click="evict(item)"
            style="background-color: rgba(231, 76, 60,0.1)"
          >
            Remove tenant
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    <tenancies-create
      :house="house"
      :action="action"
      @closed="closed()"
      @leased="leased()"
    ></tenancies-create>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'houses-create': () => import('./Create.vue'),
    'tenancies-create': () => import('@/components/app/tenancies/Create.vue'),
  },

  data () {
    return {
      house: null,
      action: '',
      crumbs: [
        { text: 'Tenancies', disabled: true, },
      ],
      headers: [
        { text: '#', value: 'status', width: '6%', align: 'center', sortable: false, },
        { text: 'House number', value: 'house_number' },
        { text: 'Tenant name', value: 'tenant_name' },
        { text: 'Tenant phone', value: 'tenant_phone' },
        { text: 'Meter reading', value: 'reading' },
        { text: 'Lease (Move-In)', value: 'lease' },
        { text: 'Evict (Move-Out)', value: 'evict' },
      ],
    }
  },

  computed: {
    ...mapGetters({
      houses: 'getHouses'
    })
  },

  methods: {
    ...mapActions([
      'setHouses'
    ]),

    loadHouses () {
      const apartment = auth.retrieve('apartment')
      this.setHouses({
        routes: {
          apartment: apartment.id
        }
      })
    },

    lease (house) {
      if (house.tenant) {
        flash({
          message: `House ${house.house_number} is currently occupied.`
        })
        return
      }
      this.house = house
      this.action = 'lease'
    },

    closed () {
      this.house = null
      this.action = ''
    },

    leased () {
      this.closed()
      this.loadHouses()
    }
  },

  mounted () {
    this.loadHouses()
  }
}
</script>