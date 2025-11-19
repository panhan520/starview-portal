import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { jwtDecode } from 'jwt-decode'
import { checkRoute } from '~/utils/router'
import { loginApi, logoutApi, registerApi, getRolesApi } from '../../api/auth'
import { useProductsStore } from '../useProductsStore'
import { useQiankunStore } from '../../../qiankun/stores/useQiankunStore'
import { getDefaultUserInfo } from './constants'

import type { Form } from '@formily/core'
import type { JwtPayload } from 'jwt-decode'
import type { ILoginRes, IRegisterParams } from '../../api/auth/interfaces'
import type { IJwtExpose, IUserInfo, IUseAuthStore } from './interfaces'

export type { IUseAuthStore }
export const useAuthStore = defineStore('useAuthStore', (): IUseAuthStore => {
  const router = useRouter()
  const route = useRoute()
  const productsStore = useProductsStore()
  const qiankunStore = useQiankunStore()
  /** 用户信息 */
  const userInfo = ref<IUserInfo>(getDefaultUserInfo())
  /** 设置用户信息 */
  const setUserInfo = (userRes: ILoginRes & { roles: string[] }) => {
    const jwt = jwtDecode<JwtPayload & IJwtExpose>(userRes.token)
    userInfo.value = {
      username: jwt.username,
      userId: userRes.userId,
      token: userRes.token,
      email: jwt.email,
      roles: userRes.roles,
      accountType: userRes.accountType,
      orgId: jwt.orgId,
      tenantId: jwt.tenantId,
    } as IUserInfo
  }
  /** 清除用户信息 */
  const clearUserInfo = () => {
    userInfo.value = getDefaultUserInfo()
  }
  /** 重置app状态，重新登录 */
  const resetApp = async () => {
    try {
      localStorage.clear()
      clearUserInfo()
      productsStore.clearProducts()
      ElMessage({
        type: 'warning',
        message: 'token失效，已自动登出',
      })
      router.push({ path: '/login', query: { redirect: route.path } })
    } catch (error: any) {
      console.error(`登出失败，失败原因：${error}`)
    }
  }
  /** 登录 */
  const login = async (formRef: Form) => {
    try {
      /** 1: 登录 */
      const res1 = await loginApi({
        type: 'ACCOUNT_TYPE_USERNAME',
        ...(formRef.values || {}),
      })
      /** 2: 存储用户信息 */
      setUserInfo({
        ...res1,
        roles: [],
      })
      /** 3: 获取权限点 */
      const res2 = await getRolesApi(res1.userId)
      /** 4: 存储用户信息 */
      setUserInfo({
        ...res1,
        roles: (res2?.list || []).map(v => v.code),
      })
      // TODO: userInfo的更新和子应用息息相关，一定要保持同步，最好是封装为一个方法，监听userInfo的变化，然后更新qiankun的全局数据
      /** 5: 将userInfo存入qiankun的全局数据中，方便子应用获取 */
      qiankunStore.globalState?.setGlobalState?.({
        userInfo: userInfo.value,
        resetApp,
      })
      /** 6: 根据用户信息获取产品列表 */
      await productsStore.initProducts()
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
      /** 7: 跳转路由 */
      const isCheckedRoute = checkRoute('path', route.query?.redirect as string)
      router.push({ path: isCheckedRoute ? (route.query?.redirect as string) : '/' })
      // TODO: 无法跳到子应用
    } catch (error: any) {
      console.error(`登录失败，失败原因：${error}`)
    }
  }
  /** 登出 */
  const logout = async () => {
    try {
      await logoutApi()
      localStorage.clear()
      clearUserInfo()
      productsStore.clearProducts()
      ElMessage({
        type: 'success',
        message: '登出成功',
      })
      router.push({ path: '/login', query: { redirect: route.path } })
    } catch (error: any) {
      console.error(`登出失败，失败原因：${error}`)
    }
  }
  /** 注册 */
  const register = async (params: IRegisterParams) => {
    try {
      await registerApi(params)
      ElMessage({
        type: 'success',
        message: '注册成功',
      })
      router.push({ path: '/login' })
    } catch (error: any) {
      console.error(`注册失败，失败原因：${error}`)
    }
  }
  return {
    userInfo,
    setUserInfo,
    clearUserInfo,
    login,
    logout,
    register,
    resetApp,
  }
}, {
  // 持久化
  persist: {
    key: 'userInfo',
    storage: window.localStorage,
  },
})
