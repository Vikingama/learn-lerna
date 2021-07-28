import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Slbs = route('Slbs', '负载均衡', 'slbs', {}, Index)
export const Slb = route(
  'Slb',
  '负载均衡',
  'slb',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const SlbCreate = route('SlbCreate', '创建负载均衡 SLB', 'slb-create', {}, Index)
