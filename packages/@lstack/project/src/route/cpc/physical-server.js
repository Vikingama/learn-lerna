import { route } from '../../constructor'
import { Index } from './cpc-index'

export const PhysicalServers = route('PhysicalServers', '服务器列表', 'physical-servers', {}, Index)
export const PhysicalServer = route(
  'PhysicalServer',
  '服务器',
  'physical-server',
  { cloudProviderId: undefined, id: undefined },
  Index
)
export const PhysicalServerCreate = route('PhysicalServerCreate', '创建服务器', 'physical-server-create', {}, Index)
