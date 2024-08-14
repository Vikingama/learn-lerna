import { route } from '../../constructor'
import { Index } from './lcs-index'

export const ApplicationCreate = route('ApplicationCreate', '创建应用', 'application-create', {}, Index)
export const Applications = route('Applications', '应用管理', 'applications', {}, Index)
export const Application = route('Application', '应用详情', 'application', {}, Index)
