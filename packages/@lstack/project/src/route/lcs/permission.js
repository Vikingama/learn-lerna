import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Permissions = route('Permissions', '权限管理', 'permissions', {}, Index)
export const PermissionCreate = route('PermissionCreate', '添加权限', 'permission-create', {}, Index)
