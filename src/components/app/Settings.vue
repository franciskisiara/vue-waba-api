<template>
  <v-card flat>
    <v-card-title>
       <div>
        <h1 class="text-h6 font-weight-bold text--darken-3">
          Settings - {{ page }} 
        </h1>
        <app-crumbs 
          :crumbs="crumbs"
        ></app-crumbs>
      </div>
    </v-card-title>

    <v-card-text>
      <v-row d-flex>
        <v-col md="3" cols="12">
          <v-list>
            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :to="`/settings/${link.to}`"
            >
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ link.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col 
          md="8" 
          cols="12"
          class="mt-2"
        >
          <router-view 
            @loaded="initialise"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import * as _ from 'lodash'

export default {
  data () {
    return {
      page: '',
      crumbs: [],
      links: [
        { text: 'Houses', to: 'houses', },
        { text: 'Pricing', to: 'pricing', },
      ]
    }
  },

  methods: {
    initialise (details) {
      this.page = details.page
      let crumbs = [
        { text: 'Settings', disabled: true, },
      ]
      this.crumbs = _.uniqWith(crumbs.concat(details.crumbs), _.isEqual);
    }
  },
}
</script>