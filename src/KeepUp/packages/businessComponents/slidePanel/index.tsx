import { defineComponent, ref } from 'vue'
import styles from './index.module.scss'

import type { ISlidePanelExpose } from './interfaces'

const props = {
  /** 高度 */
  height: {
    type: String,
    default: '100%',
  },
}

export * from './interfaces'
export default defineComponent({
  name: 'SlidePanel',
  props,
  emit: ['close'],
  setup(props, { slots, emit, expose }) {
    const visible = ref(false)
    const open = () => {
      visible.value = true
    }
    const close = () => {
      visible.value = false
    }
    expose<ISlidePanelExpose>({
      visible,
      open,
      close,
    })
    return () => (
      <div
        class={styles.container}
        style={{
          height: props.height,
          left: visible.value ? 0 : `-500%`,
        }}
        onClick={() => {
          emit('close')
          close()
        }}
      >
        <div
          class={[styles.inner, styles.shadowRight]}
          onClick={(e: Event) => { e.stopPropagation() }}
        >
          {slots?.default?.({ close })}
        </div>
      </div>
    )
  }
})
