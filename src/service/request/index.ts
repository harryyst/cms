import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { stRequestConfig } from './types'
import dayjs from 'dayjs'
class stRequest {
  instance: AxiosInstance
  constructor(config: stRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        // config.data = 1
        config.data = {
          Head: {
            TransDate: dayjs(new Date()).format('YYYYMMDD'),
            TransTime: dayjs(new Date()).format('HHmmss'),
            TraceNo: String(Math.random() * 100000000000000000)
          },
          Req: config.data
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: stRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve) => {
      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors.responseSuccessFn(res)
        }
        resolve(res)
      })
    })
  }
  get<T = any>(config: stRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: stRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: stRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: stRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default stRequest
