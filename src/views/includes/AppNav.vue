<template>
  <v-bottom-navigation app>
    <v-btn
      v-for="link, i in links"
      :key="`link-${i}`"
      :to="link.to"
      color="primary"
      small
      text
    >
      <span>{{ link.title }}</span>
      <v-icon>
        {{ link.icon }}
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { title: 'Dashboard', icon: 'mdi-google-analytics', to: '/' },
        { title: 'Houses', icon: 'mdi-home-group', to: '/houses' },
        { title: 'Readings', icon: 'mdi-gauge', to: '/meter-readings' },
      ]
    }
  }
}
</script>