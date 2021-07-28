import { route } from '../../constructor'
import { FinancesManage } from './finances'

export const InvoiceManage = route('InvoiceManage', '发票管理', 'invoice-manage', {}, FinancesManage)
export const UserInvoice = route('UserInvoice', '用户开票', 'user', {}, InvoiceManage)
export const MarketInvoice = route('MarketInvoice', '平台开票', 'market', {}, InvoiceManage)
