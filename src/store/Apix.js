import axios from 'axios'
import resources from '@/store/resources'
import vault from '@/libs/core/vault'

const helpers = {
  upper: string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  endpoint: (url, options) => {
    const path = options.path || {}
    for (let element in path) {
      url = url.replace(`:${element}`, path[element])
    }
    return url
  }
}

const setup = {
  state: () => {
    const state = {}
    resources.forEach(({ name }) => {
      state[name] = []
    })
    return state
  },

  getters: () => {
    const getters = {}
    resources.forEach(({ name }) => {
      const functionName = 'get' + helpers.upper(name)
      getters[functionName] = function (state) {
        return state[name]
      }.bind(this)
    })
    return getters
  },

  actions: () => {
    const actions = {}
    resources.forEach(({ name, url }) => {
      const functionName = 'set' + helpers.upper(name)
      actions[functionName] = function (context, options = {}) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'get',
            baseURL: `${process.env.VUE_APP_WABA_API}/api`,
            url: helpers.endpoint(url, options),
            params: options.params,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${vault.extract('token')}`
            }
          }).then(({ data }) => {
            context.commit(functionName, data)
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      }
    })
    return actions
  },

  mutations () {
    const mutations = {}
    resources.forEach( ({name}) => {
      const functionName = 'set' + helpers.upper(name)
      mutations[functionName] = (state, value) => {
        state[name] = value
      }
    })
    return mutations
  }
}

export default {
  state: setup.state(),
  getters: setup.getters(),
  actions: setup.actions(),
  mutations: setup.mutations(),
}
