import { ElMessage } from 'element-plus'
import qs from 'qs'
import { useAuthStore } from '../../auth/pinia/useAuthStore'
import { getErrorMsg } from '../constants'

import type { AxiosInstance, AxiosResponse } from 'axios'
import type { IRequestError, IRes } from './interfaces'
import type {
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
} from '../interfaces'

const defaultReqInterceptorConfig: RequestInterceptorConfig = {
  async fulfilled(config) {
    try {
      const authStore = useAuthStore()
      const token: string = authStore.userInfo.token
      const isGet = config.method === 'get'
      if (isGet && config.params) {
        config.paramsSerializer = params => (qs.stringify(params, { arrayFormat: 'brackets', allowDots: true }))
      }
      // 自定义请求头
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
      }
      return config
    } catch (error: any)  {
      console.error(`请求拦截器执行失败，失败原因：${error}`)
    }
  },
  rejected(error) {
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(error)
  },
}

const defaultResInterceptorConfig: ResponseInterceptorConfig<IRes> = {
  fulfilled(res: AxiosResponse<IRes>) {
    const authStore = useAuthStore()
    const businessStatusCode = res.data.code
    if (businessStatusCode !== 200) {
      if ([401, 403].includes(businessStatusCode)) {
        authStore.resetApp?.()
      }
      ElMessage.error(res.data.message)
      return Promise.reject(res)
    }
    return res.data?.data
  },
  rejected(error: IRequestError) {
    const authStore = useAuthStore()
    const status = error.response?.status || 500
    const message = getErrorMsg(status)

    // 特殊处理401（未授权）
    if ([401, 403].includes(status)) {
      authStore.resetApp?.()
    }

    const customMessage = (error?.response?.data as Record<string, any>)?.message
    ElMessage.error(`${message} ${customMessage ? `原因：${customMessage}` : ''}`)
    return Promise.reject(error)
  },
}

class InterceptorManager {
  private axiosInstance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance
  }

  addRequestInterceptor({
    fulfilled,
    rejected,
  }: RequestInterceptorConfig = defaultReqInterceptorConfig) {
    this.axiosInstance.interceptors.request.use(fulfilled, rejected)
  }

  addResponseInterceptor({
    fulfilled,
    rejected,
  }: ResponseInterceptorConfig<IRes> = defaultResInterceptorConfig) {
    this.axiosInstance.interceptors.response.use(fulfilled, rejected)
  }
}

export { InterceptorManager }
