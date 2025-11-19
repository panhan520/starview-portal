import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '~/layout'
import { MicroApp } from '~/core/packages/qiankun'
import { routes as authRoutes } from '~/core/packages/auth'

import type { RouteRecordRaw } from 'vue-router'
import type { IRouteRecordRaw } from '~/core/packages/qiankun/interfaces'

/** 公共路由 */
const commonRoutes: IRouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: import('~/core/pages/404'),
  },
]
/** 全局兜底路由 */
export const notFoundRoutes: RouteRecordRaw[] = [{
  path: '/:pathMatch(.*)',
  name: 'notFound',
  redirect: '/404',
}]
/** 子应用路由 */
export const microAppRoutes: IRouteRecordRaw[] = [{
  path: '/microApp',
  name: 'MicroApp',
  component: Layout,
  redirect: '/microApp/accountManagement',
  children: [
    {
      path: 'accountManagement/:pathMatch(.*)*',
      microApp: MicroApp.ACCOUNT_MANAGEMENT,
    },
    {
      path: 'starview/:pathMatch(.*)*',
      microApp: MicroApp.STARVIEW,
    },
    {
      path: 'starview/:pathMatch(.*)*',
      microApp: MicroApp.AUTO_MATION,
    },
  ],
}]
/** 基础业务路由 */
export const basicRoutes: IRouteRecordRaw[] = [
  ...commonRoutes,
  ...authRoutes,
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: defineAsyncComponent(() => import('~/pages/home')),
      },
    ],
  },
]
/** 路由实例 */
export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as RouteRecordRaw[],
})
