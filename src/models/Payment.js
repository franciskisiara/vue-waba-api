import Base from '@/libs/core/Base'

const fields = {
  tenancy_id: null,
  amount: null,
}

export default class Payment extends Base {
  constructor () {
    super(fields)
  }

  store () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['tenancy_id', 'amount'])
        let response = await this.form.submit('post', `/api/apartments/${this.apartment.id}/payments`, data)
        this.setFields(fields)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }
}