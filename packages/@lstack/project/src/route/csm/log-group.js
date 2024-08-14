import { route } from '../../constructor'
import { Index } from './csm-index'

export const LogGroups = route('LogGroups', '日志组管理', 'log-groups', {}, Index)
export const LogGroupCreate = route('LogGroupCreate', '创建日志组', 'log-group-create', { clusterId: undefined }, Index)
