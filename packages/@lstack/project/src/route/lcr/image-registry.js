import { route } from '../../constructor'
import { Index } from './lcr-index'

export const ImageRegistries = route('ImageRegistries', '源仓库管理', 'image-registries', {}, Index)
export const ImageRegistryCreate = route('ImageRegistryCreate', '创建源仓库', 'image-registry-create', {}, Index)
export const ImageRegistryUpdate = route(
  'ImageRegistryUpdate',
  '修改源仓库',
  'image-registry-update',
  { id: undefined, instanceName: undefined },
  Index
)
