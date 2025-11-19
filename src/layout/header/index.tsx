import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElDivider, ElMessage, ElImage } from 'element-plus'
import { Monitor, Bell } from '@element-plus/icons-vue'
import { Space, SlidePanel, HoverSwitch } from '~/KeepUp'
import chatIcon from '~/assets/images/aiAgent/image (2).png'
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
    const hoverSwitchRef = ref()
    const slidePanelRef = ref()
    const aiDrawerRef = ref()
    const onMessage = () => {
      ElMessage({
        type: 'warning',
        message: '该功能尚未开放',
      })
    }
    const openAI = () => {
      aiDrawerRef.value.open()
    }
    return () => (
      <>
        <Space id={styles.container} class={styles.container} fill justify='space-between'>
          <Space>
            <HoverSwitch
              ref={hoverSwitchRef}
              onVisible={slidePanelRef.value?.open}
              onHide={slidePanelRef.value?.close}
            />
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
          <Space size={12}>
            <ElButton
              class={styles.noBorder}
              circle
              onClick={openAI}
            ><ElImage src={chatIcon} /></ElButton>
            <ElButton
              class={styles.noBorder}
              icon={Bell}
              circle
              onClick={onMessage}
            />
            <Profile />
          </Space>
        </Space>
        <SlidePanel
          ref={slidePanelRef}
          height='calc(100% - 49px)'
          onClose={hoverSwitchRef.value?.close}
          v-slots={{
            default: ({ close }) => (
              <SideBar
                onClose={() => {
                  close?.()
                  hoverSwitchRef.value?.close()
                }}
              />
            ),
          }}
        />
        <ChatSidebar ref={aiDrawerRef}>
          <ChatDialog />
        </ChatSidebar>
      </>
    )
  }
})
