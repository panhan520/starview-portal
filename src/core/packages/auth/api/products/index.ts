import { AUTH_REQUESTER } from '../requests'

import type { IMicroConfig } from './interfaces'

/** 获取产品列表 */
export const getProductsListAPi = async (): Promise<Record<'list', IMicroConfig[]>> => {
  return AUTH_REQUESTER.get('api/v1/iam/apps')
  // const res = await AUTH_REQUESTER.get('api/v1/iam/apps')
  // console.log({ res })
  // return {
  //   "list": [
  //     {
  //       "name": "ACCOUNT_MANAGEMENT",
  //       "entry": "https://www.observe.dev.eks.gainetics.io",
  //       "activeRule": "/microApp/accountManagement",
  //       "key": 0,
  //       "icon": "",
  //       "label": "访问控制"
  //     },
  //     {
  //       "name": "STARVIEW",
  //       "entry": "https://iam.observe.dev.eks.gainetics.io",
  //       "activeRule": "/microApp/starview",
  //       "key": 1,
  //       "icon": "",
  //       "label": "星云数据观测平台"
  //     }
  //   ]
  // }
}
