<template>
  <v-dialog
    v-if="dialog"
    v-model="dialog"
    width="360"
    persistent
  >
    <v-card>
      <v-card-title>
        <h2 class="text-subtitle-1 font-weight-bold">
          Vacate tenant
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
            @close="$emit('closed')"
          >
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>
      
      <v-card-text>
        <p class="mt-3">
          Are you sure you want to vacate the tenant <b>{{ house.tenant.name }}</b>?
          <br><br>
          You will not be able to record units for <b>house {{ house.house_number }}</b> until a new tenant moves in.
        </p>
      </v-card-text>

      <v-card-actions class="px-5 pb-5">
        <v-btn
          block
          large
          type="submit"
          color="#e74c3c"
          class="rounded-lg caption font-weight-bold"
          :dark="!loading"
          :loading="loading"
          :disabled="loading"
          @click="submit()"
        >
          Yes! Vacate {{ house.tenant.name }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Tenancy from '@/models/Tenancy'

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
    action (action) {
      this.dialog = action == 'vacate' && this.house.tenancy
    }
  },

  computed: {
    errors () {
      return this.tenancyObj.form.errors
    }
  },

  methods: {
    submit () {
      if (!this.loading) {
        this.loading = true
        this.tenancyObj.destroy(this.house.tenancy.id)
          .then((response) => {
            flash(response)
            this.$emit('deleted')
          }).finally(() => {
            this.loading = false
          })
      }
    },
  }
}
</script>
