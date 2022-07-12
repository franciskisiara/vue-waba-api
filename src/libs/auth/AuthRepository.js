const app = process.env.VUE_APP_PORTAL

export const fields = {
  device_name: 'browser',
  name: 'Francis Kisiara',
  phone: '+254711887341',
  code: 8912,

  /** 
   * Please ... do not send these to the backend
   * If you happen to do so - meh! nothing will happen
   * Backend does what backend wants - and it doesnt want these
   */
  encrypt: (data) => {
    localStorage.setItem(app, JSON.stringify(data))
  },

  decrypt: () => {
    const portal = localStorage.getItem(app)
    if (!portal) return null
    return JSON.parse(portal)
  },

  retrieve: (key) => {
    const decrypted = fields.decrypt()
    return decrypted ? decrypted[key] : null
  },
}