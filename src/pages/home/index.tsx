import { defineComponent, computed, h } from 'vue'
import { Space } from '~/KeepUp'
import { Layout } from './constants'
import { getSchema } from './schema'
import styles from './index.module.scss'

import type { ISchema } from '@formily/json-schema'

export default defineComponent({
  name: 'Home',
  setup() {
    const schema = computed<ISchema>(() => getSchema())
    return () => (
      <Space class={styles.container} size={16}>
        {
          Object.entries(schema.value).map(([_, v]: [k: Layout, v: ISchema]) => (
            h(
              v['x-component'],
              {},
              {
                default: Object.entries(v.properties).map(([k1, v1]: [k: Layout, v: ISchema]) => (h(v1['x-component']))),
              }
            )
          ))
        }
      </Space>
    )
  }
})
