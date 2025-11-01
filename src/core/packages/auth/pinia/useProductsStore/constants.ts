
import AccountLogo from '~/assets/images/common/account_logo.jpeg'
import StarViewLogo from '~/assets/images/common/starview_logo.png'
import { MicroApp } from '~/core/packages/qiankun'

/** 子应用到图标的映射 */
export const microAppToIconMap = {
  [MicroApp.ACCOUNT_MANAGEMENT]: AccountLogo,
  [MicroApp.STARVIEW]: StarViewLogo,
}
