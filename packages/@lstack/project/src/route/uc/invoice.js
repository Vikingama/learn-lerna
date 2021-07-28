import { route } from '../../constructor'
import { Index } from './uc-index'
import { ContractInvoice } from './contract'

export const InvoiceManage = route('InvoiceManage', '发票管理', 'invoice-manage', {}, ContractInvoice)
export const RequestInvoice = route('RequestInvoice', '索取发票', 'request-invoice', {}, Index)
