import { route } from '../../constructor'
import { Index } from './ahs-index'

export const Applications = route('Applications', '应用管理', 'applications', {}, Index)
export const Application = route('Application', '应用详情', 'application-detail', {}, Index)
export const ApplicationCreate = route('ApplicationCreate', '应用创建', 'application-create', {}, Index)

// 二级路由
export const ApplicationBaseInfo =  route('ApplicationDetailBaseInfo', '基本信息', 'base-info', {}, Application)

Application.setRedirectRoute(ApplicationBaseInfo)
// todo redirect
