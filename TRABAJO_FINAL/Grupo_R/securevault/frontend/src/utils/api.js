import axios from 'axios'

const api = axios.create({
  baseURL: '',
  timeout: 10000,
})

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const r = await axios.post('/api/v1/auth/refresh', { refresh_token: refresh })
          const newToken = r.data.access_token
          localStorage.setItem('access_token', newToken)
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
          err.config.headers['Authorization'] = `Bearer ${newToken}`
          return api.request(err.config)
        } catch {
          localStorage.clear()
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(err)
  }
)

export default api
