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
          Collect payment
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

      <v-divider class="mb-5"></v-divider>
      
      <v-card-text>
        <v-text-field
          dense
          outlined
           persistent-hint
          class="rounded-lg"
          label="Amount paid"
          v-model="paymentObj.amount"
          :hint="errors.get('amount')"
          :error="errors.has('amount')"
          @input="errors.clear('amount')"
        ></v-text-field>
      </v-card-text>

      <v-card-actions class="px-5 pb-5">
        <v-btn
          block
          large
          type="submit"
          color="primary"
          class="rounded-lg caption font-weight-bold"
          :dark="!loading"
          :loading="loading"
          :disabled="loading"
          @click="submit()"
        >
          Record Payment
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Payment from '@/models/Payment'

export default {
  props: [
    'house',
    'action'
  ],

  data () {
    return {
      dialog: false,
      loading: false,
      paymentObj: new Payment()
    }
  },

  watch: {
    action (action) {
      this.dialog = action == 'collect' && this.house.tenancy
    }
  },

  computed: {
    errors () {
      return this.paymentObj.form.errors
    }
  },

  methods: {
    submit () {
      if (!this.loading) {
        this.loading = true
        this.paymentObj.tenancy_id = this.house.tenancy.id
        this.paymentObj.store()
          .then((response) => {
            flash(response)
            this.$emit('stored')
          }).finally(() => {
            this.loading = false
          })
      }
    },
  }
}
</script>
