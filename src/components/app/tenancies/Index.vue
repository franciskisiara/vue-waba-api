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
      <!-- <houses-index></houses-index> -->
    </v-card-text>
  </v-card>
</template>

<script>
import vault from '@/libs/core/vault'
import { mapActions } from 'vuex'

export default {
  components: {
    'tenancies-create': () => import('./Create.vue')
  },

  data () {
    return {
      crumbs: [
        { text: 'Tenancies', disabled: true, },
      ],
    }
  },

  methods: {
    ...mapActions([
      'setTenancies'
    ]),

    loadTenancies () {
      this.setTenancies({
        routes: {
          apartment: vault.extract('apartment').id
        }
      })
    }
  },

  mounted () {
    this.loadTenancies()
  }
}
</script>