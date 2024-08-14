import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Osses = route('Osses', '对象存储', 'osses', {}, Index)
export const Oss = route(
  'Oss',
  '对象存储',
  'oss',
  { cloudProviderId: undefined, regionId: undefined, name: undefined, ackUid: undefined },
  Index
)
export const OssCreate = route('OssCreate', '创建对象存储', 'oss-create', {}, Index)
