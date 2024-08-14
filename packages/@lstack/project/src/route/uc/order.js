import { route } from '../../constructor'
import { Index } from './uc-index'

export const OrderManage = route('OrderManage', '订单管理', 'order-manage', {}, Index)
export const LStackOrderManage = route('LStackOrderManage', 'LStack 订单管理', 'lstack', {}, OrderManage)
export const MarketOrderManage = route('LStackOrderManage', '云市场订单管理', 'market', {}, OrderManage)
