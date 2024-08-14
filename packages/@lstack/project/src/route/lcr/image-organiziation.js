import { route } from '../../constructor'
import { Index } from './lcr-index'

export const ImageOrganizations = route('ImageOrganizations', '组织管理', 'image-organizations', {}, Index)
export const ImageOrganizationCreate = route(
  'ImageOrganizationCreate',
  '创建组织',
  'image-organization-create',
  {},
  Index
)
