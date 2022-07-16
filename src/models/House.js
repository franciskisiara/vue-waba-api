import Base from '@/libs/core/Base'
import vault from '@/libs/core/vault'

const fields = {
  house_number: null,
}

export default class House extends Base {
  constructor () {
    super(fields)
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