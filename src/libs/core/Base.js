export default class Base {
    constructor(fields) {
      this.setFields(fields)
    }
  
    setFields (fields) {
      for (let field in fields) {
        this[field] = fields[field];
      }
    }

    getFields (items = []) {
      let data = Object.assign({}, this);
      delete data['meta'];
      delete data['form'];
      delete data['group'];
      delete data['search'];
      if (items.length > 0) {
        for (let field in data) {
          if (items.indexOf(field) === -1) {
            delete data[field]
          }
        }
      }
      return data;
    }

    resetFields (fields) {
      for (let field in fields) {
        if (fields[field] instanceof Array) {
          fields[field].splice(0, fields[field].length);
        } else {
          this[field] = fields[field];
        }
      }
    }
  
    getFieldsExcept (trash = []) {
      trash.push('form');
      let data = Object.assign({}, this);
      trash.forEach((item) => {
        delete data[item];
      })
      return data;
    }
  
    correct (errors) {
      setTimeout(()=>{
        errors.clear();
      }, 100);
    }
  }
  