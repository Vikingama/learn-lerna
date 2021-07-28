import { route } from '../../constructor'
import { FinancesManage } from './finances'

export const OrderManage = route('OrderManage', '订单管理', 'order-manage', {}, FinancesManage)
export const OrderSetting = route('OrderSetting', '订单设置', 'order-setting', {}, OrderManage)
export const AddOfflineOrder = route('AddOfflineOrder', '新增线下订单', 'add-offline-order', {}, OrderManage)
