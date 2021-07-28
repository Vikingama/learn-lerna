import { route } from '../../constructor'
import { Index } from './lcs-index'

export const ConfigMaps = route('ConfigMaps', '配置项', 'configmaps', {}, Index)
export const ConfigMap = route(
  'ConfigMap',
  '配置项',
  'configmap',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const ConfigMapCreate = route('ConfigMapCreate', '创建配置项', 'configmap-create', {}, Index)
