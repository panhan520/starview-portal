import type { Ref } from 'vue'
import type { IMicroConfig } from '../../../qiankun/interfaces'

/** useProductsStore出参 */
export interface IUseProductsStoreExpose {
  /** 产品列表 */
  products: Ref<IMicroConfig[]>
  /** 设置产品列表 */
  setProducts: (p: IMicroConfig[]) => void
  /** 清空产品列表 */
  clearProducts: () => void
  /** 初始化产品列表 */
  initProducts: () => Promise<void>
}
