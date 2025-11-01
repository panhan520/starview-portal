import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { IconFont } from '~/KeepUp'
import { checkCurEmail, sendEmailCodeByFindPwdApi } from '../../api/auth'

import type { Ref } from 'vue'
import type { Field, Form } from '@formily/core'
import type { ISchema } from "@formily/json-schema"

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
const commonStyle = {
  style: {
    padding: '0 70px'
  },
}
const commonPwdIconProps = { 
  size: '16px',
  style: {
    color: '#333',
  },
}
export const getSchema = (formRef: Ref<Form>): ISchema => ({
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      'x-component': 'FormStep',
      'x-component-props': {
        formStep: '{{formStep}}',
      },
      properties: {
        step1: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '账号验证',
          },
          properties: {
            email: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                ...commonStyle,
              },
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入邮箱',
                clearable: true,
                size: 'large',
              },
              'x-content': {
                prefix: () => h(
                  IconFont, 
                  { 
                    name: 'usernameAndEmail',
                    ...commonPwdIconProps,
                  },
                ),
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
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                ...commonStyle,
              },
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
                    },
                  },
                  'x-component': 'Input',
                  'x-component-props': {
                    placeholder: '请输入邮箱验证码',
                    clearable: true,
                    size: 'large',
                  },
                  'x-content': {
                    prefix: () => h(
                      IconFont, 
                      { 
                        name: 'code', 
                        size: '16px',
                        style: {
                          color: '#333',
                        },
                      },
                    ),
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
                        const timeField = formRef.value.query('collapse.step1.codeSpace.time')?.take() as Field
                        const emailField = formRef.value.query('collapse.step1.email')?.take() as Field
                        await emailField.validate?.()
                        await checkCurEmail(emailField.value)
                        await sendEmailCodeByFindPwdApi({ recipient: emailField.value })
                        ElMessage({
                          type: 'success',
                          message: '验证码发送成功',
                        })
                        startCountDown(timeField)
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
        },
        step2: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '设置新密码',
          },
          properties: {
            newPwd: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                ...commonStyle,
              },
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
                    ...commonPwdIconProps,
                  },
                ),
              },
              "x-validator": {
                triggerType: 'onInput', 
                validator: (value: string = '') => {
                  if (!value) {
                    return '请输入密码'
                  } else if (value.length < 5 || value.length > 20) {
                    return '长度要求在 5 到 20 个字符'
                  }
                },
              },
            },
            confirmPwd: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                ...commonStyle,
              },
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
                    ...commonPwdIconProps,
                  },
                ),
              },
              'x-validator': {
                triggerType: 'onInput', 
                validator: (value: string = '', _, { field }) => {
                  const newPwd = field.query('.newPwd')?.get('value')
                  if (!value) {
                    return '请再次输入密码'
                  } else if (value.length < 5 || value.length > 20) {
                    return '长度要求在 5 到 20 个字符'
                  } else if (value !== newPwd) {
                    return '密码不一致'
                  }
                },
              },
            },
          },
        },
      },
    },
  },
})