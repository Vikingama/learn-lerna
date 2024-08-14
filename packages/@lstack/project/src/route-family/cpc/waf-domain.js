import { routeFamily } from '../../constructor'
import { WafDomain as WafDomainRoute, WafDomains } from '../../route/cpc'

export const WafDomain = routeFamily(undefined, WafDomains, WafDomainRoute)

WafDomains.setFamily(WafDomain)
WafDomainRoute.setFamily(WafDomain)
