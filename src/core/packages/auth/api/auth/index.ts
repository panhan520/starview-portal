import { AUTH_REQUESTER } from '../requests'

import type { ICommonGetListRes, ICommonObj } from '~/interfaces/common'
import type { 
  ILoginParams, 
  ILoginRes, 
  IRegisterParams,
  IGetUserRolesItem,
  ICheckEmailCodeParams,
  ISendEmailCodeParams,
  IFindPasswordParams,
} from './interfaces'

/** ---------------- 公共 ---------------- */
/** 校验当前邮箱正确性 */
export const checkCurEmail = (email: string) => {
  return AUTH_REQUESTER.post('api/v1/iam/email/check', { email })
}
/** ---------------- 公共 ---------------- */

/** ---------------- 登录 ---------------- */
/** 登录 */
export const loginApi = (params: ILoginParams): Promise<ILoginRes> => {
  return AUTH_REQUESTER.post('api/v1/iam/login', params)
}

/** 获取用户权限点 */
export const getRolesApi = (userId: string): Promise<ICommonGetListRes<IGetUserRolesItem[]>> => {
  return AUTH_REQUESTER.get(`api/v1/iam/permissions/user/${userId}`)
}

/** 退出登录 */
export const logoutApi = (): Promise<ICommonObj> => {
  return AUTH_REQUESTER.get('api/v1/iam/logout')
}
/** ---------------- 登录 ---------------- */

/** ---------------- 注册 ---------------- */
/** 注册 */
export const registerApi = (params: IRegisterParams): Promise<ICommonObj> => {
  return AUTH_REQUESTER.post('api/v1/iam/registry', params)
}

/** 发送邮箱验证码【注册】 */
export const sendEmailCodeByRegisterApi = (params: ISendEmailCodeParams): Promise<ICommonObj> => {
  return AUTH_REQUESTER.post('api/v1/iam/code', {
    channel: 'CODE_CHANNEL_TYPE_EMAIL_AWS_SES',
    type: 'CODE_BUSINESS_TYPE_REGISTER',
    ...params,
  })
}

/** 校验邮箱验证码【注册】 */
export const checkEmailCodeByRegisterApi = async (params: ICheckEmailCodeParams): Promise<Record<'success', boolean>> => {
  const res = await AUTH_REQUESTER.post('api/v1/iam/verify_code', {
    type: 'CODE_BUSINESS_TYPE_REGISTER',
    ...params,
  })
  return { success: res.data }
}
/** ---------------- 注册 ---------------- */

/** ---------------- 找回密码 ---------------- */
/** 发送邮箱验证码【找回密码】 */
export const sendEmailCodeByFindPwdApi = (params: ISendEmailCodeParams): Promise<ICommonObj> => {
  return AUTH_REQUESTER.post('api/v1/iam/code', {
    channel: 'CODE_CHANNEL_TYPE_EMAIL_AWS_SES',
    type: 'CODE_BUSINESS_TYPE_FORGET_PWD',
    ...params,
  })
}

/** 校验邮箱验证码【找回密码】 */
export const checkEmailCodeByFindPwdApi = (params: ICheckEmailCodeParams): Promise<Record<'success', boolean>> => {
  return AUTH_REQUESTER.post('api/v1/iam/verify_code', {
    type: 'CODE_BUSINESS_TYPE_FORGET_PWD',
    ...params,
  })
}

/** 找回密码之修改密码 */
export const findPasswordApi = (params: IFindPasswordParams) => {
  return AUTH_REQUESTER.post('api/v1/iam/pwd/forget', params)
}
/** ---------------- 找回密码 ---------------- */