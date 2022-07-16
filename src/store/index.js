import Vue from 'vue';
import Vuex from 'vuex';
import apix from './apix';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    ...apix.state,
  },

  getters: {
    ...apix.getters,
  },

  actions: {
    ...apix.actions,
  },

  mutations: {
    ...apix.mutations,
  },
});

export default store
