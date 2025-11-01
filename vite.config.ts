import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { getMicroAppConfigs } from './src/core/packages/qiankun'

import type { IMicroConfig } from './src/core/packages/qiankun/interfaces'

/** 根据子应用配置表生成针对子应用的proxy代理 */
export const generateMicroAppProxy = (microAppConfigs: IMicroConfig[] = []) => Object.fromEntries(
  microAppConfigs.map(v => ([
    [`/${v.name}`],
    {
      target: v.entry,
      changeOrigin: true,
    },
  ]))
)
export default defineConfig(async ({ mode }) => {
  return ({
    plugins: [
      vue(), 
      vueJsxPlugin(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/core/theme/index.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '~': path.join(__dirname, '.', 'src'),
      },
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0" 也可设置成你的ip地址
      host: '0.0.0.0',
      port: Number(loadEnv(mode, process.cwd())?.VITE_PORT),
      cors: true,
      proxy: {
        ...generateMicroAppProxy(getMicroAppConfigs(loadEnv(mode, process.cwd()))),
        /** 身份 */
        [`/auth-proxy`]: {
          target: 'https://gateway.observe.dev.eks.gainetics.io/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth-proxy/, ''),
        },
        [`/aiagent/v1`]: {
          target: 'https://gateway.observe.dev.gainetics.io',
          changeOrigin: true,
        },
      },
    },
  })
})
