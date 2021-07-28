import { route } from '../../constructor'
import { Index } from './account-index'

export const SecuritySettings = route('SecuritySettings', '安全设置', 'security-settings', {}, Index)
export const IpMask = route('IpMask', 'IP访问控制', 'ip-mask', {}, Index)
export const ActivateEmail = route('ActivateEmail', '激活邮箱', 'activate-email', {}, Index)
export const ActivateEmailTip = route('ActivateEmailTip', '激活邮箱', 'activate-email-tip', {}, Index)


Index.setRedirectRoute(SecuritySettings)
