<template>
  <v-card flat>
    <v-card-title>
      <div>
        <h1 class="text-h6 font-weight-bold text--darken-3">
          Dashboard
        </h1>
        <app-crumbs 
          :crumbs="[]"
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
        disable-sort
        class="mb-3 body-2" 
        hide-default-footer
        disable-pagination
        :headers="headers" 
        :items="houses.data"
      >
        <template v-slot:item.tenant_name="{ item }">
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
        </template>
      </v-data-table>
    </v-card-text>

    <tenancies-create
      :action="action"
      :house="house"
      @closed="close()"
      @stored="reset()"
    ></tenancies-create>

    <tenancies-delete
      :action="action"
      :house="house"
      @closed="close()"
      @deleted="reset()"
    ></tenancies-delete>
  </v-card>
</template>

<script>
import vault from '@/libs/core/vault'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'houses-create': () => import('@/components/app/houses/Create.vue'),
    'tenancies-create': () => import('@/components/app/tenancies/Create.vue'),
    'tenancies-delete': () => import('@/components/app/tenancies/Delete.vue')
  },

  data () {
    return {
      action: '',
      house: null,
      actions: [
        { text: 'Board', hint: 'IN', process: this.board, },
        { text: 'Vacate', hint: 'OUT', process: this.vacate, },
      ],
      headers: [
        { text: 'HSE.', value: 'house' },
        { text: 'Occupancy', value: 'status' },
        { text: 'Tenant name', value: 'tenant_name' },
        { text: 'Tenant phone', value: 'tenant_phone' },
        { text: 'Actions', value: 'actions' },
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
      this.setHouses({
        path: {
          apartment: vault.extract('apartment').id
        }
      })
    },

    close () {
      this.house = null
      this.action = ''
    },

    reset () {
      this.loadHouses()
      this.close()
    },

    board (item) {
      if (item.active_tenancy_id) {
        flash({ message: `House ${item.house_number} is currently occupied.` })
        return
      }
      this.house = item
      this.action = 'board'
    },

    vacate (item) {
      if (!item.active_tenancy_id) {
        flash({ message: `House ${item.house_number} is already vacant.` })
        return
      }
      this.house = item
      this.action = 'vacate'
    },
  },

  mounted () {
    this.loadHouses()
  }
}
</script>