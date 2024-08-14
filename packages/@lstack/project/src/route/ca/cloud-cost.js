import { route } from '../../constructor'
import { Index } from './ca-index'

export const CloudCost = route('CloudCost', '云成本中心', 'cloud-cost', '{}', Index)
export const ServiceProviderOverview = route('ServiceProviderOverview', '云服务商总览', 'overview', '{}', CloudCost)
export const ServiceProviderBill = route('ServiceProviderBill', '云服务商账单', 'bill', '{}', CloudCost)
export const CostOptimize = route('CostOptimize', '成本优化', 'cost-optimize', '{}', CloudCost)
export const FeeAssess = route('FeeAssess', '费用评估', 'fee-assess', '{}', CloudCost)
export const ServiceProviderBillOverview = route(
  'ServiceProviderBillOverview',
  '账单总览',
  'overview',
  '{}',
  ServiceProviderBill
)
export const ServiceProviderBillDetails = route(
  'ServiceProviderBillDetails',
  '账单明细',
  'details',
  '{}',
  ServiceProviderBill
)
export const ServiceProviderBillReport = route(
  'ServiceProviderBillReport',
  '账单报告',
  'report',
  '{}',
  ServiceProviderBill
)
export const ServiceProviderCombineBill = route(
  'ServiceProviderCombineBill',
  '合并账单',
  'combine',
  '{}',
  ServiceProviderBill
)
