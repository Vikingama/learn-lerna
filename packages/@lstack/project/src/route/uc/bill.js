import { route } from '../../constructor'
import { Index } from './uc-index'

export const BillManage = route('BillManage', '账单管理', 'bill-manage', {}, Index)
export const FeeBill = route("FeeBill",'费用账单','fee-bill',{},BillManage)
export const CostBill = route("CostBill",'成本账单','cost-bill',BillManage)
export const ExportRecords = route("ExportRecords",'导出记录','export-records',BillManage)
export const FeeBillOverview = route('FeeBillOverview', '总览', 'overview', {}, FeeBill)
export const Bill = route('Bill', '账单', 'bill', {}, FeeBill)
export const BillDetails = route('BillDetails', '账单明细', 'bill-details', {}, FeeBill)
