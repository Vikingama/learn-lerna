import { route } from '../../constructor'
import { Index } from './cpc-index'

export const BackupGateways = route('BackupGateways', '备份网关', 'backup-gateways', {}, Index)
export const BackupGatewayCreate = route('BackupGatewayCreate', '创建备份网关', 'backup-gateway-create', {}, Index)
