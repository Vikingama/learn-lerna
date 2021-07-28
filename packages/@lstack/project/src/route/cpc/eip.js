import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Eips = route('Eips', '弹性公网 IP', 'eips', {}, Index)
export const Eip = route(
  'Eip',
  '弹性公网 IP',
  'eip',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const EipCreate = route('EipCreate', '创建弹性公网 IP', 'eip-create', {}, Index)
