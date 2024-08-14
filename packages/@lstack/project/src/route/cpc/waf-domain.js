import { route } from '../../constructor'
import { Index } from './cpc-index'

export const WafDomains = route('WafDomains', 'DNS 域名', 'waf-domains', {}, Index)
export const WafDomain = route(
  'WafDomain',
  'DNS 域名',
  'waf-domain',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
