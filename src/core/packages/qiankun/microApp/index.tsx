import { defineComponent } from 'vue'
import styles from './index.module.scss'

export default defineComponent({
  name: 'MicroApp',
  setup() {
    return () => (
      <div id='microApp' class={styles.container} />
    )
  }
})
