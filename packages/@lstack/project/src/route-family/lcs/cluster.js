import { routeFamily } from '../../constructor'
import {
  Cluster as ClusterRoute,
  ClusterCreate,
  Clusters,
  NormalClusterCreate,
  StaticClusterCreate,
  ManagedClusterCreate,
} from '../../route/lcs'

export const Cluster = routeFamily(ClusterCreate, Clusters, ClusterRoute)

ClusterCreate.setFamily(Cluster)
Clusters.setFamily(Cluster)
ClusterRoute.setFamily(Cluster)
NormalClusterCreate.setFamily(Cluster)
StaticClusterCreate.setFamily(Cluster)
ManagedClusterCreate.setFamily(Cluster)
