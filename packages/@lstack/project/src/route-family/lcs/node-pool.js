import { routeFamily } from '../../constructor'
import { NodePool as NodePoolRoute, NodePoolCreate, NodePoolUpdate, NodePools } from '../../route/lcs'

export const NodePool = routeFamily(NodePoolCreate, NodePools, NodePoolRoute, NodePoolUpdate)

NodePoolCreate.setFamily(NodePool)
NodePoolUpdate.setFamily(NodePool)
NodePools.setFamily(NodePool)
NodePoolRoute.setFamily(NodePool)
