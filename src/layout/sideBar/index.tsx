import { defineComponent } from 'vue'
import { ElText } from 'element-plus'
import { Grid, ArrowRight } from '@element-plus/icons-vue'
import { useProductsStore } from '~/core/packages/auth/pinia/useProductsStore'
import { Space, ElIconPlus } from '~/KeepUp'
import Menu from './menu'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Sidebar',
  emits: ['close'],
  setup() {
    const productsStore = useProductsStore()
    return () => (
      <Space class={styles.container} align='start' fill>
        <Space direction='column' fill>
          <Space class={styles.banner} justify='space-between' fill>
            <Space fill>
              <ElIconPlus icon={Grid} />
              <ElText class={styles.title}>产品与服务</ElText>
            </Space>
            <ElIconPlus icon={ArrowRight} />
          </Space>
          <Menu items={productsStore.products} />
        </Space>
      </Space>
    )
  }
})
