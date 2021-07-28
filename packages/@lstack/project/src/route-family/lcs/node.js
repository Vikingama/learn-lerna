import { routeFamily } from '../../constructor'
import {
  Node as NodeRoute,
  NodeCreate,
  Nodes,
  NormalNodeCreate,
  EdgeNodeCreate,
  StaticNodeCreate,
} from '../../route/lcs'

export const Node = routeFamily(NodeCreate, Nodes, NodeRoute)

NodeCreate.setFamily(Node)
Nodes.setFamily(Node)
NodeRoute.setFamily(Node)
NormalNodeCreate.setFamily(Node)
EdgeNodeCreate.setFamily(Node)
StaticNodeCreate.setFamily(Node)
