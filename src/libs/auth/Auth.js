import Base from '@/libs/core/Base'
import Form from '@/libs/core/Form'
import { fields } from './AuthRepository'

export default class Auth extends Base {
  constructor () {
    super(fields);
    this.form = new Form(fields)
    this.app = process.env.VUE_APP_PORTAL
  }

  register () {
    return new Promise(async (resolve, reject) => {
      try {
        const data = this.getFields(['name', 'phone'])
        let response = await this.form.submit('post', '/api/register', data)
        this.encrypt(response.data)
        this.setFields(fields)
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
        this.encrypt(response.data)
        this.setFields(fields)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  logout () {
    /** @todo - add call to API to expire the token */
    localStorage.removeItem(this.app)
    location.href='/auth/login'
    flash({
      message: 'Successfully logged out'
    })
  }
}