import { route } from '../../constructor'
import { Index } from './account-index'

export const Contacters = route('Contacters', '联系人管理', 'contacters', {}, Index)
export const ContacterCreate = route('ContacterCreate', '联系人管理', 'contacter-create', {}, Index)
export const ContacterActivateEmailTip = route('ContacterActivateEmailTip', '激活邮箱', 'contacter-activate-email-tip', {}, Index)
export const ContacterActivatePhoneTip = route('ContacterActivatePhoneTip', '联系人管理', 'contacter-activate-phone-tip', {}, Index)

