import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElCard, ElText, ElImage } from 'element-plus'
import { Space } from '~/KeepUp'
import { useProductsStore } from '~/core/packages/auth/pinia/useProductsStore'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Products',
  setup() {
    const router = useRouter()
    const productsStore = useProductsStore()
    return () => (
      <ElCard class={styles.container} shadow='never'>
        <Space direction='column' align='start' size={16}>
          <ElText class={styles.title} tag='b' size='large' truncated>全部产品</ElText>
          <div class={styles.list}>
            {
              (productsStore.products || []).map(v => (
                <Space class={styles.product} size={12} onClick={() => { router.push({ name: v.name }) }}>
                  <ElImage class={styles.icon} src={v.icon} />
                  <ElText class={styles.productTitle} tag='b' truncated>{v.label}</ElText>
                </Space>
              ))
            }
          </div>
        </Space>
      </ElCard>
    )
  }
})
