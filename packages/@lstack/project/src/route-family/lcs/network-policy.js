import { routeFamily } from '../../constructor'
import { NetworkPolicy as NetworkPolicyRoute, NetworkPolicies, NetworkPolicyCreate } from '../../route/lcs'

export const NetworkPolicy = routeFamily(NetworkPolicyCreate, NetworkPolicies, NetworkPolicyRoute)

NetworkPolicyCreate.setFamily(NetworkPolicy)
NetworkPolicies.setFamily(NetworkPolicy)
NetworkPolicyRoute.setFamily(NetworkPolicy)
