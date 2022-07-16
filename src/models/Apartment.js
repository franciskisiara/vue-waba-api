import Base from '@/libs/core/Base'
import vault from '@/libs/core/vault'

const fields = {
  name: null,
  flat_rate: null,
  unit_rate: null,
  flat_rate_limit: null,
}

export default class Apartment extends Base {
  constructor () {
    super(fields)
  }

  store () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields()
        let response = await this.form.submit('post', '/api/apartments', data)
        vault.insert({ apartment: response.data })
        this.setFields(fields)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  update () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['name', 'flat_rate', 'unit_rate', 'flat_rate_limit'])
        let response = await this.form.submit('patch', `/api/apartments/${this.apartment.id}`, data)
        vault.insert({ apartment: response.data })
        this.setFields(fields)
        resolve({})
      } catch (err) {
        reject(err)
      }
    })
  }
}