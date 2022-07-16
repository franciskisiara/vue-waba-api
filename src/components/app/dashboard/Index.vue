<template>
  <v-card flat>
    <div>
      <h1 class="text-h6 font-weight-bold text--darken-3">
        Dashboard
      </h1>
      <app-crumbs 
        :crumbs="[]"
      ></app-crumbs>
    </div>

    <v-card-text>
      {{ houses.data }}
    </v-card-text>
  </v-card>
</template>

<script>
import vault from '@/libs/core/vault'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'houses-create': () => import('./Index.vue')
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
    }
  },

  mounted () {
    this.loadHouses()
  }
}
</script>