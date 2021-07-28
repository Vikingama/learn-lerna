import { route } from '../../constructor'
import { SnapshotManagement } from './snapshot-management'
import { Index } from './cpc-index'

export const SnapshotPolicies = route('SnapshotPolicies', '自动快照策略', 'snapshot-policies', {}, SnapshotManagement)
export const SnapshotPolicyCreate = route(
  'SnapshotPolicyCreate',
  '创建自动快照策略',
  'snapshot-policy-create',
  {},
  Index
)
