import { route } from '../../constructor'
import { Index } from './cpc-index'

export const FileSystems = route('FileSystems', '文件系统', 'file-systems', {}, Index)
export const FileSystem = route(
  'FileSystem',
  '文件系统',
  'file-system',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const FileSystemCreate = route('FileSystemCreate', '创建文件系统', 'file-system-create', {}, Index)
