/** 任意对象 */
export interface ICommonObj {
  [k: string]: any
}

/** 获取列表出参 */
export interface ICommonGetListRes<L> {
  /** list */
  list: L
  /** 分页信息 */
  pagination?: {
    /** 页码 */
    page: number
    /** 每页展示条数 */
    pageSize: number
    /** 总条目 */
    total: number
  }
}

/** 接口统一出参格式 */
export interface ICommonApiRes<T> {
  /** 响应状态码 */
  status: number
  /** 响应体 */
  data: T
}
