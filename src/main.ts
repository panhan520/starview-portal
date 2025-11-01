import { createApp } from 'vue'
import { initGlobalState as initGlobalStateQiankun, registerMicroApps as registerMicroAppsQiankun, start as startQiankun } from 'qiankun'
import { useAuthStore } from './core/packages/auth/pinia/useAuthStore'
import { getMicroAppConfigs } from './core/packages/qiankun'
import { useQiankunStore } from './core/packages/qiankun/stores/useQiankunStore'
import { setupPermissionGuard } from './core/packages/auth/permission'
import { router } from './routers'
import { setupPinia } from './stores'
import App from './App'

import 'element-plus/dist/index.css'
import './style.css'

const initApp = async () => {
  const app = createApp(App)
  setupPinia(app)
  setupPermissionGuard(router)
  app.use(router)
  app.mount('#app')
}

/** 注册子应用 */
const start = async () => {
  await initApp() // 3: 初始化vue项目
  const authStore = useAuthStore()
  const globalState = initGlobalStateQiankun({
    userInfo: authStore.userInfo,
    resetApp: authStore.resetApp,
  })
  const qiankunStore = useQiankunStore()
  /** 存储qiankun全局数据的actions */
  qiankunStore.globalState = globalState
  globalState.onGlobalStateChange((state: any) => {
    console.log('基座全局数据被子应用改变', { state })
  }, true) // 2: 实时更新state
  const result = (getMicroAppConfigs(import.meta.env) || []).map(v => ({ ...v, container: `#microApp` }))
  registerMicroAppsQiankun(result) // 4: 注册子应用
  startQiankun({
    sandbox: {
      experimentalStyleIsolation: true,
    },
  }) // 5: 开启qiankun
}
start()
