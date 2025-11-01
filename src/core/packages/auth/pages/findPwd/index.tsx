import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElText, ElButton, ElMessage } from 'element-plus'
import { FormStep } from '@formily/element-plus'
import { observer } from '@formily/reactive-vue'
import { FormilyForm, Space } from '~/KeepUp'
import { findPasswordApi, checkEmailCodeByFindPwdApi } from '../../api/auth'
import { getSchema } from './schema'
import styles from './index.module.scss'

import type { IFormilyFormExpose } from '~/KeepUp'

export default observer(
  defineComponent({
    name: 'FindPwd',
    setup() {
      const router = useRouter()
      const formilyFormRef = ref<IFormilyFormExpose>()
      const formRef = computed(() => formilyFormRef.value.formRef)
      const schema = ref(getSchema(formRef))
      const formStep = FormStep.createFormStep()
      const goBack = () => {
        router.back()
      }
      const back = () => {
        formStep.back()
      }
      const next = async () => {
        try {
          await formRef.value.submit()
          const firstStep = formStep.current === 0
          const lastStep = formStep.current === 1
          if (firstStep) {
            /** 第一步：校验邮箱，给邮箱发送验证码，校验验证码正确性 */
            await checkEmailCodeByFindPwdApi({
              recipient: formRef.value?.values?.email,
              code: formRef.value?.values?.code,
            })
            ElMessage({
              type: 'success',
              message: '验证码校验通过',
            })
          } else if (lastStep) {
            /** 第二步：修改密码 */
            await findPasswordApi(formRef.value.values)
            ElMessage({
              type: 'success',
              message: '密码更新成功',
            })
            router.push({ name: 'Login' })
            return
          }
          formStep.next()
        } catch (error: any) {
          console.error(`下一步失败，失败原因：${error}`)
        }
      }
      return () => (
        <Space class={styles.container} fill direction='column' justify='center'>
          <ElText class={styles.title}>找回密码</ElText>
          <FormilyForm
            ref={formilyFormRef}
            class={styles.form}
            config={schema.value}
            scope={{ formStep }}
            v-slots={{
              btnGroup: () => (
                <Space class={styles.btnGroup} fill justify='center'>
                  {
                    formStep.current === 0
                      ? <ElButton class={styles.btn} onClick={goBack}>返回</ElButton>
                      : <ElButton class={styles.btn} onClick={back}>上一步</ElButton>
                  }
                  <ElButton class={styles.btn} type='primary' onClick={next}>{formStep.current === 1 ? '完成' : '下一步'}</ElButton>
                </Space>
              )
            }}
          />
        </Space>
      )
    }
  })
)
