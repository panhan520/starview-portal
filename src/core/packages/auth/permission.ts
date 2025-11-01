import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { basicRoutes, notFoundRoutes, microAppRoutes } from '~/routers'
import { useAuthStore } from './pinia/useAuthStore'
import { useProductsStore } from './pinia/useProductsStore'
import { usePermissionStore } from './pinia/usePermissionStore'

/** 注册身份认证路由钩子 */
export const setupPermissionGuard = (router) => {
  const productsStore = useProductsStore()
  const permissionStore = usePermissionStore()
  /** 如果已经登录，则开始注册子应用，如果没有登录，则跳到登录页 */
  NProgress.configure({ showSpinner: false })
  const whiteList = [
    '/login',
    '/register',
    '/findPwd',
  ]
  router.beforeEach(async (to, _, next) => {
    NProgress.start()
    /** 是公开页面 */
    const isPublicPage = whiteList.indexOf(to.path) !== -1
    /** 用户信息 */
    const authStore = useAuthStore()
    /** 有权限的路由 */
    if (authStore.userInfo?.token) {
      /** 已登录或为公开页面 */
      if (!permissionStore.permissionRoutes?.length && !isPublicPage) {
        /** 已登录，但权限路由为空，则更新权限路由 */
        permissionStore.appendPermissionRoutes({
          router,
          products: productsStore.products,
          basicRoutes,
          microAppRoutes,
          notFoundRoutes,
        })
        /** 动态添加业务路由后，刷新守卫才能同步到最新全量路由信息 */
        next({ ...to, replace: true })
      } else {
        /** 正常跳转 */
        to.path === '/login' ? next({ path: '/' }) : next()
      }
    } else {
      /** 未登录，到登录页 */
      isPublicPage ? next() : next(`/login?redirect=${to.path}`)
    }
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
