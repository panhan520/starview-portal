import { AccountType } from '../../api/auth/constants'

/** 用户初始信息 */
export const getDefaultUserInfo = () => ({
  username: '',
  userId: '',
  token: '',
  email: '',
  roles: [],
  accountType: AccountType.SUB,
  orgId: '',
  tenantId: '',
})
