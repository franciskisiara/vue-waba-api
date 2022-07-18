<template>
  <div>
    <v-menu 
      left
      offset-x
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
        width="200"
      >
        <v-list-item
          v-for="action, i in actions"
          :key="`action-${i}`"
          @click="run(action)"
        >
          <v-list-item-title>
            {{ action.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <tenancies-create
      :house="house"
      :action="action"
      @closed="close()"
      @stored="reset()"
    ></tenancies-create>

    <tenancies-delete
      :house="house"
      :action="action"
      @closed="close()"
      @deleted="reset()"
    ></tenancies-delete>

    <meter-readings-create
      :house="house"
      :action="action"
      @closed="close()"
      @deleted="reset()"
    ></meter-readings-create>
  </div>
</template>

<script>
export default {
  props: [
    'house'
  ],

  components: {
    'tenancies-create': () => import('@/components/app/tenancies/Create.vue'),
    'tenancies-delete': () => import('@/components/app/tenancies/Delete.vue'),
    'meter-readings-create': () => import('@/components/app/meter_readings/Create.vue'),
  },

  data () {
    return {
      action: '',
      actions: [
        { text: 'Rent house', key: 'board', tenancy: false },
        { text: 'Vacate tenant', key: 'vacate', tenancy: true },
        { text: 'Record reading', key: 'record', tenancy: true },
        { text: 'Collect payments', key: 'collect', tenancy: true },
      ],
    }
  },

  methods: {
    run (action) {
      if (action.tenancy && !this.house.active_tenancy_id) {
        flash({ message: 'Action requires an active tenancy' })
        return
      }

      if (!action.tenancy && this.house.active_tenancy_id) {
        flash({ message: 'Action requires house to be vacant' })
        return
      }

      this.action = action.key
    },

    close () {
      this.action = ''
    },

    reset () {
      this.close()
      this.$emit('reset')
    },
  }
}
</script>