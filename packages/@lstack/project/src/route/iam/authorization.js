import { route } from '../../constructor'
import { Index } from './iam-index'

export const Authorizations = route('Authorizations', '授权', 'authorizations', {}, Index)
export const AuthorizationCreate = route('AuthorizationCreate', '创建授权', 'authorization-create', {}, Index)

