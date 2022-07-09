<template>
  <v-row 
    no-gutters
    class="app--full-height d-flex align-center justify-center"
  >
    <v-col 
      cols="12"
      md="3"
    >
      <v-card outlined class="rounded-xl">
        <v-card-text class="px-5 py-10">
          <div class="text-center">
            <v-avatar 
              size="45"
              tile
            >
              <img
                src="/logo.png"
                alt="Logo"
              >
            </v-avatar>
          </div>

          <router-view />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>