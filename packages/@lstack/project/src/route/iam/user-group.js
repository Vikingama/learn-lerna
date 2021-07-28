import { route } from '../../constructor'
import { Index } from './iam-index'

export const UserGroups = route('UserGroups', '用户组', 'user-groups', {}, Index)
export const UserGroupCreate = route('UserGroupCreate', '创建用户组', 'user-group-create', {}, Index)
export const UserGroup = route('UserGroup', '用户组详情', 'user-group', {}, Index)

