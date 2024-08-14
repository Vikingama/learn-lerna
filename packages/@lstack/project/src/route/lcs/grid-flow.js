import { route } from '../../constructor'
import { Index } from './lcs-index'

export const GridFlow = route('GridFlow', '流量治理', 'grid-flow', {}, Index)

export const FlowNamespace = route('FlowNamespace', 'FlowNamespace', 'flow-namespace', {}, GridFlow)
export const FlowVirtualService = route('FlowVirtualService', 'FlowVirtualService', 'flow-virtual-service', {}, GridFlow)
export const FlowDestinationRule = route('FlowDestinationRule', 'FlowDestinationRule', 'flow-destination-rule', {}, GridFlow)
export const FlowGateway = route('FlowGateway', 'FlowGateway', 'flow-gateway', {}, GridFlow)
export const FlowServiceEntry = route('FlowServiceEntry', 'FlowServiceEntry', 'flow-service-entry', {}, GridFlow)
export const FlowWorkloadEntry = route('FlowWorkloadEntry', 'FlowWorkloadEntry', 'flow-workload-entry', {}, GridFlow)
export const FlowEnvoyFilter = route('FlowEnvoyFilter', 'FlowEnvoyFilter', 'flow-envoy-filter', {}, GridFlow)
export const FlowSidecar = route('FlowSidecar', 'FlowSidecar', 'flow-sidecar', {}, GridFlow)
export const FlowPeerAuthentication = route('FlowPeerAuthentication', 'FlowPeerAuthentication', 'flow-peer-authentication', {}, GridFlow)
export const FlowRequestAuthentication = route('FlowRequestAuthentication', 'FlowRequestAuthentication', 'flow-request-authentication', {}, GridFlow)
export const FlowAuthorizationPolicy = route('FlowAuthorizationPolicy', 'FlowAuthorizationPolicy', 'flow-authorization-policy', {}, GridFlow)

GridFlow.setRedirectRoute(FlowNamespace)
