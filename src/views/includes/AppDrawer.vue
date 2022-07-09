<template>
  <v-navigation-drawer
    app
    fixed
    width="300"
  >
    <template v-slot:prepend>
      <div class="drawer-logo d-flex justify-center align-center">
        <v-avatar 
          size="50"
          tile
        >
          <img
            src="/logo.png"
            alt="Logo"
          >
        </v-avatar>
        <!-- <span class="font-weight-bold body-1">
          Waba
        </span> -->
      </div>
    </template>

    <v-list style="margin: 0px 0 120px 0; padding: 0 25px" rounded>
      <v-list-item
        :key="`sidebar-${index}`"
        :to="link.to"
        active-class="active"
        v-for="(link, index) in links"
      >
        <v-list-item-title class="body-2">
          {{ link.title }}
        </v-list-item-title>

        <v-list-item-action>
          <v-icon small>
            {{ `mdi-${link.icon}` }}
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- <template v-slot:append>
      <div style="padding: 0 25px 30px 25px">
        <v-btn block>
          Logout
        </v-btn>
      </div>
    </template> -->
  </v-navigation-drawer>
</template>

<script>
export default {
  props: [
    "showDrawer"
  ],

  data () {
    return {
      links: [
        // { title: 'Dashboard', to: '/', icon: 'chart-bar-stacked' },
        { title: 'Houses', to: '/houses', icon: 'home' },
        { title: 'Tenants', to: '/tenants', icon: 'account-multiple' },
        { title: 'Readings', to: '/readings', icon: 'meter-gas' },
      ]
    }
  },

  methods: {
    input (input) {
      if (input == false) {
        this.$emit('closed')
      }
    }
  },
}
</script>