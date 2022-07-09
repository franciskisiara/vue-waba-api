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
          <v-chip
            v-if="!item.tenant"
            color="#2ecc71"
            small
            label
          >
            vacant
          </v-chip>

          <v-chip
            v-if="item.tenant"
            color="#e74c3c"
            small
            label
          >
            vacant
          </v-chip>
        </template>

        <template v-slot:item.tenant_name="{ item }">
          {{ item.tenant ? item.tenant.name : 'n/a' }}
        </template>

        <template v-slot:item.tenant_phone="{ item }">
          {{ item.tenant? item.tenant.phone : 'n/a' }}
        </template>

        <template v-slot:item.lease="{ item }">
          <v-btn
            dark
            label
            small
            text
            color="#2ecc71"
            :to="`/farmers/${item.id}/primary-information`"
            class="caption ttn mr-2"
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
            :to="`/farmers/${item.id}/primary-information`"
            class="caption ttn mr-2"
            style="background-color: rgba(231, 76, 60,0.1)"
          >
            Remove tenant
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'houses-create': () => import('./Create.vue')
  },

  data () {
    return {
      crumbs: [
        { text: 'Tenancies', disabled: true, },
      ],
      headers: [
        { text: 'Status', value: 'status' },
        { text: 'House number', value: 'house_number' },
        { text: 'Tenant name', value: 'tenant_name' },
        { text: 'Tenant phone', value: 'tenant_phone' },
        { text: 'Lease (Move-In)', value: 'lease' },
        // { text: 'Evict (Move-Out)', value: 'evict' },
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
    ])
  },

  mounted () {
    const apartment = auth.retrieve('apartment')
    this.setHouses({
      routes: {
        apartment: apartment.id
      }
    })
  }
}
</script>