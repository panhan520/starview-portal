import Login from '../pages/login'

import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login', hidden: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/register'),
    meta: { title: 'register', hidden: true },
  },
  {
    path: '/findPwd',
    name: 'FindPwd',
    component: () => import('../pages/findPwd'),
    meta: { title: '找回密码', hidden: true },
  },
]
