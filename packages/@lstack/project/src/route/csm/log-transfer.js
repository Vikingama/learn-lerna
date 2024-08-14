import { route } from '../../constructor'
import { Index } from './csm-index'

export const LogTransfers = route('LogTransfers', '日志转储', 'log-transfers', {}, Index)
export const LogTransferCreate = route('LogTransferCreate', '创建日志转储', 'log-transfer-create', {}, Index)
export const LogTransferUpdate = route(
  'LogTransferUpdate',
  '修改日志转储',
  'log-transfer-update',
  { id: undefined },
  Index
)
