<template>
  <v-card flat>
    <v-card-title>
       <div>
        <h1 class="text-h6 font-weight-bold text--darken-3">
          Tenancies
        </h1>
        <app-crumbs 
          :crumbs="crumbs"
        ></app-crumbs>
      </div>

      <v-spacer></v-spacer>

      <tenancies-create
        @stored="loadTenancies()"
      ></tenancies-create>
    </v-card-title>

    <v-card-text>
      <v-data-table
        flat 
        disable-sort
        class="mb-3 body-2" 
        hide-default-footer
        disable-pagination
        :headers="headers" 
        :items="tenancies.data"
      >
        <template v-slot:item.tenant="{ item }">
          {{ item.tenant.name }}
        </template>

        <template v-slot:item.house="{ item }">
          {{ item.house.house_number }}
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
        <!-- <template v-slot:top>
          <v-card-title class="pt-0 px-0">
            <v-spacer></v-spacer>
            <houses-create
              @stored="loadHouses()"
            ></houses-create>
          </v-card-title>
        </template>

        

         -->
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import vault from '@/libs/core/vault'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'tenancies-create': () => import('./Create.vue')
  },

  data () {
    return {
      crumbs: [
        { text: 'Tenancies', disabled: true, },
      ],
      headers: [
        { text: 'Tenant', value: 'tenant' },
        { text: 'House', value: 'house' },
        { text: 'Meter reading', value: 'reading' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },

  computed: {
    ...mapGetters({
      tenancies: 'getTenancies'
    })
  },

  methods: {
    ...mapActions([
      'setTenancies'
    ]),

    loadTenancies () {
      this.setTenancies({
        routes: {
          apartment: vault.extract('apartment').id
        },
        params: {
          relationships: 'house|tenant'
        }
      })
    }
  },

  mounted () {
    this.loadTenancies()
  }
}
</script>