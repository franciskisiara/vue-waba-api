import Base from '@/libs/core/Base'
import Form from '@/libs/core/Form'
import { fields } from './AuthRepository'

export default class Auth extends Base {
  constructor () {
    super(fields);
    this.form = new Form(fields)
    this.app = process.env.VUE_APP_NAME
  }

  login () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['phone', 'password', 'device_name'])
        let response = await this.form.submit('post', '/api/token/generate', data)
        this.encrypt(response.data)
        this.setFields(fields)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }
}