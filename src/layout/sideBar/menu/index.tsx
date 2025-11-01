import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElImage, ElMenu, ElMenuItem, ElText } from 'element-plus'
import styles from './index.module.scss'

import type { PropType } from 'vue'
import type { IMicroConfig } from '~/core/packages/qiankun/interfaces'

const props = {
  items: {
    type: Array as PropType<IMicroConfig[]>,
    default: () => ([]),
  }
}

export default defineComponent({
  name: 'Menu',
  props,
  setup(props) {
    const router = useRouter()
    const click = ({ index }) => {
      router.push({ path: index })
    }
    return () => (
      <div class={styles.container}>
        <ElMenu
          default-active="2"
          class='el-menu-vertical-demo'
        >
          {
            props.items.map(v => (
              <ElMenuItem index={v.activeRule} route={v.activeRule} onClick={click}>
                <ElImage class={styles.icon} src={v.icon} />
                <ElText>{v.label}</ElText>
              </ElMenuItem>
            ))
          }
        </ElMenu>
      </div>
    )
  }
})
