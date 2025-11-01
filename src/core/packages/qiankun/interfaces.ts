import type { VNode } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

/** 子应用配置 */
export interface IMicroConfig {
  /** 名称 */
  name: string
  /** 入口路径 */
  entry: string
  /** 激活路径 */
  activeRule: string
  /** 顺序 */
  key: number
  /** 图标 */
  icon: VNode | string
  /** 标题 */
  label: string
}

/** 路由配置表（兼容qiankun） */
export type IRouteRecordRaw = 
  Omit<RouteRecordRaw, 'children'>
  & {
    /** 子应用标识 */
    microApp?: string
    children?: IRouteRecordRaw[]
  }
