import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Header from './header'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <>
        <Header />
        <div class={styles.main}>
          <RouterView />
        </div>
      </>
    )
  }
})
