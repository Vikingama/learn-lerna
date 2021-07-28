import { route } from '../../constructor'
import { Index } from './lcs-index'

export const OperateLogs = route('OperateLogs', '操作记录', 'operate-logs', { resourceType: undefined }, Index)
export const OperateLog = route('OperateLog', '操作详情', 'operate-log', { id: undefined }, Index)
