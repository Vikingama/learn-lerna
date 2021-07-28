import { route } from '../../constructor'
import { Index } from './lcs-index'

export const StatefulSets = route('StatefulSets', '有状态工作负载', 'stateful-sets', {}, Index)
export const StatefulSet = route(
  'StatefulSet',
  '有状态工作负载',
  'stateful-set',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const StatefulSetCreate = route('StatefulSetCreate', '创建有状态工作负载', 'stateful-set-create', {}, Index)
