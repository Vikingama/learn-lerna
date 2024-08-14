import { route } from '../../constructor'
import { Index } from './uc-index'

export const ContractInvoice = route('ContractInvoice', '合同与发票', 'contract-invoice', {}, Index)
export const RequestContract = route('RequestContract', '合同申请', 'request-contract', {}, Index)
export const ContractManage = route('ContractManage', '合同管理', 'contract-manage', {}, ContractInvoice)
export const LStackRequestContract = route('LStackRequestContract', 'LStack 合同申请', 'lstack', {}, RequestContract)
export const MarketRequestContract = route('MarketRequestContract', '云市场合同申请', 'market', {}, RequestContract)
