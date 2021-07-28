import { route } from '../../constructor'
import { Index } from './cpc-index'

export const WafDomainConfigs = route('WafDomainConfigs', '网站接入', 'waf-domain-configs', {}, Index)
export const WafDomainConfigCreate = route('WafDomainConfigCreate', '添加网站', 'waf-domain-config-domain', {}, Index)
