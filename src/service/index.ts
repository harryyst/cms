import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { TIME_OUT, BASE_URL } from './config/index'
import stRequest from './request'

const STRequest = new stRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors: {
  //   requestSuccessFn: (config) => {
  //     const token = localCache.getCache(LOGIN_TOKEN)
  //     if (config.headers && token) {
  //       config.headers.Authorization = 'Bearer ' + token
  //     }
  //     return config
  //   }
  // }
})

export default STRequest
