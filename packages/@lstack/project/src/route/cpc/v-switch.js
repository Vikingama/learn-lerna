import { route } from '../../constructor'
import { Index } from './cpc-index'

export const VSwitches = route('VSwitches', '子网', 'v-switches', {}, Index)
export const VSwitch = route(
  'VSwitch',
  '负载均衡',
  'v-switch',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const VSwitchCreate = route('VSwitchCreate', '创建子网', 'v-switch-create', {}, Index)
