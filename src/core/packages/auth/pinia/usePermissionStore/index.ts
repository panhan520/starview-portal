import { ref } from 'vue'
import { defineStore } from 'pinia'
import MicroAppDom from '../../../qiankun/microApp'
import { MICRO_APP_PATH_MATCH } from '../../../qiankun/constants'

import type { Router, RouteRecordRaw } from 'vue-router'
import type { IRouteRecordRaw } from '~/core/packages/qiankun/interfaces'
import type { IMicroConfig } from '../../../qiankun/interfaces'

interface IAppendPermissionRoutesParams {
  router: Router
  products: IMicroConfig[]
  basicRoutes: IRouteRecordRaw[]
  microAppRoutes: IRouteRecordRaw[]
  notFoundRoutes: RouteRecordRaw[]
}

export const usePermissionStore = defineStore('usePermissionStore', () => {
  const permissionRoutes = ref([])
  const addedRoutes = ref([])
  const appendPermissionRoutes = ({
    router,
    products,
    basicRoutes,
    microAppRoutes,
    notFoundRoutes,
  }: IAppendPermissionRoutesParams) => {
    const deepFormattedRoutes = (arr: IRouteRecordRaw[] = []) => {
      let result = []
      arr.forEach(v => {
        const isPermissionMicroApp = v.microApp && products.find(v1 => v1.name === v.microApp)
        if (isPermissionMicroApp || !v.microApp) {
          if (v.children?.length) {
            v.children = deepFormattedRoutes(v.children)
          }
          if (isPermissionMicroApp) {
            v.path = `${v.path}${MICRO_APP_PATH_MATCH}`
            v.name = v.microApp
            v.component = MicroAppDom
          }
          result.push(v)
        }
      })
      return result
    }
    const result = deepFormattedRoutes(microAppRoutes)
    addedRoutes.value = [...result, ...notFoundRoutes]
    permissionRoutes.value = [...basicRoutes, ...addedRoutes.value]
    addedRoutes.value.forEach(v => router.addRoute(v))
  }
  return {
    permissionRoutes,
    addedRoutes,
    appendPermissionRoutes,
  }
})
