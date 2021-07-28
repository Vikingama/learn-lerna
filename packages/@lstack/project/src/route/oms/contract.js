import { route } from '../../constructor'
import { FinancesManage } from './finances'

export const ContractManage = route('ContractManage', '合同管理', 'contract-manage', {}, FinancesManage)
export const LStackContract = route('LStackContract', 'LStack 产品合同', 'lstack', {}, ContractManage)
export const MarketContract = route('MarketContract', '云市场产品合同', 'market', {}, ContractManage)
