<template>
  <div>
    {{ tenancyId }}
  </div>
</template>

<script>
export default {
  computed: {
    tenancyId () {
      return this.$route.params.tenancyId
    }
  }
}
</script>