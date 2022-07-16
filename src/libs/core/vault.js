import { merge } from 'lodash'

const app = process.env.VUE_APP_PORTAL

export const details = () => {
  const data = localStorage.getItem(app)
  return data ? JSON.parse(data) : {}
}

export const insert = (info) => {
  const data = merge(details(), info)
  localStorage.setItem(app, JSON.stringify(data))
}

export const extract = (key) => details()[key]

export const destroy = () => {
  localStorage.removeItem(app)
}

export default {
  details,
  insert,
  extract,
  destroy,
}