import { computed, defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElBadge, ElDivider, ElMessage, ElImage } from 'element-plus'
import { Menu, Monitor, Bell, CloseBold } from '@element-plus/icons-vue'
import { Space, SlidePanel } from '~/KeepUp'
import chatIcon from '~/assets/images/aiAgent/image (2).png'
import emitter from '~/utils/emitter' 
import ChatSidebar from './components/agent/ChatSidebar.vue'
import ChatDialog from './components/agent/ChatDialog.vue'
import Profile from './components/profile'
import SideBar from '../sideBar'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Header',
  emits: ['openSideBar'],
  setup() {
    const router = useRouter()
    const slidePanelRef = ref()
    const visible = computed(() => slidePanelRef.value?.visible)
    const chatVisible = ref(false)
    const openMenu = () => {
      slidePanelRef.value?.open()
    }
    const onMessage = () => {
      ElMessage({
        type: 'warning',
        message: '该功能尚未开放',
      })
    }
    // 打开AI助手
    const openAI = () => {
      // emitter.emit('openChat')
      chatVisible.value = true
    }
    onMounted(() => {
      emitter.on('openChat', () => {
        chatVisible.value = true
      })
      emitter.on('closeChat', () => {
        chatVisible.value = false
      })
    })

    onBeforeUnmount(() => {
      emitter.off('openChat')
      emitter.off('closeChat')
    })
    return () => (
      <>
        <Space id={styles.container} class={styles.container} fill justify='space-between'>
          <Space>
            {/* TODO：需要根据侧边栏展开收起改变icon */}
            {
              !visible.value 
                ? <ElButton
                  class={styles.noBorder}
                  icon={Menu}
                  circle
                  onClick={openMenu}
                />
                : <ElButton
                  class={styles.noBorder}
                  icon={CloseBold}
                  circle
                  onClick={slidePanelRef.value?.close}
                />
            }
            <ElDivider direction='vertical' />
            <ElButton 
              icon={Monitor} 
              text
              bg
              size='small' 
              type='primary'
              onClick={() => { router.push({ name: 'Home' }) }}
            >工作台</ElButton>
          </Space>
          <Space size={16}>
            <ElBadge is-dot offset={[-5, 5]}>
              <ElButton
                class={styles.noBorder}
                circle
                onClick={openAI}
              ><ElImage src={chatIcon} /></ElButton>
            </ElBadge>
            <ElBadge is-dot offset={[-5, 5]}>
              <ElButton
                class={styles.noBorder}
                icon={Bell}
                circle
                onClick={onMessage}
              />
            </ElBadge>
            <Profile />
          </Space>
        </Space>
        <SlidePanel
          ref={slidePanelRef}
          height='calc(100% - 49px)'
          v-slots={{
            default: ({ close }) => (<SideBar onClose={close} />),
          }}
        />
        {chatVisible.value && (
          <ChatSidebar visible={chatVisible}>
            <ChatDialog />
          </ChatSidebar>
        )}
      </>
    )
  }
})
