import { Left, Right } from './layout'
import { Account, Products } from './panels'

/** 面板 */
export enum Panel {
  /** 产品列表 */
  PRODUCTS = 'PRODUCTS',
  /** 账号 */
  ACCOUNT = 'ACCOUNT',
}

/** 面板枚举到组件的映射 */
export const panelSchema = {
  /** 产品列表 */
  [Panel.PRODUCTS]: {
    'x-component': Products,
    'x-component-props': {
      sort: 0,
    },
  },
  /** 账号 */
  [Panel.ACCOUNT]: {
    'x-component': Account,
    'x-component-props': {
      sort: 0,
    },
  },
}

/** 布局 */
export enum Layout {
  /** 左侧 */
  LEFT = 'LEFT',
  /** 右侧 */
  RIGHT = 'RIGHT',
}

/** 布局枚举到组件的映射 */
export const layoutToCmpMap = {
  /** 左侧 */
  [Layout.LEFT]: Left,
  /** 右侧 */
  [Layout.RIGHT]: Right,
}
