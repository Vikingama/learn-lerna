import { route } from '../../constructor'
import { Index } from './uc-index'

export const RenewalManage = route('RenewalManage', '续费管理', 'renewal-manage', {}, Index)
export const RenewalThese = route('RenewalThese', '续费', 'renewal-these', {}, Index)
export const LStackRenewalManage = route('LStackRenewalManage', 'LStack 续费管理', 'lstack', {}, RenewalManage)
export const MarketRenewalManage = route('MarketRenewalManage', '云市场续费管理', 'market', {}, RenewalManage)
