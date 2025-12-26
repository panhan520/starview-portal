import type { IMicroConfig } from './interfaces'

/** 子应用 */
export enum MicroApp {
  /** 账户权限管理 */
  ACCOUNT_MANAGEMENT = 'ACCOUNT_MANAGEMENT',
  /** 星云（可观测）子应用 */
  STARVIEW = 'STARVIEW',
  /** 运维自动化平台 */
  AUTOMATION = 'AUTOMATION',
}

/** 
 * 子应用配置map
 * 前端初始化子应用时使用，全量子应用配置表
 */
export const getMicroAppConfigs = (env: Record<string, any>): IMicroConfig[] => ([
  {
    name: MicroApp.ACCOUNT_MANAGEMENT,
    entry: env?.VITE_ACCOUNT_MANAGEMENT_URL,
    activeRule: '/microApp/accountManagement',
    key: 0,
    icon: null,
    label: '访问控制',
  },
  {
    name: MicroApp.STARVIEW,
    entry: env?.VITE_STARVIEW_URL,
    activeRule: '/microApp/starview',
    key: 1,
    icon: null,
    label: '星云数据观测平台',
  },
  {
    name: MicroApp.AUTOMATION,
    entry: env?.VITE_AUTOMATION_URL,
    activeRule: '/microApp/automation',
    key: 2,
    icon: null,
    label: '运维自动化平台',
  }
])
