import Base from '@/libs/core/Base'

const fields = {
  meter_reading: null,
  house_id: null,
  tenant: {
    name: null,
    phone: '',
  },
}

export default class Tenancy extends Base {
  constructor () {
    super(fields)
  }

  store () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['meter_reading', 'tenant', 'house_id'])
        let response = await this.form.submit('post', `/api/apartments/${this.apartment.id}/tenancies`, data)
        this.setFields(fields)
        this.tenant.name = null
        this.tenant.phone = ''
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  destroy (tenancyId) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.form.submit('delete', `/api/apartments/${this.apartment.id}/tenancies/${tenancyId}`)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }
}