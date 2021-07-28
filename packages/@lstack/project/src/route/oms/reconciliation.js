import { route } from '../../constructor'
import { FinancesManage } from './finances'

export const Reconciliation = route('Reconciliation', '财务对账', 'reconciliation', {}, FinancesManage)
export const UserReconciliation = route('UserReconciliation', '用户对账', 'user', {}, Reconciliation)
export const MarketReconciliation = route('MarketReconciliation', '云市场结算账单', 'market', {}, Reconciliation)
