import { route } from '../../constructor'
import { Index } from './isv-index'

export const ServiceProvider = route('ServiceProvider', '服务商信息', 'service-provider', {}, Index)
// export const ServiceProviderCreate = route(
//   'ServiceProviderCreate',
//   '服务商入驻',
//   'service-provider-settle-in',
//   {},
//   Index
// )
export const ServiceProviderConfigUpdate = route(
  'ServiceProviderConfigUpdate',
  '修改服务商信息',
  'service-provider-update',
  {},
  Index
)
export const BusinessConfigUpdate = route('BusinessConfigUpdate', '修改商业信息', 'business-update', {}, Index)
export const InvoiceUpdate = route('InvoiceUpdate', '修改发票信息', 'invoice-update', {}, Index)
export const PostUpdate = route('PostUpdate', '修改邮寄信息', 'post-update', {}, Index)
export const PreSalesStaffCreate = route('PreSalesStaffCreate', '添加售前支持人员', 'pre-sales-staff-create', {}, Index)
export const ServiceStaffCreate = route('ServiceStaffCreate', '添加服务支持人员', 'service-staff-create', {}, Index)
