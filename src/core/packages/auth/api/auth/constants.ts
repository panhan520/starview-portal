/** 用户身份类型 */
export enum AccountType {
  /** 租户 */
  MASTER = 'MASTER',
  /** 普通用户 */
  SUB = 'SUB',
}

/** 权限点 */
export enum Permissions {
  /** 未定义 */
  PERMISSION_TYPE_UNSPECIFIED = 'PERMISSION_TYPE_UNSPECIFIED',
  /** 应用权限 */
  PERMISSION_TYPE_APP = 'PERMISSION_TYPE_APP',
  /** 页面权限 */
  PERMISSION_TYPE_PAGE = 'PERMISSION_TYPE_PAGE',
  /** API权 */
  PERMISSION_TYPE_API = 'PERMISSION_TYPE_API',
}
