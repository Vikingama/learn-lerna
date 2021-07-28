import { route } from '../../constructor'
import { Index } from './csm-index'

export const MonitorNode = route('MonitorNodePageHub', '节点监控', 'monitor-node', {}, Index)
export const MonitorNodeCpuMem = route('MonitorNodeCpuMem', 'CPU和内存', 'cpu-mem', {}, MonitorNode)
export const MonitorNodeNetwork = route('MonitorNodeNetwork', '网络监控', 'network', {}, MonitorNode)
export const MonitorNodeStorage = route('MonitorNodeStorage', '存储监控', 'storage', {}, MonitorNode)

MonitorNode.setRedirectRoute(MonitorNodeCpuMem)
