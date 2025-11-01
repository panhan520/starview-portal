import { h } from 'vue'
import { ElMessageBox } from 'element-plus'
import { IconFont } from '~/KeepUp'

/** 动作 */
export const getActions = ({ logout }) => ([
  {
    title: '退出登录',
    icon: h(IconFont, { name: 'log-out', size: '12' }),
    click: async () => {
      // TODO：退出登录需要调接口
      try {
        await ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        logout()
      } catch (error: any) {
        console.error(`退出登陆失败，失败原因：${error}`)
      }
    },
  }
])
