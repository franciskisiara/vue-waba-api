<template>
  <v-menu 
    offset-x
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        small
        v-on="on"
        v-bind="attrs"
        color="#e74c3c"
        class="body-2 ttn rounded-0 pa-0 px-2"
        style="border-bottom: 1px dashed #e74c3c;"
      >
        <v-icon 
          small
          class="mr-1"
        >
          mdi-information
        </v-icon> 
        Ksh {{ meterReading.bill.total_charge }}
      </v-btn>
    </template>
    <v-list 
      dense
      width="240"
    >
      <v-list-item 
        v-for="item, i in items"
        :key="`billing-${i}`"
      >
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>

        <v-list-item-action-text>
          {{ meterReading[item.value] }}
        </v-list-item-action-text>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: [
    'meterReading'
  ],

  data () {
    return {
      items: [
        { text: 'Previous units', value: 'previous_units' },
        { text: 'Current units', value: 'current_units' },
        { text: 'Units consumed', value: 'consumed_units' },
      ]
    }
  }
}
</script>