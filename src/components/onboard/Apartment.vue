<template>
  <div>
    <div class="text-center">
      <v-avatar 
        size="128"
        tile
      >
        <img
          src="/apartment.png"
          alt="Logo"
        >
      </v-avatar>
    </div>

    <div class="pt-10">
      <div class="mb-1">
         <label class="body-1 font-weight-bold">
          Enter your apartments' name
        </label>
      </div>
     
      <v-text-field
        outlined
        class="rounded-lg"
      ></v-text-field>

      <v-btn
        block
        x-large
        class="body-2 font-weight-bold"
        color="primary"
      >
        Save and continue
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>