<template>
  <v-dialog
    v-if="house != null"
    v-model="dialog"
    width="380"
    persistent
  >
    <v-card>
      <v-card-title>
        <h2 class="text-subtitle-1 font-weight-bold">
          Remove tenant from {{ house.house_number }}
        </h2>
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          color="red"
          @click="$emit('closed')"
        >
          <v-icon 
            small 
            color="red"
          >
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

    </v-card>
  </v-dialog>
</template>

<script>
import Tenancy from '@/libs/app/tenancies/Tenancy'

export default {
  props: [
    'house',
    'action'
  ],

  data () {
    return {
      dialog: false,
      loading: false,
      tenancyObj: new Tenancy()
    }
  },

  watch: {
    house (house) {
      this.dialog = Boolean(house) && this.action == 'evict'
    }
  },

//   computed: {
//     errors () {
//       return this.tenancyObj.form.errors
//     }
//   },

//   methods: {
//     submit () {
//       if (!this.loading) {
//         this.loading = true
//         this.tenancyObj.house_id = this.house.id
//         this.tenancyObj.store()
//           .then((response) => {
//             flash(response)
//             this.$emit('leased')
//           }).finally(() => {
//             this.loading = false
//           })
//       }
//     },
//   }
}
</script>
