import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElCard, ElText, ElImage, ElButton } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { Space } from '~/KeepUp'
import { useAuthStore } from '~/core/packages/auth/pinia/useAuthStore'
import { MicroApp } from '~/core/packages/qiankun'
import avatarImg from '~/assets/images/nav/avatar.png'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Account',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    return () => (
      <ElCard class={styles.container} shadow='never'>
        <Space fill>
          <ElImage class={styles.avatar} src={avatarImg} />
          <Space class={styles.info} direction='column' align='start' size={4}>
            <Space justify='space-between' fill>
              <ElText tag='b' size='large' truncated>{authStore.userInfo.username}</ElText>
              <ElButton icon={ArrowRight} size='small' onClick={() => { router.push({ name: MicroApp.ACCOUNT_MANAGEMENT }) }}>账号中心</ElButton>
            </Space>
            <ElText class={styles.email} truncated>{authStore.userInfo.email}</ElText>
          </Space>
        </Space>
      </ElCard>
    )
  }
})
