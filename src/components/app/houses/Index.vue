<template>
  <v-card 
    v-if="initialised"
    class="rounded-lg"
    outlined
  >
    <v-card-text >
      <v-data-table
        flat 
        disable-sort
        class="mb-3 body-2" 
        hide-default-footer
        disable-pagination
        :headers="headers" 
        :items="houses.data"
      >
        <template v-slot:top>
          <v-card-title class="pt-0 px-0">
            <v-spacer></v-spacer>
            <houses-create
              @stored="loadHouses()"
            ></houses-create>
          </v-card-title>
        </template>

        <template v-slot:item.tenant="{ item }">
          {{ item.tenant ? item.tenant.name : 'n/a' }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            dark
            label
            small
            text
            color="#e74c3c"
            class="caption ttn ma-0"
            @click="lease(item)"
            style="background-color: rgba(231, 76, 60,0.1)"
          >
            Vacate
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
    'houses-create': () => import('@/components/app/houses/Create.vue')
  },

  data () {
    return {
      headers: [
        { text: 'House number', value: 'house_number' },
        { text: 'Tenant name', value: 'tenant' },
        { text: 'Tenant phone', value: 'tenant' },
        // { text: 'Actions', value: 'actions' },
      ],
    }
  },

  computed: {
    ...mapGetters({
      houses: 'getHouses'
    }),

    initialised () {
      return this.houses.data
    },
  },

  methods: {
    ...mapActions([
      'setHouses'
    ]),

    loadHouses () {
      const apartment = vault.extract('apartment')
      this.setHouses({
        routes: {
          apartment: apartment.id
        }
      })
    },
  },

  mounted () {
    this.$emit('loaded', {
      page: 'Houses',
      crumbs: [
        { text: 'Houses', disabled: true, },
      ],
    })
    this.loadHouses()
  }
}
</script>