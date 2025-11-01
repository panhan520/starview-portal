import { Panel, panelSchema, Layout, layoutToCmpMap } from './constants'

import type { ISchema } from '@formily/json-schema'

/** getSchema */
export const getSchema = ({
  left = [],
  right = [],
}: Record<string, string[]> = {
  /** 默认配置 */
  left: [Panel.PRODUCTS],
  /** 默认配置 */
  right: [Panel.ACCOUNT],
}): ISchema['properties'] => ({
  /** 左侧 */
  [Layout.LEFT]: {
    'x-component': layoutToCmpMap[Layout.LEFT],
    properties: Object.fromEntries(left.map(v => [v, panelSchema[v]])),
  },
  /** 右侧 */
  [Layout.RIGHT]: {
    'x-component': layoutToCmpMap[Layout.RIGHT],
    properties: Object.fromEntries(right.map(v => [v, panelSchema[v]])),
  },
})
