import Errors from './Errors'
import axios from 'axios'

export default class Form {
  constructor (fields) {
    this.fields = fields
    this.errors = new Errors(fields)
  }

  submit (method, url, data) {
    return new Promise((resolve, reject) => {
      axios({ 
        method, 
        url, 
        data, 
        withCredentials: true,
        baseURL: process.env.VUE_APP_RECRUITER_API,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
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