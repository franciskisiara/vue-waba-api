<template>
  <div>
    <v-btn
      color="primary"
      class="rounded-lg body-2 ttn"
      @click="dialog = true"
    >
      Add a house
    </v-btn>

    <house-form
      :dialog="dialog"
      @closed="closed()"
      @stored="stored()"
    ></house-form>
  </div>
</template>

<script>
export default {
  components: {
    'house-form': () => import('./includes/HouseForm.vue')
  },  
  
  data () {
    return {
      dialog: false
    }
  },

  methods: {
    closed () {
      this.dialog = false
    },

    stored () {
      this.$emit('stored')
    }
  }
}
</script>