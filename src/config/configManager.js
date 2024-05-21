import devCompanyData from './dev.data.json'
import defaultCompanyData from './production.data.json'

const configManager = () => {
  const env = process.env.REACT_APP_ENV || 'production'
  return env === 'production' ? defaultCompanyData : devCompanyData
}

export default configManager
