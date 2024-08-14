import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Vpcs = route('Vpcs', '专有网络', 'vpcs', {}, Index)
export const Vpc = route(
  'Vpc',
  '专有网络',
  'vpc',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const VpcCreate = route('VpcCreate', '创建专有网络', 'vpc-create', {}, Index)
