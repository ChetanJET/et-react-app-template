import axios from 'axios'

import { getToken, removeToken } from '../../utils/cookies/cookies'

import configManager from '../../config/configManager'
const configData = configManager()

const axiosInterceptorInstance = axios.create({
  baseURL: configData.API_URL,
})

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const accessToken = getToken()
    if (accessToken) {
      if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error

    if (response.status === 404) {
      const event = new CustomEvent('historyChange', {
        detail: { path: '/' },
      })
      error.isErrorHandled = true
      window.dispatchEvent(event)
    }

    if (response) {
      const { status } = response

      if (status === 401) {
        logoutUser()
      }
    }

    return Promise.reject(error)
  },
)

const logoutUser = () => {
  removeToken()
  window.location.reload()
}

export default axiosInterceptorInstance
