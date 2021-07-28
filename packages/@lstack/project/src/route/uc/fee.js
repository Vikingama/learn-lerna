import { route } from '../../constructor'
import { Index } from './uc-index'

export const FeeManage = route('FeeManage', '费用管理', 'fee-manage', {}, Index)
export const InoutDetails = route('InoutDetails', '收支明细', 'inout-details', {}, FeeManage)
export const Recharge = route('Recharge', '充值', 'recharge', {}, FeeManage)
