import Base from '@/libs/core/Base'
import vault from '@/libs/core/vault'

const fields = {
  device_name: 'browser',
  name: '',
  phone: '',
  code: '',   
}

export default class Auth extends Base {
  constructor () {
    super(fields)
  }

  register () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['name', 'phone'])
        let response = await this.form.submit('post', '/api/register', data)
        vault.insert(response.data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  generateCode () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['phone',])
        let response = await this.form.submit('post', '/api/code/generate', data)
        vault.insert(response.data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  login () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['phone', 'code'])
        let response = await this.form.submit('post', '/api/login', data)
        vault.insert(response.data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  logout () {
    vault.destroy()
    location.href = '/auth/login'
  }
}