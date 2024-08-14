import { route } from '../../constructor'
import { Index } from './cpm-index'

export const DashboardCards = route('DashboardCards', '仪表盘', 'dashboard-cards', {}, Index)
export const DashboardCardCreate = route('DashboardCardCreate', '创建仪表盘', 'dashboard-card-create', {}, Index)

Index.setRedirectRoute(DashboardCards)
