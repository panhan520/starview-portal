import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { MicroAppStateActions } from 'qiankun'
import type { IQiankunStoreExpose } from './interfaces'

/** qiankun的globalState */
export const useQiankunStore = defineStore('useQiankunStore', (): IQiankunStoreExpose => {
  /** globalState */
  const globalState = ref<MicroAppStateActions>(null)
  return {
    globalState,
  }
})
