import { AxiosResponse } from "axios"

/** 接口业务出参格式 */
export interface IRes<T = any> {
  /** 业务状态码：0 表示成功，其他为失败 */
  code: number
  /** 接口返回的数据主体 */
  data: T
  /** 返回信息或错误描述 */
  message: string
}

/** 响应错误的出参格式 */
export interface IRequestError {
  /** 错误信息，如 "Request failed with status code 404" */
  message: string
  /** 错误名称，如 "AxiosError" */
  name: string
  /** 错误堆栈信息 */
  stack?: string
  /** Axios 配置对象（请求时的配置） */
  config: {
    /** 超时配置 */
    timeout?: number
    /** 基础 URL */
    baseURL?: string
    /** 请求 URL */
    url?: string
    /** 请求方法 */
    method?: string
    /** 请求头 */
    headers?: Record<string, any>
    /** 适配器（xhr/http/fetch） */
    adapter?: string[]
    /** 其他自定义字段 */
    [key: string]: any
  }
  /** Axios 错误码，如 "ERR_BAD_REQUEST" */
  code?: string
  /** HTTP 状态码，如 404、500 等 */
  status?: number
  /** Axios 原始响应对象（可能在请求失败时仍存在） */
  response?: AxiosResponse<IRes>
}
