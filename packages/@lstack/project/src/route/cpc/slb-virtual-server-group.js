import { route } from '../../constructor'
import { Index } from './cpc-index'

export const SlbVirtualServerGroupCreate = route(
  'SlbVirtualServerGroupCreate',
  '添加虚拟服务器组',
  'slb-virtual-server-group-create',
  {},
  Index
)
