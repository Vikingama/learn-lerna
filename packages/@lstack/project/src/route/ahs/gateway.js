import { route } from '../../constructor'
import { Index } from './ahs-index'

export const Gateways = route('Gateways', '网关管理', 'gateways', {}, Index)
export const Gateway = route('Gateway', '网关详情', 'gateway', {}, Index)
export const GatewayCreate = route('GatewayCreate', '网关创建', 'gateway-create', {}, Index)
