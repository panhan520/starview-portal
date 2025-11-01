import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProductsListAPi } from '../../api/products'
import { microAppToIconMap } from './constants'

import type { IUseProductsStoreExpose } from './interfaces'
import type { IMicroConfig } from '../../../qiankun/interfaces'

export const useProductsStore = defineStore('useProductsStore', (): IUseProductsStoreExpose => {
  /** 产品列表 */
  const products = ref<IMicroConfig[]>([])
  /** 设置产品列表 */
  const setProducts = (val: IMicroConfig[] = []) => {
    products.value = val
  }
  /** 清空产品列表 */
  const clearProducts = () => {
    products.value = []
  }
  /** 初始化产品列表 */
  const initProducts = async () => {
    try {
      const res = await getProductsListAPi()
      setProducts(res?.list.map(v => ({ ...v, icon: v.icon || microAppToIconMap[v.name] })))
    } catch (error) {
      console.error(`获取产品列表失败，失败原因：${error}`)
    }
  }
  return {
    products,
    setProducts,
    clearProducts,
    initProducts,
  }
}, {
  // 持久化
  persist: {
    key: 'products',
    storage: window.localStorage,
  },
})
