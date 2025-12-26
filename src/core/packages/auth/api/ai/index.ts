import { AUTH_REQUESTER } from '../requests'
import type {
  GetSessionListRsp,
  CreateSessionReq,
  ChatSession,
  GetChatMsg,
  SetName
} from './interfaces'

/**
 * 获取会话历史列表
 * @param chatScene 会话场景
 */
export const getSessionListApi = (
  chatScene: string,
): Promise<GetSessionListRsp> => {
  return AUTH_REQUESTER.get('/api/v1/aichat/session/list', {
    params: { chatScene },
  })

}
/**
 * 获取会话详情
 * @param sessionId 会话id
 */
export const getSessionDetailApi = (
  sessionId: string,
): Promise<GetChatMsg> => {
  return AUTH_REQUESTER.get('/api/v1/aichat/session/detail/' + sessionId)

}

/**
 * 新建会话
 * @param params 创建会话参数
 */
export const createSessionApi = (
  params: CreateSessionReq,
): Promise<ChatSession> => {
  return AUTH_REQUESTER.post('/api/v1/aichat/session/create', params)
}

/**
 * 重命名
 * @param params 发送消息参数
 */
export const setNameApi = (params: SetName) => {
  return AUTH_REQUESTER.post('/api/v1/aichat/session/set-name', params)
}

/**
 * 删除会话
 * @param params 发送消息参数
 */
export const deteleNameApi = (params: SetName) => {
  return AUTH_REQUESTER.delete('/api/v1/aichat/session/' + params)
}

