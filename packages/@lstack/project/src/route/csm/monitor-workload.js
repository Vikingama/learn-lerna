import { route } from '../../constructor'
import { Index } from './csm-index'

export const MonitorWorkload = route('MonitorWorkloadPageHub', '节点监控', 'monitor-node', {}, Index)
export const MonitorWorkloadCpuMem = route('MonitorWorkloadCpuMem', 'CPU和内存', 'cpu-mem', {}, MonitorWorkload)
export const MonitorWorkloadNetwork = route('MonitorWorkloadNetwork', '网络监控', 'network', {}, MonitorWorkload)
export const MonitorWorkloadStorage = route('MonitorWorkloadStorage', '存储监控', 'storage', {}, MonitorWorkload)

MonitorWorkload.setRedirectRoute(MonitorWorkloadCpuMem)
