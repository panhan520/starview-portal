import { RequestClient } from '~/core/packages/commonRequest'

/** 代理到域名的映射 */
export const proxyMap = {
  /** 用户身份相关 */
  AUTH: import.meta.env.VITE_APP_BASE_API_AUTH,
  /** 产品 */
  PRODUCTS: import.meta.env.VITE_APP_BASE_API_PRODUCTS,
}
export const AUTH_REQUESTER = new RequestClient({
  baseURL: proxyMap.AUTH,
})
export const PRODUCTS_REQUESTER = new RequestClient({
  baseURL: proxyMap.PRODUCTS,
})
AUTH_REQUESTER.addRequestInterceptor()
AUTH_REQUESTER.addResponseInterceptor()
