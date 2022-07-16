import Vue from 'vue'

window.events = new Vue()
window.flash = (details) => {
  window.events.$emit('flash', details)
}
