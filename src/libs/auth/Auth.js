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

  }
}