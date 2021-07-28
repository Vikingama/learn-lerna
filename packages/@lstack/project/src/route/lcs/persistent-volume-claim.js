import { route } from '../../constructor'
import { Index } from './lcs-index'

export const PersistentVolumeClaims = route('PersistentVolumeClaims', '存储声明', 'persistent-volume-claims', {}, Index)
export const PersistentVolumeClaim = route('PersistentVolumeClaim', '存储声明', 'persistent-volume-claim', {}, Index)
export const PersistentVolumeClaimCreate = route(
  'PersistentVolumeClaimCreate',
  '创建存储声明',
  'persistent-volume-claim-create',
  {},
  Index
)
