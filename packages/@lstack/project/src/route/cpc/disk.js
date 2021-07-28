import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Disks = route('Disks', '云盘', 'disks', {}, Index)
export const Disk = route(
  'Disk',
  '云盘',
  'disk',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const DiskCreate = route('DiskCreate', '创建云盘', 'disk-create', {}, Index)
