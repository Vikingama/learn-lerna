import { route } from '../../constructor'
import { Index } from './lcs-index'

export const NodePools = route('NodePools', '节点池', 'node-pools', {}, Index)
export const NodePool = route('NodePool', '节点池', 'node-pool', { clusterId: undefined, name: undefined }, Index)
export const NodePoolCreate = route('NodePoolCreate', '创建节点池', 'node-pool-create', {}, Index)
export const NodePoolUpdate = route(
  'NodePoolUpdate',
  '修改节点池',
  'node-pool-update',
  { clusterId: undefined, name: undefined },
  Index
)
