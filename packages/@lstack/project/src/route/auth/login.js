import { route } from '../../constructor'
import { Index } from './auth-index'

export const Login = route('Login', '登录', 'login', { redirect: {} }, Index)
export const SubUserLogin = route('SubUserLogin', '登录', 'sub-user-login', { redirect: {} }, Index)

Index.setRedirectRoute(Login)
