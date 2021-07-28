import { route } from '../../constructor'
import { Index } from './tenant-index'

export const Orders = route('Orders', '订单管理', 'orders', {}, Index)
export const Order = route('Order', '订单详情', 'order', {}, Index)

Index.setRedirectRoute(Orders)
