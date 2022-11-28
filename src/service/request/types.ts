import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface stInterceptors<T> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface stRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: stInterceptors<T>
}
