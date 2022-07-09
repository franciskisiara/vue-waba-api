import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
        //   primary: '#2F8F9D',
          primary: '#3BACB6',
          secondary: '#40596b',
          accent: '#5CDB95',
        }
      },
    },
  });
