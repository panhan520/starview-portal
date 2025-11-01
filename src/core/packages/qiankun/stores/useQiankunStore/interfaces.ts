import type { Ref } from 'vue'
import type { MicroAppStateActions } from 'qiankun'

/** useQiankunStore出参 */
export interface IQiankunStoreExpose {
  /** qiankun的globalState actions */
  globalState: Ref<MicroAppStateActions>
}
