import { h } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { ElIconPlus, IconFont } from '~/KeepUp'

import type { ISchema } from "@formily/json-schema"

export const getSchema = (): ISchema => ({
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
      "x-validator": {
        triggerType: 'onInput', 
        validator: (value: string = '') => {
          if (!value) {
            return '请输入用户名'
          } else if (value.length < 5 || value.length > 20) {
            return '长度要求在 5 到 20 个字符'
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
      "x-validator": {
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
  },
})
