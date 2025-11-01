import { Permissions, AccountType } from './constants'

/** 登录接口入参 */
export interface ILoginParams {
  /** 登录方式，写死 */
  type: 'ACCOUNT_TYPE_USERNAME'
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
}

/** 登录接口出参 */
export interface ILoginRes {
  /** userId */
  userId: string
  /** token */
  token: string
  /** 用户身份类型 */
  accountType: AccountType
  /** 登录失败次数 */
  loginFailCount: string
  /** 重试剩余次数 */
  retryRemaining: string
}

/** 注册入参 */
export interface IRegisterParams {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 邮箱 */
  email: string
  /** 邮箱验证码 */
  code: string
}

/** 权限点 */
export interface IGetUserRolesItem {
  /** id，仅用于确认关联关系 */
  id: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 名称 */
  name: string
  /** code，唯一标识 */
  code: string
  /** TODO：注释等后端补充 */
  type: Permissions
  /** 父级id */
  parentId: string
  /** 启用 */
  enabled: boolean
  /** 描述 */
  description: string
}

/** 发送验证码 */
export interface ISendEmailCodeParams {
  /** 渠道，目前唯一（AWS SES邮件） TODO: 先写死，后面根据需求决定是否拿出来 */
  channel?: 'CODE_CHANNEL_TYPE_EMAIL_AWS_SES'
  /** 发送目标地址（邮箱/手机号） */
  recipient: string
  /** 调用接口的场景，写死为注册 */
  type?: 'CODE_BUSINESS_TYPE_REGISTER'
}

/** 校验邮箱验证码入参 */
export interface ICheckEmailCodeParams {
  /** 校验时不需要知道渠道 */
  /** 发送目标地址（邮箱/手机号） */
  recipient: string
  /** 验证码 */
  code: string
  /** 调用接口的场景，写死为注册 */
  type?: 'CODE_BUSINESS_TYPE_REGISTER'
}

/** findPassword入参 */
export interface IFindPasswordParams {
  /** 邮箱 */
  email: string
  /** 验证码 */
  code: string
  /** 新密码 */
  pwd: string
}
