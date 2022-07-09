<template>
  <v-app-bar 
    app
    class="pl-2"
    height="80"
    color="#fff"
    elevation="0"
    style="border-bottom: 1px solid #ddd"
  >
    <v-toolbar-title>
      <div class="ma-0 text-h6 font-weight-bold secondary--text">
        <v-avatar 
          size="30"
          tile
        >
          <img
            src="/logo.png"
            alt="Logo"
          >
        </v-avatar> {{ apartment.name }}
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-avatar
      v-if="user.avatar"
      size="34"
      class="white--text mx-1"
    >
      <img
        :src="user.avatar"
        alt="Avatar"
      >
    </v-avatar>

    <v-avatar
      v-else
      size="34"
      color="secondary"
      class="white--text mx-1"
    >
      {{ user.name.charAt(0) }}
    </v-avatar>

    <v-btn 
      icon
      small
      class="mr-2"
      color="red"
      @click="logout()"
    >
      <v-icon small>
        mdi-power-standby
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    user: () => auth.retrieve('user'),
    apartment: () => auth.retrieve('apartment'),
  },

  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>