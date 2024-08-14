import { route } from '../../constructor'
import { Index } from './ahs-index'

export const Routings = route('Routings', '路由管理', 'routings', {}, Index)
export const Routing = route('Routing', '路由详情', 'routing', {}, Index)
export const RoutingCreate = route('RoutingCreate', '路由创建', 'routing-create', {}, Index)
