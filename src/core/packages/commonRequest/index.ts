
import axios from 'axios'
import qs from 'qs'
import { isString, merge } from 'lodash'
import { InterceptorManager } from './modules/interceptor'

import type { AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios'
import type { RequestClientConfig, RequestClientOptions } from './interfaces'

function getParamsSerializer(
  paramsSerializer: RequestClientOptions['paramsSerializer'],
) {
  if (isString(paramsSerializer)) {
    return (params: any) => qs.stringify(params, { arrayFormat: paramsSerializer })
  }
  return paramsSerializer
}

// 默认axios配置
const defaultConfig: CreateAxiosDefaults = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  // 默认超时时间
  timeout: 10_000,
}
class RequestClient {
  /** 请求拦截器 */
  public addRequestInterceptor: InterceptorManager['addRequestInterceptor']
  /** 响应拦截器 */
  public addResponseInterceptor: InterceptorManager['addResponseInterceptor']
  /** 请求实例 */
  public readonly instance: AxiosInstance
  constructor(options: CreateAxiosDefaults = {}) {
    const requestConfig = merge({
      ...options,
      ...defaultConfig,
    })
    requestConfig.paramsSerializer = getParamsSerializer(
      requestConfig.paramsSerializer,
    )
    this.instance = axios.create(requestConfig)
    const interceptorManager = new InterceptorManager(this.instance)
    this.addRequestInterceptor = interceptorManager.addRequestInterceptor.bind(interceptorManager)
    this.addResponseInterceptor = interceptorManager.addResponseInterceptor.bind(interceptorManager)
  }

  /** DELETE请求方法 */
  public delete<T = any>(
    url: string,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' })
  }

  /** GET请求方法 */
  public get<T = any>(url: string, config?: RequestClientConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  /** 获取基础URL */
  public getBaseUrl() {
    return this.instance.defaults.baseURL
  }

  /** POST请求方法 */
  public post<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    try {
      return this.request<T>(url, { ...(config || {}), data, method: 'POST' })
    } catch (error: any) {
      console.error('POST请求错误：', error)
    }
  }

  /** PUT请求方法 */
  public put<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'PUT' })
  }

  /** 通用的请求方法 */
  public async request<T>(
    url: string,
    config: RequestClientConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance({
        url,
        ...config,
        ...(config.paramsSerializer
          ? { paramsSerializer: getParamsSerializer(config.paramsSerializer) }
          : {}),
      })
      return response as T
    } catch (error: any) {
      throw error.response ? error.response.data : error
    }
  }
}

export { RequestClient }