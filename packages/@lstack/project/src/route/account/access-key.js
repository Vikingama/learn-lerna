import { route } from '../../constructor'
import { Index } from './account-index'

export const AccessKeyManage = route('AccessKeyManage', 'AccessKey 管理', 'access-key', {}, Index)
export const AccessKeyCreate = route('AccessKeyCreate', '创建 AccessKey 文件', 'access-key-create', {}, Index)
export const AccessKeyUpdate = route('AccessKeyUpdate', '更新 AccessKey 文件', 'access-key-update', {}, Index)
export const AccessKeyGroupCreate = route(
  'AccessKeyGroupCreate',
  '创建 AccessKey 组',
  'access-key-group-create',
  {},
  Index
)
export const AccessKeyGroupUpdate = route(
  'AccessKeyGroupUpdate',
  '更新 AccessKey 组',
  'access-key-group-update',
  {},
  Index
)
