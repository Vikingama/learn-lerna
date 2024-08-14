import { route } from '../../constructor'
import { Index } from './account-index'

export const RealNameCert = route('RealNameCert', '实名认证', 'real-name-cert', {}, Index)
export const UserCertificationCreate = route(
  'UserCertificationCreate',
  '个人实名认证',
  'user-certification-create',
  {},
  Index
)
export const CompanyCertificationCreate = route(
  'CompanyCertificationCreate',
  '个人实名认证',
  'company-certification-create',
  {},
  Index
)
