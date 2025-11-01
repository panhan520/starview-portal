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
          if (!value) {
            return '请输入密码'
          } else if (value.length < 5 || value.length > 20) {
            return '长度要求在 5 到 20 个字符'
          }
        },
      },
    },
  },
})
