import { route } from '../../constructor'
import { Index } from './lcs-index'

export const NetworkPolicies = route('NetworkPolicies', 'NetworkPolicy', 'network-policies', {}, Index)
export const NetworkPolicy = route(
  'NetworkPolicy',
  'NetworkPolicy',
  'network-policy',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const NetworkPolicyCreate = route(
  'NetworkPolicyCreate',
  '添加 NetworkPolicy',
  'network-policy-create',
  {},
  Index
)
