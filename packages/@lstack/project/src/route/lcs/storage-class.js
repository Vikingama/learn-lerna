import { route } from '../../constructor'
import { Index } from './lcs-index'

export const StorageClasses = route('StorageClasses', '存储类别', 'storage-classes', {}, Index)
export const StorageClass = route('StorageClass', '存储类别', 'storage-class', {}, Index)
export const StorageClassCreate = route('StorageClassCreate', '创建存储类别', 'storage-class-create', {}, Index)
