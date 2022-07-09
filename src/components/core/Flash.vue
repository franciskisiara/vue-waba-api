<template>
  <v-snackbar
    :bottom="true"
    :right="true"
    :value="show"
    :timeout="timeout"
    multi-line
  >
    {{ body }}
    <v-btn
      text
      color="pink"
      @click.native="show = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: ['details'],

  data(){
    return {
      body: '',
      show: false,
      alert: null,
      timeout: 6000
    }
  },

  methods: {
    flash(details){
      this.body = details.message;

      this.alert = details.alert;

      this.timeout = details.timeout ? details.timeout : 6000;

      this.show = true;

      setTimeout(() => {
          this.body = '';
          this.show = false;
          this.alert = null;
      }, this.timeout);
    },
  },

  created(){
    window.events.$on('flash', details => {
      this.flash(details)
    });
  }
}
</script>
