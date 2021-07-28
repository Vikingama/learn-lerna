import { route } from '../../constructor'
import { Index } from './buy-index'

export const PayFor = route('PayFor', '支付-LStack 朗澈科技', 'pay-for', {}, Index)
export const SettleFor = route('SettleFor', '结算-LStack 朗澈科技', 'settle-for', {}, Index)
