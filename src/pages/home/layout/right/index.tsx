import { defineComponent } from 'vue'
import { Space } from '~/KeepUp'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Right',
  setup(_, { slots }) {
    return () => (
      <Space class={styles.container} direction='column'>{slots?.default?.()}</Space>
    )
  }
})
