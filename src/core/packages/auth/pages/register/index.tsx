import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElCard, ElImage, ElText } from 'element-plus'
import { FormilyForm, Space } from '~/KeepUp'
import { appName } from '~/constants/app'
import AuthBgFragment from '~/assets/images/auth/auth_bg_fragment.svg'
import StarViewLogo from '~/assets/images/common/starview_logo.png'
import { checkEmailCodeByRegisterApi } from '../../api/auth'
import { useAuthStore } from '../../pinia/useAuthStore'
import { getSchema } from './schema'
import styles from './index.module.scss'

import type { IFormilyFormExpose } from '~/KeepUp'

export default defineComponent({
  name: 'Register',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isInvite = computed(() => route.query?.type === 'invite')
    const formilyRef = ref<IFormilyFormExpose>()
    const formRef = computed(() => formilyRef.value?.formRef)
    const schema = ref(getSchema(formRef, isInvite))
    const authStore = useAuthStore()
    const register = async () => {
      try {
        await formRef.value?.validate()
        await checkEmailCodeByRegisterApi({ 
          recipient: formRef.value?.values?.email,
          code: formRef.value?.values?.code,
        })
        const inviteParams = isInvite.value
          ? {
              type: 'ACCOUNT_TYPE_INVITE',
              inviterId: route.query?.inviter_id,
              inviteTime: route.query?.invite_time,
            }
          : {
              type: 'ACCOUNT_TYPE_EMAIL',
            }
        await authStore.register({
          username: formRef.value.values.username,
          password: formRef.value.values.password,
          email: formRef.value.values.email,
          code: formRef.value?.values?.code,
          ...inviteParams,
        })
      } catch (error: any) {
        console.error(`注册动作失败，失败原因：${error}`)
      }
    }
    const toLogin = () => {
      router.push({ path: '/login' })
    }
    const init = () => {
      if (isInvite.value) {
        formRef.value.values = {
          ...(formRef.value.values || {}),
          email: route.query?.email
        }
      }
    }
    onMounted(() => {
      init()
    })
    const inviteBannerTsx = () => (
      isInvite.value 
        ? <Space direction='column' size={4} class={styles.banner}>
            <ElText size='large' tag="b">{route.query?.inviter_email}邀请您加入{appName}平台</ElText>
            <ElText>该邮箱还未注册{appName}，请注册后加入</ElText>
          </Space>
        : null
    )
    return () => (
      <Space class={styles.container} fill justify='center'>
        <ElImage class={styles.fragment} src={AuthBgFragment} />
        <ElCard class={styles.form}>
          <ElImage class={styles.logo} src={StarViewLogo} />
          {inviteBannerTsx()}
          <FormilyForm
            ref={formilyRef}
            config={schema.value}
          />
          <ElButton 
            class={styles.submit}
            type='primary'
            size='large'
            onClick={register}
          >注册</ElButton>
          <Space class={styles.btnGroup} fill justify='center'>
            <ElButton 
              type='primary' 
              text='primary'
              onClick={toLogin}
            >
              <ElText>已有账号？</ElText>去登录
            </ElButton>
          </Space>
        </ElCard>
      </Space>
    )
  }
})
