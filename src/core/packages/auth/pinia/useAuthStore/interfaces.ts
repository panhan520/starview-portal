import { AccountType } from '../../api/auth/constants'

import type { Ref } from 'vue'
import type { Form } from '@formily/core'
import type { ILoginRes, IRegisterParams } from '../../api/auth/interfaces'

/** jwt解析出参 */
export interface IJwtExpose {
  /** 邮箱 */
  email: string
  /** 租户id */
  tenantId: string
  /** 组织id */
  orgId: string
  /** 用户名 */
  username: string
}

/** 用户信息 */
export interface IUserInfo {
  /** 用户名 */
  username: string
  /** 用户id */
  userId: string
  /** token */
  token: string
  /** 邮箱 */
  email: string
  /** 权限点 */
  roles: string[]
  /** 用户身份类型 */
  accountType: AccountType
  /** 组织id */
  orgId: string
  /** 租户id */
  tenantId: string
}

/** useAuthStore出参 */
export interface IUseAuthStore {
  /** 用户信息 */
  userInfo: Ref<IUserInfo>
  /** 设置用户信息 */
  setUserInfo: (p: ILoginRes) => void
  /** 清除用户信息 */
  clearUserInfo: () => void
  /** 登录 */
  login: (formRef: Form) => Promise<void>
  /** 登出 */
  logout: () => Promise<void>
  /** 注册 */
  register: (p: IRegisterParams) => Promise<void>
  /** 重置app */
  resetApp: () => void
}

