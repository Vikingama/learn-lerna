import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Images = route('Images', '镜像', 'images', {}, Index)
export const CloudImage = route(
  'CloudImage',
  '镜像',
  'image',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const ImageCreate = route('ImageCreate', '创建镜像', 'image-create', {}, Index)
export const ImageImport = route('ImageImport', '导入镜像', 'image-import', {}, Index)
