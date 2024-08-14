import { route } from '../../constructor'
import { Index } from './csm-index'

export const MonitorCluster = route('MonitorClusterPageHub', '集群监控', 'monitor-cluster', {}, Index)
export const MonitorClusterCpuMem = route('MonitorClusterCpuMem', 'CPU和内存', 'cpu-mem', {}, MonitorCluster)
export const MonitorClusterNetwork = route('MonitorClusterNetwork', '网络监控', 'network', {}, MonitorCluster)
export const MonitorClusterStorage = route('MonitorClusterStorage', '存储监控', 'storage', {}, MonitorCluster)

MonitorCluster.setRedirectRoute(MonitorClusterCpuMem)
