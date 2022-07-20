<template>
  <v-card flat>
    <v-card-title>
      <div>
        <h1 class="text-h6 font-weight-bold text--darken-3">
          Houses
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
        disable-sort
        class="mb-3 body-2" 
        hide-default-footer
        disable-pagination
        :headers="headers" 
        :items="houses.data"
      >
        <template v-slot:item.tenant="{ item }">
          <router-link
            v-if="item.tenancy"
            class="body-2 dt-link"
            :to="`tenancies/${item.tenancy.id}`"
          >
            {{ item.tenant.name }}
          </router-link>
          <span v-else>
            n/a
          </span>
        </template>

        <template v-slot:item.house="{ item }">
          <v-btn
            icon
            small
            class="mt-n1 mx-0"
            :color="item.tenancy ? '#e74c3c' : '#2ecc71'"
          >
            <v-icon
              small
              :color="item.tenancy ? '#e74c3c' : '#2ecc71'"
            >
              {{ item.tenancy ? 'mdi-door-closed-lock' :  'mdi-door-closed' }}
            </v-icon>
          </v-btn>
          {{ item.house_number }}
        </template>

        <template v-slot:item.balance="{ item }">
          {{ item.tenancy ? item.tenancy.running_balance : '-' }}
        </template>

        <template v-slot:item.actions="{ item }">
          <houses-actions
            :house="item"
            @reset="loadHouses()"
          ></houses-actions>
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
    'houses-create': () => import('@/components/app/houses/Create.vue'),
    'houses-actions': () => import('@/components/app/houses/Actions.vue'),
  },

  data () {
    return {
      crumbs: [
        { text: 'Houses', disabled: true, },
      ],
      headers: [
        { text: 'House number', value: 'house' },
        { text: 'Tenant name', value: 'tenant' },
        { text: 'Balance', value: 'balance' },
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
  },

  mounted () {
    this.loadHouses()
  }
}
</script>

<style lang="scss" scoped>
  .dt-link {
    &:hover {
      border-bottom: 1px solid #3BACB6;
    }
  }
</style>