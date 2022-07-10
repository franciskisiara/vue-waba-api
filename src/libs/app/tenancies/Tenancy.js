import Base from '@/libs/core/Base'
import Form from '@/libs/core/Form'
import { fields } from './TenancyRepository'

export default class Tenancy extends Base {
  constructor () {
    super(fields);
    this.form = new Form(fields)
    this.apartment = auth.retrieve('apartment')
  }

  store () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['meter_reading', 'tenant', 'house_id'])
        let response = await this.form.submit('post', `/api/apartments/${this.apartment.id}/tenancies`, data)
        this.setFields(fields)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }
}