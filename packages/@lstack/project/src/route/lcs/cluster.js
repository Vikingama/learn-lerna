import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Cluster = route('Cluster', '集群', 'cluster', { id: {} }, Index)
export const Clusters = route('Clusters', '集群', 'clusters', {}, Index)
export const ClusterCreate = route('ClusterCreate', '创建集群', 'cluster-create', {}, Index)
export const NormalClusterCreate = route(
  'NormalClusterCreate',
  '创建普通集群',
  'normal-cluster-create',
  {},
  ClusterCreate
)
export const StaticClusterCreate = route(
  'StaticClusterCreate',
  '创建静态集群',
  'static-cluster-create',
  {},
  ClusterCreate
)
export const ManagedClusterCreate = route(
  'ManagedClusterCreate',
  '创建纳管集群',
  'managed-cluster-create',
  {},
  ClusterCreate
)

ClusterCreate.setRedirectRoute(NormalClusterCreate)
