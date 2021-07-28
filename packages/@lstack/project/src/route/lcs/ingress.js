import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Ingresses = route('Ingresses', 'Ingress', 'ingresses', {}, Index)
export const Ingress = route(
  'Ingress',
  'Ingress',
  'ingress',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const IngressCreate = route('IngressCreate', '添加 Ingress', 'ingress-create', {}, Index)
export const IngressUpdate = route(
  'IngressUpdate',
  '修改 Ingress',
  'ingress-update',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
