import { resources, helpers } from './resources'
import UrlAction from "./UrlAction"
import axios from 'axios'
import vault from '@/libs/core/vault'

export default class Apix {
  constructor () {
    this.state = {}
    this.actions = {}
    this.getters = {}
    this.mutations = {}
    this.setState()
    this.setActions()
    this.setGetters()
    this.setMutations()
  }

  /*
   * Set the state variables
   */
  setState () {
    resources.forEach(({name}) => {
      this.state[name] = []
    })
  }

  /*
   * Return the state variables
   */
  getState () {
    return this.state
  }

  /*
   * Set the getters
   */
  setGetters () {
    resources.forEach( ({name}) => {
      let functionName = 'get' + helpers.upper(name)
      this.getters[functionName] = function (state) {
        return state[name]
      }.bind(this)
    })
  }

  /*
   * Get the getters
   */
  getGetters () {
    return this.getters
  }

  /*
   * Set the actions
   */
  setActions () {
    resources.forEach( ({name, url}) => {
      let baseUrl = `${process.env.VUE_APP_WABA_API}/api/${url.replace(/^\/+/g, '')}`
      let functionName = 'set' + helpers.upper(name)
      this.actions[functionName] = function(context, options = {}){
        let actionUrl = new UrlAction(baseUrl, options).getUrl()
        return new Promise((resolve, reject) => {
          axios.get(actionUrl, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${vault.extract('token')}`
            }
          })
            .then(({data}) => {
              context.commit(functionName, data)
              resolve(data)
            }).catch(error => {
              reject(error)
            })
        })
      }
    })
  }

  /*
   * Get actions
   */
  getActions () {
    return this.actions
  }

  /*
   * Set Mutations
   */
  setMutations () {
    resources.forEach( ({name}) => {
      let functionName = 'set' + helpers.upper(name)
      this.mutations[functionName] = (state, value) => {
        state[name] = value
      }
    })
  }

  /*
   * Get mutations
   */
  getMutations () {
    return this.mutations
  }
}
