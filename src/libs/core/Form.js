import Errors from './Errors'
import axios from 'axios'
import Auth from '@/libs/auth/Auth'

export default class Form {
  constructor (fields) {
    this.fields = fields
    this.errors = new Errors(fields)
  }

  submit (method, url, data) {
    return new Promise((resolve, reject) => {
      const token = (new Auth()).retrieve('token')
      axios({ 
        method, 
        url, 
        data, 
        // withCredentials: true,
        baseURL: process.env.VUE_APP_WABA_API,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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