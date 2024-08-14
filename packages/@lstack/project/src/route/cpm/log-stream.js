import { route } from '../../constructor'
import { Index } from './cpm-index'

export const LogStreams = route('LogStreams', '日志流管理', 'log-streams', {}, Index)
export const LogStreamCreate = route('LogStreamCreate', '创建日志流', 'log-stream-create', {}, Index)
export const LogStreamUpdate = route('LogStreamUpdate', '修改日志流', 'log-stream-update', { id: undefined }, Index)
