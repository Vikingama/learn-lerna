import { route } from '../../constructor'
import { Index } from './isv-index'

export const OrderManage = route('OrderManage', '订单管理', 'order-manage', {}, Index)
export const SettleManage = route('SettleManageFrame', '结算管理', 'settle-manage', {}, Index)
export const Statement = route('Statement', '结算单', 'statement', {}, SettleManage)
export const SettlementBill = route('SettlementBill', '结算账单', 'settlement-bill', {}, SettleManage)

export const Invoice = route('Invoice', '发票管理', 'invoice', {}, Index)
export const InvoiceMakeOut = route('InvoiceMakeOut', '开票', 'invoice-make-out', {}, Index)
export const Contract = route('Contract', '合同管理', 'contract', {}, Index)
SettleManage.setRedirectRoute(Statement)
