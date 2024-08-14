import { route } from '../../constructor'
import { Index } from './cpc-index'

export const SecurityGroups = route('SecurityGroups', '安全组', 'security-groups', {}, Index)
export const SecurityGroup = route(
  'SecurityGroup',
  '安全组',
  'security-group',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const SecurityGroupCreate = route('SecurityGroupCreate', '创建安全组', 'security-group-create', {}, Index)
