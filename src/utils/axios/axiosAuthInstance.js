import axios from 'axios'
import configManager from '../../config/configManager'

const configData = configManager()

const axiosInstance = axios.create({
  baseURL: `${configData.API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const axiosAuthInstance = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params })
      return response
    } catch (error) {
      throw error
    }
  },
  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data)
      return response
    } catch (error) {
      throw error
    }
  },
  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default axiosAuthInstance
