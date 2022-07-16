<template>
  <div>
    <v-text-field
      dense
      outlined
      persistent-hint
      label="Verification code"
      class="rounded-lg"
      v-model="code"
      :hint="errors.get('code')"
      :error="errors.has('code')"
      @input="$emit('clear')"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    errors: Object
  },

  data () {
    return {
      code: '', 
    }
  },

  watch: {
    code (value) {
      this.$emit('coded', value)
    }
  }
}
</script>