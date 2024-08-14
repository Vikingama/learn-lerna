import { route } from '../../constructor'
import { Index } from './cpc-index'

export const HBases = route('HBases', 'HBase 集群', 'h-bases', {}, Index)
export const HBase = route(
  'HBase',
  'HBase 集群',
  'h-base',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const HBaseCreate = route('HBaseCreate', '创建 HBase 集群', 'h-base-create', {}, Index)
