import Vue from 'vue';
import Auth from '@/libs/auth/Auth'

window.auth = new Auth()
window.events = new Vue();
window.flash = function(details){
  window.events.$emit('flash', details);
};

// window.axios = require('axios');
