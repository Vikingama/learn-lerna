import { route } from '../../constructor'
import { Index } from './iam-index'

export const SubUsers = route('SubUsers', '组织用户', 'sub-users', {}, Index)
export const SubUserCreate = route('SubUserCreate', '创建用户', 'sub-user-create', {}, Index)
export const SubUserUpdate = route('SubUserUpdate', '修改用户', 'sub-user-update', {}, Index)
export const SubUser = route('SubUser', '用户详情', 'sub-user', { keystoneUserIdSub: undefined }, Index)

