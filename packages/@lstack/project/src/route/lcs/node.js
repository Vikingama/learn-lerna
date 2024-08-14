import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Nodes = route('Nodes', '节点', 'nodes', {}, Index)
export const Node = route('Node', '节点', 'node', { clusterId: {}, name: {} }, Index)
export const NodeCreate = route('NodeCreate', '添加节点', 'node-create', {}, Index)
export const NormalNodeCreate = route('NormalNodeCreate', '添加普通节点', 'normal-node-create', {}, NodeCreate)
export const EdgeNodeCreate = route('EdgeNodeCreate', '添加边缘节点', 'edge-node-create', {}, NodeCreate)
export const StaticNodeCreate = route('StaticNodeCreate', '添加静态节点', 'static-node-create', {}, NodeCreate)

NodeCreate.setRedirectRoute(NormalNodeCreate)
