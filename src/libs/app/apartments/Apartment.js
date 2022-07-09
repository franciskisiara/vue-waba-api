import Base from '@/libs/core/Base'
import Form from '@/libs/core/Form'
import { fields } from './ApartmentRepository'

export default class Apartment extends Base {
  constructor () {
    super(fields);
    this.form = new Form(fields)
    this.app = process.env.VUE_APP_NAME
  }

  store () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['name', 'unit_rate', 'flat_rate', 'flat_rate_limit'])
        let response = await this.form.submit('post', '/api/apartments', data)
        // this.encrypt(response.data)
        // this.setFields(fields)
        // resolve(response)

      } catch (err) {
        reject(err)
      }
    })
  }
}