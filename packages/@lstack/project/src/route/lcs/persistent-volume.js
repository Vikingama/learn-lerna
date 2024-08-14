import { route } from '../../constructor'
import { Index } from './lcs-index'

export const PersistentVolumes = route('PersistentVolumes', '存储卷', 'persistent-volumes', {}, Index)
export const PersistentVolume = route('PersistentVolume', '存储卷', 'persistent-volume', {}, Index)
export const PersistentVolumeCreate = route(
  'PersistentVolumeCreate',
  '创建存储卷',
  'persistent-volume-create',
  {},
  Index
)
