import Form from '@/libs/core/Form'
import vault from './vault'
export default class Base {
  constructor(fields) {
    this.setFields(fields)
    this.form = new Form(fields)
    this.apartment = vault.extract('apartment')
  }

  setFields(fields) {
    for (let field in fields) {
      this[field] = fields[field]
    }
  }

  getFields(items = []) {
    let data = Object.assign({}, this)
    if (items.length > 0) {
      for (let field in data) {
        if (items.indexOf(field) === -1) {
          delete data[field]
        }
      }
    }
    return data
  }
}