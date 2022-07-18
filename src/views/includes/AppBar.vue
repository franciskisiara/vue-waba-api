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
      <div
        class="ma-0 mr-5 body-1 font-weight-bold secondary--text"
      >
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

    <div class="links hidden-sm-and-down"> 
      <v-btn
        v-for="link, i in links"
        :key="`link-${i}`"
        :to="link.to"
        active-class="active"
        class="ttn body-2"
        text
      >
        {{ link.title }}
      </v-btn>
    </div>
    
    <v-spacer></v-spacer>

    <!-- <v-btn 
      icon
      small
      @click="search()"
    >
      <v-icon small>
        mdi-magnify
      </v-icon>
    </v-btn> -->

    <v-avatar
      v-if="user.avatar"
      size="30"
      class="white--text mx-1"
    >
      <img
        :src="user.avatar"
        alt="Avatar"
      >
    </v-avatar>

    <v-avatar
      v-else
      size="30"
      color="secondary"
      class="white--text mx-1 body-2"
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
import vault from '@/libs/core/vault'

export default {
  data () {
    return {
      links: [        
        // { title: 'Dashboard', icon: 'mdi-home-group', to: '/' },
        { title: 'Houses', icon: 'mdi-gauge', to: '/houses' },
        // { title: 'Meter Readings', icon: 'mdi-gauge', to: '/readings' },
        // { title: 'Payments', icon: 'mdi-gauge', to: '/payments' },
      ]
    }
  },  

  computed: {
    user: () => vault.extract('user'),
    apartment: () => vault.extract('apartment'),
  },

  methods: {
    logout () {
      vault.destroy()
      location.href = '/auth/login' 
    }
  }
}
</script>