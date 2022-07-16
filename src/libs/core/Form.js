import axios from 'axios'
import Errors from '@/libs/core/Errors'
import vault from '@/libs/core/vault'

export default class Form {
  constructor (fields) {
    this.fields = fields
    this.errors = new Errors(fields)
  }

  submit (method, url, data = {}) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: process.env.VUE_APP_WABA_API,
        method, 
        url, 
        data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${vault.extract('token')}`
        }
      })
        .then(({ data }) => {
          resolve(data)
        }).catch(({ response }) => {
          this.errors.record(response.data)
          reject(response.data)
        })
    })
  }
}