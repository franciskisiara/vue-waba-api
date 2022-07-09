import Base from '@/libs/core/Base'
import Form from '@/libs/core/Form'
import { fields } from './HouseRepository'

export default class House extends Base {
  constructor () {
    super(fields);
    this.form = new Form(fields)
    this.app = process.env.VUE_APP_NAME
    this.apartment = auth.retrieve('apartment')
  }

  store () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['house_number'])
        let response = await this.form.submit('post', `/api/apartments/${this.apartment.id}/houses`, data)
        this.setFields(fields)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }
}