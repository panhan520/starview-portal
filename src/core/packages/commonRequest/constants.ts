/** 代理映射表 */
export const proxyMap = {
  /** 账户 */
  ACCOUNT: import.meta.env.VITE_APP_BASE_API_ACCOUNT,
}

/** 获取错误码msg */
export const getErrorMsg = function (code: number): string {
  const errCodeToMsgMap = {
    400: '请求失败！请您稍后重试',
    401: '未授权，请重新登录',
    403: '当前账号无权限访问！',
    404: '你所访问的资源不存在！',
    405: '请求方式错误！请您稍后重试',
    408: '请求超时！请您稍后重试',
    500: '服务器端出错',
    501: '网络未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'http版本不支持该请求',
  }
  return errCodeToMsgMap[code] || '其他连接错误 --${code}'
}
