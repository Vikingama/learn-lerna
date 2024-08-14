import { route } from '../../constructor'
import { Index } from './auth-index'

export const PasswordFind = route('PasswordFind', '找回密码', 'password-find', {}, Index)
export const PasswordModify = route('PasswordModify', '首次登陆', 'password-modify', {}, Index)
