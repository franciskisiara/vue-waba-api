<template>
  <v-dialog
    v-model="dialog"
    width="350"
    persistent
  >
    <v-card>
      <v-card-title>
        <h2 class="text-subtitle-1 font-weight-bold">
          {{ house ? `Update` :`Record` }} house details
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

      <v-divider class="mb-4"></v-divider>

      <v-card-text>
        <v-text-field
          dense
          outlined
          persistent-hint
          class="rounded-lg"
          label="House number"
           v-model="houseObj.house_number"
          :hint="errors.get('house_number')"
          :error="errors.has('house_number')"
          @input="errors.clear('house_number')"
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
          {{ house ? 'Update' : 'Save' }} House Details
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import House from '@/libs/app/houses/House'

export default {
  props: [
    'house',
    'dialog'
  ],  
  
  data () {
    return {
      loading: false,
      houseObj: new House(),
    }
  },

  computed: {
    errors () {
      return this.houseObj.form.errors
    }
  },

  methods: {
    submit () {
      if (!this.loading) {
        this.loading = true
        !this.house ? this.store() : this.update()
      }
    },

    store () {
      this.houseObj.store()
        .then((response) => {
          flash(response)
          this.$emit('stored')
        }).finally(() => {
          this.loading = false
        })
    },
  },
}
</script>