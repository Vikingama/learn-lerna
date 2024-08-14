import { route } from '../../constructor'
import { Index } from './account-index'

export const AccountInfo = route('AccountInfo', '账号信息', 'account-info', {}, Index)
export const AccountInfoCreate = route('AccountInfoCreate', '资料修改', 'account-info-create', {}, Index)

