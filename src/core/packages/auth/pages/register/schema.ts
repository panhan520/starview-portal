import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { UserFilled, Message, Checked } from '@element-plus/icons-vue'
import { ElIconPlus, IconFont } from '~/KeepUp'
import { sendEmailCodeByRegisterApi } from '../../api/auth'

import type { ComputedRef, Ref } from 'vue'
import type { Field, Form } from '@formily/core'
import type { ISchema } from '@formily/json-schema'

/** 邮箱格式校验正则 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let timer = 0
/** 开始倒计时 */
const startCountDown = (timeField: Field) => {
  /** 倒计时时长 */
  const length = 60
  /** 倒计时结束时间 */
  const endTime = -1
  timeField.value = length
  clearInterval(timer)
  timer = setInterval(() => {
    timeField.value = timeField.value - 1
    if (timeField.value === endTime) {
      clearInterval(timer)
      timer = 0
    }
  }, 1000) as any
}
/** 设置字段样式 */
const setFieldStyle = (timeField: Field, field: Field, email: number) => {
  const isCountDown = timeField?.value !== -1
  field.setComponentProps({
    ...(field.componentProps || {}),
    disabled: isCountDown ? true : !email,
  })
  field.setContent(`获取验证码${isCountDown ? `（${timeField.value}s）` : ''}`)
}
export const getSchema = (formRef: Ref<Form>, isInvite: ComputedRef<boolean>): ISchema => ({
  type: 'Object',
  properties: {
    username: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入用户名',
        clearable: true,
        size: 'large',
      },
      'x-content': {
        prefix: () => h(ElIconPlus, { icon: h(UserFilled) }),
      },
      'x-validator': {
        triggerType: 'onInput', 
        validator: (value: string = '') => {
          if (!value) {
            return '请输入用户名'
          } else if (value.length < 6 || value.length > 20) {
            return '长度要求在 6 到 20 个字符'
          }
        },
      },
    },
    password: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入密码',
        showPassword: true,
        clearable: true,
        size: 'large',
      },
      'x-content': {
        prefix: () => h(
          IconFont, 
          { 
            name: 'lock', 
            style: {
              fontSize: '14px',
            },
          },
        ),
      },
      'x-validator': {
        triggerType: 'onInput', 
        validator: (value: string = '') => {
          const regx = /^(?=.{8,32}$)(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))[^\s]+$/
          if (!value) {
            return '请输入密码'
          } else if (!regx.test(value)) {
            return '长度要求在 8 到 32 个字符，至少同时包含大小写字母、数字、特殊符号中的3种'
          }
        },
      },
    },
    confirmPassword: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请再次输入密码',
        showPassword: true,
        clearable: true,
        size: 'large',
      },
      'x-content': {
        prefix: () => h(
          IconFont, 
          { 
            name: 'lock', 
            style: {
              fontSize: '14px',
            },
          },
        ),
      },
      'x-validator': {
        triggerType: 'onInput', 
        validator: (value: string = '', _, { field }) => {
          const pwd = field.query('.password')?.get('value')
          if (!value) {
            return '请再次输入密码'
          } else if (value.length < 6 || value.length > 20) {
            return '长度要求在 6 到 20 个字符'
          } else if (value !== pwd) {
            return '密码不一致'
          }
        },
      },
    },
    email: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入邮箱',
        clearable: true,
        size: 'large',
        disabled: isInvite.value,
      },
      'x-content': {
        prefix: () => h(ElIconPlus, { icon: h(Message) }),
      },
      'x-validator': {
        triggerType: 'onInput', 
        validator: (value: string = '') => {
          if (!value) {
            return '请输入邮箱'
          } else if (!emailRegex.test(value)) {
            return '请输入正确邮箱格式'
          }
        },
      },
    },
    codeSpace: {
      type: 'void',
      'x-component': 'KeepUpSpace',
      'x-component-props': {
        align: 'center',
        justify: 'space-between',
      },
      properties: {
        code: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            style: {
              flex: 1,
            }
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入邮箱验证码',
            clearable: true,
            size: 'large',
          },
          'x-content': {
            prefix: () => h(ElIconPlus, { icon: h(Checked) }),
          },
          'x-validator': {
            triggerType: 'onInput', 
            validator: (value: string = '') => {
              if (!value) {
                return '请输入邮箱验证码'
              }
            },
          },
        },
        /** 记录倒计时, 0-60为倒计时区间，-1为停止 */
        time: {
          type: 'string',
          default: -1,
          'x-display': 'hidden',
        },
        getCodeBtn: {
          type: 'void',
          'x-decorator': 'FormItem',
          'x-component': 'ElButton',
          'x-component-props': {
            type: 'primary',
            plain: true,
            size: 'large',
            onClick: async () => {
              try {
                const timeField = formRef.value.query('codeSpace.time')?.take() as Field
                const emailField = formRef.value.query('email')?.take() as Field
                await emailField.validate?.()
                const verifyResult = emailRegex.test(emailField.value)
                if (verifyResult) {
                  await sendEmailCodeByRegisterApi({ recipient: emailField.value })
                  ElMessage({
                    type: 'success',
                    message: '验证码发送成功',
                  })
                  startCountDown(timeField)
                } else {
                  ElMessage({ type: 'warning', message: '请输入正确邮箱格式' })
                }
              } catch (error: any) {
                console.error(`发送验证码失败，失败原因：${error}`)
              }
            },
          },
          'x-content': '获取验证码',
          'x-reactions': (field: Field) => {
            const timeField = field.query('.time')?.take() as Field
            const email = field.query('.email')?.get('value')
            setFieldStyle(timeField, field, email)
          },
        }
      },
    },
  },
})
