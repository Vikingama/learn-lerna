import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Services = route('Services', 'Service', 'services', {}, Index)
export const Service = route(
  'Service',
  'Service',
  'service',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const ServiceCreate = route('ServiceCreate', '添加 Service', 'service-create', {}, Index)
export const ServiceUpdate = route(
  'ServiceUpdate',
  '修改 Service',
  'service-update',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
