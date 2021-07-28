import { route } from '../../constructor'
import { Index } from './iam-index'

export const Overview = route('Overview', '访问控制', 'overview', {}, Index)

Index.setRedirectRoute(Overview)
