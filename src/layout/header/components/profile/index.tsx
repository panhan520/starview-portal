import { defineComponent } from 'vue'
import { ElButton, ElImage, ElText, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { Space } from '~/KeepUp'
import { useAuthStore } from '~/core/packages/auth/pinia/useAuthStore'
import avatarImg from '~/assets/images/nav/avatar.png'
import { getActions } from './constants'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Profile',
  setup() {
    const authStore = useAuthStore()
    const actions = getActions({ logout: authStore.logout })
    return () => (
      <ElDropdown
        v-slots={{
          default: () => (
            <ElButton class={styles.profileWrapper}>
              <Space size={12}>
                <ElText class={styles.title}>{authStore.userInfo.username}</ElText>
                <ElImage class={styles.avatar} src={avatarImg} />
              </Space>
            </ElButton>
          ),
          dropdown: () => (
            <ElDropdownMenu>
              {actions.map(v => <ElDropdownItem icon={v.icon} onClick={v.click}>{v.title}</ElDropdownItem>)}
            </ElDropdownMenu>
          )
        }}
      />
    )
  }
})
